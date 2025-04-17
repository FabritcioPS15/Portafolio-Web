import favicon from "src/Components/logoinicial.svg";
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Code, Briefcase, User, Coffee, Star, ExternalLink, Quote, Download, Phone, ArrowUp, MessageCirclePlus, MessageSquarePlus  } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Twitter, MessageSquare, PenLine, Send } from 'lucide-react';
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiDocker, 
  SiSupabase, 
  SiMongodb, 
  SiMysql 
} from 'react-icons/si';
import emailjs from '@emailjs/browser';

const NeonCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        positionRef.current = { x: e.clientX, y: e.clientY };
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        addParticle(e.clientX, e.clientY);
      }
    };

    const addParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      document.body.appendChild(particle);
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      particlesRef.current.push(particle);
      
      setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
      }, 10);
      
      setTimeout(() => {
        particle.remove();
        particlesRef.current = particlesRef.current.filter(p => p !== particle);
      }, 1000);
    };

    const handleHover = () => {
      cursorRef.current?.classList.add('hover-effect');
    };

    const handleHoverEnd = () => {
      cursorRef.current?.classList.remove('hover-effect');
    };

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [data-cursor-hover]'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      particlesRef.current.forEach(particle => particle.remove());
    };
  }, []);

  return <div className="cursor-neon" ref={cursorRef} />;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });

      setIsScrolled(window.scrollY > 50);
      setShowScrollArrow(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const projects = [
    {
      title: "Portal de TalenThree",
      description: "TalentThre es una plataforma web enfocada en ofrecer servicios de asesoría y capacitación online. A través de un entorno accesible y profesional, brindamos cursos especializados y acompañamiento personalizado, diseñados para fortalecer las habilidades y competencias de nuestros usuarios, impulsando su desarrollo personal y profesional.",
      image: "src/Components/ssctt.png",
      tech: ["WordPress", "WooComercee", "PHP"],
      featured: true
    },
    {
      title: "Portal de RTP San Cristóbal",
      description:"Web enfocada en la empresa RTP San Cristóbal, con un diseño moderno y funcionalidad intuitiva",
      image: "src/Components/rtpsancristobal.png",
      tech: ["JavaScript", "HTML", "CSS","Python"],
      featured: true
    },
    {
      title: "Gestor de Asistencia y Nóminas",
      description: "Sistema de gestión de asistencia y nóminas para empresas, con reportes y análisis de datos",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      tech: ["React","TypeScript", "Firebase","Node.js","TailwindCSS"],
      featured: false
    }
  ];

  const testimonials = [
    {
      name: "José Zelada",
      role: "Socio, TalentThree",
      image: "src/Components/iconcustomer.png",
      content: "Un desarrollador excepcional. Su atención al detalle y creatividad son incomparables."
    },
    {
      name: "Carlos Quispe",
      role: "Gerente General, Grupo San Cristóbal",
      image: "src/Components/iconcustomer.png",
      content: "La capacidad para resolver problemas complejos y entregar soluciones precisas ha sido fundamental para nuestro éxito."
    },
    {
      name: "Roman Reto",
      role: "Fundador, SparkTree Studio",
      image: "src/Components/iconcustomer.png",
      content: "Un profesional que combina perfectamente habilidades técnicas con una excelente capacidad de comunicación."
    }
  ];

  const handleDownloadCV = () => {
    const cvUrl = '/path-to-your-cv.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'FabritcioPeña-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  // Removed unused handleWhatsApp function

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs
        .sendForm(
          'service_c3una4u', // Reemplaza con tu Service ID
          'template_y298wbg', // Reemplaza con tu Template ID
          formRef.current,
          '2MchvJgHDYx7pv3Qg' // Reemplaza con tu Public Key
        )
        .then(
          () => {
            setIsSent(true); // Mostrar mensaje de confirmación
            formRef.current?.reset(); // Limpiar el formulario
            setTimeout(() => setIsSent(false), 5000); // Ocultar mensaje después de 5 segundos
          },
          (error) => {
            console.error('Error al enviar el mensaje:', error);
          }
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <NeonCursor />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(45,212,191,0.1),transparent_70%)]"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-400/20"
            style={{
              width: Math.random() * 5 + 2 + 'px',
              height: Math.random() * 5 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
  initial={{ y: -100, opacity: 0 }}
  animate={{ 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }}
  className={`fixed top-3 left-6 -translate-x-1/2 z-50  
    w-[90%] max-w-6xl px-4 py-1  
    rounded-3xl  
    border-2 transition-all duration-300 ease-out  
    ${isScrolled ? 'bg-slate-900 border-cyan-300' : 'bg-slate-800/20 border-gray-800'}  
    hover:border-cyan-500  
    hover:shadow-[0_0_15px_2px_rgba(34,211,238,0.7)]  
    hover:shadow-cyan-400/50  
    backdrop-blur-lg  
    shadow-xl sm:w-[95%] sm:px-3 sm:py-2 sm:top-2 sm:left-90 lg:w-[90%] lg:px-2 lg:py-1 lg:top-4 lg:left-20`}

>
  
  <div className="w-full flex items-center justify-between h-12">
    <div className="flex items-center space-x-2">
      {/* Logo más pequeño */}
      <motion.img
        src="src/Components/logofjpsblanco.svg"
        alt="Logo"
        className="h-6 w-6 md:h-8 md:w-8 object-contain"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: 1, 
            scale: 1.1,
            filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))"
        }}
        whileHover={{ 
            scale: 1.3,
            rotate: [0, 5, -5, 0],
            filter: [
                "drop-shadow(0 0 2px #ffffff)",
                "drop-shadow(0 0 5px #ffffff)"
            ]
        }}
        transition={{
            opacity: { duration: 0.5 },
            scale: { type: "spring", stiffness: 300, damping: 10 },
            rotate: { duration: 0.5 }
        }}
      />

      {/* Texto PORTFOLIO más compacto */}
      <motion.div
        className="text-xl md:text-2xl text-transparent cursor-pointer select-none"
        style={{
          fontFamily: "'Audiowide', sans-serif",
          letterSpacing: "0.1em",
          background: "linear-gradient(90deg, #00F0FF 0%, #00FF6C 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          textShadow: "0 0 8px rgba(0, 240, 255, 0.4)",
          fontWeight: 400
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.03,
          letterSpacing: "0.12em"
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10
        }}
      >
        PORTFOLIO
      </motion.div>
    </div>

    {/* Menú Desktop más compacto */}
    <motion.div 
      className="hidden md:block"
      style={{ fontFamily: "'Audiowide', sans-serif" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: 0.3 }
      }}
    >
      <div className="flex items-center gap-4">
        <NavLink href="#home" active={activeSection === 'home'}>Inicio</NavLink>
        <NavLink href="#about" active={activeSection === 'about'}>Sobre Mí</NavLink>
        <NavLink href="#projects" active={activeSection === 'projects'}>Proyectos</NavLink>
        <NavLink href="#testimonials" active={activeSection === 'testimonials'}>Testimonios</NavLink>
        <NavLink href="#contact" active={activeSection === 'contact'}>Contacto</NavLink>
      </div>
    </motion.div>

    {/* Botón menú móvil */}
    <div className="md:hidden">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-300 hover:text-white transition-colors"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>
    </div>
  </div>

  {/* Menú móvil más compacto */}
  <AnimatePresence>
    {isMenuOpen && (
      <motion.div 
        initial={{ opacity: 0, height: 0, y: -20 }}
        style={{ fontFamily: "'Audiowide', sans-serif" }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden glass-card overflow-hidden"
      >
        <div className="px-2 pt-1 pb-2 space-y-1">
          {['home', 'about', 'projects','testimonials', 'contact'].map((section) => (
            <motion.a
              key={section}
              href={`#${section}`}
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ x: 5, backgroundColor: 'rgba(73, 170, 157, 0.1)' }}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === section 
                  ? 'text-teal-400 bg-slate-700/50' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              {section === 'home' && 'Inicio'}
              {section === 'about' && 'Sobre Mí'}
              {section === 'projects' && 'Proyectos'}
              {section === 'testimonials' && 'Testimonios'}
              {section === 'contact' && 'Contacto'}
            </motion.a>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.nav>

      {/* Hero Section */}
{/* Hero Section */}
<section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20">
  <div className="text-center z-10 px-4 w-full max-w-6xl">
    {/* Floating name tag - ajustado para móvil */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="inline-flex items-center gap-2 px-2 py-1 md:px-6 md:py-2 bg-slate-800/50 border border-teal-400/30 rounded-full mb-4 md:mb-6"
    >
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-teal-400"
      />
      <span className="text-teal-400 text-xs md:text-sm font-mono">Disponible para nuevos proyectos</span>
    </motion.div>
    
    <motion.h1 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ fontFamily: "'Audiowide', sans-serif" }}
      className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 gradient-text"
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 block">Fabritcio Peña Sandoval</span>
      <span className="text-lg md:text-2xl font-normal text-gray-300 mt-2 md:mt-4 block">Desarrollador Full-Stack & Diseñador UI/UX</span>
    </motion.h1>
    
    <motion.div
      initial={{ opacity: 1 }}
      style={{ fontFamily: "'Audiowide', sans-serif" }}
      className="text-base md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto overflow-hidden"
    >
      <motion.p className="mb-4 md:mb-6">
        {"Construyendo experiencias digitales impactantes con código limpio y diseño intuitivo.".split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.1,
              delay: index * 0.03,
              ease: "easeOut"
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
    
    {/* Tech stack floating badges - más compacto en móvil */}
    <motion.div 
      className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      {['HTML','React', 'PHP','TypeScript', 'Node.js', 'Python', 'Docker', 'CSS','WordPress'].map((tech, i) => (
        <motion.div
          key={tech}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 + i * 0.1 }}
          whileHover={{ y: -5 }}
          className="px-2 py-1 md:px-3 md:py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs md:text-sm flex items-center gap-1 md:gap-2"
        >
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-teal-400 animate-pulse" />
          {tech}
        </motion.div>
      ))}
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ fontFamily: "'Audiowide', sans-serif" }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col items-center gap-4 md:gap-4"
    >
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <SocialLink href="https://github.com/FabritcioPS15" icon={<Github size={24} className="md:size-7" />} label="GitHub" />
        <SocialLink href="https://www.linkedin.com/in/fabritciops15/" icon={<Linkedin size={24} className="md:size-7" />} label="LinkedIn" />
        <SocialLink href="mailto:fabpsandoval@gmail.com" icon={<Mail size={24} className="md:size-7" />} label="Email" />
      </div>
      <div></div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          style={{ fontFamily: "'Audiowide', sans-serif" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadCV}
          className="flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg shadow-teal-400/20 text-sm md:text-base"
        >
          <Download size={20} className="md:size-6" />
          <span>Descargar CV</span>
        </motion.button>
        
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 md:gap-2 px-4 py-2 md:px-4 md:py-1 border border-teal-400 text-teal-400 hover:bg-teal-400/10 rounded-full transition-all duration-300 text-sm md:text-base"
        >
          <Code size={20} className="md:size-6" />
          <span>Ver Proyectos</span>
        </motion.a>
      </div>
    </motion.div>

  </div>
<div></div>
  {/* Floating elements */}
  <motion.div 
    className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-teal-400/10 blur-xl"
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
  
  <motion.div 
    className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-blue-400/10 blur-xl"
    animate={{
      y: [0, -40, 0],
      x: [0, -20, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }}
  />
  
  {/* Animated scroll indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3 }}
    className="hidden md:flex fixed bottom-14 sm:bottom-2 left-1/2 -translate-x-1/2 flex-col items-center"
    
>
    <motion.div
      animate={{ 
        y: [0, 10, 0],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="text-gray-400 mb-1"
    >
      <ChevronDown size={10} />
    </motion.div>
    <span className="text-xs text-gray-500">Desplázate</span>
  </motion.div>
</section>

      {/* Floating Scroll Arrow */}
      <AnimatePresence>
        {showScrollArrow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4 }
            }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-8 bottom-8 z-40"
          >
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('home');
                if (target) {
                  window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                  });
                  
                  target.style.opacity = '0';
                  target.animate(
                    [{ opacity: 0 }, { opacity: 1 }],
                    {
                      duration: 600,
                      easing: 'ease-in-out'
                    }
                  ).onfinish = () => {
                    target.style.opacity = '';
                  };
                }
              }}
              className="flex items-center justify-center w-12 h-8 rounded-full bg-teal-400 text-white shadow-lg hover:bg-teal-500 transition-all duration-300"
              style={{
                boxShadow: '0 0 15px rgba(45, 212, 191, 0.5)'
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <ArrowUp 
                size={24} 
                className={`transform transition-transform duration-300 ${activeSection === 'home' ? 'rotate-180' : 'rotate-0'}`}
              />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section id="about" className="py-32 relative" style={{ fontFamily: "'Audiowide', sans-serif" }}>        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle>Sobre Mí</SectionTitle>
          
          {/* Personal Info */}
          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              style={{ fontFamily: "'Audiowide', sans-serif" }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-teal-400">¡Hola! Soy Fabritcio Peña</h3>
              <p className="text-gray-300 leading-relaxed">
                Con más de 1 año de experiencia en desarrollo web, me apasiona crear experiencias digitales únicas y soluciones tecnológicas innovadoras. Siempre estoy en constante evolución, aprendiendo nuevas tecnologías y mejorando mis habilidades.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Mi enfoque se centra en crear productos que no solo cumplan con los requisitos técnicos, sino que también proporcionen una experiencia excepcional al usuario.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  {name: 'HTML5', icon: <SiHtml5 className="text-3xl"/>},
                  {name: 'CSS', icon: <SiCss3 className="text-3xl"/>},
                  {name: 'JavaScript', icon: <SiJavascript className="text-3xl"/>},
                  {name: 'TypeScript', icon: <SiTypescript className="text-3xl"/>},
                  {name: 'React', icon: <SiReact className="text-3xl"/>},
                  {name: 'Node.js', icon: <SiNodedotjs className="text-3xl"/>},
                  {name: 'Python', icon: <SiPython className="text-3xl"/>},
                  {name: 'Docker', icon: <SiDocker className="text-3xl"/>},
                  {name: 'Supabase', icon: <SiSupabase className="text-3xl"/>},
                  {name: 'MongoDB', icon: <SiMongodb className="text-3xl"/>},
                  {name: 'MySQL', icon: <SiMysql className="text-2xl"/>}
                ].map((skill) => (
                  <motion.div 
                    key={skill.name}
                    className="group relative" 
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-slate-800 text-teal-300 text-xs px-2 py-1 rounded whitespace-nowrap">
                      {skill.name}
                    </div>
                    
                    <motion.div 
                      whileHover={{ y: -5, rotateZ: 2, shadow: "0 10px 20px rgba(94, 234, 212, 0.2)" }}
                      className="px-6 py-3 bg-gradient-to-br from-slate-700/50 to-slate-800/70 rounded-xl text-teal-400 border-t border-teal-400/10 shadow-lg"
                    >
                      {React.cloneElement(skill.icon, { className: "text-2xl" })}
                      <div className="absolute inset-0 border border-teal-400/10 rounded-xl pointer-events-none" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative glass-card rounded-lg p-8 hover:shadow-lg hover:shadow-teal-400/20 transition-all duration-500">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "1+", label: "Año de Experiencia" },
                    { value: "50+", label: "Proyectos Completados" },
                    { value: "6+", label: "Clientes Satisfechos" },
                    { value: "4+", label: "Webs Activas" }
                  ].map((item, index) => (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      key={index}
                      className="text-center p-4 hover:bg-slate-700/30 rounded-lg transition-all duration-300"
                    >
                      <div className="text-4xl font-bold text-teal-400 mb-2">{item.value}</div>
                      <div className="text-sm text-gray-300">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills & Services */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="text-teal-400" size={32} />}
              title="Desarrollo"
              description="Especializado en crear aplicaciones web y móviles modernas y responsivas con las últimas tecnologías"
            />
            <FeatureCard
              icon={<Briefcase className="text-teal-400" size={32} />}
              title="Experiencia"
              description="Más de 1 año trabajando con tecnologías web de última generación y soluciones empresariales"
            />
            <FeatureCard
              icon={<Coffee className="text-teal-400" size={32} />}
              title="Pasión"
              description="Comprometido con la excelencia, la innovación y el aprendizaje continuo en desarrollo web"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-40 relative" style={{ fontFamily: "'Audiowide', sans-serif" }}> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle>Proyectos Destacados</SectionTitle>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 relative" style={{ fontFamily: "'Audiowide', sans-serif" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle>Testimonios</SectionTitle>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative" style={{ fontFamily: "'Audiowide', sans-serif" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle>Contáctame</SectionTitle>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 hover:shadow-lg hover:shadow-teal-400/20 transition-all duration-500"
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-teal-400">Información de Contacto</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg transition-all duration-300"
                  >
                    <div className="p-3 bg-teal-400/10 rounded-full">
                      <Mail className="text-teal-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Correo electrónico</p>
                      <a href="mailto:fabpsandoval@gmail.com" className="text-white hover:text-teal-400 transition-colors">
                        fabpsandoval@gmail.com
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg transition-all duration-300"
                  >
                    <div className="p-3 bg-teal-400/10 rounded-full">
                      <Phone className="text-teal-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Teléfono / WhatsApp</p>
                      <a href="tel:+51958077827" className="text-white hover:text-teal-400 transition-colors">
                        +51 958 077 827
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg transition-all duration-300"
                  >
                    <div className="p-3 bg-teal-400/10 rounded-full">
                      <MapPin className="text-teal-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Ubicación</p>
                      <p className="text-white">Lima, Perú</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="pt-4">
                  <h4 className="text-lg font-medium text-gray-300 mb-4">Redes Sociales</h4>
                  <div className="flex gap-4">
                    <SocialLink 
                      href="https://github.com/FabritcioPS15" 
                      icon={<Github />} 
                      label="GitHub"
                      className="bg-slate-700/50 hover:bg-gray-900/50"
                    />
                    <SocialLink 
                      href="https://www.linkedin.com/in/fabritciops15/" 
                      icon={<Linkedin />} 
                      label="LinkedIn"
                      className="bg-slate-700/50 hover:bg-cyan-700/50"
                    />
                    <SocialLink 
                    href="https://wa.me/51958077822?text=Hola%20estoy%20interesado%20en%20tus%20servicios,%20%C2%BFpodemos%20hablar%20de%20un%20proyecto%20que%20tengo%20en%20mente%3F" 
                    icon={<MessageCirclePlus />} 
                    label="WhatsApp"
                    className="bg-slate-700/50 hover:bg-green-400/50"
                    />
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-teal-400">Envíame un correo</h3>
                
                <form ref={formRef} onSubmit={handleSendEmail} className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Nombre"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
                    />
                    <User className="absolute right-3 top-3.5 text-gray-400" size={18} />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
                    />
                    <Mail className="absolute right-3 top-3.5 text-gray-400" size={18} />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <textarea
                      name="message"
                      placeholder="Mensaje"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 resize-none"
                    ></textarea>
                    <PenLine className="absolute right-3 top-3.5 text-gray-400" size={18} />
                  </motion.div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-300"
                  >
                    <Send size={18} />
                    <span>Enviar Mensaje</span>
                  </motion.button>
                </form>
                {isSent && (
                  <div className="mt-4 text-center text-teal-400">
                    ¡Tu mensaje ha sido enviado con éxito!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Location Map */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 glass-card rounded-2xl overflow-hidden"
          >
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-700/50 relative z-10" style={{ fontFamily: "'Audiowide', sans-serif" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Fabritcio Peña. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* CSS for NeonCursor (inline style) */}
      <style jsx global>{`
      ::selection {
          background: rgba(45, 212, 191, 0.3); /* Teal color with transparency */
          color: #fff;
          text-shadow: 0 0 8px rgba(45, 212, 191, 0.5);
        }
        ::-moz-selection {
          background: rgba(45, 212, 191, 0.3);
          color: #fff;
          text-shadow: 0 0 8px rgba(45, 212, 191, 0.5);
        }
        body {
          cursor: none !important;
        }
        .cursor-neon {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(94, 234, 212, 0.5);
          box-shadow: 
            0 0 10px rgba(94, 234, 212, 0.8),
            0 0 20px rgba(94, 234, 212, 0.6),
            0 0 30px rgba(94, 234, 212, 0.4);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
          transition: transform 0.1s ease, background 0.3s ease;
        }
        .cursor-neon::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .cursor-neon.hover-effect {
          transform: translate(-50%, -50%) scale(1.5);
          background: rgba(59, 130, 246, 0.5);
          box-shadow: 
            0 0 15px rgba(59, 130, 246, 0.8),
            0 0 30px rgba(246, 234, 59, 0.6),
            0 0 45px rgba(25, 30, 37, 0.4);
        }
        .cursor-particle {
          position: fixed;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(94, 234, 212, 0.7);
          pointer-events: none;
          z-index: 9998;
          transition: all 0.5s ease-out;
          box-shadow: 0 0 5px rgba(94, 234, 212, 0.8);
        }
          .cursor-click-effect {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid rgba(94, 234, 212, 0.8);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  box-shadow: 0 0 15px rgba(94, 234, 212, 0.5);
}

.cursor-click-effect.active {
  transform: translate(-50%, -50%) scale(3);
  opacity: 0;
}

.cursor-neon:active {
  transform: translate(-50%, -50%) scale(0.8);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 0 20px rgba(94, 234, 212, 0.9),
    0 0 40px rgba(94, 234, 212, 0.7),
    0 0 60px rgba(94, 234, 212, 0.5);
}
      `}</style>
    </div>
  );
}

// Component for navigation links
function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
        active
          ? 'text-teal-400 bg-slate-700/50 shadow-md shadow-teal-400/20'
          : 'text-gray-300 hover:text-teal-400 hover:bg-slate-700/30'
      }`}
    >
      {children}
    </motion.a>
  );
}

// Component for social media links
function SocialLink({ href, icon, label, className = '' }: { href: string; icon: React.ReactNode; label: string; className?: string }) {
  return (
    <motion.a
      whileHover={{ y: -5, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-4 rounded-full ${className || 'bg-slate-800/50 hover:bg-slate-700/50'} transition-all duration-300 group`}
      aria-label={label}
      style={{
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </motion.a>
  );
}

// Component for section titles
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-bold text-center gradient-text mb-4"
    >
      {children}
      <motion.div 
        className="mt-4 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mx-auto"
        initial={{ width: 0 }}
        whileInView={{ width: '100px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.h2>
  );
}

// Component for feature cards
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card rounded-xl p-8 hover-card hover:shadow-lg hover:shadow-teal-400/20 transition-all duration-500"
    >
      <div className="mb-6 transform transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-teal-400">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Component for project cards
function ProjectCard({ title, description, image, tech, featured, index }: { 
  title: string; 
  description: string; 
  image: string; 
  tech: string[]; 
  featured: boolean; 
  index: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card rounded-xl overflow-hidden hover-card group hover:shadow-lg hover:shadow-teal-400/20 transition-all duration-500"
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
        {featured && (
          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-teal-400/90 px-3 py-1 rounded-full">
            <Star size={14} />
            <span className="text-sm font-medium">Latest</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-teal-400">{title}</h3>
          <ExternalLink size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
        </div>
        <p className="text-gray-300 mb-6 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t, index) => (
            <motion.span
              whileHover={{ scale: 1.05 }}
              key={index}
              className="px-3 py-1 bg-slate-700/50 rounded-full text-sm font-medium text-teal-400"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Component for testimonial cards
function TestimonialCard({ name, role, image, content, index }: { 
  name: string; 
  role: string; 
  image: string; 
  content: string; 
  index: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card rounded-xl p-8 hover-card hover:shadow-lg hover:shadow-teal-400/20 transition-all duration-500"
    >
      <div className="flex items-start mb-6">
        <motion.img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
          whileHover={{ rotate: 5 }}
        />
        <div>
          <h3 className="text-lg font-semibold text-teal-400">{name}</h3>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 text-teal-400/20" size={24} />
        <p className="text-gray-300 leading-relaxed relative z-10">{content}</p>
      </div>
    </motion.div>
  );
}

export default App;