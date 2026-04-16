export default function BlogIndex() {
  return (
    <main className="min-h-screen pt-32 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">Monday Motivation Blog</h1>
      <p className="text-gray-500 font-sans text-center max-w-lg leading-relaxed mb-12">
        Read our latest articles, guides, and listicles on how to stay motivated and crush your goals every week.
      </p>
      
      <div className="w-full max-w-3xl h-[400px] border border-gray-100 rounded-2xl flex flex-col items-center justify-center bg-white shadow-sm">
         <span className="text-gray-400 text-sm uppercase tracking-widest font-medium">Coming Soon</span>
      </div>
    </main>
  );
}
