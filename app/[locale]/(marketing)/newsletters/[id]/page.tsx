import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { unstable_setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";

import { Container } from "@/components/layout/container";
import { prisma } from "@/db/prisma";

async function getNewsletter(id: string) {
  const newsletter = await prisma.newsletters.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!newsletter || !newsletter.body) {
    notFound();
  }

  return newsletter;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const newsletter = await getNewsletter(params.id);
  unstable_setRequestLocale(params.locale);

  const imageUrlRegex = /!\[[^\]]*\]\((.*?)\)/;
  const match = newsletter.body?.match(imageUrlRegex);
  let imageUrl: string | undefined = undefined;

  if (match) {
    imageUrl = match[1];
  }

  return {
    title: newsletter.subject,
    description: newsletter.subject,
    openGraph: {
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      title: newsletter.subject ?? "",
      description: newsletter.subject ?? "",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: newsletter.subject ?? "",
      description: newsletter.subject ?? "",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      site: "@notas_ia",
      creator: "@notas_ia",
    },
  } satisfies Metadata;
}

export default async function NewsletterRenderPage({
  params,
}: {
  params: { id: string };
}) {
  const newsletter = await getNewsletter(params.id);

  if (!newsletter.body) {
    return null;
  }

  return (
    <Container className="mt-16">
      <article className="prose mx-auto max-w-[500px] dark:prose-invert">
        <ReactMarkdown>{newsletter.body}</ReactMarkdown>
      </article>
    </Container>
  );
}

export const revalidate = 3600;
