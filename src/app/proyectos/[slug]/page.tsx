import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { CASE_STUDIES, getCaseStudy } from "@/lib/caseStudies";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} — Caso de estudio | Maximo Andriola`,
    description: caseStudy.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <main>
      <CaseStudyTemplate caseStudy={caseStudy} />
    </main>
  );
}
