import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { faqJsonLd, jsonLdScriptTag } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Tracks } from "@/components/Tracks";
import { HowItWorks } from "@/components/HowItWorks";
import { HadithBanner } from "@/components/HadithBanner";
import { WhyUs } from "@/components/WhyUs";
import { Pricing } from "@/components/Pricing";
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
        <Hero />
        <Marquee />
        <About />
        <Tracks />
        <HowItWorks />
        <HadithBanner />
        <WhyUs />
        <Pricing />
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
