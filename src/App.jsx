import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';

export default function App() {
  const [showNav, setShowNav] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showProfileInNav, setShowProfileInNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  // LENIS SMOOTH SCROLL
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // SCROLL LOGIC
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (currentScrollY > lastScrollY.current) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;

      const heroHeight = window.innerHeight * 0.7;
      setShowProfileInNav(currentScrollY > heroHeight);

      setShowTopBtn(currentScrollY > docHeight - 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const skills = [
    'HTML5 & CSS3', 'SCSS', 'JavaScript (ES6+)', 'Responsive Web Design',
    'WordPress Development', 'Elementor Page Builder', 'Custom CSS & Animations',
    'SEO Optimization', 'On-Page SEO', 'Keyword Optimization',
    'Meta Tags & URL Slug Optimization', 'Google Search Console Management',
    'Sitemap Setup & Indexing Optimization', 'Website Performance Optimization',
    'Image Optimization & WebP Conversion', 'UI/UX Enhancement',
    'Git & GitHub', 'Adobe Photoshop', 'Technical Troubleshooting',
    'CRM Technical Support'
  ];

  const projects = [
    {
      title: 'Get Wrecked Beach & Sports Bar',
      description: 'Business website with responsive design and optimization.',
      link: 'https://getwreckedbeachandsportsbar.com/',
      image: 'src/assets/getwrecked.png',
    },
    {
      title: 'Joyno Media Inc',
      description: 'Modern website experience with performance optimization.',
      link: 'https://joynomedia.com/',
      image: 'src/assets/joyno.png',
    },
    {
      title: 'Casa Amorosa',
      description: 'Professional business website with SEO enhancements.',
      link: 'https://casaamorosagroupllc.com/',
      image: 'src/assets/casa1.png',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden" style={{
       backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')"
     }}>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-[#0B1120]/70 backdrop-blur-xl border-b border-white/10 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <img
              src="src/assets/unnamed.jpg"
              className={`rounded-full border border-white/10 transition-all duration-300 ${showProfileInNav ? 'w-12 h-12 opacity-100' : 'w-0 h-0 opacity-0'
                }`}
            />
            <div>
              <h1 className="font-bold">MARK ELIEZON ANIÑON</h1>
              <p className="text-sm text-gray-400">Web Developer • IT Support</p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-6 text-sm text-gray-300">
            {['about', 'skills', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="hover:text-pink-400"
              >
                {id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* BURGER */}
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden px-6 overflow-hidden transition-all duration-300 ease-in-out bg-[#0B1120]/95 border-b border-white/10
  ${menuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}
        >
          <div className="flex flex-col gap-4">
            {['about', 'skills', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => {
                  scrollToSection(id);
                  setMenuOpen(false);
                }}
                className="text-left hover:text-pink-400 transition"
              >
                {id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 min-h-screen flex items-center pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="order-2 lg:order-1">
            <h2 className="text-7xl md:text-7xl font-black leading-tight">
              Building
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400 py-3">
                modern digital
              </span>
              experiences.
            </h2>

            <p className="text-gray-300 mt-6 text-lg max-w-xl">
              BSIT graduate focused on frontend development, WordPress, SEO optimization, and IT support.
            </p>

            <div className="flex flex-wrap gap-4 py-10">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 font-semibold shadow-2xl hover:scale-105 transition">
                View Resume
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* PROFILE */}
          <div className="text-center lg:text-right space-y-4 mx-auto order-1 lg:order-2">
            <img
              src="src/assets/unnamed.jpg"
              className="w-[350px] h-[350px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] rounded-full lg:ml-auto border-4 border-white/10"
            />

            <h3 className="text-3xl font-bold">Mark Eliezon Aniñon</h3>
            <p className="text-gray-400">Frontend • WordPress • IT Support</p>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-32">
        <h3 className="text-4xl font-bold mb-6">About</h3>
        <h3 className="text-1xl font-bold mb-3">
    More than just a developer.
  </h3>
         <p className="text-gray-300 text-lg leading-relaxed max-w-4xl space-y-4">
    I am a BSIT graduate and a web developer focused on building clean, responsive,
    and high-performing digital experiences. I specialize in frontend development,
    WordPress customization, SEO optimization, and technical support.
    <br /><br />
    My experience includes developing business websites, improving page speed,
    optimizing search engine visibility, and maintaining production websites for real clients.
    I also handle troubleshooting, UI improvements, and system support when needed.
    <br /><br />
    I enjoy turning complex problems into simple, user-friendly solutions and
    continuously improving both design and performance to deliver better user experiences.
  </p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-7xl mx-auto px-6 py-32">
        <h3 className="text-4xl font-bold mb-10">Skills</h3>
         <p className="text-gray-400 mb-10 max-w-2xl">
    A mix of frontend development, WordPress customization, SEO strategy, and technical support skills used in real projects.
  </p>

        <div className="grid md:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <div
              key={i}
              className="p-4 bg-white/5 border border-white/10 rounded-xl transition duration-300 hover:scale-105 hover:bg-white/10 hover:border-pink-500/40"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-32">
         <div className="mb-10">
    <p className="text-pink-400 tracking-[0.3em] text-xs mb-4">
      PROJECTS
    </p>

    <h3 className="text-4xl font-bold mb-2">
      Selected Work.
    </h3>

    <p className="text-gray-400 max-w-xl">
      A collection of websites and projects I’ve built focusing on performance, design, and user experience.
    </p>
  </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group bg-white/5 border border-white/10 rounded-[28px] overflow-hidden transition duration-500 hover:-translate-y-4 hover:scale-[1.02]"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={p.image}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h4 className="text-xl font-bold">{p.title}</h4>
                <p className="text-gray-300 mb-4">{p.description}</p>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300"
                >
                  Visit Site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-white/10 border border-white/10 rounded-[36px] p-10 backdrop-blur-xl">

          <div className="text-center mb-10">
            <h3 className="text-5xl font-black mb-5">
              Let’s build something great.
            </h3>
            <p className="text-gray-300">
              Open for opportunities and freelance work.
            </p>
          </div>

          {/* FORM */}
         <form
            className="max-w-2xl mx-auto grid gap-4"
            action="https://formspree.io/f/xlgzzplo"
            method="POST"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" className="p-4 rounded-2xl bg-black/30 border border-white/10" placeholder="Your Name" />
              <input name="email" className="p-4 rounded-2xl bg-black/30 border border-white/10" placeholder="Your Email" />
            </div>

            <input name="subject" className="p-4 rounded-2xl bg-black/30 border border-white/10" placeholder="Subject" />

            <textarea name="message" rows="5" className="p-4 rounded-2xl bg-black/30 border border-white/10 resize-none" placeholder="Message" />

            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 hover:scale-105 transition">
              Send Message
            </button>
          </form>

          {/* SOCIALS */}
          <div className="mt-10 flex flex-col items-center gap-4">

            <p className="text-gray-400 text-sm tracking-[0.3em]">
              CONNECT WITH ME
            </p>

            <div className="flex flex-wrap justify-center gap-4">

              <a href="https://facebook.com/eliezon.ugsimar" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition">
                Facebook
              </a>

              <a href="https://instagram.com/markeliezon" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition">
                Instagram
              </a>

              <a href="https://www.linkedin.com/in/ani%C3%B1on-mark-eliezon-u-a1b6ab2b9/" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition">
                LinkedIn
              </a>

              <a href="https://github.com/markeliezon" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition">
                GitHub
              </a>

              <a href="mailto:markeliezon12@gmail.com" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition">
                Email
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* TOP BUTTON */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-pink-500 px-4 py-3 rounded-xl"
        >
          ↑
        </button>
      )}

    </div>
  );
}
