'use client';

import Link from "next/link";
import * as Clerk from '@clerk/elements/common';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SignInForm() {
  const preferredSignInOption = (
    <SignIn.Root>
      <SignIn.Step name="start">
        <Clerk.Connection name="apple">Continuar con Apple</Clerk.Connection>
      </SignIn.Step>
    </SignIn.Root>
  );

  const moreSignInOptions = (
    <Clerk.Field name="identifier">
      <Clerk.Label>Email</Clerk.Label>
      <Clerk.Input type="email" />
      <SignIn.Action submit>
        <Clerk.Loading>
          {(isLoading) => (isLoading ? 'Loading...' : 'Submit')}
        </Clerk.Loading>
      </SignIn.Action>
    </Clerk.Field>
  );

  return (
    <div>
      <header className="w-full fixed left-0 right-0">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
          <Link href="https://notas.ai">
            <h1
              style={{ fontFamily: 'Apple Garamond' }}
              className="text-balance font-urban text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]"
            >
              NotasAI
            </h1>
          </Link>
        </div>
      </header>
      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col py-8">
          <div className="flex w-full flex-col relative">
            <div className="pb-4 bg-gradient-to-r from-primary dark:via-primary dark:to-[#848484] to-[#000] inline-block text-transparent bg-clip-text">
              <h1 className="font-medium pb-1 text-3xl">Entrar a NotasAI.</h1>
            </div>
            <p className="font-medium pb-1 text-2xl text-[#878787]">
              Inteligencia Artificial, <br />
              en español, and make <br />
              informed decisions <br />
              effortlessly.
            </p>
            <div className="pointer-events-auto mt-6 flex flex-col mb-6">
              {preferredSignInOption}
              <Accordion type="single" collapsible className="border-t-[1px] pt-2 mt-6">
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="justify-center space-x-2 flex text-sm">
                    <span>More options</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-4">
                    <div className="flex flex-col space-y-4">
                      {moreSignInOptions}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <p className="text-xs text-[#878787]">
              Al hacer clic en continuar, reconoces que has leído y aceptas los{" "}
              <a href="https://app.notas.ai/terms" className="underline">
                Términos de Servicio
              </a>{" "}
              y la{" "}
              <a href="https://app.notas.ai/privacy" className="underline">
                Política de Privacidad
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}