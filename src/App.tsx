import favicon from "./Components/logoinicial.svg";
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Code, Briefcase, User, Coffee, Star, ExternalLink, Quote, Download, Phone, ArrowUp, MessageCirclePlus, MessageSquarePlus  } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin,  PenLine, Send } from 'lucide-react';
import ssctt from './Components/ssctt.png';
import rtpsancristobal from './Components/rtpsancristobal.png';
import iconcustomer from './Components/iconcustomer.png';
import logo from './Components/logofjpsblanco.svg';

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
      image: ssctt,
      tech: ["WordPress", "WooComercee", "PHP"],
      featured: true
    },
    {
      title: "Portal de RTP San Cristóbal",
      description:"Web enfocada en la empresa RTP San Cristóbal, con un diseño moderno y funcionalidad intuitiva",
      image: rtpsancristobal,
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
      image: iconcustomer,
      content: "Un desarrollador excepcional. Su atención al detalle y creatividad son incomparables."
    },
    {
      name: "Carlos Quispe",
      role: "Gerente General, Grupo San Cristóbal",
      image: iconcustomer,
      content: "La capacidad para resolver problemas complejos y entregar soluciones precisas ha sido fundamental para nuestro éxito."
    },
    {
      name: "Roman Reto",
      role: "Fundador, SparkTree Studio",
      image: iconcustomer,
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

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs
        .sendForm(
          'service_c3una4u',
          'template_y298wbg',
          formRef.current,
          '2MchvJgHDYx7pv3Qg'
        )
        .then(
          () => {
            setIsSent(true);
            formRef.current?.reset();
            setTimeout(() => setIsSent(false), 5000);
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
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 
          w-[95%] max-w-7xl mx-auto px-4 py-2 mt-4
          rounded-3xl 
          border-2 transition-all duration-300 ease-out 
          ${isScrolled ? 'bg-slate-900 border-cyan-300' : 'bg-slate-800/20 border-gray-800'} 
          hover:border-cyan-500 
          hover:shadow-[0_0_15px_2px_rgba(34,211,238,0.7)] 
          hover:shadow-cyan-400/50 
          backdrop-blur-lg 
          shadow-xl`}
      >
        <div className="w-full flex items-center justify-between h-12">
          <div className="flex items-center space-x-2">
            <motion.img
              src={logo}
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

          <motion.div 
            className="hidden md:flex items-center justify-center flex-1 max-w-3xl mx-auto"
            style={{ fontFamily: "'Audiowide', sans-serif" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3 }
            }}
          >
            <div className="flex items-center justify-center gap-2 lg:gap-4">
              <NavLink href="#home" active={activeSection === 'home'}>Inicio</NavLink>
              <NavLink href="#about" active={activeSection === 'about'}>Sobre Mí</NavLink>
              <NavLink href="#projects" active={activeSection === 'projects'}>Proyectos</NavLink>
              <NavLink href="#testimonials" active={activeSection === 'testimonials'}>Testimonios</NavLink>
              <NavLink href="#contact" active={activeSection === 'contact'}>Contacto</NavLink>
            </div>
          </motion.div>

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

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-2"
            >
              <div className="px-2 py-2 space-y-1">
                {['home', 'about', 'projects', 'testimonials', 'contact'].map((section) => (
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

      {/* Rest of the components remain unchanged */}
    </div>
  );
}

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