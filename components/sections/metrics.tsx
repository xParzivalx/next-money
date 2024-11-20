import Link from "next/link";

export function Metrics() {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-8 lg:absolute bottom-0 left-0 md:divide-x mt-20 lg:mt-0 px-4">
      <Link href="/open-startup">
        <div className="flex flex-col md:pr-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Llamadas IA</h4>
          <span className="text-2xl font-mono text-stroke">3,100+</span>
        </div>
      </Link>
      <Link href="/open-startup">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Chats creados</h4>
          <span className="text-2xl font-mono text-stroke">400+</span>
        </div>
      </Link>
      <Link href="/open-startup">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Créditos usados</h4>
          <span className="text-2xl font-mono text-stroke">839K</span>
        </div>
      </Link>
      <Link href="/open-startup">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Empresas</h4>
          <span className="text-2xl font-mono text-stroke">50+</span>
        </div>
      </Link>
    </div>
  );
}