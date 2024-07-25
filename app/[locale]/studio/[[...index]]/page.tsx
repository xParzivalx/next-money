import { unstable_setRequestLocale } from "next-intl/server";

import Studio from "./Studio";

// Ensures the Studio route is statically generated
// export const dynamic = "force-static";

// Set the right `viewport`, `robots` and `referer` meta tags
export { metadata, viewport } from "next-sanity/studio";

type Props = {
  params: { locale: string };
};
export default function StudioPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <Studio />;
}