import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] border-t border-border-light py-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-y-6">
        
        {/* Left: Brand */}
        <Link 
          href="/" 
          title="MondayMotivation Home"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}
        >
          <img src="/logo.png" alt="MondayMotivation Logo" className="w-6 h-6 object-contain" />
          MondayMotivation
        </Link>

        {/* Right: Copyright & Links */}
        <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-4 text-sm font-medium text-gray-500">
          <p className="text-gray-400 font-normal">
            &copy; {currentYear} MondayMotivation.org. All rights reserved.
          </p>
          <span className="hidden md:inline text-gray-300">|</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" title="Privacy Policy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" title="Terms of Service" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
            <Link href="/contact" title="Contact Us" className="hover:text-brand-primary transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
