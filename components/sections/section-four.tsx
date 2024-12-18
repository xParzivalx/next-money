import Image from "next/image";
import prompt from "@/public/prompt.png";
import { CopyInput } from "@/components/copy-input";

export function SectionFour() {
  return (
    <section className="flex justify-between space-y-12 md:space-y-0 md:space-x-8 flex-col md:flex-row overflow-hidden mb-12 mx-4 md:container md:px-0">
      <div className="border border-border basis-1/3 bg-white dark:bg-[#121212] p-6 md:p-8 flex flex-col">
        <span className="text-[#F5F5F3] border border-border rounded-full self-start font-medium font-mono px-3 text-[10px] py-1.5 mb-3 bg-[#1D1D1D]">
          Muy pronto
        </span>
        <div className="flex flex-col items-center justify-center flex-1">
        <h4 className="font-medium text-xl md:text-2xl mb-2 text-gray-900 dark:text-white">LISA</h4>
          <p className="text-gray-600 dark:text-[#878787] text-lg md:text-xl text-center">
            La mejor solución de audio con lenguaje natural y conversacional en tiempo real.
          </p>
        </div>
      </div>

      <div className="border border-border md:basis-2/3 bg-white dark:bg-[#121212] p-6 md:p-8 flex justify-between md:space-x-8 md:flex-row flex-col">
        <div className="flex flex-col md:basis-1/2">
          <h4 className="font-medium text-lg md:text-xl mb-2 text-gray-900 dark:text-white">Directorio de Prompts</h4>

          <p className="text-gray-600 dark:text-[#878787] mb-3 text-xs">
            Utiliza nuestro directorio de prompts para obtener los mejores resultados.
          </p>

          <ul className="list-decimal pl-4 space-y-2">
            <li className="text-gray-600 dark:text-[#878787] text-xs">
              Visita prompts.notas.ai.
            </li>
            <li className="text-gray-600 dark:text-[#878787] text-xs">
              Selecciona por categoría el prompt que más encaje con tu tarea.
            </li>
            <li className="text-gray-600 dark:text-[#878787] text-xs">
              Pegalo en el Chat, cambia las variables y logra el mejor resultado.
            </li>
          </ul>

          <CopyInput
            value="prompts@notas.ai"
            className="max-w-[240px] mt-6"
          />
          <p className="text-gray-600 dark:text-[#878787] mb-3 mt-1 text-xs">
            Habla con nosotros para entrenar a los modelos con tus prompts.
          </p>
        </div>

        <div className="md:basis-1/2 mt-6 md:mt-0 -bottom-[8px] relative">
          <Image
            src={prompt}
            quality={100}
            className="object-contain -bottom-[32px] relative dark:invert-0 invert"
            alt="Prompt"
          />
        </div>
      </div>
    </section>
  );
} 