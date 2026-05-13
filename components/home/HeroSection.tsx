interface HeroSectionProps {
  title: string;
  content: string;
  image: string;
}

export default function HeroSection({
  title,
  content,
  image,
}: HeroSectionProps) {
  return (
    <section className="relative h-[480px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">

      <img
        src={
          image ||
          "https://images.unsplash.com/photo-1518770660439-4636190af475"
        }
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ddb7ff]/20 text-[#ddb7ff] border border-[#ddb7ff]/30 text-xs font-bold mb-4 uppercase tracking-widest">

          Editor&apos;s Choice
        </span>

        <h2 className="text-5xl font-bold leading-none mb-4 tracking-tighter max-w-3xl">

          {title}
        </h2>

        <p className="text-[#cdc3d0] text-lg max-w-xl mb-6 line-clamp-3">

          {content}
        </p>

        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#ddb7ff] transition-colors">

          Read Story
        </button>
      </div>
    </section>
  );
}