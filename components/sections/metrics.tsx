import Link from "next/link";

export function Metrics() {
  return (
    <div className="md:ml-[150px] grid grid-cols-2 md:flex md:flex-nowrap gap-8 lg:absolute bottom-0 left-0 md:divide-x mt-4 lg:mt-0 px-4">
      <Link href="/open-startup">
        <div className="flex flex-col md:pr-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Llamadas IA</h4>
          <span className="text-xl font-mono text-black dark:text-white">3,100+</span>
        </div>
      </Link>
      <Link href="/open-startup">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Chats creados</h4>
          <span className="text-xl font-mono text-black dark:text-white">400+</span>
        </div>
      </Link>
      <Link href="/open-startup">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Créditos usados</h4>
          <span className="text-xl font-mono text-black dark:text-white">839K</span>
        </div>
      </Link>
      <Link href="/open-startup">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Empresas</h4>
          <span className="text-xl font-mono text-black dark:text-white">50+</span>
        </div>
      </Link>
    </div>
  );
}