"use client";

import * as React from "react";

import { Button, Drawer, Form, Input, InputNumber, Select, Space } from "antd";
import { FormListFieldData } from "antd/lib/form";
import { PlusIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import { Locale, locales } from "@/config";
import { Currency } from "@/db/type";
import useForm from "@/hooks/use-form";
import { getErrorMessage } from "@/lib/handle-error";

import { createAction } from "../_lib/actions";
import { createSchema, type CreateSchema } from "../_lib/validations";

const FormItem = Form.Item;
export function CreateDialog() {
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const t = useTranslations("LocaleSwitcher");

  function onSubmit(input: CreateSchema, error: FormListFieldData | null) {
    if (error) {
      const err = getErrorMessage(error);
      console.log("error-->", error);

      return toast.error(err + "");
    }
    startCreateTransition(() => {
      toast.promise(createAction(input), {
        loading: "Creating...",
        success: () => {
          formField.form.resetFields();
          setOpen(false);
          return "Created";
        },
        error: (error) => {
          console.log("create error--->", error);
          setOpen(false);
          return getErrorMessage(error);
        },
      });
    });
  }
  const { formField, inputField } = useForm<CreateSchema>({
    schema: createSchema,
    onSubmit,
  });

  React.useEffect(() => {
    formField.form.setFieldsValue({
      currency: Currency.USD,
      state: "enable",
    });
  }, [open]);

  return (
    <>
      <Button
        type="default"
        onClick={() => setOpen(true)}
        icon={<PlusIcon className="mr-2 size-4" aria-hidden="true" />}
      >
        New Product
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Crear Producto"
        size="large"
        footer={
          <Space className="flex w-full justify-end gap-2 pt-2 sm:space-x-0">
            <Button type="default" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              disabled={isCreatePending}
              onClick={formField.form.submit}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" {...formField}>
          <FormItem {...inputField} label="Title" name="title">
            <Input className="!w-full" placeholder="Please input..." />
          </FormItem>
          <FormItem {...inputField} label="Amount" name="amount">
            <InputNumber className="!w-full" placeholder="Please input..." />
          </FormItem>

          <FormItem
            {...inputField}
            label="Original Amount"
            name="originalAmount"
          >
            <InputNumber className="!w-full" placeholder="Please input..." />
          </FormItem>

          <FormItem {...inputField} label="Credit" name="credit">
            <InputNumber className="!w-full" placeholder="Please input..." />
          </FormItem>

          <FormItem {...inputField} label="Currency" name="currency">
            <Select
              options={[
                {
                  label: "CNY",
                  value: "CNY",
                },
                {
                  label: "USD",
                  value: "USD",
                },
                {
                  label: "EUR",
                  value: "EUR",
                },
              ]}
            />
          </FormItem>
          <FormItem {...inputField} label="State" name="state">
            <Select
              options={[
                {
                  label: "ENABLE",
                  value: "enable",
                },
                {
                  label: "DISABLE",
                  value: "disabled",
                },
              ]}
            />
          </FormItem>
          <FormItem {...inputField} label="Message" name="message">
            <Input.TextArea
              rows={3}
              className="!w-full"
              placeholder="Please input..."
            />
          </FormItem>
          <FormItem {...inputField} label="Tag" name="tag">
            <Select
              mode="tags"
              className="!w-full"
              placeholder="Please input..."
            />
          </FormItem>
          <FormItem {...inputField} label="Locale" name="locale">
            <Select
              options={locales.map((item) => ({
                value: item,
                label: t("locale", { locale: item }),
              }))}
            />
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}
