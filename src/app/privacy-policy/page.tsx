import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for MondayMotivation.org",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-16 pb-24 px-4 max-w-4xl mx-auto">
      <div className="prose prose-stone prose-lg mx-auto">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        
        <p className="text-gray-500 mb-8">Last updated: April 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to MondayMotivation.org ("we," "our," or "us"). We respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website MondayMotivation.org.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We collect several types of information from and about users of our Website, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li><strong>Information you provide to us:</strong> This includes information provided at the time of registering to use our Website, subscribing to our service, or requesting further services.</li>
            <li><strong>Information we collect automatically:</strong> As you navigate through and interact with our Website, we may use automatic data collection technologies (like Google Analytics) to collect certain information about your equipment, browsing actions, and patterns.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:madcab4real@gmail.com" className="text-brand-primary hover:underline">madcab4real@gmail.com</a>
          </p>
        </section>
      </div>
    </main>
  );
}
