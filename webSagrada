import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- DATA ---
const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'Transmisiones', href: '#lives' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Talleres', href: '#talleres' },
  { name: 'Bitácora', href: '#blog' },
  { name: 'Contacto', href: '#contacto' }
];

const SOCIAL_LINKS = [
  { name: 'TikTok', url: '#' },
  { name: 'YouTube', url: '#' },
  { name: 'Instagram', url: '#' },
  { name: 'Facebook', url: '#' }
];

// TUS IMÁGENES CONFIGURADAS AQUÍ
const LIVES_DATA = [
  {
    title: "Luna Onírica",
    subtitle: "Un espacio dedicado a explorar los sueños",
    description: "Exploración profunda de sueños lúcidos y símbolos oníricos.",
    image: "/luna.jpg", // Tu imagen en carpeta public
    youtubeUrl: "#",
    status: "live"
  },
  {
    title: "El Espíritu Nómada",
    subtitle: "Live de Sagrada Ciencia",
    description: "El espíritu nómada de los gitanos.",
    image: "/nomada.jpg", // Tu imagen en carpeta public
    youtubeUrl: "#",
    status: "live"
  },
  {
    title: "I Ching Sagrado",
    subtitle: "Vehículo de autoconocimiento",
    description: "Sabiduría ancestral para tiempos modernos.",
    image: "/iching.jpg", // Tu imagen en carpeta public
    youtubeUrl: null,
    status: "coming_soon"
  }
];

const WORKSHOPS = [
  { title: "Alquimia Interior", date: "Otoño 2024" },
  { title: "Taller de Sueños Lúcidos", date: "Invierno 2024" },
  { title: "Círculo de Lectura", date: "Próximamente" }
];

const TESTIMONIALS = [
  { text: "Un espacio donde la ciencia deja de ser fría y se vuelve sagrada.", author: "Ana M." },
  { text: "He recuperado mi capacidad de soñar y entender mis ciclos.", author: "Carla R." },
];

// Simulación de feed de Instagram (imágenes placeholders estéticas)
const INSTAGRAM_GRID = [
  "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515518562332-90e137f8646b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603570388466-eb42544c9b97?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614726365723-49cfae9e0367?q=80&w=400&auto=format&fit=crop"
];

// --- ICONS ---
const Icons = {
  Menu: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  X: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
  Play: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M4.5 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" clipRule="evenodd" />
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  ),
  Quote: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-stone-300">
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
    </svg>
  )
};

// --- COMPONENTS ---

const Button = ({ children, primary, href, onClick, className = "", disabled, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center py-3 px-8 text-xs uppercase font-bold tracking-widest transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-offset-2 cursor-pointer";
  const primaryClasses = "bg-stone-900 text-white hover:bg-stone-800 focus:ring-stone-900 border border-transparent";
  const secondaryClasses = "bg-transparent text-white border border-white hover:bg-white hover:text-stone-900 focus:ring-white";
  const disabledClasses = "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed";

  const combinedClasses = cn(
    baseClasses, 
    disabled ? disabledClasses : (primary ? primaryClasses : secondaryClasses), 
    className
  );

  if (href && !disabled) {
    return <a href={href} className={combinedClasses} {...props}>{children}</a>;
  }
  return (
    <motion.button 
      whileHover={!disabled ? { scale: 1.02 } : {}} 
      whileTap={!disabled ? { scale: 0.98 } : {}} 
      className={combinedClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const FadeIn = ({ children, delay = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-stone-100 py-4 text-stone-900 shadow-sm" : "bg-transparent py-8 text-white"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="font-serif text-xl tracking-[0.2em] font-bold uppercase z-50 relative">
            Sagrada Ciencia
          </a>

          <nav className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-widest transition-colors relative group",
                  scrolled ? "text-stone-600 hover:text-stone-900" : "text-white/80 hover:text-white"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                  scrolled ? "bg-stone-900" : "bg-white"
                )} />
              </a>
            ))}
          </nav>

          <button
            className="md:hidden z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen 
              ? <Icons.X className={cn("w-6 h-6 text-stone-900")} /> 
              : <Icons.Menu className={cn("w-6 h-6", scrolled ? "text-stone-900" : "text-white")} />
            }
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col space-y-8 text-center">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-stone-900 hover:text-stone-500 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Tarjeta Limpia (El estilo que te gustó)
const LiveCard = ({ title, subtitle, image, youtubeUrl, status, delay }) => {
  const isLive = status === "live";

  return (
    <FadeIn delay={delay} className="group flex flex-col h-full bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-stone-100">
      
      {/* Contenedor de Imagen (Formato Vertical 3:4) */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-100">
        <div className="absolute inset-0 bg-stone-900/10 z-10 transition-colors duration-500 group-hover:bg-transparent" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Play Button - Solo si está en vivo */}
        {isLive && (
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <div className="bg-white/90 backdrop-blur text-stone-900 p-5 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
              <Icons.Play className="w-6 h-6 ml-1" />
            </div>
          </a>
        )}

        {/* Badge de estado */}
        <div className="absolute top-4 left-4 z-20">
          <span className={cn(
            "px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-white backdrop-blur-md",
            isLive ? "bg-red-600/90" : "bg-stone-500/80"
          )}>
            {isLive ? "En Vivo" : "Próximamente"}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6 pt-8 text-center border-x border-b border-stone-100/50">
        <h3 className="font-serif text-2xl font-medium mb-3 text-stone-900 leading-tight">{title}</h3>
        <p className="text-stone-500 text-xs uppercase tracking-widest font-bold mb-6">{subtitle}</p>
        
        <div className="mt-auto">
          <Button 
            primary={isLive} 
            disabled={!isLive} 
            href={isLive ? youtubeUrl : undefined}
            className={cn("w-full", !isLive && "bg-stone-100 border-none text-stone-400")}
          >
            {isLive ? "Ver Transmisión" : "Próximamente"}
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};

const WorkshopItem = ({ title, date }) => (
  <div className="flex justify-between items-center py-6 border-b border-stone-200 group hover:border-stone-900 transition-colors duration-300 cursor-default">
    <h4 className="font-serif text-xl text-stone-500 group-hover:text-stone-900 transition-colors">{title}</h4>
    <span className="text-xs uppercase font-bold tracking-widest text-stone-400 group-hover:text-stone-600">{date}</span>
  </div>
);

const Newsletter = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6">
      <h3 className="font-serif text-3xl md:text-4xl mb-6">Suscríbete al Silencio</h3>
      <p className="text-stone-400 mb-10 font-light text-sm md:text-base leading-relaxed">
        Recibe avisos de nuevos lives, artículos y reflexiones.<br/>
        Solo contenido esencial, sin ruido digital.
      </p>
      
      {status === "success" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 p-6 border border-white/20 text-white font-serif italic"
        >
          Gracias. Tu viaje ha comenzado.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto relative group">
          <input
            type="email"
            placeholder="tu@email.com"
            disabled={status === "loading"}
            className="flex-1 p-4 bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:ring-1 focus:ring-white focus:border-white outline-none transition-all disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "..." : "Enviar"}
          </button>
        </form>
      )}
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); 

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      <Navbar />

      <main>
        {/* HERO SECTION - MOVIMIENTO CÓSMICO */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
          
          {/* Fondo Animado: Respiración Cósmica */}
          <motion.div 
            style={{ y: y1 }} 
            className="absolute inset-0 z-0"
            animate={{ scale: [1, 1.1, 1] }} // Zoom suave adentro y afuera
            transition={{ duration: 20, ease: "linear", repeat: Infinity }} // Ciclo infinito muy lento
          >
            <img
              src="https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2066&auto=format&fit=crop"
              alt="Cosmos"
              className="w-full h-[120%] object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-transparent to-stone-900" />
          </motion.div>

          <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mt-16">
            <FadeIn>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tighter leading-none mix-blend-overlay opacity-90">
                Sagrada<br />Ciencia
              </h1>
            </FadeIn>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-px bg-white/50 mx-auto mb-8"
            />

            <FadeIn delay={0.4}>
              <h2 className="text-lg md:text-xl font-light tracking-[0.2em] text-white/80 max-w-2xl mx-auto mb-12 uppercase">
                Jardín Cósmico de Sabiduría Mística
              </h2>
            </FadeIn>

            <FadeIn delay={0.6} className="flex justify-center gap-6">
              <Button href="#lives" className="border-white text-white hover:bg-white hover:text-stone-900">
                Ver Actividades
              </Button>
            </FadeIn>
          </div>
        </section>

        {/* LIVES SECTION */}
        <section id="lives" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900">Cartelera</h2>
              <p className="text-stone-500 font-light text-sm tracking-wide uppercase">Encuentros para el despertar</p>
            </FadeIn>
            
            {/* Grid de Posters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {LIVES_DATA.map((live, idx) => (
                <LiveCard key={live.title} {...live} delay={idx * 0.2} />
              ))}
            </div>
          </div>
        </section>

        {/* NOSOTROS SECTION (Misión) */}
        <section id="nosotros" className="py-32 px-6 bg-stone-50 border-y border-stone-100">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-8 block">Nuestra Esencia</span>
              <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-stone-900 leading-relaxed font-medium">
                "Expandir la conciencia colectiva a través de experiencias de sanación profunda, empoderamiento femenino y conexión con la naturaleza para co-crear un futuro más justo, equitativo y amoroso."
              </h2>
              <div className="mt-12">
                <Button href="#" primary className="border-stone-900 bg-transparent text-stone-900 hover:bg-stone-900 hover:text-white">
                  Conoce nuestra historia
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* TALLERES PRÓXIMAMENTE */}
        <section id="talleres" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h3 className="font-serif text-3xl mb-12 text-center text-stone-900">Próximos Talleres</h3>
              <div className="flex flex-col">
                {WORKSHOPS.map((workshop) => (
                  <WorkshopItem key={workshop.title} {...workshop} />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FRASE INSPIRACIÓN (Simone Weil) */}
        <section className="py-32 px-6 bg-stone-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex justify-center mb-8 opacity-50"><Icons.Quote /></div>
              <blockquote className="font-serif text-2xl md:text-4xl leading-relaxed italic opacity-95 mb-10">
                "La compasión por la fragilidad va siempre unida al amor por la verdadera belleza, porque sentimos vivamente que las cosas verdaderamente bellas deberían tener asegurada una existencia eterna."
              </blockquote>
              <cite className="text-xs font-sans uppercase tracking-widest text-stone-400 not-italic block mt-4">
                — Simone Weil, <span className="opacity-70">Echar raíces, 1943</span>
              </cite>
            </FadeIn>
          </div>
        </section>

        {/* BLOG TEASER */}
        <section id="blog" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-100 pb-6">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="font-serif text-4xl text-stone-900 mb-2">Bitácora</h2>
                <p className="text-stone-500 text-sm tracking-wide uppercase">Lecturas recientes</p>
              </div>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-stone-600 flex items-center gap-2 group">
                Ver archivo <span className="transition-transform group-hover:translate-x-1"><Icons.ArrowRight /></span>
              </a>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "La Puerta Interior", tag: "Sueños", excerpt: "Aprende a controlar tus sueños y acceder a dimensiones de consciencia más elevadas." },
                { title: "Sabiduría del Cambio", tag: "Oráculo", excerpt: "Cómo el oráculo milenario del I Ching puede guiar tu vida diaria." },
                { title: "El Lenguaje Divino", tag: "Geometría", excerpt: "La matemática que estructura el universo y nuestra psique." }
              ].map((post, idx) => (
                <FadeIn key={idx} delay={idx * 0.2}>
                  <article className="group cursor-pointer">
                    <div className="aspect-w-16 aspect-h-9 bg-stone-100 mb-6 overflow-hidden">
                      <div className="w-full h-48 bg-stone-200 transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2 block">{post.tag}</span>
                    <h3 className="font-serif text-2xl mb-3 text-stone-900 group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{post.excerpt}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-24 px-6 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-center font-serif text-3xl mb-16 text-stone-900">Resonancias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {TESTIMONIALS.map((t, idx) => (
                <FadeIn key={idx} delay={idx * 0.2} className="bg-white p-10 border border-stone-100 shadow-sm text-center md:text-left">
                  <p className="font-serif text-xl italic text-stone-700 mb-6">"{t.text}"</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">— {t.author}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIAL GRID */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <FadeIn>
              <h3 className="font-serif text-2xl mb-2 text-stone-900">Comunidad</h3>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 mb-12 inline-block">@sagradaciencia</a>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-8">
                {INSTAGRAM_GRID.map((img, idx) => (
                  <a key={idx} href="#" className="block overflow-hidden group relative aspect-square">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                    <img src={img} alt="Instagram" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER & NEWSLETTER */}
        <footer id="contacto" className="bg-stone-900 text-white border-t border-stone-800">
          <div className="py-20 border-b border-stone-800">
            <Newsletter />
          </div>
          
          <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="font-serif text-2xl font-bold tracking-widest mb-2">SC.</p>
              <p className="text-stone-500 text-xs font-light">© {new Date().getFullYear()} Sagrada Ciencia.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-400">
              {SOCIAL_LINKS.map(link => (
                <a key={link.name} href={link.url} className="hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;