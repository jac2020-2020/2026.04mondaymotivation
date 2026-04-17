import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for MondayMotivation.org",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen pt-16 pb-24 px-4 max-w-4xl mx-auto">
      <div className="prose prose-stone prose-lg mx-auto">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-foreground">Terms of Service</h1>
        
        <p className="text-gray-500 mb-8">Last updated: April 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            By accessing or using MondayMotivation.org (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service. These terms apply to all visitors, users, and others who access or use the Service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Permission is granted to temporarily download and use the materials (images, posters, and texts) on MondayMotivation.org for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Modify or copy the underlying source code of the website;</li>
            <li>Use the generated images or materials for any illegal purpose;</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
            <li>Remove any copyright or other proprietary notations from the materials;</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Content and Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our Service allows you to create posters using quotes and background images. The quotes provided on this platform belong to their respective authors. The background images are sourced from various third-party providers (such as Unsplash, Pexels, etc.) under their respective licenses. You agree to use these materials responsibly and in accordance with applicable copyright laws.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Disclaimer</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The materials on MondayMotivation.org are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you have any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:madcab4real@gmail.com" className="text-brand-primary hover:underline">madcab4real@gmail.com</a>
          </p>
        </section>
      </div>
    </main>
  );
}
