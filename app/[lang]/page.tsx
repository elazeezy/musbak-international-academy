import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { faqJsonLd, jsonLdScriptTag } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import { HeroCinematic } from "@/components/HeroCinematic";
import { VSLSection } from "@/components/VSLSection";
import { TwoPaths } from "@/components/TwoPaths";
import { Journey } from "@/components/Journey";
import { ProofMosaic } from "@/components/ProofMosaic";
import { QuranExperience } from "@/components/QuranExperience"; 
import { Teachers } from "@/components/Teachers";
import { GlobalClassroom } from "@/components/GlobalClassroom";
import { PortalPreview } from "@/components/PortalPreview";
import { WhyMusbak } from "@/components/WhyMusbak";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { MobileBar } from "@/components/MobileBar";

export const dynamic = "force-static";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const t = getDictionary(raw);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(faqJsonLd(t)) }}
      />
      <Navbar />
      <main>
        <HeroCinematic />
        <VSLSection />
        <TwoPaths />
        <Journey />
        <ProofMosaic />
        <QuranExperience />
        <Teachers />
        <GlobalClassroom />
        <PortalPreview />
        <WhyMusbak />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
}
