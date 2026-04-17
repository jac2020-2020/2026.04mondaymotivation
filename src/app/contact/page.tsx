import { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | MondayMotivation",
  description: "Get in touch with the MondayMotivation team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-32 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl text-center">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">Contact Us</h1>
        
        <p className="text-gray-500 text-lg mb-16 leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          Have a question, feedback, or a quote suggestion? <br className="hidden md:block" />
          We'd love to hear from you.
        </p>

        <div className="bg-surface-2 p-12 rounded-[2rem] border border-border-light flex flex-col items-center shadow-sm">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
            <Mail className="w-8 h-8 text-brand-primary" />
          </div>
          
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">Email Us</h2>
          
          <p className="text-gray-500 mb-8 text-center max-w-sm leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Drop us a line anytime. We try our best to respond to all inquiries within 24-48 hours.
          </p>
          
          <a 
            href="mailto:madcab4real@gmail.com" 
            className="text-xl md:text-2xl font-bold text-brand-primary hover:text-brand-primary-hover transition-colors"
          >
            madcab4real@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}
