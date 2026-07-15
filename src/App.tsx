import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  FileText,
  Code2,
  Search,
  Award,
  BookOpen,
  GraduationCap,
  Calendar,
  Lock,
  Check,
  Copy,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Maximize2,
  ArrowUpRight
} from "lucide-react";
import { PORTFOLIO_DATA, Project } from "./portfolioData";

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Interactive Project Modal/Viewer State for Mini Search Engine
  const [searchEngineModalOpen, setSearchEngineModalOpen] = useState(false);
  
  // Clipboard Copy State
  const [copied, setCopied] = useState(false);

  // Monitor scroll for sticky navbar effect and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["about", "projects", "skills", "journey", "contact"];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation listener to close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchEngineModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scrolling when drawers/modals are active
  useEffect(() => {
    if (mobileMenuOpen || searchEngineModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, searchEngineModalOpen]);

  // Copy email utility
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-beige text-brand-charcoal selection:bg-brand-indigo font-sans flex flex-col antialiased relative">
      
      {/* Dynamic Drafting Grid Layout Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,29,31,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,29,31,0.025)_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none -z-10" />

      {/* STICKY FLOATING GLASS NAVBAR */}
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 pt-4 md:pt-6`}
      >
        <div 
          className={`max-w-6xl mx-auto rounded-2xl md:rounded-full border transition-all duration-300 px-6 py-3 flex items-center justify-between ${
            scrolled
              ? "bg-brand-beige/85 backdrop-blur-md border-brand-charcoal/15 shadow-md py-3"
              : "bg-white/40 backdrop-blur-xs border-brand-charcoal/5 py-4"
          }`}
        >
          <a
            href="#"
            className="group flex items-center gap-3 select-none"
            aria-label="Back to top"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-charcoal text-brand-beige font-display font-bold text-base flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
              PS
            </div>
            <div className="text-left">
              <span className="block font-display font-semibold text-xs md:text-sm tracking-tight leading-none text-brand-charcoal">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="block font-mono text-[9px] text-brand-charcoal/50 mt-0.5 tracking-wider uppercase font-medium">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-brand-charcoal/5 p-1 rounded-full border border-brand-charcoal/5">
            {[
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "journey", label: "Journey" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-brand-charcoal text-brand-beige shadow-xs"
                    : "text-brand-charcoal/70 hover:text-brand-charcoal hover:bg-brand-charcoal/5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTA Link */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-beige text-xs font-medium transition-all duration-200 shadow-sm"
              id="desktop-resume-cta"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>

          {/* Mobile Menu Open Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl hover:bg-brand-charcoal/5 text-brand-charcoal transition-colors duration-200"
            aria-expanded={mobileMenuOpen}
            aria-label="Open primary navigation menu"
            id="mobile-menu-trigger"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ACCESSIBLE MOBILE DRAWER NAV MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-charcoal z-50 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Side drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-brand-beige border-l border-brand-charcoal/15 z-50 p-6 flex flex-col justify-between shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-charcoal/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand-charcoal text-brand-beige font-display font-bold text-xs flex items-center justify-center">
                      PS
                    </div>
                    <span className="font-display font-semibold text-xs tracking-tight text-brand-charcoal uppercase">
                      Navigation
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-brand-charcoal/5 text-brand-charcoal"
                    aria-label="Close menu"
                    id="mobile-menu-close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {[
                    { id: "about", label: "About" },
                    { id: "projects", label: "Projects" },
                    { id: "skills", label: "Skills" },
                    { id: "journey", label: "Journey" },
                    { id: "contact", label: "Contact" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all ${
                        activeSection === item.id
                          ? "bg-brand-indigo text-brand-charcoal"
                          : "text-brand-charcoal/70 hover:bg-brand-charcoal/5"
                      }`}
                    >
                      {item.label}
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-brand-charcoal/10">
                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-beige text-xs font-semibold shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  Download Resume
                </a>

                {/* Email Address */}
                <div className="text-center font-mono text-[10px] text-brand-charcoal/50">
                  {PORTFOLIO_DATA.personal.email}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-24 md:pt-28">
        
        {/* HERO SECTION — Fully refined asymmetrical editorial design */}
        <section id="hero" className="relative py-8 md:py-16 lg:py-20 xl:py-24 overflow-hidden px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Hero text composition (Left on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5 md:space-y-6 text-left order-last lg:order-first">
              
              {/* Dynamic location and availability tag */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-indigo/50 text-brand-charcoal border border-brand-charcoal/10">
                  <MapPin className="w-3.5 h-3.5" />
                  {PORTFOLIO_DATA.personal.location}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {PORTFOLIO_DATA.personal.availability}
                </span>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-xs tracking-wider uppercase font-semibold text-brand-charcoal/60">
                  {PORTFOLIO_DATA.personal.title} — {PORTFOLIO_DATA.personal.subtitle}
                </p>
                
                <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.75rem)] tracking-tight text-brand-charcoal leading-[1.1] md:leading-[1.12]">
                  I design <span className="underline decoration-brand-indigo/80 decoration-3 underline-offset-4">structured systems</span> and analyze complex data.
                </h1>
                
                <p className="max-w-xl text-sm md:text-base text-brand-charcoal/80 font-light leading-relaxed">
                  Early-career Computer Science Engineer specializing in <span className="font-semibold text-brand-charcoal">Java development</span>, algorithmic efficiency, and the application of machine learning workflows.
                </p>
              </div>

              {/* Action and Social links row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3">
                <a
                  href="#projects"
                  className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-beige text-xs font-semibold tracking-tight shadow-md transition-all duration-200"
                  id="hero-view-projects"
                >
                  View Featured Projects
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-brand-charcoal/15 hover:bg-brand-charcoal/5 text-brand-charcoal text-xs font-semibold transition-all shadow-2xs"
                  id="hero-download-resume"
                >
                  <FileText className="w-4 h-4" />
                  Download Resume
                </a>

                {/* Vertical Divider / Spacer */}
                <div className="hidden sm:block w-[1px] h-8 bg-brand-charcoal/15 mx-1" />

                {/* Social icons */}
                <div className="flex justify-center sm:justify-start items-center gap-2.5">
                  <a
                    href={PORTFOLIO_DATA.personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white border border-brand-charcoal/10 hover:border-brand-charcoal/20 hover:bg-brand-charcoal/5 text-brand-charcoal/80 hover:text-brand-charcoal transition-all shadow-2xs"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white border border-brand-charcoal/10 hover:border-brand-charcoal/20 hover:bg-brand-charcoal/5 text-brand-charcoal/80 hover:text-brand-charcoal transition-all shadow-2xs"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Photograph Frame (Right on desktop, Prominent top on mobile) */}
            <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] aspect-[4/5] group">
                
                {/* Asymmetric layered pastel frames with offsets */}
                <div className="absolute inset-0 rounded-3xl bg-brand-lavender border border-brand-charcoal/10 -z-10 transform -rotate-3 transition-transform duration-300 group-hover:-rotate-5 shadow-xs" />
                <div className="absolute inset-0 rounded-3xl bg-brand-indigo/70 border border-brand-charcoal/10 -z-20 transform rotate-3 transition-transform duration-300 group-hover:rotate-5 shadow-xs" />
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-brand-peach/40 rounded-full -z-35 blur-xl" />
                
                {/* Decorative technical line drawings and crosses */}
                <div className="absolute -top-3 -left-3 font-mono text-[8px] text-brand-charcoal/30 select-none">
                  + [LAT_COORD: 28.5355]
                </div>
                <div className="absolute -bottom-3 -right-3 font-mono text-[8px] text-brand-charcoal/30 select-none">
                  [RELO_ACTIVE_1] +
                </div>
                
                {/* Image container box */}
                <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-brand-charcoal bg-brand-beige shadow-lg relative">
                  <ProfileImage />
                </div>

                {/* Absolute overlay badge */}
                <div className="absolute bottom-4 right-4 bg-brand-charcoal text-brand-beige px-3 py-1.5 rounded-xl text-[9px] font-mono tracking-wider shadow-md border border-brand-charcoal/10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  NOIDA, IN
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT / EDITORIAL PROFILE SUMMARY SECTION */}
        <section id="about" className="py-16 md:py-24 bg-white/40 border-y border-brand-charcoal/5 relative overflow-hidden px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            
            <div className="text-center space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-indigo/40 text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/15">
                Profile Summary
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-charcoal tracking-tight">
                A Thoughtful Software Engineer
              </h2>
            </div>
            
            {/* Elegant large quote layout */}
            <div className="relative max-w-4xl mx-auto">
              <span className="absolute -top-10 -left-4 font-serif text-8xl text-brand-charcoal/5 select-none">“</span>
              <p className="text-sm md:text-base lg:text-lg text-brand-charcoal/85 font-light leading-relaxed text-justify sm:text-center relative z-10">
                {PORTFOLIO_DATA.personal.aboutBrief}
              </p>
              <span className="absolute -bottom-16 -right-4 font-serif text-8xl text-brand-charcoal/5 select-none">”</span>
            </div>

            {/* Asymmetric Core System Highlights Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8">
              <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-colors shadow-2xs text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-brand-charcoal/5 group-hover:text-brand-charcoal/10 transition-colors">
                  <Code2 className="w-12 h-12" />
                </div>
                <span className="block text-[9px] font-mono text-brand-charcoal/50 mb-1.5 uppercase tracking-widest font-bold">Core Language</span>
                <span className="text-sm md:text-base font-display font-bold text-brand-charcoal block">
                  Java Standard Edition
                </span>
                <p className="text-xs text-brand-charcoal/60 font-light mt-1.5 leading-relaxed">
                  Strong object-oriented fundamentals, concurrency primitives, and collections.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-colors shadow-2xs text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-brand-charcoal/5 group-hover:text-brand-charcoal/10 transition-colors">
                  <BrainCircuit className="w-12 h-12" />
                </div>
                <span className="block text-[9px] font-mono text-brand-charcoal/50 mb-1.5 uppercase tracking-widest font-bold">Main Paradigm</span>
                <span className="text-sm md:text-base font-display font-bold text-brand-charcoal block">
                  Data Structures & Algos
                </span>
                <p className="text-xs text-brand-charcoal/60 font-light mt-1.5 leading-relaxed">
                  Focus on optimization, analysis of algorithmic complexity, and structured problem solving.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-colors shadow-2xs text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-brand-charcoal/5 group-hover:text-brand-charcoal/10 transition-colors">
                  <Search className="w-12 h-12" />
                </div>
                <span className="block text-[9px] font-mono text-brand-charcoal/50 mb-1.5 uppercase tracking-widest font-bold">AI & Information</span>
                <span className="text-sm md:text-base font-display font-bold text-brand-charcoal block">
                  Search & NLP Workflows
                </span>
                <p className="text-xs text-brand-charcoal/60 font-light mt-1.5 leading-relaxed">
                  Integrating vector search concepts, text metrics, and automated token indexing models.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS SECTION — The Crown Jewel */}
        <section id="projects" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
          
          <div className="text-center md:text-left space-y-3 max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-lavender text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/15">
              Technical Implementations
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-charcoal tracking-tight">
              Featured Engineering Case Studies
            </h2>
            <p className="text-brand-charcoal/70 text-xs md:text-sm font-light">
              Demonstrating algorithmic rigor, clean code structure, and data visualization pipelines.
            </p>
          </div>

          {/* PROJECT ROW 1 (MINI SEARCH ENGINE - Large Featured Layout) */}
          <div className="p-6 md:p-8 lg:p-10 rounded-3xl bg-brand-indigo/25 border border-brand-charcoal/15 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            
            {/* Project visual demo (Left) */}
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-brand-charcoal/15 bg-white shadow-sm relative group">
                <ProjectVisual id="search-engine" title="Mini Search Engine" category="Java Retrieval System" />
              </div>
            </div>

            {/* Project content (Right) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] text-brand-charcoal/50 font-bold uppercase tracking-wider">PROJECT {PORTFOLIO_DATA.projects[0].indexStr} / PRIMARY FEATURE</span>
                <span className="flex items-center gap-1 text-[9px] font-mono uppercase bg-brand-charcoal/10 text-brand-charcoal px-2.5 py-1 rounded-md font-semibold shrink-0">
                  <Lock className="w-3 h-3" />
                  Private Repo
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-charcoal">
                  {PORTFOLIO_DATA.projects[0].title}
                </h3>
                <p className="text-brand-charcoal/85 text-xs md:text-sm leading-relaxed font-light">
                  {PORTFOLIO_DATA.projects[0].description}
                </p>
              </div>

              {/* Technology Pills */}
              <div className="flex flex-wrap gap-1.5">
                {PORTFOLIO_DATA.projects[0].technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg bg-white/90 text-brand-charcoal border border-brand-charcoal/10 text-[10px] font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Mini case-study bullet points */}
              <div className="space-y-3 border-t border-brand-charcoal/10 pt-4 text-left">
                <p className="font-display font-bold text-[10px] uppercase tracking-widest text-brand-charcoal/60">Core Engineering Accomplishments</p>
                <ul className="space-y-2">
                  {PORTFOLIO_DATA.projects[0].highlights.map((highlight, idx) => {
                    const [title, desc] = highlight.split(": ");
                    return (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-charcoal/85 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-brand-charcoal text-brand-beige flex items-center justify-center font-mono text-[9px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>
                          <strong className="text-brand-charcoal font-semibold">{title}:</strong> {desc}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSearchEngineModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-beige text-xs font-semibold transition-all shadow-sm"
                  id="search-engine-details-cta"
                >
                  <Search className="w-3.5 h-3.5" />
                  View Architecture Details
                </button>
              </div>
            </div>
          </div>

          {/* DYNAMIC CASE-STUDY MODAL FOR SEARCH ENGINE DETAILS */}
          <AnimatePresence>
            {searchEngineModalOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchEngineModalOpen(false)}
                  className="fixed inset-0 bg-brand-charcoal z-50 backdrop-blur-xs"
                />
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="fixed inset-x-4 top-[10%] max-h-[80vh] md:max-w-2xl mx-auto bg-brand-beige border-2 border-brand-charcoal rounded-3xl z-50 overflow-y-auto p-6 md:p-8 shadow-2xl flex flex-col justify-between"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-title"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-charcoal/10">
                      <div>
                        <span className="font-mono text-[9px] text-brand-charcoal/50 uppercase tracking-widest block font-bold">System Deep-Dive</span>
                        <h3 id="modal-title" className="font-display font-extrabold text-xl md:text-2xl text-brand-charcoal leading-snug">
                          Mini Search Engine Architecture
                        </h3>
                      </div>
                      <button
                        onClick={() => setSearchEngineModalOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-brand-charcoal/10 text-brand-charcoal transition-colors"
                        aria-label="Close details"
                        id="search-engine-modal-close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-6 text-xs md:text-sm text-brand-charcoal/90 leading-relaxed text-left">
                      <div>
                        <h4 className="font-display font-bold text-brand-charcoal text-xs uppercase tracking-wider mb-2">1. Inverted Index Structure</h4>
                        <p className="bg-white/50 p-3 rounded-xl border border-brand-charcoal/5 font-mono text-[10px] md:text-xs text-brand-charcoal/80 mb-3 leading-relaxed">
                          HashMap&lt;String, Set&lt;DocumentMapping&gt;&gt; InvertedIndex;<br/>
                          // Fast lookup of term to list of documents with occurrences
                        </p>
                        <p className="font-light text-brand-charcoal/70">
                          By leveraging an Inverted Index structure, the engine avoids scanning documents sequentially. Word coordinates, frequencies, and normalization variables are cached at ingestion time to guarantee sub-millisecond retrieval.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-brand-charcoal text-xs uppercase tracking-wider mb-2">2. Term Frequency-Inverse Document Frequency (TF-IDF)</h4>
                        <p className="bg-white/50 p-3 rounded-xl border border-brand-charcoal/5 font-mono text-[10px] md:text-xs text-brand-charcoal/80 mb-3 leading-relaxed">
                          TF(t, d) = term_occurrences_in_d / total_terms_in_d<br/>
                          IDF(t, D) = log(Total_Documents / Documents_Containing_t)<br/>
                          Weight(t, d) = TF(t, d) * IDF(t, D)
                        </p>
                        <p className="font-light text-brand-charcoal/70">
                          TF-IDF measures word significance in a given document versus the entire collection, preventing common stopwords (e.g. "and", "the") from skewing ranking priorities during document retrieval.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-brand-charcoal text-xs uppercase tracking-wider mb-2">3. Cosine Similarity Vector Retrieval</h4>
                        <p className="font-light text-brand-charcoal/70 mb-3">
                          To resolve search requests, the user's multi-word query is converted into a mathematical vector in the term space. The angle between the query vector and document vectors is computed to rank documents by coordinate alignment:
                        </p>
                        <div className="bg-white/50 p-4 rounded-xl border border-brand-charcoal/5 text-center font-serif text-xs md:text-sm italic">
                          Cosine Similarity (Q, D) = (Q • d) / (||Q|| * ||d||)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-brand-charcoal/10 flex justify-end">
                    <button
                      onClick={() => setSearchEngineModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-brand-charcoal text-brand-beige text-xs font-semibold hover:bg-brand-charcoal/90 transition-all"
                    >
                      Close Deep-Dive View
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ASYMMETRIC COLLAGE OF SECONDARY PROJECTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            
            {/* PROJECT 2: RESUME ANALYZER (Python Script) */}
            <div className="p-5 rounded-2xl bg-brand-peach/45 border border-brand-charcoal/10 flex flex-col justify-between hover:border-brand-charcoal/20 hover:shadow-xs transition-all group">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-brand-charcoal/10 bg-white relative">
                  <ProjectVisual id="resume-analyzer" title="Resume Analyzer" category="Python NLP Tool" />
                </div>
                
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-wider block">PROJECT {PORTFOLIO_DATA.projects[1].indexStr} / EXPORTABLE SCRIPT</span>
                  <h3 className="font-display font-bold text-base md:text-lg text-brand-charcoal leading-snug">
                    {PORTFOLIO_DATA.projects[1].title}
                  </h3>
                  <p className="text-brand-charcoal/80 text-xs font-light leading-relaxed">
                    {PORTFOLIO_DATA.projects[1].description}
                  </p>
                </div>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1">
                  {PORTFOLIO_DATA.projects[1].technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-brand-lavender text-brand-charcoal border border-brand-charcoal/10 text-[9px] font-mono font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Case study highlights */}
                <div className="space-y-2 border-t border-brand-charcoal/5 pt-4 text-left">
                  <p className="font-display font-bold text-[9px] uppercase tracking-widest text-brand-charcoal/50">Core Operations</p>
                  <ul className="space-y-1.5">
                    {PORTFOLIO_DATA.projects[1].highlights.map((highlight, idx) => {
                      const [title, desc] = highlight.split(": ");
                      return (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-brand-charcoal/70 leading-relaxed">
                          <span className="w-4.5 h-4.5 rounded-full bg-brand-charcoal/10 text-brand-charcoal flex items-center justify-center font-mono text-[8px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>
                            <strong className="text-brand-charcoal font-semibold">{title}:</strong> {desc}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-charcoal/5 mt-4">
                <a
                  href={PORTFOLIO_DATA.projects[1].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-brand-charcoal/15 hover:bg-brand-charcoal/5 text-brand-charcoal text-[10px] font-semibold transition-all shadow-3xs"
                  id="resume-analyzer-github-cta"
                >
                  <Github className="w-3.5 h-3.5" />
                  Explore Source
                </a>
              </div>
            </div>

            {/* PROJECT 3: CONSUMER BEHAVIOR ANALYSIS (Interactive Dashboard) */}
            <div className="p-5 rounded-2xl bg-brand-blue/35 border border-brand-charcoal/10 flex flex-col justify-between hover:border-brand-charcoal/20 hover:shadow-xs transition-all group">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-brand-charcoal/10 bg-white relative">
                  <ProjectVisual id="consumer-behavior" title="Consumer Analysis" category="Power BI & Analytics" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-wider block">PROJECT {PORTFOLIO_DATA.projects[2].indexStr} / DATA VIEW</span>
                    <span className="flex items-center gap-1 text-[8px] font-mono uppercase bg-brand-charcoal/15 text-brand-charcoal px-2 py-0.5 rounded-md font-semibold shrink-0">
                      <Lock className="w-2.5 h-2.5" />
                      Private
                    </span>
                  </div>
                  
                  <h3 className="font-display font-bold text-base md:text-lg text-brand-charcoal leading-snug">
                    {PORTFOLIO_DATA.projects[2].title}
                  </h3>
                  <p className="text-brand-charcoal/80 text-xs font-light leading-relaxed">
                    {PORTFOLIO_DATA.projects[2].description}
                  </p>
                </div>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1">
                  {PORTFOLIO_DATA.projects[2].technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-brand-blue text-brand-charcoal border border-brand-charcoal/10 text-[9px] font-mono font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Case study highlights */}
                <div className="space-y-2 border-t border-brand-charcoal/5 pt-4 text-left">
                  <p className="font-display font-bold text-[9px] uppercase tracking-widest text-brand-charcoal/50">Data Pipelines</p>
                  <ul className="space-y-1.5">
                    {PORTFOLIO_DATA.projects[2].highlights.map((highlight, idx) => {
                      const [title, desc] = highlight.split(": ");
                      return (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-brand-charcoal/70 leading-relaxed">
                          <span className="w-4.5 h-4.5 rounded-full bg-brand-charcoal/10 text-brand-charcoal flex items-center justify-center font-mono text-[8px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>
                            <strong className="text-brand-charcoal font-semibold">{title}:</strong> {desc}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-brand-charcoal/5 mt-4" />
            </div>

            {/* PROJECT 4: TEAM TASK MANAGER (Java Architecture) */}
            <div className="p-5 rounded-2xl bg-brand-lavender/35 border border-brand-charcoal/10 flex flex-col justify-between hover:border-brand-charcoal/20 hover:shadow-xs transition-all group">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-brand-charcoal/10 bg-white relative">
                  <ProjectVisual id="team-task-manager" title="Team Task Manager" category="Java Object Model" />
                </div>
                
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-wider block">PROJECT {PORTFOLIO_DATA.projects[3].indexStr} / OOP DESIGN</span>
                  <h3 className="font-display font-bold text-base md:text-lg text-brand-charcoal leading-snug">
                    {PORTFOLIO_DATA.projects[3].title}
                  </h3>
                  <p className="text-brand-charcoal/80 text-xs font-light leading-relaxed">
                    {PORTFOLIO_DATA.projects[3].description}
                  </p>
                </div>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1">
                  {PORTFOLIO_DATA.projects[3].technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-brand-peach text-brand-charcoal border border-brand-charcoal/10 text-[9px] font-mono font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Case study highlights */}
                <div className="space-y-2 border-t border-brand-charcoal/5 pt-4 text-left">
                  <p className="font-display font-bold text-[9px] uppercase tracking-widest text-brand-charcoal/50">Architecture</p>
                  <ul className="space-y-1.5">
                    {PORTFOLIO_DATA.projects[3].highlights.map((highlight, idx) => {
                      const [title, desc] = highlight.split(": ");
                      return (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-brand-charcoal/70 leading-relaxed">
                          <span className="w-4.5 h-4.5 rounded-full bg-brand-charcoal/10 text-brand-charcoal flex items-center justify-center font-mono text-[8px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>
                            <strong className="text-brand-charcoal font-semibold">{title}:</strong> {desc}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-charcoal/5 mt-4">
                <a
                  href={PORTFOLIO_DATA.projects[3].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-brand-charcoal/15 hover:bg-brand-charcoal/5 text-brand-charcoal text-[10px] font-semibold transition-all shadow-3xs"
                  id="task-manager-github-cta"
                >
                  <Github className="w-3.5 h-3.5" />
                  Explore Source
                </a>
              </div>
            </div>

          </div>

        </section>

        {/* TECHNICAL SKILLS SECTION — Highly organized bento capability grid */}
        <section id="skills" className="py-16 md:py-24 bg-white/50 border-y border-brand-charcoal/5 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-blue text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/10">
                Acquired Proficiencies
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-charcoal tracking-tight">
                Technical Capability Index
              </h2>
              <p className="text-brand-charcoal/60 text-xs md:text-sm font-light">
                A granular, honest lookup of my computer science capabilities, algorithm training, and pipeline configurations.
              </p>
            </div>

            {/* BENTO GRID SKILLS LAYOUT with varying cards & soft colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {PORTFOLIO_DATA.skills.map((category, idx) => {
                // Alternating light backgrounds for layout asymmetry
                const bgColors = [
                  "bg-brand-indigo/25 hover:bg-brand-indigo/35",
                  "bg-brand-lavender/30 hover:bg-brand-lavender/40",
                  "bg-brand-blue/30 hover:bg-brand-blue/40",
                  "bg-brand-peach/30 hover:bg-brand-peach/40",
                  "bg-white/90 hover:bg-white border-brand-charcoal/15",
                  "bg-brand-indigo/15 hover:bg-brand-indigo/25"
                ];
                const currentBg = bgColors[idx % bgColors.length];

                return (
                  <div
                    key={category.title}
                    className={`p-6 rounded-2xl border border-brand-charcoal/10 transition-all shadow-3xs group ${currentBg}`}
                  >
                    <div className="flex items-center gap-2.5 mb-4 border-b border-brand-charcoal/10 pb-3">
                      <div className="w-2 h-2 rounded-full bg-brand-charcoal" />
                      <h3 className="font-display font-extrabold text-xs md:text-sm tracking-tight text-brand-charcoal">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-white/70 text-brand-charcoal text-[11px] font-semibold tracking-tight border border-brand-charcoal/5 hover:border-brand-charcoal/20 hover:bg-white transition-all shadow-3xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* PROBLEM SOLVING AND RESEARCH — Fully Refined Bento Sections */}
        <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* DSA Problem Solving Block (Left 6 cols) */}
          <div className="lg:col-span-6 p-6 md:p-8 rounded-3xl bg-brand-peach/40 border border-brand-charcoal/10 space-y-6 text-left flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-brand-charcoal/10 text-brand-charcoal shadow-3xs">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Algorithmic Practice</span>
                  <h3 className="font-display font-extrabold text-lg text-brand-charcoal">Data Structures & Algorithms</h3>
                </div>
              </div>

              <p className="text-brand-charcoal/80 text-xs md:text-sm font-light leading-relaxed">
                Maintained consistent execution across major interactive programming interfaces, debugging bottlenecks, refining time-complexities, and reinforcing core computational paradigms.
              </p>

              {/* Large visually impressive Solved statistic */}
              <div className="py-4 flex items-center gap-4 border-y border-brand-charcoal/10">
                <AnimatedCounter target={PORTFOLIO_DATA.problemSolving.solvedCount} />
                <div>
                  <span className="block font-display font-extrabold text-base text-brand-charcoal leading-none">Challenges Solved</span>
                  <span className="block font-mono text-[9px] text-brand-charcoal/40 uppercase tracking-wider mt-1.5 font-bold">
                    across LeetCode & CodeChef platforms
                  </span>
                </div>
              </div>
            </div>

            {/* Focus areas list */}
            <div className="space-y-2 pt-4">
              <span className="block font-mono text-[9px] text-brand-charcoal/40 uppercase tracking-widest font-bold">Focused Problem Domains</span>
              <div className="flex flex-wrap gap-1">
                {PORTFOLIO_DATA.problemSolving.focusAreas.map((area) => (
                  <span key={area} className="px-2.5 py-0.5 rounded-md bg-white border border-brand-charcoal/5 text-[10px] text-brand-charcoal font-semibold shadow-3xs">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Research Block (Right 6 cols) */}
          <div className="lg:col-span-6 p-6 md:p-8 rounded-3xl bg-brand-lavender/35 border border-brand-charcoal/10 space-y-6 text-left flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-brand-charcoal/10 text-brand-charcoal shadow-3xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Academic Co-Authorship</span>
                  <h3 className="font-display font-extrabold text-lg text-brand-charcoal">Undergraduate Research Work</h3>
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-block px-2.5 py-1 rounded bg-white text-brand-charcoal font-mono text-[10px] font-bold border border-brand-charcoal/10 uppercase tracking-wider">
                  {PORTFOLIO_DATA.research.role}
                </div>
                <h4 className="font-display font-extrabold text-base md:text-lg text-brand-charcoal leading-snug">
                  {PORTFOLIO_DATA.research.title}
                </h4>
                <p className="text-brand-charcoal/80 text-xs md:text-sm font-light leading-relaxed">
                  {PORTFOLIO_DATA.research.description}
                </p>
              </div>
            </div>

            {/* Research focus keywords */}
            <div className="space-y-2 pt-4 border-t border-brand-charcoal/5">
              <span className="block font-mono text-[9px] text-brand-charcoal/40 uppercase tracking-widest font-bold">Key Investigated Metrics</span>
              <div className="flex flex-wrap gap-1">
                {PORTFOLIO_DATA.research.focusAreas.map((focus) => (
                  <span key={focus} className="px-2.5 py-0.5 rounded-md bg-white border border-brand-charcoal/5 text-[10px] text-brand-charcoal font-semibold shadow-3xs">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* STRUCTURED TECHNICAL TRAINING TIMELINE */}
        <section className="py-12 bg-white/30 border-y border-brand-charcoal/5 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-left space-y-5">
            <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Structured Curriculum</span>
            
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-brand-charcoal/10 space-y-4 shadow-3xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-charcoal/10 pb-4">
                <div>
                  <h3 className="font-display font-extrabold text-lg md:text-xl text-brand-charcoal leading-tight">
                    {PORTFOLIO_DATA.training.title}
                  </h3>
                  <p className="font-mono text-xs text-brand-charcoal/50 mt-1 font-medium">
                    {PORTFOLIO_DATA.training.provider}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-blue text-brand-charcoal font-mono text-[9px] font-bold uppercase tracking-wider self-start sm:self-center border border-brand-charcoal/5">
                  Technical Training
                </span>
              </div>

              <ul className="space-y-2.5 pt-2">
                {PORTFOLIO_DATA.training.highlights.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-brand-charcoal/85 leading-relaxed font-light">
                    <Check className="w-4 h-4 text-brand-charcoal shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* EDUCATION & JOURNEY SECTION — Elegant monospaced vertical timeline */}
        <section id="journey" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-peach text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/10">
              Academic History
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-charcoal tracking-tight">
              Educational Milestones
            </h2>
          </div>

          {/* Timeline Wrapper */}
          <div className="max-w-3xl mx-auto relative pt-4">
            
            {/* Center spine vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-charcoal/15 -translate-x-1/2" />
            
            <div className="space-y-10">
              
              {/* PRIMARY DEGREE CARD (B.Tech) - High Emphasis layout left or center */}
              {PORTFOLIO_DATA.education.filter(edu => edu.isPrimary).map((edu) => (
                <div key={edu.degree} className="relative flex flex-col md:flex-row items-stretch gap-6 md:gap-0">
                  
                  {/* Spine coordinate dot marker */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-charcoal border-4 border-brand-beige -translate-x-1/2 top-4 shadow-sm z-10" />

                  {/* Left spacing for desktop */}
                  <div className="hidden md:block w-1/2 pr-10 text-right self-center">
                    <span className="inline-block font-mono text-xs text-brand-charcoal/50 font-bold tracking-wider uppercase bg-brand-charcoal/5 px-3 py-1 rounded-full">
                      Primary Focus
                    </span>
                    <p className="font-mono text-xs text-brand-charcoal/60 mt-1.5 font-bold flex items-center justify-end gap-1">
                      <Calendar className="w-3.5 h-3.5 inline" />
                      {edu.duration}
                    </p>
                  </div>

                  {/* Right box / Primary content */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-10 text-left">
                    <div className="p-6 rounded-2xl bg-white border-2 border-brand-charcoal shadow-sm relative overflow-hidden group">
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-brand-indigo/20 pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-300" />
                      
                      <span className="inline-block md:hidden font-mono text-[9px] font-bold text-brand-charcoal/50 uppercase tracking-wider bg-brand-charcoal/5 px-2.5 py-0.5 rounded-full mb-3">
                        Primary Focus / {edu.duration}
                      </span>
                      
                      <h3 className="font-display font-extrabold text-base md:text-lg text-brand-charcoal leading-snug">
                        {edu.degree}
                      </h3>
                      
                      <p className="text-xs font-bold text-brand-charcoal/80 mt-1">
                        {edu.institution} — <span className="text-brand-charcoal/50">{edu.location}</span>
                      </p>

                      <div className="pt-4 mt-4 border-t border-brand-charcoal/10 flex items-end justify-between">
                        <div className="space-y-0.5">
                          <span className="block font-mono text-[8px] text-brand-charcoal/40 uppercase tracking-wider">Metric Standing</span>
                          <span className="block font-display font-extrabold text-2xl text-brand-charcoal">
                            {edu.metricValue} <span className="text-xs font-normal text-brand-charcoal/50">/ 10.0 CGPA</span>
                          </span>
                        </div>
                        <div className="text-right flex items-center gap-1.5 text-xs font-mono text-brand-charcoal/60">
                          <GraduationCap className="w-4.5 h-4.5 text-brand-charcoal" />
                          CSE Graduate
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}

              {/* SECONDARY / COMPACT PRIOR SCHOOLING ITEMS */}
              {PORTFOLIO_DATA.education.filter(edu => !edu.isPrimary).map((edu, idx) => (
                <div key={edu.degree} className="relative flex flex-col md:flex-row items-stretch gap-6 md:gap-0">
                  
                  {/* Spine coordinate dot marker */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-brand-charcoal/50 border-2 border-brand-beige -translate-x-1/2 top-4 z-10" />

                  {/* Left or Right spacing alternation for prior school items */}
                  {idx % 2 === 0 ? (
                    <>
                      {/* Left content block on desktop */}
                      <div className="w-full md:w-1/2 pl-10 md:pl-0 md:pr-10 text-left md:text-right">
                        <div className="p-5 rounded-2xl bg-white border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-all shadow-3xs">
                          <span className="inline-block font-mono text-[9px] font-bold text-brand-charcoal/40 uppercase tracking-wider bg-brand-charcoal/5 px-2 py-0.5 rounded-full mb-2">
                            Class XII CBSE / {edu.duration}
                          </span>
                          <h3 className="font-display font-bold text-xs md:text-sm text-brand-charcoal">
                            {edu.degree}
                          </h3>
                          <p className="text-[11px] text-brand-charcoal/60 mt-0.5">
                            {edu.institution}, Ayodhya
                          </p>
                          <div className="mt-3 pt-2.5 border-t border-brand-charcoal/5 flex items-center justify-between md:justify-end md:gap-4 text-left md:text-right">
                            <span className="font-mono text-[9px] text-brand-charcoal/40">FINAL STANDING:</span>
                            <span className="font-display font-extrabold text-sm text-brand-charcoal">{edu.metricValue} Score</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block w-1/2" />
                      {/* Right content block on desktop */}
                      <div className="w-full md:w-1/2 pl-10 text-left">
                        <div className="p-5 rounded-2xl bg-white border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-all shadow-3xs">
                          <span className="inline-block font-mono text-[9px] font-bold text-brand-charcoal/40 uppercase tracking-wider bg-brand-charcoal/5 px-2 py-0.5 rounded-full mb-2">
                            Class X CBSE / {edu.duration}
                          </span>
                          <h3 className="font-display font-bold text-xs md:text-sm text-brand-charcoal">
                            {edu.degree}
                          </h3>
                          <p className="text-[11px] text-brand-charcoal/60 mt-0.5">
                            {edu.institution}, Ayodhya
                          </p>
                          <div className="mt-3 pt-2.5 border-t border-brand-charcoal/5 flex items-center justify-between text-left">
                            <span className="font-mono text-[9px] text-brand-charcoal/40">FINAL STANDING:</span>
                            <span className="font-display font-extrabold text-sm text-brand-charcoal">{edu.metricValue} Score</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              ))}

            </div>

          </div>
        </section>

        {/* LEADERSHIP & COORDINATION — Bento Achievements grid */}
        <section className="py-16 md:py-24 bg-white/40 border-y border-brand-charcoal/5 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-lavender text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/10">
                Extracurricular Involvements
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-charcoal tracking-tight">
                Achievements & Coordination
              </h2>
            </div>

            {/* Bento Grid with alternating column spans and pastel fills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Leader coordination block (Large Span 2 cols) */}
              <div className="md:col-span-2 p-6 rounded-3xl bg-brand-indigo/35 border border-brand-charcoal/10 text-left space-y-4 flex flex-col justify-between hover:shadow-xs transition-shadow group relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-brand-lavender/50 rounded-full pointer-events-none" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider bg-brand-charcoal/5 text-brand-charcoal border border-brand-charcoal/5">
                      {PORTFOLIO_DATA.achievements[0].category}
                    </span>
                    <span className="font-mono text-[10px] text-brand-charcoal/40 font-bold uppercase">MEGAPIXEL NIET</span>
                  </div>
                  <h4 className="font-display font-extrabold text-base md:text-lg text-brand-charcoal leading-snug">
                    {PORTFOLIO_DATA.achievements[0].title}
                  </h4>
                  <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-light">
                    {PORTFOLIO_DATA.achievements[0].description}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-charcoal/10 flex items-center gap-1.5 text-[10px] font-mono text-brand-charcoal/50 uppercase tracking-wider font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  Photography Club Lead Organizer, Noida
                </div>
              </div>

              {/* Photographer award card (Span 1 col) */}
              <div className="p-6 rounded-3xl bg-brand-peach/45 border border-brand-charcoal/10 text-left space-y-4 flex flex-col justify-between hover:shadow-xs transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider bg-brand-charcoal/5 text-brand-charcoal border border-brand-charcoal/5">
                      {PORTFOLIO_DATA.achievements[1].category}
                    </span>
                    <span className="font-mono text-[8px] text-brand-charcoal/40 font-bold uppercase">HONORS</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-brand-charcoal leading-snug">
                    {PORTFOLIO_DATA.achievements[1].title}
                  </h4>
                  <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                    {PORTFOLIO_DATA.achievements[1].description}
                  </p>
                </div>
                <div className="pt-3 border-t border-brand-charcoal/5 text-[9px] font-mono text-brand-charcoal/40 uppercase">
                  NIET Photography Club
                </div>
              </div>

              {/* DSA Problem solved badge block (Span 3 cols or balanced layout) */}
              <div className="md:col-span-3 p-6 rounded-3xl bg-brand-blue/30 border border-brand-charcoal/10 text-left space-y-4 flex flex-col justify-between hover:shadow-xs transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <span className="inline-block px-2.5 py-1 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider bg-brand-charcoal/5 text-brand-charcoal border border-brand-charcoal/5">
                      {PORTFOLIO_DATA.achievements[2].category}
                    </span>
                    <h4 className="font-display font-extrabold text-base text-brand-charcoal">
                      {PORTFOLIO_DATA.achievements[2].title}
                    </h4>
                    <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light max-w-xl">
                      {PORTFOLIO_DATA.achievements[2].description}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center justify-center bg-white border border-brand-charcoal/10 p-4 rounded-2xl h-16 w-32 shadow-3xs">
                    <span className="font-display font-extrabold text-2xl text-brand-charcoal">200+</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* VERIFIED CREDENTIALS / CERTIFICATIONS */}
        <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-indigo/40 text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/10">
              Verified Badges
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-charcoal tracking-tight">
              Selected Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {PORTFOLIO_DATA.certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-5 rounded-2xl bg-white border border-brand-charcoal/10 hover:border-brand-charcoal/20 hover:shadow-3xs transition-all flex flex-col justify-between text-left group"
              >
                <div className="space-y-3.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-charcoal/5 border border-brand-charcoal/10 flex items-center justify-center font-mono text-[9px] font-bold text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-brand-beige transition-all shadow-3xs">
                    {cert.issuer === "IBM" ? "IBM" : cert.issuer.substring(0, 3).toUpperCase()}
                  </div>
                  <h4 className="font-display font-bold text-xs tracking-tight text-brand-charcoal leading-snug group-hover:text-brand-charcoal transition-colors">
                    {cert.title}
                  </h4>
                </div>

                <div className="pt-3.5 border-t border-brand-charcoal/5 mt-4 flex items-center justify-between text-[10px] font-mono text-brand-charcoal/50">
                  <span>Issued by:</span>
                  <span className="font-bold text-brand-charcoal">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* CONTACT CALL-TO-ACTION SECTION */}
        <section id="contact" className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          <div className="inline-block px-3 py-1 rounded-full bg-brand-charcoal text-brand-beige font-mono text-[10px] uppercase tracking-widest font-bold">
            Let's Connect
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-brand-charcoal tracking-tight leading-snug">
              Have an engineering opportunity or a challenging problem?
            </h2>
            <p className="text-xs md:text-sm text-brand-charcoal/70 font-light leading-relaxed">
              I am actively seeking software engineering positions and open to relocation opportunities. Let's discuss how my Java skills, analytical background, and problem-solving focus can align with your team.
            </p>
          </div>

          {/* Email Call-to-action interactive board */}
          <div className="max-w-md mx-auto p-2 bg-white rounded-2xl border border-brand-charcoal/15 shadow-md flex flex-col sm:flex-row items-center gap-2 justify-between">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="flex items-center gap-2.5 px-4 py-2 text-xs md:text-sm text-brand-charcoal hover:text-brand-charcoal/80 font-mono overflow-x-auto w-full text-left justify-center sm:justify-start font-medium"
            >
              <Mail className="w-4 h-4 text-brand-charcoal/50 shrink-0" />
              {PORTFOLIO_DATA.personal.email}
            </a>

            <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 justify-center">
              <button
                onClick={copyEmailToClipboard}
                className="p-3 rounded-xl border border-brand-charcoal/10 hover:bg-brand-charcoal/5 text-brand-charcoal transition-all cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-beige text-xs font-semibold shadow-xs shrink-0"
              >
                Mail Direct
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {copied && (
            <span className="inline-block text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full animate-bounce">
              Email copied to clipboard successfully!
            </span>
          )}

        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-brand-charcoal/10 bg-white/40 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="block font-display font-bold text-sm tracking-tight text-brand-charcoal">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="block font-mono text-[10px] text-brand-charcoal/50 mt-0.5 font-medium">
              Portfolio © 2026. Crafted with React & Tailwind.
            </span>
          </div>

          <div className="flex items-center gap-5 justify-center">
            <a
              href={PORTFOLIO_DATA.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-brand-charcoal/60 hover:text-brand-charcoal transition-colors flex items-center gap-1.5 font-medium"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-brand-charcoal/60 hover:text-brand-charcoal transition-colors flex items-center gap-1.5 font-medium"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="font-mono text-xs text-brand-charcoal/60 hover:text-brand-charcoal transition-colors flex items-center gap-1.5 font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

// PROFILE PORTRAIT GRAPHIC WITH LAYERED FRAME & SILENT FALLBACK IF LOCAL IMAGE MISSING
function ProfileImage() {
  const [loadFailed, setLoadFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-full relative bg-brand-charcoal/5 flex items-center justify-center">
      {loading && !loadFailed && (
        <div className="absolute inset-0 bg-brand-beige animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-brand-charcoal/30 font-medium">Loading Portrait...</span>
        </div>
      )}

      {!loadFailed ? (
        <img
          src={`${import.meta.env.BASE_URL}images/profile.jpg`}
          alt="Prashant Srivastava — Software Engineer"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoadFailed(true);
            setLoading(false);
          }}
          className="w-full h-full object-cover grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-700 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Highly Aesthetic fallback typography art-piece layout representing Prashant */
        <div className="w-full h-full bg-gradient-to-tr from-brand-lavender via-brand-indigo/60 to-brand-peach p-6 md:p-8 flex flex-col justify-between text-left select-none relative overflow-hidden">
          {/* Subtle mathematical drafting circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-brand-charcoal/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-brand-charcoal/10 border-dashed pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/40">PORTRAIT PLACEHOLDER</span>
            <BrainCircuit className="w-4 h-4 text-brand-charcoal/30" />
          </div>

          <div className="my-auto py-4 z-10 flex flex-col items-center justify-center">
            {/* Elegant massive Monogram */}
            <div className="w-20 h-20 rounded-full bg-brand-charcoal text-brand-beige font-display font-extrabold text-2xl flex items-center justify-center shadow-md border-4 border-white">
              PS
            </div>
            <h2 className="font-display font-extrabold text-lg text-brand-charcoal mt-3 tracking-tight leading-none text-center">
              {PORTFOLIO_DATA.personal.name}
            </h2>
            <p className="font-mono text-[8px] text-brand-charcoal/50 uppercase tracking-widest mt-1.5 text-center font-bold">
              Java & Applied AI Focus
            </p>
          </div>

          <div className="border-t border-brand-charcoal/10 pt-3 z-10 flex justify-between items-end">
            <div className="space-y-0.5">
              <span className="block font-mono text-[7px] text-brand-charcoal/40 uppercase tracking-widest">Base</span>
              <span className="block font-display font-bold text-[10px] text-brand-charcoal">Noida, UP, India</span>
            </div>

            <div className="text-right space-y-0.5">
              <span className="block font-mono text-[7px] text-brand-charcoal/40 uppercase tracking-widest">Availability</span>
              <span className="block font-display font-bold text-[10px] text-emerald-800 flex items-center gap-1 font-semibold justify-end">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                Relocating
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// CUSTOM STYLIZED INTERACTIVE GRAPHICS COMPONENT FOR EACH FEATURED PROJECT USING HTML & TAILWIND CSS
interface ProjectVisualProps {
  id: string;
  title: string;
  category: string;
}

function ProjectVisual({ id, title, category }: ProjectVisualProps) {
  return (
    <div className="w-full h-full relative select-none flex flex-col justify-between p-5 overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
      
      {/* Background gradients and meshes depending on ID */}
      {id === "search-engine" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo/35 via-white to-brand-blue/30 -z-10" />
          
          {/* Schematic background details representing Search Index */}
          <div className="absolute inset-x-4 top-14 bottom-14 border border-brand-charcoal/10 bg-white/50 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-1.5">
              <span className="font-mono text-[8px] text-brand-charcoal/50 uppercase font-bold tracking-wider">Inverted Search Index</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-1.5 my-auto text-left">
              <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                <span className="bg-brand-charcoal text-brand-beige px-1.5 py-0.5 rounded text-[8px] font-bold">"tfidf"</span>
                <span className="text-brand-charcoal/40">→</span>
                <span className="text-brand-charcoal font-semibold bg-white/90 px-1.5 py-0.5 rounded border border-brand-charcoal/10">doc_2 (0.84), doc_4 (0.61)</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                <span className="bg-brand-charcoal text-brand-beige px-1.5 py-0.5 rounded text-[8px] font-bold">"cosine"</span>
                <span className="text-brand-charcoal/40">→</span>
                <span className="text-brand-charcoal font-semibold bg-white/90 px-1.5 py-0.5 rounded border border-brand-charcoal/10">doc_1 (0.92), doc_2 (0.43)</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[7px] font-mono text-brand-charcoal/40 pt-1.5 border-t border-brand-charcoal/5">
              <span>N_Docs: 240</span>
              <span>Metric: Cosine Similarity</span>
            </div>
          </div>
        </>
      )}

      {id === "resume-analyzer" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-lavender/30 via-white to-brand-peach/30 -z-10" />
          
          {/* Resume scanner interface drawing */}
          <div className="absolute inset-x-5 top-14 bottom-14 border border-brand-charcoal/10 bg-white/80 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-brand-charcoal/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-charcoal" />
                <span className="font-mono text-[8px] font-bold text-brand-charcoal/50">RESUME_PARSED.XML</span>
              </div>
              <Check className="w-3 h-3 text-emerald-600" />
            </div>

            <div className="space-y-1 my-auto text-left pl-1">
              <span className="text-brand-charcoal/30 font-mono text-[8px] block">&lt;skills_matched&gt;</span>
              <div className="flex flex-wrap gap-1 pl-2">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[8px] font-mono">Java (100%)</span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[8px] font-mono">Python (84%)</span>
              </div>
              <span className="text-brand-charcoal/30 font-mono text-[8px] block">&lt;/skills_matched&gt;</span>
            </div>

            <div className="text-[7px] font-mono text-brand-charcoal/40 flex justify-between items-center border-t border-brand-charcoal/5 pt-1.5">
              <span>Overlap: 84% Matched</span>
              <span>JD Gap: Spring Boot</span>
            </div>
          </div>
        </>
      )}

      {id === "consumer-behavior" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-white to-brand-indigo/20 -z-10" />
          
          {/* Custom interactive dashboard representation */}
          <div className="absolute inset-x-5 top-14 bottom-14 border border-brand-charcoal/10 bg-white/95 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-1.5">
              <span className="font-mono text-[7px] font-bold text-brand-charcoal/50 uppercase">Cluster Transaction Trends</span>
              <TrendingUp className="w-3 h-3 text-brand-charcoal/50" />
            </div>

            {/* Custom geometric styled CSS bar charts */}
            <div className="h-10 flex items-end justify-between gap-1 px-1 my-auto">
              <div className="w-full bg-brand-indigo/85 rounded-t border-t border-brand-charcoal/10 h-[30%] relative">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[6px] font-mono text-brand-charcoal/40">30%</span>
              </div>
              <div className="w-full bg-brand-charcoal rounded-t h-[80%] relative">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[6px] font-mono text-brand-charcoal/40">80%</span>
              </div>
              <div className="w-full bg-brand-blue/80 rounded-t border-t border-brand-charcoal/10 h-[50%] relative">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[6px] font-mono text-brand-charcoal/40">50%</span>
              </div>
              <div className="w-full bg-brand-peach/80 rounded-t border-t border-brand-charcoal/10 h-[65%] relative">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[6px] font-mono text-brand-charcoal/40">65%</span>
              </div>
            </div>

            <div className="flex justify-between text-[7px] font-mono text-brand-charcoal/40 border-t border-brand-charcoal/5 pt-1.5">
              <span>Segments: K-Means</span>
              <span>Records: Cleaned Pandas</span>
            </div>
          </div>
        </>
      )}

      {id === "team-task-manager" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-peach/30 via-white to-brand-lavender/25 -z-10" />
          
          {/* Queue blocks representation */}
          <div className="absolute inset-x-5 top-14 bottom-14 border border-brand-charcoal/10 bg-white/95 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-1.5">
              <span className="font-mono text-[7px] font-bold text-brand-charcoal/50 uppercase">Task Priority Queue</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[6px] font-bold font-mono">HEAP</span>
            </div>

            <div className="space-y-1 my-auto text-left">
              <div className="bg-brand-beige/50 p-1 rounded border border-brand-charcoal/5 flex items-center justify-between text-[8px]">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-brand-charcoal" />
                  <span className="font-display font-bold text-brand-charcoal text-[8px]">Sync DB Instances</span>
                </div>
                <span className="font-mono text-[6px] text-brand-charcoal/40">Priority 1</span>
              </div>
              <div className="bg-brand-beige/50 p-1 rounded border border-brand-charcoal/5 flex items-center justify-between text-[8px]">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-brand-charcoal/40" />
                  <span className="font-display font-medium text-brand-charcoal/60 text-[8px]">Log Milestone Output</span>
                </div>
                <span className="font-mono text-[6px] text-brand-charcoal/40">Priority 2</span>
              </div>
            </div>

            <div className="flex justify-between text-[7px] font-mono text-brand-charcoal/40 border-t border-brand-charcoal/5 pt-1.5">
              <span>State: Deterministic</span>
              <span>Thread: Concurrent</span>
            </div>
          </div>
        </>
      )}

      {/* Foreground Header Labels */}
      <div className="flex items-center justify-between w-full z-10">
        <span className="font-mono text-[9px] font-bold text-brand-charcoal bg-white/90 border border-brand-charcoal/10 px-2 py-0.5 rounded-md uppercase tracking-wider shadow-2xs">
          {category}
        </span>
        <Maximize2 className="w-3.5 h-3.5 text-brand-charcoal/45 group-hover:scale-110 group-hover:text-brand-charcoal transition-all" />
      </div>

      <div className="text-left w-full z-10">
        <h4 className="font-display font-extrabold text-sm md:text-base text-brand-charcoal leading-none">
          {title}
        </h4>
        <span className="font-mono text-[8px] text-brand-charcoal/45 uppercase tracking-widest mt-1 block">
          Architectural Schematic
        </span>
      </div>

    </div>
  );
}

// REDUCED-MOTION COMPLIANT ANIMATED NUMBERS COUNTER COMPONENT
interface AnimatedCounterProps {
  target: number;
}

function AnimatedCounter({ target }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let isSubscribed = true;
    let observer: IntersectionObserver | null = null;

    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && isSubscribed) {
            let start = 0;
            const duration = 1000; // ms
            const stepTime = Math.abs(Math.floor(duration / target));
            
            const timer = setInterval(() => {
              start += 4;
              if (start >= target) {
                setCount(target);
                clearInterval(timer);
              } else {
                setCount(start);
              }
            }, stepTime);

            if (observer && containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);
    }

    return () => {
      isSubscribed = false;
      if (observer && containerRef.current) {
        observer.disconnect();
      }
    };
  }, [target]);

  return (
    <div ref={containerRef} className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal leading-none">
      {count}+
    </div>
  );
}
