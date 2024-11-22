"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import copy from "copy-to-clipboard";
import { debounce } from "lodash-es";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import BlurFade from "@/components/magicui/blur-fade";
import { AspectRatioSelector } from "@/components/playground/aspect-selector";
import { ModelSelector } from "@/components/playground/model-selector";
import { Model, models, types } from "@/components/playground/models";
import { PrivateSwitch } from "@/components/playground/private-switch";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Locale } from "@/config";
import { Credits, loras, model, ModelName, Ratio } from "@/config/constants";
import {
  ChargeProductSelectDto,
  FluxSelectDto,
  UserCreditSelectDto,
} from "@/db/type";
import { cn, createRatio } from "@/lib/utils";

import { DownloadAction } from "../history/download-action";
import { PricingCardDialog } from "../pricing-cards";
import { EmptyPlaceholder } from "../shared/empty-placeholder";
import { Icons } from "../shared/icons";
import Upload from "../upload";
import ComfortingMessages from "./comforting";
import Loading from "./loading";

const aspectRatios = [Ratio.r1, Ratio.r2, Ratio.r3, Ratio.r4, Ratio.r5];

const useCreateTaskMutation = (config?: {
  onSuccess: (result: any) => void;
}) => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (values: any) => {
      const res = await fetch("/api/generate", {
        body: JSON.stringify(values),
        method: "POST",
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (!res.ok && res.status >= 500) {
        throw new Error("Network response error");
      }

      return res.json();
    },
    onSuccess: async (result) => {
      config?.onSuccess(result);
    },
  });
};

export enum FluxTaskStatus {
  Processing = "processing",
  Succeeded = "succeeded",
  Failed = "failed",
  Canceled = "canceled",
}

export default function Playground({
  locale,
  chargeProduct,
}: {
  locale: string;
  chargeProduct?: ChargeProductSelectDto[];
}) {
  const [isPublic, setIsPublic] = React.useState(true);
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);
  const [ratio, setRatio] = React.useState<Ratio>(Ratio.r1);
  const [inputPrompt, setInputPrompt] = React.useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fluxId, setFluxId] = useState("");
  const [fluxData, setFluxData] = useState<FluxSelectDto>();
  const useCreateTask = useCreateTaskMutation();
  const [uploadInputImage, setUploadInputImage] = useState<any[]>([]);
  const t = useTranslations("Playground");
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [pricingCardOpen, setPricingCardOpen] = useState(false);
  const [lora, setLora] = React.useState<string>(loras.wukong);

  const queryTask = useQuery({
    queryKey: ["queryFluxTask", fluxId],
    enabled: !!fluxId,
    refetchInterval: (query) => {
      if (query.state.data?.data?.taskStatus === FluxTaskStatus.Processing) {
        return 2000;
      }
      return false;
    },
    queryFn: async () => {
      const res = await fetch("/api/task", {
        body: JSON.stringify({
          fluxId,
        }),
        method: "POST",
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (!res.ok) {
        throw new Error("Network response error");
      }

      return res.json();
    },
  });

  useEffect(() => {
    const key = "GENERATOR_PROMPT";
    const _prompt = window.sessionStorage.getItem(key);
    if (_prompt) {
      setInputPrompt(_prompt);
      window.sessionStorage.removeItem(key);
    }
  }, []);

  useEffect(() => {
    const onBeforeunload = () => {
      if (inputPrompt) {
        window.sessionStorage.setItem("GENERATOR_PROMPT", inputPrompt);
      }
    };
    window.addEventListener("beforeunload", onBeforeunload);
  }, [inputPrompt]);

  useEffect(() => {
    if (!queryTask.data?.data?.id) {
      return;
    }
    setFluxData(queryTask?.data?.data);
  }, [queryTask.data]);

  const handleSubmit = async () => {
    if (!inputPrompt) {
      return toast.error("Please enter a prompt");
    }
    const queryData = queryClient.getQueryData([
      "queryUserPoints",
    ]) as UserCreditSelectDto;
    if (queryData?.credit <= 0) {
      t("error.insufficientCredits") &&
        toast.error(t("error.insufficientCredits"));
      setPricingCardOpen(true);
      return;
    }
    setLoading(true);

    try {
      const inputImageUrl = uploadInputImage
        ? uploadInputImage?.[0]?.completedUrl
        : undefined;
      const loraName = selectedModel.id === model.general ? lora : undefined;
      const res = await useCreateTask.mutateAsync({
        model: selectedModel.id,
        inputPrompt,
        aspectRatio: ratio,
        inputImageUrl,
        isPrivate: isPublic ? 0 : 1,
        loraName,
        locale,
      });
      console.log("res--->", res);
      if (!res.error) {
        setFluxId(res.id);
        queryClient.invalidateQueries({ queryKey: ["queryUserPoints"] });
      } else {
        let error = res.error;
        if (res.code === 1000402) {
          setPricingCardOpen(true);
          error = t("error.insufficientCredits") ?? res.error;
        }
        toast.error(error);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const debounceHandleSubmit = debounce(handleSubmit, 800);

  const generateLoading = useMemo(() => {
    return (
      queryTask.isPending ||
      queryTask.isLoading ||
      fluxData?.taskStatus === FluxTaskStatus.Processing
    );
  }, [fluxData, queryTask]);

  const copyPrompt = (prompt: string) => {
    copy(prompt);
    toast.success(t("action.copySuccess"));
  };

  return (
    <div className="overflow-hidden bg-background">
      <div className="container h-full p-6">
        <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_240px]">
          <div className="flex-col space-y-4 sm:flex md:order-2">
            <ModelSelector
              selectedModel={selectedModel}
              onChange={(model) => setSelectedModel(model)}
              types={types}
              lora={lora}
              onLoraChange={setLora}
              models={models}
            />
            <AspectRatioSelector
              aspectRatios={aspectRatios}
              ratio={ratio}
              onChange={setRatio}
            />
            {selectedModel.id === model.dev && (
              <div className="flx flex-col gap-4">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Label htmlFor="model">{t("form.inputImage")}</Label>
                  </HoverCardTrigger>
                  <HoverCardContent
                    align="start"
                    className="w-[260px] text-sm"
                    side="left"
                  >
                    {t("form.inputImageTooltip")}
                  </HoverCardContent>
                </HoverCard>
                <Upload
                  maxFiles={1}
                  maxSize={2 * 1024 * 1024}
                  placeholder={t("form.inputImagePlaceholder")}
                  value={uploadInputImage}
                  onChange={setUploadInputImage}
                  previewClassName="h-[120px]"
                  accept={{
                    "image/*": [],
                  }}
                />
              </div>
            )}

            {/* <TemperatureSelector defaultValue={[0.56]} /> */}
            {/* <MaxLengthSelector defaultValue={[256]} /> */}
          </div>
          <div className="md:order-1">
            <div className="flex flex-col space-y-4">
              <div className="grid h-full gap-6 lg:grid-cols-2">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-1 flex-col space-y-2">
                    <Label htmlFor="input">{t("form.input")}</Label>
                    <Textarea
                      id="input"
                      placeholder={t("form.placeholder")}
                      className="lg:min-h-[450px]"
                      value={inputPrompt}
                      onChange={(e) => setInputPrompt(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="Result">{t("form.result")}</Label>
                  <div className="min-h-20 border-0 md:min-h-[400px] md:border lg:min-h-[450px]">
                    {loading || (generateLoading && fluxId) ? (
                      <div className="flex size-full flex-col items-center justify-center">
                        <Loading />
                        <div className="text-content-light mt-3 px-4 text-center text-sm">
                          <ComfortingMessages language={locale as Locale} />
                        </div>
                      </div>
                    ) : fluxData?.id &&
                      fluxData.taskStatus === FluxTaskStatus.Succeeded ? (
                      <div
                        className={cn("size-full", {
                          "bg-muted": !fluxData?.imageUrl || !fluxId,
                        })}
                      >
                        <div
                          className={`w-full rounded-md ${createRatio(fluxData?.aspectRatio as Ratio)}`}
                        >
                          {fluxData?.imageUrl && fluxId && (
                            <BlurFade key={fluxData?.imageUrl} inView>
                              <img
                                src={fluxData?.imageUrl}
                                alt="Generated Image"
                                className={`pointer-events-none w-full rounded-md ${createRatio(fluxData?.aspectRatio as Ratio)}`}
                              />
                            </BlurFade>
                          )}
                        </div>
                        <div className="text-content-light inline-block px-4 py-2 text-sm">
                          <p className="line-clamp-4 italic md:line-clamp-6 lg:line-clamp-[8]">
                            {fluxData?.inputPrompt}
                          </p>
                        </div>
                        <div className="flex flex-row flex-wrap space-x-1 px-4">
                          <div className="bg-surface-alpha-strong text-content-base inline-flex items-center rounded-md border border-transparent px-1.5 py-0.5 font-mono text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            {ModelName[fluxData?.model]}
                          </div>
                        </div>
                        <div className="flex flex-row justify-between space-x-2 p-4">
                          <button
                            className="focus-ring text-content-strong border-stroke-strong hover:border-stroke-stronger data-[state=open]:bg-surface-alpha-light inline-flex h-8 items-center justify-center whitespace-nowrap rounded-lg border bg-transparent px-2.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => copyPrompt(fluxData.inputPrompt!)}
                          >
                            <Copy className="icon-xs me-1" />
                            {t("action.copy")}
                          </button>
                          <DownloadAction id={fluxData.id} />
                        </div>
                      </div>
                    ) : fluxData?.taskStatus === FluxTaskStatus.Failed ? (
                      <div className="flex min-h-96 items-center justify-center">
                        <EmptyPlaceholder>
                          <EmptyPlaceholder.Icon name="Eraser" />
                          <EmptyPlaceholder.Title>
                            {t("empty.title")}
                          </EmptyPlaceholder.Title>
                          <EmptyPlaceholder.Description>
                            {t("empty.description", {
                              error:
                                fluxData?.errorMsg ??
                                t("empty.errorPlaceholder"),
                            })}
                          </EmptyPlaceholder.Description>
                        </EmptyPlaceholder>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <Button
                  className="w-40"
                  disabled={
                    !inputPrompt.length ||
                    loading ||
                    (generateLoading && !!fluxId)
                  }
                  onClick={debounceHandleSubmit}
                >
                  {loading ? (
                    <>
                      <Icons.spinner className="mr-2 size-4 animate-spin" />{" "}
                      Cargando...
                    </>
                  ) : (
                    <>
                      {t("form.submit")}
                      <Icons.PointIcon className="size-[14px]" />
                      <span>{Credits[selectedModel.id]}</span>
                    </>
                  )}
                </Button>
                <PrivateSwitch isPublic={isPublic} onChange={setIsPublic} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PricingCardDialog
        onClose={setPricingCardOpen}
        isOpen={pricingCardOpen}
        chargeProduct={chargeProduct}
      />
    </div>
  );
}
