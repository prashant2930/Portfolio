import React, { useState, useEffect, useRef } from "react";
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
  
  // Project Filter State
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Clipboard Copy State
  const [copied, setCopied] = useState(false);

  // Monitor scroll for sticky navbar effect and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["about", "projects", "research", "skills", "contact"];
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
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scrolling when drawers are active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Copy email utility
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const filterCategories = ["All", "Software Engineering", "AI / LLM", "Backend", "Frontend", "Java"];

  const filteredProjects = activeFilter === "All"
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(proj => proj.filterTags.includes(activeFilter));

  const isFeatured = (id: string) => id === "job-hunter-ai" || id === "team-task-manager" || id === "resume-analyzer";

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
                {PORTFOLIO_DATA.personal.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-brand-charcoal/5 p-1 rounded-full border border-brand-charcoal/5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.id === "hero" ? "#" : `#${item.id}`}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 ${
                  (item.id === "hero" && activeSection === "hero") || activeSection === item.id
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
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-beige text-xs font-medium transition-all duration-200 shadow-sm"
              id="desktop-contact-cta"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact
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
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.id === "hero" ? "#" : `#${item.id}`}
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
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-beige text-xs font-semibold shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email Me
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
              
              {/* Dynamic status tags */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-indigo/50 text-brand-charcoal border border-brand-charcoal/10 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  Noida, UP, India
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open to relocation
                </span>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-xs tracking-wider uppercase font-semibold text-brand-charcoal/60">
                  {PORTFOLIO_DATA.personal.name} — {PORTFOLIO_DATA.personal.title} &amp; {PORTFOLIO_DATA.personal.subtitle}
                </p>
                
                <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.75rem)] tracking-tight text-brand-charcoal leading-[1.1] md:leading-[1.12]">
                  Building software systems and AI applications.
                </h1>
                
                <p className="max-w-xl text-sm md:text-base text-brand-charcoal/80 font-light leading-relaxed">
                  {PORTFOLIO_DATA.personal.headline}
                </p>
                
                <p className="font-mono text-xs text-brand-charcoal/50 font-bold uppercase tracking-widest pt-2">
                  Java • Python • FastAPI • React • AI/LLM Applications
                </p>
              </div>

              {/* Action and Social links row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3">
                <a
                  href="#projects"
                  className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-beige text-xs font-semibold tracking-tight shadow-md transition-all duration-200"
                  id="hero-view-projects"
                >
                  View Projects
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-brand-charcoal/15 hover:bg-brand-charcoal/5 text-brand-charcoal text-xs font-semibold transition-all shadow-2xs"
                  id="hero-contact"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
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

            {/* Profile Portrait (Right on desktop) */}
            <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] aspect-[4/5] group">
                
                {/* Asymmetric layered pastel frames with offsets */}
                <div className="absolute inset-0 rounded-3xl bg-brand-lavender border border-brand-charcoal/10 -z-10 transform -rotate-3 transition-transform duration-300 group-hover:-rotate-5 shadow-xs" />
                <div className="absolute inset-0 rounded-3xl bg-brand-indigo/70 border border-brand-charcoal/10 -z-20 transform rotate-3 transition-transform duration-300 group-hover:rotate-5 shadow-xs" />
                
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

        {/* ABOUT / SUMMARY SECTION */}
        <section id="about" className="py-16 md:py-24 bg-white/40 border-y border-brand-charcoal/5 relative overflow-hidden px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            
            <div className="text-center space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-indigo/40 text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/15">
                Profile Summary
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-charcoal tracking-tight">
                Computer Science Graduate
              </h2>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <span className="absolute -top-10 -left-4 font-serif text-8xl text-brand-charcoal/5 select-none">“</span>
              <p className="text-sm md:text-base lg:text-lg text-brand-charcoal/85 font-light leading-relaxed text-justify sm:text-center relative z-10">
                {PORTFOLIO_DATA.personal.aboutBrief}
              </p>
              <span className="absolute -bottom-16 -right-4 font-serif text-8xl text-brand-charcoal/5 select-none">”</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8">
              <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-colors shadow-2xs text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-brand-charcoal/5 group-hover:text-brand-charcoal/10 transition-colors">
                  <Code2 className="w-12 h-12" />
                </div>
                <span className="block text-[9px] font-mono text-brand-charcoal/50 mb-1.5 uppercase tracking-widest font-bold">Languages</span>
                <span className="text-sm md:text-base font-display font-bold text-brand-charcoal block">
                  Java &amp; Python Focus
                </span>
                <p className="text-xs text-brand-charcoal/60 font-light mt-1.5 leading-relaxed">
                  Strong object-oriented fundamentals, concurrency paradigms, and robust scripting.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-colors shadow-2xs text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-brand-charcoal/5 group-hover:text-brand-charcoal/10 transition-colors">
                  <BrainCircuit className="w-12 h-12" />
                </div>
                <span className="block text-[9px] font-mono text-brand-charcoal/50 mb-1.5 uppercase tracking-widest font-bold">Problem Solving</span>
                <span className="text-sm md:text-base font-display font-bold text-brand-charcoal block">
                  Algorithms &amp; Core CS
                </span>
                <p className="text-xs text-brand-charcoal/60 font-light mt-1.5 leading-relaxed">
                  200+ solved algorithmic challenges demonstrating optimized, structured computation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-colors shadow-2xs text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-brand-charcoal/5 group-hover:text-brand-charcoal/10 transition-colors">
                  <Search className="w-12 h-12" />
                </div>
                <span className="block text-[9px] font-mono text-brand-charcoal/50 mb-1.5 uppercase tracking-widest font-bold">Specializations</span>
                <span className="text-sm md:text-base font-display font-bold text-brand-charcoal block">
                  Backend &amp; AI Integration
                </span>
                <p className="text-xs text-brand-charcoal/60 font-light mt-1.5 leading-relaxed">
                  Designing REST APIs, LLM pipeline structures, text comparison scanners, and databases.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-lavender text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/15">
              Technical Implementations
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-charcoal tracking-tight">
              Featured Projects
            </h2>
            <p className="text-brand-charcoal/70 text-xs md:text-sm font-light">
              Demonstrating algorithmic design, database integration, and software engineering principles.
            </p>
          </div>

          {/* PROJECT FILTER PILLS */}
          <div className="flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto pb-4">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all border ${
                  activeFilter === cat
                    ? "bg-brand-charcoal text-brand-beige border-brand-charcoal shadow-xs"
                    : "bg-white/60 text-brand-charcoal/80 border-brand-charcoal/10 hover:border-brand-charcoal/25 hover:bg-brand-charcoal/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PROJECTS GRID/COLLAGE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {filteredProjects.map((project) => {
              const featured = isFeatured(project.id);
              return (
                <div
                  key={project.id}
                  className={`bg-white/80 border border-brand-charcoal/10 hover:border-brand-charcoal/20 hover:shadow-xs transition-all rounded-3xl p-6 md:p-8 flex flex-col justify-between group ${
                    featured ? "lg:col-span-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" : "lg:col-span-1"
                  }`}
                >
                  {/* Schematic Mockup for featured layout */}
                  {featured ? (
                    <>
                      {/* Left side visual */}
                      <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-brand-charcoal/10 bg-white shadow-sm relative shrink-0">
                        <ProjectVisual id={project.id} title={project.title} category={project.category} />
                      </div>
                      
                      {/* Right side content */}
                      <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4 text-left">
                        <div className="space-y-3">
                          <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Featured Project</span>
                          <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-charcoal">
                            {project.title}
                          </h3>
                          <p className="text-brand-charcoal/80 text-xs md:text-sm font-light leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Pills */}
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="px-2 py-0.5 rounded bg-brand-charcoal/5 text-brand-charcoal border border-brand-charcoal/10 text-[9px] font-mono">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Engineering Highlights */}
                        <div className="space-y-2 border-t border-brand-charcoal/5 pt-4 text-left">
                          <span className="block font-mono text-[9px] text-brand-charcoal/40 uppercase tracking-widest font-bold">Key Engineering Points</span>
                          <ul className="space-y-1.5">
                            {project.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-brand-charcoal/80 leading-relaxed font-light">
                                <span className="w-4.5 h-4.5 rounded-full bg-brand-charcoal/10 text-brand-charcoal flex items-center justify-center font-mono text-[8px] shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-brand-charcoal/5 mt-4 flex items-center justify-between">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-brand-charcoal hover:underline font-mono font-bold"
                            id={`${project.id}-github-link`}
                          >
                            <Github className="w-4 h-4" />
                            GitHub ↗
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Standard vertical layout card for non-featured projects */
                    <div className="flex flex-col justify-between h-full space-y-6 text-left">
                      <div className="space-y-4">
                        {/* Schematic Visual */}
                        <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-brand-charcoal/10 bg-white shadow-sm relative">
                          <ProjectVisual id={project.id} title={project.title} category={project.category} />
                        </div>
                        
                        <div className="space-y-2">
                          <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Software Component</span>
                          <h3 className="font-display font-extrabold text-lg text-brand-charcoal">
                            {project.title}
                          </h3>
                          <p className="text-brand-charcoal/80 text-xs font-light leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Pills */}
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded bg-brand-charcoal/5 text-brand-charcoal border border-brand-charcoal/10 text-[9px] font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Engineering Highlights */}
                      <div className="space-y-2 border-t border-brand-charcoal/5 pt-4">
                        <span className="block font-mono text-[9px] text-brand-charcoal/40 uppercase tracking-widest font-bold">Key Engineering Points</span>
                        <ul className="space-y-1.5">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-brand-charcoal/80 leading-relaxed font-light">
                              <span className="w-4.5 h-4.5 rounded-full bg-brand-charcoal/10 text-brand-charcoal flex items-center justify-center font-mono text-[8px] shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-brand-charcoal/5 mt-4 flex items-center justify-between">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-brand-charcoal hover:underline font-mono font-bold"
                          id={`${project.id}-github-link`}
                        >
                          <Github className="w-4 h-4" />
                          GitHub ↗
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </section>

        {/* RESEARCH SECTION */}
        <section id="research" className="py-16 md:py-24 bg-white/40 border-y border-brand-charcoal/5 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-8 text-left">
            
            <div className="text-center md:text-left space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-peach text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/10">
                NLP Systems Investigation
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-charcoal tracking-tight">
                Academic Research
              </h2>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-charcoal/10 space-y-4 shadow-3xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-charcoal/5 pb-3">
                <span className="px-2.5 py-1 rounded bg-brand-charcoal/5 text-brand-charcoal font-mono text-[9px] font-bold border border-brand-charcoal/10 uppercase tracking-wider">
                  Status: {PORTFOLIO_DATA.research.status}
                </span>
                <span className="font-mono text-[9px] text-brand-charcoal/40 font-bold uppercase">NLP / Classification Study</span>
              </div>

              <h4 className="font-display font-extrabold text-base md:text-lg text-brand-charcoal leading-snug">
                {PORTFOLIO_DATA.research.title}
              </h4>
              
              <p className="text-brand-charcoal/80 text-xs md:text-sm font-light leading-relaxed">
                {PORTFOLIO_DATA.research.description}
              </p>
            </div>

          </div>
        </section>

        {/* TECHNICAL SKILLS SECTION */}
        <section id="skills" className="py-16 md:py-24 bg-white/50 border-b border-brand-charcoal/5 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-blue text-brand-charcoal font-mono text-xs uppercase border border-brand-charcoal/10">
                Acquired Proficiencies
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-brand-charcoal tracking-tight">
                Technical Skills Index
              </h2>
              <p className="text-brand-charcoal/60 text-xs md:text-sm font-light">
                A granular, honest lookup of my computer science capabilities, algorithm training, and development platforms.
              </p>
            </div>

            {/* Bento Grid Skills Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {PORTFOLIO_DATA.skills.map((category) => (
                <div
                  key={category.title}
                  className="p-6 rounded-2xl bg-white border border-brand-charcoal/10 transition-all shadow-3xs group hover:border-brand-charcoal/20"
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
                        className="px-2.5 py-1 rounded-lg bg-brand-beige/50 text-brand-charcoal border border-brand-charcoal/10 text-[10px] font-mono font-medium hover:bg-brand-charcoal hover:text-brand-beige transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* TIMELINE / EDUCATION & TRAINING SECTION */}
        <section id="journey" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Education timeline list (Left 6 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Academic Milestones</span>
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-charcoal mt-1">Education History</h3>
            </div>

            <div className="space-y-6 relative border-l border-brand-charcoal/10 pl-6 ml-2">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="relative space-y-2">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-charcoal border border-white" />
                  <div className="flex items-center justify-between text-[10px] font-mono text-brand-charcoal/50 font-semibold">
                    <span>{edu.duration}</span>
                    <span>{edu.location}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm md:text-base text-brand-charcoal">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-brand-charcoal/80">
                    {edu.institution}
                  </p>
                  <p className="text-[10px] font-mono text-brand-charcoal/60 uppercase">
                    {edu.metricLabel}: <strong className="text-brand-charcoal">{edu.metricValue}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trainings list (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Professional Preparation</span>
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-charcoal mt-1">Certifications &amp; Training</h3>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.training.map((train, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-brand-charcoal/10 shadow-3xs flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-xs md:text-sm text-brand-charcoal">
                      {train.title}
                    </h4>
                    <p className="text-[11px] text-brand-charcoal/60 mt-1">
                      {train.provider}
                    </p>
                  </div>
                  {train.status && (
                    <div className="mt-2.5 pt-2 border-t border-brand-charcoal/5 flex items-center justify-between">
                      <span className="font-mono text-[8px] text-brand-charcoal/40 uppercase">Course Status</span>
                      <span className="px-2 py-0.5 rounded bg-brand-charcoal/10 text-brand-charcoal font-mono text-[8px] font-bold uppercase">
                        {train.status}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ACHIEVEMENTS AND BEYOND CODING SECTION */}
        <section className="py-16 md:py-24 bg-white/40 border-y border-brand-charcoal/5 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            
            {/* Achievements */}
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-charcoal/10 space-y-6 text-left flex flex-col justify-between shadow-3xs">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-beige border border-brand-charcoal/10 text-brand-charcoal">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Selected Accomplishments</span>
                    <h3 className="font-display font-extrabold text-lg text-brand-charcoal">Achievements</h3>
                  </div>
                </div>

                <ul className="space-y-3.5 pt-2">
                  {PORTFOLIO_DATA.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ach.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Beyond Coding */}
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-charcoal/10 space-y-6 text-left flex flex-col justify-between shadow-3xs">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-beige border border-brand-charcoal/10 text-brand-charcoal">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-widest block">Personal Philosophy</span>
                    <h3 className="font-display font-extrabold text-lg text-brand-charcoal">{PORTFOLIO_DATA.beyondCoding.title}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {PORTFOLIO_DATA.beyondCoding.points.map((pt, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="font-display font-bold text-xs md:text-sm text-brand-charcoal">
                        {pt.title}
                      </h4>
                      <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                        {pt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          <div className="inline-block px-3 py-1 rounded-full bg-brand-charcoal text-brand-beige font-mono text-[10px] uppercase tracking-widest font-bold">
            Let's Connect
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-brand-charcoal tracking-tight leading-snug">
              Have a software engineering opportunity?
            </h2>
            <p className="text-xs md:text-sm text-brand-charcoal/70 font-light leading-relaxed">
              I am actively seeking software engineering positions and open to relocation opportunities. Let's discuss how my Java skills, analytical background, and problem-solving focus can align with your team.
            </p>
          </div>

          {/* Email Call-to-action */}
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
                className="p-3 rounded-xl border border-brand-charcoal/10 hover:bg-brand-charcoal/5 text-brand-charcoal transition-all cursor-pointer animate-none"
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
              Email copied to clipboard!
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
              Portfolio © 2026. Crafted with React &amp; Tailwind.
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
        /* Typographic placeholder art */
        <div className="w-full h-full bg-gradient-to-tr from-brand-lavender via-brand-indigo/60 to-brand-peach p-6 md:p-8 flex flex-col justify-between text-left select-none relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-brand-charcoal/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-brand-charcoal/10 border-dashed pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/40">PORTRAIT PLACEHOLDER</span>
            <BrainCircuit className="w-4 h-4 text-brand-charcoal/30" />
          </div>

          <div className="my-auto py-4 z-10 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-brand-charcoal text-brand-beige font-display font-extrabold text-2xl flex items-center justify-center shadow-md border-4 border-white">
              PS
            </div>
            <h2 className="font-display font-extrabold text-lg text-brand-charcoal mt-3 tracking-tight leading-none text-center">
              {PORTFOLIO_DATA.personal.name}
            </h2>
            <p className="font-mono text-[8px] text-brand-charcoal/50 uppercase tracking-widest mt-1.5 text-center font-bold">
              Java &amp; Applied AI Focus
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

// CUSTOM STYLIZED INTERACTIVE GRAPHICS COMPONENT FOR EACH PROJECT USING HTML & TAILWIND CSS
interface ProjectVisualProps {
  id: string;
  title: string;
  category: string;
}

function ProjectVisual({ id, title, category }: ProjectVisualProps) {
  return (
    <div className="w-full h-full relative select-none flex flex-col justify-between p-5 overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
      
      {/* Background gradients and meshes depending on ID */}
      {id === "job-hunter-ai" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo/35 via-white to-brand-blue/30 -z-10" />
          <div className="absolute inset-x-4 top-14 bottom-14 border border-brand-charcoal/10 bg-white/50 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-1.5">
              <span className="font-mono text-[8px] text-brand-charcoal/50 uppercase font-bold tracking-wider">Job Matching Dashboard</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1.5 my-auto text-left">
              <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                <span className="font-semibold text-brand-charcoal">Software Engineer</span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[8px] font-bold">92% Match</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                <span className="font-semibold text-brand-charcoal">Backend Engineer</span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[8px] font-bold">89% Match</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[7px] font-mono text-brand-charcoal/40 pt-1.5 border-t border-brand-charcoal/5">
              <span>Sources: 4 Integrated</span>
              <span>Engine: 100-Point Hybrid</span>
            </div>
          </div>
        </>
      )}

      {id === "team-task-manager" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-peach/30 via-white to-brand-lavender/25 -z-10" />
          <div className="absolute inset-x-5 top-14 bottom-14 border border-brand-charcoal/10 bg-white/95 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-1.5">
              <span className="font-mono text-[7px] font-bold text-brand-charcoal/50 uppercase">Task Assignment Queue</span>
              <span className="px-1.5 py-0.5 rounded bg-brand-charcoal/10 text-brand-charcoal text-[6px] font-bold font-mono">MONGODB</span>
            </div>
            <div className="space-y-1 my-auto text-left">
              <div className="bg-brand-beige/50 p-1 rounded border border-brand-charcoal/5 flex items-center justify-between text-[8px]">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-brand-charcoal" />
                  <span className="font-display font-bold text-brand-charcoal text-[8px]">API Routes &amp; JWT Auth</span>
                </div>
                <span className="font-mono text-[6px] text-brand-charcoal/40">Zod Validated</span>
              </div>
              <div className="bg-brand-beige/50 p-1 rounded border border-brand-charcoal/5 flex items-center justify-between text-[8px]">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-brand-charcoal/40" />
                  <span className="font-display font-medium text-brand-charcoal/60 text-[8px]">Mongoose Data Model</span>
                </div>
                <span className="font-mono text-[6px] text-brand-charcoal/40">MongoDB</span>
              </div>
            </div>
            <div className="flex justify-between text-[7px] font-mono text-brand-charcoal/40 border-t border-brand-charcoal/5 pt-1.5">
              <span>Engine: Next.js</span>
              <span>Access: Role-Based</span>
            </div>
          </div>
        </>
      )}

      {id === "resume-analyzer" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-lavender/30 via-white to-brand-peach/30 -z-10" />
          <div className="absolute inset-x-5 top-14 bottom-14 border border-brand-charcoal/10 bg-white/80 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-brand-charcoal/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-charcoal" />
                <span className="font-mono text-[8px] font-bold text-brand-charcoal/50">RESUME_PARSED</span>
              </div>
              <Check className="w-3 h-3 text-emerald-600" />
            </div>
            <div className="space-y-1 my-auto text-left pl-1">
              <span className="text-brand-charcoal/30 font-mono text-[8px] block">&lt;skills_matched&gt;</span>
              <div className="flex flex-wrap gap-1 pl-2">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[8px] font-mono">Python (100%)</span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[8px] font-mono">Gemini (84%)</span>
              </div>
              <span className="text-brand-charcoal/30 font-mono text-[8px] block">&lt;/skills_matched&gt;</span>
            </div>
            <div className="text-[7px] font-mono text-brand-charcoal/40 flex justify-between items-center border-t border-brand-charcoal/5 pt-1.5">
              <span>Parser: PyMuPDF</span>
              <span>API: Gemini-2.0-Flash</span>
            </div>
          </div>
        </>
      )}

      {id === "java-search-engine" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo/35 via-white to-brand-blue/30 -z-10" />
          <div className="absolute inset-x-4 top-14 bottom-14 border border-brand-charcoal/10 bg-white/50 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-1.5">
              <span className="font-mono text-[8px] text-brand-charcoal/50 uppercase font-bold tracking-wider">Java Document Ingestion</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1.5 my-auto text-left">
              <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                <span className="bg-brand-charcoal text-brand-beige px-1.5 py-0.5 rounded text-[8px] font-bold">FileLoader</span>
                <span className="text-brand-charcoal/40">→</span>
                <span className="text-brand-charcoal font-semibold bg-white/90 px-1.5 py-0.5 rounded border border-brand-charcoal/10">DirectoryStream</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                <span className="bg-brand-charcoal text-brand-beige px-1.5 py-0.5 rounded text-[8px] font-bold">Document</span>
                <span className="text-brand-charcoal/40">→</span>
                <span className="text-brand-charcoal font-semibold bg-white/90 px-1.5 py-0.5 rounded border border-brand-charcoal/10">Java NIO Ingestion</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[7px] font-mono text-brand-charcoal/40 pt-1.5 border-t border-brand-charcoal/5">
              <span>Platform: Java 17</span>
              <span>Status: OOP Foundation</span>
            </div>
          </div>
        </>
      )}

      {id === "healththread-mvp" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/30 via-white to-brand-lavender/25 -z-10" />
          <div className="absolute inset-x-5 top-14 bottom-14 border border-brand-charcoal/10 bg-white/95 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-1.5">
              <span className="font-mono text-[7px] font-bold text-brand-charcoal/50 uppercase">Vitals Monitoring</span>
              <TrendingUp className="w-3 h-3 text-brand-charcoal/50" />
            </div>
            <div className="h-10 flex items-end justify-between gap-1 px-1 my-auto">
              <div className="w-full bg-indigo-500 rounded-t h-[40%] relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[5px] font-mono text-brand-charcoal/40">72</span>
              </div>
              <div className="w-full bg-emerald-500 rounded-t h-[75%] relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[5px] font-mono text-brand-charcoal/40">120</span>
              </div>
              <div className="w-full bg-amber-500 rounded-t h-[55%] relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[5px] font-mono text-brand-charcoal/40">98%</span>
              </div>
            </div>
            <div className="flex justify-between text-[7px] font-mono text-brand-charcoal/40 border-t border-brand-charcoal/5 pt-1.5">
              <span>DB: Supabase</span>
              <span>UI: Recharts Dashboard</span>
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
