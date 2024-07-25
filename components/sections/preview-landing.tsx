import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFaceDataBySeed } from "@/db/queries/face-query";
import { Link as I18nLink } from "@/lib/navigation";

export default async function PreviewLanding() {
  const { data } = await getFaceDataBySeed({ limit: 24 });
  return (
    <div className="mx-auto mb-10 mt-8 w-[90%]">
      <div
        role="list"
        className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
      >
        {data?.map((item) => (
          <div className="mt-6" data-id={item.id} key={item.id}>
            <div className="checkerboard relative flex items-start justify-center rounded-xl">
              <I18nLink href={`/face/${item.id}`} className="cursor-pointer">
                <Image
                  className="rounded-lg"
                  width={400}
                  height={400}
                  alt={`${item.dominantEmotion} ${item.dominantGender}`}
                  src={item.url}
                />
              </I18nLink>
              <div className="tags absolute bottom-2 left-1 flex w-full space-x-2">
                <span className="apple-tag rounded-md px-2 py-1 text-white">
                  {item.dominantEmotion}
                </span>
                <span className="apple-tag rounded-md px-2 py-1 text-white">
                  {item.dominantGender}
                </span>
                <span className="apple-tag rounded-md px-2 py-1 text-white">
                  {item.dominantRace}
                </span>
              </div>
              <Link
                className="absolute right-1 top-1"
                target="_blank"
                href={`https://pinterest.com/pin/create/button/?url=https://pinterest.com/pin/create/button/?description=${encodeURIComponent(`${item.dominantEmotion} ${item.dominantGender}`)}&url=${encodeURIComponent(item.url)}`}
              >
                <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#e60023]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}