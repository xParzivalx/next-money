import Image from "next/image";
import inbox from "@/public/inbox.webp";
import invoicing from "@/public/invoicing.webp";
import { CopyInput } from "@/components/copy-input";

export function SectionFour() {
  return (
    <section className="flex justify-between space-y-12 md:space-y-0 md:space-x-8 flex-col md:flex-row overflow-hidden mb-12">
      <div className="border border-border basis-1/3 bg-white dark:bg-[#121212] p-10 md:text-center flex flex-col">
        <span className="text-[#F5F5F3] border border-border rounded-full self-start font-medium font-mono px-3 text-xs py-1.5 mb-4 bg-[#1D1D1D]">
          Muy pronto
        </span>
        <h4 className="font-medium text-xl md:text-2xl mb-4 text-gray-900 dark:text-white">Lisa</h4>
        <p className="text-gray-600 dark:text-[#878787] mb-[35px] text-sm">
          Estamos trabajando arduamente para brindarte la mejor solución de audio. Contará con modelos basados en web, conversación en vivo y sincronización de entrenamiento de datos.
        </p>
        <Image
          src={invoicing}
          quality={100}
          className="object-contain mt-auto"
          alt="Invoice"
        />
      </div>

      <div className="border border-border md:basis-2/3 bg-white dark:bg-[#121212] p-10 flex justify-between md:space-x-8 md:flex-row flex-col">
        <div className="flex flex-col md:basis-1/2">
          <h4 className="font-medium text-xl md:text-2xl mb-4 text-gray-900 dark:text-white">Prompts preentrenados</h4>

          <p className="text-gray-600 dark:text-[#878787] mb-4 text-sm">
            Automatic matching of incoming invoices or receipts to the right
            transaction.
          </p>

          <ul className="list-decimal pl-4 space-y-3">
            <li className="text-gray-600 dark:text-[#878787] text-sm">
              Use your personalized email address for your invoices and
              receipts.
            </li>
            <li className="text-gray-600 dark:text-[#878787] text-sm">
              The invoice arrives in the inbox, with our AI solution the invoice
              automatically matches with the right transaction.
            </li>
            <li className="text-gray-600 dark:text-[#878787] text-sm">
              Your transaction now have the right basis/attachments for you to
              export.
            </li>
          </ul>

          <CopyInput
            value="trainer@notas.ai"
            className="max-w-[240px] mt-8"
          />
        </div>

        <div className="md:basis-1/2 mt-8 md:mt-0 -bottom-[8px] relative">
          <Image
            src={inbox}
            quality={100}
            className="object-contain -bottom-[32px] relative"
            alt="Inbox"
          />
        </div>
      </div>
    </section>
  );
} 