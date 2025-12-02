import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from 'axios';
import InstagramFeed from './InstagramFeed';

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
  { name: 'Bitácora', href: 'https://sagradaciencia-blog.vercel.app' },
  { name: 'Contacto', href: '#contacto' }
];

// TUS REDES SOCIALES REALES
const SOCIAL_LINKS = [
  { name: 'TikTok', url: 'https://www.tiktok.com/@sagrada_ciencia_oficial' },
  { name: 'YouTube', url: 'https://www.youtube.com/@SagradaCienciaEditorial' },
  { name: 'Instagram', url: 'https://www.instagram.com/sagrada_ciencia/' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61584141816524' }
];

// IMÁGENES DE CARTELERA
const LIVES_DATA = [
  {
    title: "Luna Onírica",
    subtitle: "Un espacio dedicado a explorar la tierra de los sueños, su simbolismo y su significado.",
    description: "Exploración profunda de sueños lúcidos y símbolos oníricos.",
    image: "/luna.jpg", 
    youtubeUrl: "https://www.youtube.com/live/PxuixTbiPB8?si=JYaTuOjjSsjxTmOB", 
    status: "recorded"
  },
  {
    title: "El Espíritu Nómada: Rosalía la Hereje",
    subtitle: "Live de Sagrada Ciencia sobre el disco Lux. Un canto gitano.",
    description: "El espíritu nómada de los gitanos.",
    image: "/nomada.jpg", 
    youtubeUrl: "https://youtu.be/Kk78YWbacMM",
    status: "recorded"
  },
  {
    title: "I Ching Sagrado",
    subtitle: "Oráculo milenario para tiempos modernos. Un camino del autoconocimiento.",
    description: "Sabiduría ancestral para tiempos modernos.",
    image: "/iching.jpg", 
    youtubeUrl: null,
    status: "coming_soon"
  }
];

const WORKSHOPS = [
  { 
    title: "Poesía: ritmo y pensamiento", 
    date: "Marzo 2026",
    description: "La poesía es una forma de pensar desde el ritmo. No solo pensamiento, sino un ritmo que abarca la respiración, el cuerpo y el pensamiento."
  },
  { 
    title: "Taller de Sueños Lúcidos", 
    date: "Mayo 2026",
    description: "El arte del soñar es una práctica que nos beneficia enormemente y que hacemos a diario. Aprenderemos los diferentes niveles de sueño y además la visión dentro del sueño."
  },
  { 
    title: "Círculo de I Ching", 
    date: "Próximamente",
    description: "El I Ching es una herramienta poderosa de autoconocimiento. Es poesía, alquimia y misticismo lleno de simbolismo."
  }
];

const TESTIMONIALS = [
  { text: "El live estuvo increíble. Me gustó mucho el desarrollo y la forma en que conectaron todos los puntos. Lo escuché mientras cocinaba, es muy fácil de seguir.", author: "María Elena" },
  { text: "La profundidad justa sin perderse en detalles innecesarios. Una conversación que despierta la curiosidad por investigar más sobre cada cultura por cuenta propia.", author: "Ider Guerrero" },
  { text: "Excelente el contenido y la manera en que fue analizado. Me encantaron las referencias a los libros y cómo conectaron todos los temas.", author: "Andrea Ruiz" },
  { text: "Me gustó mucho cómo fue desarrollado, la manera en que conectaron las ideas. El análisis resultó impecable y el desarrollo de la información fue muy apreciado.", author: "Sofía Mendoza" },
  { text: "Una conversación amena que se puede seguir sin dificultad ni tedio. Las invitadas hablan muy bien y es genial que sea participativo.", author: "Camila Herrera" },
  { text: "La cantidad de información variada de diferentes culturas con la profundidad justa. Se genera la curiosidad por investigar más el detalle de cada cultura.", author: "Ider Guerrero" },
  { text: "El desarrollo me gustó, la parte de los libros, cómo los conectaron. Me gustó bastante el análisis completo.", author: "María Elena" }
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
    return <a href={href} className={combinedClasses} target={href.startsWith('http') ? "_blank" : "_self"} rel={href.startsWith('http') ? "noopener noreferrer" : undefined} {...props}>{children}</a>;
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

const LiveCard = ({ title, subtitle, image, youtubeUrl, status, delay }) => {
  const isLive = status === "live";
  const isRecorded = status === "recorded";

  return (
    <FadeIn delay={delay} className="group flex flex-col h-full bg-white/95 backdrop-blur-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 border border-stone-100/50 hover:border-stone-200 rounded-lg overflow-hidden">
      
      {/* Contenedor de Imagen (Formato Vertical 3:4) */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 transition-all duration-700 group-hover:from-black/10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Play Button */}
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

        <div className="absolute top-4 left-4 z-20">
          <span className={cn(
            "px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-white backdrop-blur-md rounded-full shadow-lg",
            isLive ? "bg-gradient-to-r from-red-500 to-red-600 animate-pulse" : "bg-gradient-to-r from-stone-500 to-stone-600"
          )}>
            {status === "live" ? "En Vivo" : status === "recorded" ? "Grabado" : "Próximamente"}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-8 text-center bg-gradient-to-b from-white to-stone-50/50">
        <h3 className="font-serif text-2xl font-medium mb-4 text-stone-900 leading-tight group-hover:text-stone-700 transition-colors">{title}</h3>
        <p className="text-stone-500 text-[10px] uppercase tracking-[2px] font-medium mb-8 opacity-80">{subtitle}</p>
        
        <div className="mt-auto">
          <Button 
            primary={isLive || isRecorded} 
            disabled={status === "coming_soon"} 
            href={(isLive || isRecorded) ? youtubeUrl : undefined}
            className={cn(
              "w-full transition-all duration-300", 
              (isLive || isRecorded) ? "shadow-lg hover:shadow-xl" : "bg-gradient-to-r from-stone-100 to-stone-50 border-stone-200 text-stone-400"
            )}
          >
            {status === "live" ? "Ver Transmisión" : status === "recorded" ? "Ver Grabación" : "Próximamente"}
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};

const WorkshopItem = ({ title, date, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 group hover:border-stone-900 transition-colors duration-300">
      <div 
        className="flex justify-between items-center py-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-serif text-xl text-stone-500 group-hover:text-stone-900 transition-colors">{title}</h4>
        <span className="text-xs uppercase font-bold tracking-widest text-stone-400 group-hover:text-stone-600">{date}</span>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-0">
              <p className="text-stone-500 leading-relaxed font-normal">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Newsletter = () => {
  const [status, setStatus] = useState("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      console.log('API Key:', process.env.REACT_APP_BREVO_API_KEY ? 'Present' : 'Missing');
      
      const response = await axios.post('https://api.brevo.com/v3/contacts', {
        email: email,
        listIds: [4],
        updateEnabled: true
      }, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.REACT_APP_BREVO_API_KEY
        }
      });
      
      console.log('Success:', response.data);
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error.response?.data || error.message);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 text-center">
      <h3 className="font-serif text-4xl md:text-5xl mb-8 text-white">Suscríbete a la Sabiduría</h3>
      <p className="text-stone-300 mb-12 font-light text-base md:text-lg leading-relaxed max-w-lg mx-auto">
        Recibe avisos de nuevos lives, artículos y reflexiones.<br/>
        Solo contenido esencial, sin ruido digital.
      </p>
      
      {status === "success" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 text-white font-serif italic text-lg rounded-lg shadow-2xl"
        >
          Gracias. Tu viaje ha comenzado.
        </motion.div>
      ) : status === "error" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 backdrop-blur-sm p-8 border border-red-500/20 text-white font-serif italic text-lg rounded-lg shadow-2xl"
        >
          Error al suscribirse. Inténtalo de nuevo.
        </motion.div>
      ) : (
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-stretch gap-0">
              <input
                type="email"
                placeholder="sabiduria@sagradaciencia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 px-6 py-4 bg-transparent text-white placeholder-stone-400 focus:placeholder-stone-300 outline-none transition-all duration-300 text-center sm:text-left disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md sm:rounded-l-none sm:rounded-r-md mt-2 sm:mt-0 shadow-lg hover:shadow-xl"
              >
                {status === "loading" ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const BlogPosts = () => {
  // Datos estáticos mientras no hay Ghost
  const posts = [];
  const loading = false;
  const error = null;

  const getBadgeColor = (category) => {
    if (category === 'El poeta jardinero') return 'bg-transparent border-amber-600 text-amber-600';
    if (category === 'Enredadera del sueño') return 'bg-transparent border-blue-600 text-blue-600';
    if (category === 'La fragua cósmica') return 'bg-transparent border-orange-600 text-orange-600';
    if (category === 'La casa del jardín') return 'bg-transparent border-emerald-600 text-emerald-600';
    return 'bg-transparent border-purple-600 text-purple-600';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="bg-stone-200 h-48 rounded-lg mb-6"></div>
            <div className="bg-stone-200 h-4 rounded mb-3 w-24"></div>
            <div className="bg-stone-200 h-6 rounded mb-3"></div>
            <div className="bg-stone-200 h-4 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-500">Error cargando artículos: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {posts.slice(0, 3).map((post, idx) => (
        <FadeIn key={post.slug} delay={idx * 0.2}>
          <a href={`/articulo/${post.slug}`} className="block group cursor-pointer">
            <div className="aspect-w-16 aspect-h-9 bg-stone-100 mb-6 overflow-hidden rounded-lg">
              <img 
                src={post.image || '/placeholder.jpg'} 
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <span className={`inline-block text-[10px] uppercase font-bold tracking-widest mb-3 px-3 py-1.5 rounded-full border-2 ${getBadgeColor(post.category)}`}>
              {post.category}
            </span>
            <h3 className="font-serif text-2xl mb-3 text-stone-900 group-hover:underline decoration-1 underline-offset-4">
              {post.title}
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </a>
        </FadeIn>
      ))}
    </div>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const getVisibleTestimonials = () => {
    const testimonials = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % TESTIMONIALS.length;
      testimonials.push({ ...TESTIMONIALS[index], key: `${currentIndex}-${i}` });
    }
    return testimonials;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {getVisibleTestimonials().map((testimonial, idx) => (
          <motion.div
            key={testimonial.key}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeInOut" }}
            className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm text-center md:text-left"
          >
            <p className="font-serif text-lg md:text-xl text-stone-700 mb-6 leading-relaxed">
              {testimonial.text}
            </p>
            <p className="text-sm font-bold uppercase tracking-widest text-stone-400">
              — {testimonial.author}
            </p>
          </motion.div>
        ))}
      </div>
      
      {/* Indicadores */}
      <div className="flex justify-center mt-12 gap-2">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              idx === currentIndex ? "bg-stone-900 w-8" : "bg-stone-300 hover:bg-stone-400"
            )}
          />
        ))}
      </div>
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
        {/* HERO SECTION */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-black">
          
          <motion.div 
            style={{ y: y1 }} 
            className="absolute inset-0 z-0"
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
          >
            <img
              src="https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2066&auto=format&fit=crop"
              alt="Cosmos"
              className="w-full h-[120%] object-cover opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-900/10 to-transparent" />
          </motion.div>

          <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mt-16">
            <FadeIn>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-100 to-stone-300 drop-shadow-2xl">
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
              <h2 className="text-lg md:text-xl font-light tracking-[0.3em] text-stone-200/90 max-w-2xl mx-auto mb-12 uppercase backdrop-blur-sm">
                Jardín Cósmico de Sabiduría Ancestral
              </h2>
            </FadeIn>

            <FadeIn delay={0.6} className="flex justify-center gap-6">
              <Button href="#lives" className="border-white/50 text-white hover:bg-white hover:text-stone-900 backdrop-blur-md bg-white/5 shadow-2xl">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {LIVES_DATA.map((live, idx) => (
                <LiveCard key={live.title} {...live} delay={idx * 0.2} />
              ))}
            </div>
          </div>
        </section>

        {/* NOSOTROS SECTION */}
        <section id="nosotros" className="py-40 px-6 bg-gradient-to-b from-stone-50 via-white to-stone-50">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">Nuestro Propósito</span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-stone-800 leading-[1.2] font-light mb-16 max-w-4xl mx-auto">
                Creamos <span className="text-stone-900 font-medium">arte, poesía y misticismo</span>. Embellecemos el mundo.
              </h2>
              <div className="mt-16">
                <Button href="#" primary className="border-stone-900 bg-transparent text-stone-900 hover:bg-stone-900 hover:text-white shadow-lg hover:shadow-xl">
                  Conoce nuestra historia
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* TALLERES */}
        <section id="talleres" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h3 className="font-serif text-3xl mb-12 text-center text-stone-900">Próximos Talleres</h3>
              <div className="flex flex-col">
                {WORKSHOPS.map((workshop) => (
                  <WorkshopItem key={workshop.title} title={workshop.title} date={workshop.date} description={workshop.description} />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FRASE INSPIRACIÓN */}
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
              <a href="/bitacora" className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-stone-600 flex items-center gap-2 group">
                Ver archivo <span className="transition-transform group-hover:translate-x-1"><Icons.ArrowRight /></span>
              </a>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Sueños, íncubus y súcubus", tag: "Enredadera del sueño", excerpt: "En las fronteras del sueño habitan seres que danzan entre el deseo y el terror. Exploramos los encuentros eróticos y sombríos del mundo onírico.", image: "/sucubusincubus.jpg" },
                { title: "Lux de Rosalía: una mística barroca y gitana", tag: "El poeta jardinero", excerpt: "Entre flamenco y misterio, Rosalía teje versos que abrazan lo sagrado y lo profano. Un análisis poético de su universo artístico.", image: "/luxderosalia.jpg" },
                { title: "Soñar con serpientes", tag: "Enredadera del sueño", excerpt: "Cuando las serpientes aparecen en nuestros sueños, nos susurran secretos de transformación. Descifra los símbolos de la sabiduría reptil.", image: "/sonarconserpientes.jpg" }
              ].map((post, idx) => {
                const slugs = ['suenos-incubus-sucubus', 'lux-rosalia-mistica-barroca', 'sonar-con-serpientes'];
                const getBadgeColor = (tag) => {
                  if (tag === 'El poeta jardinero') return 'bg-transparent border-amber-600 text-amber-600';
                  if (tag === 'Enredadera del sueño') return 'bg-transparent border-blue-600 text-blue-600';
                  if (tag === 'La fragua cósmica') return 'bg-transparent border-orange-600 text-orange-600';
                  if (tag === 'La casa del jardín') return 'bg-transparent border-emerald-600 text-emerald-600';
                  return 'bg-transparent border-purple-600 text-purple-600';
                };
                return (
                <FadeIn key={idx} delay={idx * 0.2}>
                  <a href={`/bitacora/${slugs[idx]}`} className="block group cursor-pointer">
                    <div className="aspect-w-16 aspect-h-9 bg-stone-100 mb-6 overflow-hidden rounded-lg">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className={`inline-block text-[10px] uppercase font-bold tracking-widest mb-3 px-3 py-1.5 rounded-full border-2 ${getBadgeColor(post.tag)}`}>{post.tag}</span>
                    <h3 className="font-serif text-2xl mb-3 text-stone-900 group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{post.excerpt}</p>
                  </a>
                </FadeIn>
              )})}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-24 px-6 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-center font-serif text-3xl mb-16 text-stone-900">Resonancias</h3>
            <TestimonialCarousel />
          </div>
        </section>

        {/* SOCIAL GRID & INTEGRACIÓN INSTAGRAM */}
        <section className="py-32 px-6 bg-gradient-to-b from-white to-stone-50 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <FadeIn>
              <h3 className="font-serif text-3xl mb-4 text-stone-900">Comunidad</h3>
              <a 
                href="https://www.instagram.com/sagrada_ciencia/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 mb-16 inline-block transition-colors duration-300"
              >
                @sagrada_ciencia
              </a>
              
              {/* Elfsight Instagram Feed */}
              <div className="mt-12">
                <InstagramFeed />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER & NEWSLETTER */}
        <footer id="contacto" className="bg-gradient-to-b from-stone-900 to-black text-white">
          <div className="py-32 border-b border-stone-800/50">
            <Newsletter />
          </div>
          
          <div className="max-w-7xl mx-auto py-16 px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="font-serif text-3xl font-bold tracking-[0.3em] mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-300">SC.</p>
              <p className="text-stone-400 text-sm font-light">© {new Date().getFullYear()} Sagrada Ciencia. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10 text-sm font-bold uppercase tracking-[0.2em] text-stone-400">
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-all duration-300 hover:scale-105"
                >
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