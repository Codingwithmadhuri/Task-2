import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  Briefcase,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  ArrowUp,
  ShoppingBag,
  Wrench,
  Sparkles,
  Sun,
  Moon,
  Layers,
  Check,
} from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function App() {
  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.documentElement.style.colorScheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
      document.documentElement.style.colorScheme = initialTheme;
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
  };

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  // Dedicated refs for accessible focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successBannerRef = useRef<HTMLDivElement>(null);

  // Close mobile navigation on Escape key press and return focus to toggle button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const validate = (): { isValid: boolean; firstErrorKey?: keyof FormState; newErrors: FormErrors } => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required. Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required. Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@example.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required. Please enter a topic for your message.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required. Please write your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    const errorKeys = Object.keys(newErrors) as (keyof FormState)[];

    return {
      isValid: errorKeys.length === 0,
      firstErrorKey: errorKeys[0],
      newErrors,
    };
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field when user begins correcting input
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionAttempted(true);
    const { isValid, firstErrorKey } = validate();

    if (!isValid) {
      // Focus error summary if present, otherwise direct to first invalid field
      setTimeout(() => {
        if (errorSummaryRef.current) {
          errorSummaryRef.current.focus();
        } else if (firstErrorKey) {
          document.getElementById(firstErrorKey)?.focus();
        }
      }, 50);
      return;
    }

    setIsSubmitting(true);
    // Simulate accessible submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionAttempted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTimeout(() => {
        successBannerRef.current?.focus();
      }, 50);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionAttempted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* WCAG 2.4.1: Bypass Blocks - Accessible skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Semantic Landmark: Header (Native <header> provides banner role implicitly) */}
      <header className="sticky top-0 z-40 bg-[var(--bg-canvas)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#about"
            className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[var(--text-primary)] hover:text-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1"
            aria-label="Madhuri Sontakke - Portfolio Home"
          >
            <span
              className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono text-sm font-bold shadow-xs"
              aria-hidden="true"
            >
              MS
            </span>
            <span className="tracking-tight">Madhuri Sontakke</span>
          </a>

          {/* Zone 2: Clean text navigation links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {[
              { href: '#about', label: 'About' },
              { href: '#skills', label: 'Skills' },
              { href: '#experience', label: 'Experience' },
              { href: '#projects', label: 'Projects' },
              { href: '#education', label: 'Education' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary Actions & Controls */}
          <div className="flex items-center gap-2">
            {/* Dynamic Theme Switcher Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" aria-hidden="true" />
              )}
            </button>

            {/* Social Links (Desktop) */}
            <div className="hidden sm:flex items-center gap-1 border-l border-[var(--border-subtle)] pl-2">
              <a
                href="https://github.com/Codingwithmadhuri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile (opens in a new tab)"
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/madhuri-sontakke15"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile (opens in a new tab)"
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center ml-1">
              <button
                ref={mobileMenuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 pt-2 pb-4 space-y-1 shadow-lg transition-colors"
          >
            {[
              { href: '#about', label: 'About' },
              { href: '#skills', label: 'Skills' },
              { href: '#experience', label: 'Experience' },
              { href: '#projects', label: 'Projects' },
              { href: '#education', label: 'Education' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded-md focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between px-3">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Codingwithmadhuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile (opens in a new tab)"
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/madhuri-sontakke15"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile (opens in a new tab)"
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Semantic Landmark: Main Content (Native <main> provides main role implicitly) */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* HERO / ABOUT SECTION */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative py-16 sm:py-24 border-b border-[var(--border-subtle)] overflow-hidden"
        >
          {/* Subtle background ambient glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent pointer-events-none"
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Typographic Introduction */}
              <div className="lg:col-span-7">
                {/* Zero-Pill Unboxed Metadata Kicker */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-accent)] mb-4 tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Frontend Engineering</span>
                  <span aria-hidden="true">·</span>
                  <span>BCA Data Science</span>
                </div>

                {/* Single top-level h1 for the portfolio */}
                <h1
                  id="about-heading"
                  className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight"
                >
                  Hi, I'm <span className="text-blue-500">Madhuri Sontakke</span>
                </h1>

                <p className="mt-4 text-xl sm:text-2xl font-medium text-[var(--text-secondary)] leading-snug">
                  Frontend Developer &amp; <abbr title="Bachelor of Computer Application">BCA</abbr> (Data Science) Student
                </p>

                <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
                  Currently pursuing 3rd year in <strong>Bachelor of Computer Application – Data Science</strong> at <strong>Rajasthan Aryan Arts College, Washim</strong>. Dedicated to building accessible, responsive, and performant web interfaces with semantic HTML5, modern CSS3, JavaScript, and user-centered design systems.
                </p>

                {/* Primary Call-to-actions with clear accessible touch targets (WCAG 2.5.8 >= 44px) */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#projects"
                    className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                    <span>View Major Project (QuickCart)</span>
                  </a>

                  <a
                    href="#contact"
                    className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] font-semibold text-sm border border-[var(--border-default)] transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Contact Me</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://github.com/Codingwithmadhuri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--border-default)] transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
                      aria-label="Madhuri Sontakke GitHub profile (opens in a new tab)"
                    >
                      <Github className="w-5 h-5" aria-hidden="true" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/madhuri-sontakke15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--border-default)] transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
                      aria-label="Madhuri Sontakke LinkedIn profile (opens in a new tab)"
                    >
                      <Linkedin className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Fidelity Profile Card with Generated Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-md">
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-[var(--bg-surface-elevated)] relative border border-[var(--border-subtle)]">
                    <img
                      src="/src/assets/images/madhuri_profile.jpg"
                      alt="Portrait photograph of Madhuri Sontakke, Frontend Developer and BCA Data Science student"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Resilient fallback container if image asset is unavailable
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)]">Madhuri Sontakke</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">Rajasthan Aryan Arts College, Washim</p>
                      </div>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                        <span>3rd Year</span>
                      </span>
                    </div>

                    <div className="mt-3 text-xs text-[var(--text-muted)] flex items-center gap-2">
                      <span>BCA Data Science</span>
                      <span aria-hidden="true">·</span>
                      <span>Washim, Maharashtra</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section
          id="skills"
          aria-labelledby="skills-heading"
          className="py-16 sm:py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] transition-colors"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2
                id="skills-heading"
                className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight"
              >
                Skills &amp; Technical Tools
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
                Accurate inventory of core frontend web technologies, programming languages, and developer tools.
              </p>
            </div>

            {/* CSS Grid with Auto-fit Architecture */}
            <div className="mt-10 skills-grid">
              {/* Category 1: Frontend & Web Technologies */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm hover:border-[var(--border-default)] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Frontend Development</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">Core web development competencies</p>
                <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                    <span>HTML5</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                    <span>CSS3</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                    <span>JavaScript</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                    <span>Responsive Web Design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                    <span><abbr title="User Interface / User Experience">UI/UX</abbr></span>
                  </li>
                </ul>
              </div>

              {/* Category 2: Programming Languages */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm hover:border-[var(--border-default)] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Terminal className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Programming Languages</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">Core languages &amp; syntax</p>
                <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                    <span>C</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                    <span>C++</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                    <span>Java</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                    <span>Python</span>
                  </li>
                </ul>
              </div>

              {/* Category 3: Tools */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm hover:border-[var(--border-default)] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  <Wrench className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Tools &amp; Environments</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">Developer toolchain</p>
                <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    <span>Git</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    <span>GitHub</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    <span>Visual Studio Code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    <span>Chrome DevTools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
          id="experience"
          aria-labelledby="experience-heading"
          className="py-16 sm:py-20 border-b border-[var(--border-subtle)] transition-colors"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2
                id="experience-heading"
                className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight"
              >
                Professional Experience
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
                Supervised internship experience in frontend software development.
              </p>
            </div>

            {/* Semantic Article for Experience */}
            <article
              aria-labelledby="synapseit-role-heading"
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 hover:border-[var(--border-default)] transition-colors shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    <Briefcase className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3
                      id="synapseit-role-heading"
                      className="text-xl font-bold text-[var(--text-primary)]"
                    >
                      Frontend Developer Intern
                    </h3>
                    <p className="text-base text-blue-600 dark:text-blue-400 font-medium">
                      SynapseIT Solution
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
                  <span>
                    <time dateTime="2026-03">March 2026</time> – <time dateTime="2026-04">April 2026</time>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Remote</span>
                </div>
              </div>

              <div className="mt-6 text-[var(--text-secondary)] space-y-3 leading-relaxed">
                <p>
                  Worked as a <strong>Frontend Developer Intern</strong> contributing to client-side interface development, component structuring, and UI responsiveness.
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm text-[var(--text-secondary)]">
                  <li>Implemented responsive web designs ensuring cross-browser consistency and mobile usability.</li>
                  <li>Applied UI/UX principles and semantic HTML5 to improve code readability, accessibility, and maintenance.</li>
                  <li>Used Git &amp; GitHub for collaborative version control and Chrome DevTools for client-side debugging.</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* FEATURED PROJECT SECTION */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="py-16 sm:py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] transition-colors"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2
                id="projects-heading"
                className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight"
              >
                Featured Project
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
                Production-ready web application showcasing end-to-end frontend craftsmanship.
              </p>
            </div>

            {/* Semantic Article for QuickCart with Bento Layout */}
            <article
              aria-labelledby="quickcart-project-title"
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-md hover:border-[var(--border-default)] transition-colors"
            >
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
                      <ShoppingBag className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3
                        id="quickcart-project-title"
                        className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
                      >
                        QuickCart — Modern Ecommerce Platform
                      </h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                        Domain: E-commerce Web Application
                      </p>
                    </div>
                  </div>

                  <div>
                    <a
                      href="https://quickcartshopping.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <span>Live Project</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only"> (opens QuickCart at quickcartshopping.netlify.app in a new tab)</span>
                    </a>
                  </div>
                </div>

                {/* Visual Project Banner & Description Grid */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] aspect-video">
                    <img
                      src="/src/assets/images/quickcart_preview.jpg"
                      alt="QuickCart Modern Ecommerce Platform live interface mockup displaying product catalog and clean UI"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <p className="text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg">
                      A comprehensive, modern e-commerce web platform engineered with modular component architecture, robust client-side state handling, dynamic cart operations, and smooth interactive UI patterns.
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                        Project Technologies &amp; Libraries
                      </h4>
                      <ul
                        aria-label="Technologies used in QuickCart"
                        className="flex flex-wrap gap-2"
                      >
                        {[
                          'React.js',
                          'TypeScript',
                          'Tailwind CSS',
                          'Vite',
                          'React Router',
                          'Context API',
                          'TanStack Query',
                          'Framer Motion',
                          'Radix UI',
                          'Lucide Icons',
                          'Vitest',
                        ].map((tech) => (
                          <li
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] shadow-xs"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Key Architectural Highlights */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-subtle)]">
                  <div className="p-4 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">State Management</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">Context API &amp; TanStack Query for server/client synchronization</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">Accessible UI System</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">Radix UI accessible primitives with Tailwind CSS styling</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">Quality &amp; Tooling</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">Vitest component testing suite powered by Vite build pipeline</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section
          id="education"
          aria-labelledby="education-heading"
          className="py-16 sm:py-20 border-b border-[var(--border-subtle)] transition-colors"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2
                id="education-heading"
                className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight"
              >
                Education
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
                Academic foundation in computer applications and data science.
              </p>
            </div>

            <article
              aria-labelledby="education-degree-title"
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 hover:border-[var(--border-default)] transition-colors shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shrink-0">
                  <GraduationCap className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    id="education-degree-title"
                    className="text-xl font-bold text-[var(--text-primary)]"
                  >
                    Bachelor of Computer Application – Data Science
                  </h3>
                  <p className="text-base text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    Rajasthan Aryan Arts College, Washim
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Academic Status: <strong>3rd Year</strong> (Undergraduate)
                  </p>

                  <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] text-sm text-[var(--text-secondary)]">
                    <p>
                      Academic coursework covering Data Structures and Algorithms (<abbr title="Data Structures and Algorithms">DSA</abbr>), Object-Oriented Programming (<abbr title="Object-Oriented Programming">OOP</abbr>), Database Fundamentals, and Modern Web Technologies.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* CONTACT SECTION WITH ACCESSIBLE FORM */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-16 sm:py-20 bg-[var(--bg-surface-subtle)] transition-colors"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2
                id="contact-heading"
                className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight"
              >
                Get In Touch
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
                Have a project inquiry, internship opportunity, or question? Send a message through this accessible contact form.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Contact Information & Links */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Direct Contact &amp; Profiles</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 shrink-0">
                        <Github className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">GitHub</p>
                        <a
                          href="https://github.com/Codingwithmadhuri"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[var(--text-primary)] hover:text-blue-500 underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                          github.com/Codingwithmadhuri
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 shrink-0">
                        <Linkedin className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">LinkedIn</p>
                        <a
                          href="https://www.linkedin.com/in/madhuri-sontakke15"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[var(--text-primary)] hover:text-blue-500 underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                          linkedin.com/in/madhuri-sontakke15
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 shrink-0">
                        <ExternalLink className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Live Ecommerce Project</p>
                        <a
                          href="https://quickcartshopping.netlify.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[var(--text-primary)] hover:text-blue-500 underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                          quickcartshopping.netlify.app
                          <span className="sr-only"> (opens QuickCart in a new tab)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-muted)] shadow-sm">
                  <p className="font-semibold text-[var(--text-primary)]">Accessibility &amp; Responsive Commitment</p>
                  <p className="mt-1 text-xs leading-relaxed">
                    This portfolio adheres to WCAG 2.1 &amp; 2.2 AA standards, ensuring full keyboard navigability, logical tab sequence, explicit form labels, ARIA landmarks, mobile-first responsive layout, and high-contrast color fidelity.
                  </p>
                </div>
              </div>

              {/* Accessible Form */}
              <div className="lg:col-span-7">
                <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 shadow-sm">
                  {/* Status Notification - Live Region */}
                  <div
                    aria-live="polite"
                    aria-atomic="true"
                    role="status"
                    className="mb-6"
                  >
                    {isSubmitted && (
                      <div
                        ref={successBannerRef}
                        tabIndex={-1}
                        className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                          <div className="space-y-2">
                            <h3 className="font-bold text-base text-emerald-950 dark:text-white">Message Sent Successfully!</h3>
                            <p className="text-sm text-emerald-800 dark:text-emerald-200/90 leading-relaxed">
                              Thank you, your message has been received. Madhuri will review your inquiry and get back to you shortly.
                            </p>
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={handleReset}
                                className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
                              >
                                <span>Send Another Message</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error Summary Alert for WCAG 3.3.1 Form Error Handling */}
                  {submissionAttempted && Object.keys(errors).length > 0 && (
                    <div
                      ref={errorSummaryRef}
                      tabIndex={-1}
                      role="alert"
                      aria-labelledby="error-summary-heading"
                      className="p-4 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" aria-hidden="true" />
                        <h3 id="error-summary-heading" className="font-semibold text-sm text-red-950 dark:text-white">
                          There {Object.keys(errors).length === 1 ? 'is 1 issue' : `are ${Object.keys(errors).length} issues`} with your submission
                        </h3>
                      </div>
                      <ul className="mt-2.5 space-y-1.5 text-xs text-red-800 dark:text-red-300 list-disc list-inside">
                        {errors.name && (
                          <li>
                            <a
                              href="#name"
                              onClick={(e) => {
                                e.preventDefault();
                                nameInputRef.current?.focus();
                              }}
                              className="underline underline-offset-2 hover:text-red-950 dark:hover:text-white focus-visible:ring-1 focus-visible:ring-red-300 rounded"
                            >
                              <strong>Full Name:</strong> {errors.name}
                            </a>
                          </li>
                        )}
                        {errors.email && (
                          <li>
                            <a
                              href="#email"
                              onClick={(e) => {
                                e.preventDefault();
                                emailInputRef.current?.focus();
                              }}
                              className="underline underline-offset-2 hover:text-red-950 dark:hover:text-white focus-visible:ring-1 focus-visible:ring-red-300 rounded"
                            >
                              <strong>Email Address:</strong> {errors.email}
                            </a>
                          </li>
                        )}
                        {errors.subject && (
                          <li>
                            <a
                              href="#subject"
                              onClick={(e) => {
                                e.preventDefault();
                                subjectInputRef.current?.focus();
                              }}
                              className="underline underline-offset-2 hover:text-red-950 dark:hover:text-white focus-visible:ring-1 focus-visible:ring-red-300 rounded"
                            >
                              <strong>Subject:</strong> {errors.subject}
                            </a>
                          </li>
                        )}
                        {errors.message && (
                          <li>
                            <a
                              href="#message"
                              onClick={(e) => {
                                e.preventDefault();
                                messageInputRef.current?.focus();
                              }}
                              className="underline underline-offset-2 hover:text-red-950 dark:hover:text-white focus-visible:ring-1 focus-visible:ring-red-300 rounded"
                            >
                              <strong>Message:</strong> {errors.message}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    aria-labelledby="contact-heading"
                    className="space-y-5"
                  >
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                      >
                        Full Name <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error name-hint' : 'name-hint'}
                        placeholder="e.g. Jane Doe"
                        autoComplete="name"
                        autoCapitalize="words"
                        className={`w-full px-4 py-2.5 rounded-lg bg-[var(--bg-input)] border ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                            : 'border-[var(--border-default)] focus:border-blue-500'
                        } text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                      />
                      <p id="name-hint" className="mt-1 text-xs text-[var(--text-muted)]">
                        Enter your first and last name or organization.
                      </p>
                      {errors.name && (
                        <p
                          id="name-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                      >
                        Email Address <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        ref={emailInputRef}
                        type="email"
                        id="email"
                        name="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error email-hint' : 'email-hint'}
                        placeholder="e.g. name@company.com"
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        className={`w-full px-4 py-2.5 rounded-lg bg-[var(--bg-input)] border ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                            : 'border-[var(--border-default)] focus:border-blue-500'
                        } text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                      />
                      <p id="email-hint" className="mt-1 text-xs text-[var(--text-muted)]">
                        We will use this address to respond to you.
                      </p>
                      {errors.email && (
                        <p
                          id="email-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                      >
                        Subject <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        ref={subjectInputRef}
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-invalid={errors.subject ? 'true' : 'false'}
                        aria-describedby={errors.subject ? 'subject-error subject-hint' : 'subject-hint'}
                        placeholder="e.g. Frontend Internship Opportunity"
                        autoComplete="off"
                        className={`w-full px-4 py-2.5 rounded-lg bg-[var(--bg-input)] border ${
                          errors.subject
                            ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                            : 'border-[var(--border-default)] focus:border-blue-500'
                        } text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                      />
                      <p id="subject-hint" className="mt-1 text-xs text-[var(--text-muted)]">
                        Brief summary of your inquiry.
                      </p>
                      {errors.subject && (
                        <p
                          id="subject-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.subject}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Area */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                      >
                        Message <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <textarea
                        ref={messageInputRef}
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error message-hint' : 'message-hint'}
                        placeholder="Write your message here..."
                        spellCheck={true}
                        className={`w-full px-4 py-2.5 rounded-lg bg-[var(--bg-input)] border ${
                          errors.message
                            ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                            : 'border-[var(--border-default)] focus:border-blue-500'
                        } text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 resize-y`}
                      />
                      <p id="message-hint" className="mt-1 text-xs text-[var(--text-muted)]">
                        Please provide at least 10 characters detailing your request.
                      </p>
                      {errors.message && (
                        <p
                          id="message-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="touch-target w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                            aria-hidden="true"
                          />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" aria-hidden="true" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Semantic Landmark: Footer (Native <footer> provides contentinfo role implicitly) */}
      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-8 text-[var(--text-muted)] text-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[var(--text-primary)] font-medium">
              Madhuri Sontakke &copy; {new Date().getFullYear()}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Frontend Developer • BCA Data Science, Rajasthan Aryan Arts College, Washim
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Codingwithmadhuri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
            >
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href="https://www.linkedin.com/in/madhuri-sontakke15"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
