import React from "react";

    const services = [
      {
        number: "01",
        title: "Content Creation",
        text: "Social concepts, campaign assets, and brand storytelling designed to feel current and impossible to scroll past."
      },
      {
        number: "02",
        title: "Website Design",
        text: "Stronger digital homes for brands that need to look more intentional, premium, and conversion-ready."
      },
      {
        number: "03",
        title: "Creative Direction",
        text: "Visual systems and rollout direction that keep content, messaging, and web design speaking the same language."
      }
    ];

    const process = [
      {
        title: "Find the angle",
        text: "We sharpen the positioning first so the visuals and copy have a clear job to do."
      },
      {
        title: "Build the system",
        text: "We design the hero moments, content structure, and web experience around a cohesive visual direction."
      },
      {
        title: "Launch polished",
        text: "You leave with stronger creative, a cleaner web presence, and assets that can keep scaling with you."
      }
    ];

    const trustLogos = [
      { name: "Adam H", src: "assets/client-logos/adamh-logo.png" },
      { name: "Ascend Music Academy", src: "assets/client-logos/ascend-music-academy-logo.png" },
      { name: "Delaware Rising", src: "assets/client-logos/delaware-rising-logo.png" },
      { name: "Firelands United", src: "assets/client-logos/firelands-united-logo.png" },
      { name: "Greater Firelands", src: "assets/client-logos/greater-firelands-logo.png" },
      { name: "HomeBuys", src: "assets/client-logos/homebuys-logo.png" },
      { name: "Instinct Identity", src: "assets/client-logos/instinct-identity-logo.png" },
      { name: "Keller Williams", src: "assets/client-logos/keller-williams-logo.png" },
      { name: "Main Squeeze", src: "assets/client-logos/main-squeeze-logo.png" },
      { name: "Marion Crawford Prevention Programs", src: "assets/client-logos/marion-crawford-prevention-programs-logo.png" },
      { name: "Nucamp", src: "assets/client-logos/nucamp-logo.png" },
      { name: "Pure Life Health", src: "assets/client-logos/pure-life-health-logo.png" },
      { name: "Reflektions", src: "assets/client-logos/reflektions-logo.png" },
      { name: "Retie", src: "assets/client-logos/retie-logo.png" },
      { name: "Sauced Pizza", src: "assets/client-logos/sauced-pizza-logo.png" },
      { name: "St. Andrews", src: "assets/client-logos/st-andrews-logo.png" },
      { name: "Terra State", src: "assets/client-logos/terra-state-logo.png" },
      { name: "Topped", src: "assets/client-logos/topped-logo.png" }
    ];

    const galleryCardsTop = [
      { label: "Bluebird", company: "Bluebird", url: "https://bluebird.ooo/", background: "#29486e", image: "assets/client-cards/bluebird.jpg", offset: 8, delay: "0s" },
      { label: "Lakeside", company: "Lakeside Laundromat", url: "https://lakesidelaundromat.com/", background: "#9c6f4e", image: "assets/client-cards/lakeside-laundromat.jpg", offset: 15, delay: "0.4s" },
      { label: "Launch", background: "linear-gradient(160deg, #5f8f4f 0%, #88ba73 46%, #e6f3dc 100%)", offset: 5, delay: "0.8s" },
      { label: "Caption Lab", company: "The Caption Lab", url: "https://www.thecaptionlab.com/", background: "#574070", image: "assets/client-cards/the-caption-lab.jpg", offset: 14, delay: "1.2s" },
      { label: "Wash Co", company: "The Wash Company", background: "#8e6048", image: "assets/client-cards/the-wash-company.jpg", offset: 7, delay: "1.6s" },
      { label: "UX", background: "linear-gradient(160deg, #c8ced8 0%, #e4d7d1 46%, #f7f4ef 100%)", offset: 13, delay: "2s" },
      { label: "Identity", background: "linear-gradient(160deg, #e28b8b 0%, #d43e3e 42%, #76b6e5 100%)", offset: 4, delay: "2.4s" },
      { label: "Firelands", company: "Firelands United", url: "https://firelandsunited.com/", background: "#334164", image: "assets/client-cards/firelands-united.jpg", offset: 11, delay: "2.8s" },
      { label: "Website", background: "linear-gradient(160deg, #fad046 0%, #f9f68a 38%, #ffb03b 100%)", offset: 6, delay: "3.2s" },
      { label: "Studio", background: "linear-gradient(160deg, #d96932 0%, #f48c5a 42%, #6a271c 100%)", offset: 12, delay: "3.6s" }
    ];

    const galleryCardsBottom = [
      { label: "Content", background: "linear-gradient(160deg, #58a8aa 0%, #9fe3d9 44%, #f5f0d4 100%)", offset: 11, delay: "0.2s" },
      { label: "Campaign", background: "linear-gradient(160deg, #f47e53 0%, #ffb06e 44%, #fff0d7 100%)", offset: 5, delay: "0.6s" },
      { label: "Bluebird", company: "Bluebird", url: "https://bluebird.ooo/", background: "#29486e", image: "assets/client-cards/bluebird.jpg", offset: 12, delay: "1s" },
      { label: "Social", background: "linear-gradient(160deg, #6aafe5 0%, #a6d6f6 42%, #f4d576 100%)", offset: 7, delay: "1.4s" },
      { label: "Lakeside", company: "Lakeside Laundromat", url: "https://lakesidelaundromat.com/", background: "#9c6f4e", image: "assets/client-cards/lakeside-laundromat.jpg", offset: 14, delay: "1.8s" },
      { label: "Caption Lab", company: "The Caption Lab", url: "https://www.thecaptionlab.com/", background: "#574070", image: "assets/client-cards/the-caption-lab.jpg", offset: 6, delay: "2.2s" },
      { label: "Digital", background: "linear-gradient(160deg, #05050a 0%, #101628 42%, #5464ed 100%)", offset: 10, delay: "2.6s" },
      { label: "Wash Co", company: "The Wash Company", background: "#8e6048", image: "assets/client-cards/the-wash-company.jpg", offset: 4, delay: "3s" },
      { label: "Firelands", company: "Firelands United", url: "https://firelandsunited.com/", background: "#334164", image: "assets/client-cards/firelands-united.jpg", offset: 13, delay: "3.4s" },
      { label: "Studio", background: "linear-gradient(160deg, #5d2fa0 0%, #8a55d6 42%, #f2b3ff 100%)", offset: 8, delay: "3.8s" }
    ];

    const heroCards = [
      {
        key: "lead",
        className: "hero-card hero-card--lead",
        style: {
          "--card-x": "242px",
          "--card-y": "22px",
          "--card-rotate": "6deg"
        },
        company: "The Wash Company",
        motion: {
          start: { x: -40, y: 280, scale: 0.9, rotate: 7 },
          cp1: { x: 36, y: 176 },
          cp2: { x: 176, y: 40 },
          end: { x: 242, y: 22, scale: 1, rotate: 6 },
          duration: 1520,
          delay: 140
        },
        image: "assets/client-cards/the-wash-company.jpg",
        circle: { left: "16px", top: "16px", background: "rgba(241, 246, 235, 0.92)" },
        title: "twillful",
        accent: "site"
      },
      {
        key: "a",
        className: "hero-card hero-card--a",
        style: {
          "--card-x": "-286px",
          "--card-y": "24px",
          "--card-rotate": "-11deg"
        },
        company: "Lakeside Laundromat",
        url: "https://lakesidelaundromat.com/",
        motion: {
          start: { x: 224, y: 24, scale: 0.97, rotate: 6 },
          cp1: { x: 168, y: 28 },
          cp2: { x: -110, y: 38 },
          end: { x: -286, y: 24, scale: 1, rotate: -11 },
          duration: 1440,
          delay: 1140
        },
        image: "assets/client-cards/lakeside-laundromat.jpg",
        circle: { right: "18px", top: "18px", background: "rgba(255,255,255,0.42)" },
        title: "ux",
        accent: "flow"
      },
      {
        key: "b",
        className: "hero-card hero-card--b",
        style: {
          "--card-x": "-166px",
          "--card-y": "16px",
          "--card-rotate": "-5deg"
        },
        company: "Bluebird",
        url: "https://bluebird.ooo/",
        motion: {
          start: { x: 224, y: 24, scale: 0.97, rotate: 6 },
          cp1: { x: 176, y: 24 },
          cp2: { x: -12, y: 28 },
          end: { x: -166, y: 16, scale: 1, rotate: -5 },
          duration: 1460,
          delay: 1200
        },
        image: "assets/client-cards/bluebird.jpg",
        circle: { left: "22px", bottom: "18px", background: "rgba(255,244,225,0.65)" },
        title: "brand",
        accent: "story"
      },
      {
        key: "c",
        className: "hero-card hero-card--c",
        style: {
          "--card-x": "-42px",
          "--card-y": "12px",
          "--card-rotate": "-1deg"
        },
        company: "The Caption Lab",
        url: "https://www.thecaptionlab.com/",
        motion: {
          start: { x: 224, y: 24, scale: 0.97, rotate: 6 },
          cp1: { x: 184, y: 22 },
          cp2: { x: 70, y: 20 },
          end: { x: -42, y: 12, scale: 1, rotate: -1 },
          duration: 1480,
          delay: 1260
        },
        image: "assets/client-cards/the-caption-lab.jpg",
        circle: { right: "18px", bottom: "18px", background: "rgba(255,255,255,0.45)" },
        title: "copy",
        accent: "voice"
      },
      {
        key: "d",
        className: "hero-card hero-card--d",
        style: {
          "--card-x": "108px",
          "--card-y": "16px",
          "--card-rotate": "2deg"
        },
        company: "Firelands United",
        url: "https://firelandsunited.com/",
        motion: {
          start: { x: 224, y: 24, scale: 0.97, rotate: 6 },
          cp1: { x: 214, y: 22 },
          cp2: { x: 152, y: 20 },
          end: { x: 108, y: 16, scale: 1, rotate: 2 },
          duration: 1500,
          delay: 1320
        },
        image: "assets/client-cards/firelands-united.jpg",
        circle: { left: "18px", top: "18px", background: "rgba(255,255,255,0.2)" },
        title: "launch",
        accent: "fast"
      }
    ];

    function useReducedMotion() {
      const [reduced, setReduced] = React.useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      React.useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(query.matches);
        query.addEventListener("change", update);
        update();
        return () => query.removeEventListener("change", update);
      }, []);
      return reduced;
    }

    function AnimatedHeroHeader() {
      const heroCardRefs = React.useRef({});
      const prefersReducedMotion = useReducedMotion();

      React.useEffect(() => {

        function cubicPoint(p0, p1, p2, p3, t) {
          const mt = 1 - t;
          return (
            mt * mt * mt * p0 +
            3 * mt * mt * t * p1 +
            3 * mt * t * t * p2 +
            t * t * t * p3
          );
        }

        function smoothstep(t) {
          return t * t * (3 - 2 * t);
        }

        heroCards.forEach((card) => {
          const element = heroCardRefs.current[card.key];
          const motion = card.motion;
          if (!element || !motion) return;

          const finalTransform = `translate(${motion.end.x}px, ${motion.end.y}px) scale(${motion.end.scale}) rotate(${motion.end.rotate}deg)`;
          element.getAnimations().forEach((animation) => animation.cancel());

          if (prefersReducedMotion) {
            element.style.opacity = "1";
            element.style.transform = finalTransform;
            return;
          }

          const steps = 48;
          const keyframes = Array.from({ length: steps + 1 }, (_, index) => {
            const progress = index / steps;
            const t = smoothstep(progress);
            const x = cubicPoint(motion.start.x, motion.cp1.x, motion.cp2.x, motion.end.x, t);
            const y = cubicPoint(motion.start.y, motion.cp1.y, motion.cp2.y, motion.end.y, t);
            const rotate = motion.start.rotate + (motion.end.rotate - motion.start.rotate) * t;
            const scale = motion.start.scale + (motion.end.scale - motion.start.scale) * t;
            const opacity = progress < 0.12 ? progress / 0.12 : 1;

            return {
              opacity,
              transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`
            };
          });

          const animation = element.animate(keyframes, {
            duration: motion.duration,
            delay: motion.delay,
            easing: "linear",
            fill: "forwards"
          });

          animation.onfinish = () => {
            element.style.opacity = "1";
            element.style.transform = finalTransform;
          };
        });
        return () => Object.values(heroCardRefs.current).forEach(element => {
          element?.getAnimations().forEach(animation => animation.cancel());
        });
      }, [prefersReducedMotion]);

      return (
        <section className="saas-hero-shell">
          <div className="saas-stage">
            <div className="flex h-full min-h-[720px] flex-col px-7 pt-7 sm:px-10 sm:pt-9 lg:px-12">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <div
                    className="font-display text-3xl font-extrabold tracking-[-0.06em] text-brand sm:text-4xl"
                    style={{ fontFamily: '"Canva Sans", "Manrope", sans-serif', fontWeight: 800 }}
                  >
                    twillful.
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#61774d]">
                    web design agency
                  </div>
                </div>

                <nav className="hidden items-center gap-8 text-sm font-semibold text-[#223124] lg:flex">
                  <a href="#about" className="transition hover:text-brandDeep">Portfolio</a>
                  <a href="#contact" className="transition hover:text-brandDeep">Hire Us</a>
                </nav>
              </div>

              <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-10 text-center sm:pt-14">
                <div className="hero-copy max-w-5xl">
                  <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.42em] text-brand sm:text-xs">
                    Web Design For Brands That Want More Attention
                  </div>
                  <h1
                    className="mx-auto max-w-4xl font-display text-[3rem] font-extrabold leading-[0.96] tracking-[-0.07em] text-[#141414] sm:text-[3.8rem] md:text-[4.55rem] lg:text-[4.9rem]"
                    style={{ fontFamily: '"Canva Sans", "Manrope", sans-serif', fontWeight: 800 }}
                  >
                    Let's make your website
                    <br />
                    a work of art.
                  </h1>
                </div>

                <div className="relative h-[252px] w-full max-w-[980px] sm:h-[278px] md:h-[300px]" style={{ marginTop: "calc(-4rem - 10px)", transform: "translateX(-62px)" }}>
                  {heroCards.map((card) => {
                    const CardTag = card.url ? "a" : "div";

                    return (
                      <CardTag
                        key={card.key}
                        ref={(element) => {
                          heroCardRefs.current[card.key] = element;
                        }}
                        {...(card.url
                          ? { href: card.url, target: "_blank", rel: "noreferrer noopener", "aria-label": `Visit ${card.company}` }
                          : {})}
                        className={card.className}
                        style={card.style}
                      >
                        <div className="hero-hover-pill">{card.company}</div>
                        <div className="hero-card-art">
                          {card.image && <img src={card.image} alt={card.company || card.label || card.title} className="hero-card-image" />}
                          {!card.image && (
                            <>
                              <div className="hero-card-grid" />
                              <div className="hero-card-line" />
                              <div className="absolute inset-x-5 bottom-5 rounded-[20px] bg-white/18 p-4 backdrop-blur-[2px]">
                                <div className="text-left text-[12px] font-black uppercase tracking-[0.2em] text-white/86">
                                  {card.title}
                                </div>
                                <div className="mt-1 text-left text-2xl font-extrabold text-white">
                                  {card.accent}
                                </div>
                              </div>
                              <div className="hero-card-circle" style={card.circle} />
                            </>
                          )}
                        </div>
                      </CardTag>
                    );
                  })}

                </div>

                <p className="hero-subcopy mx-auto mt-[68px] max-w-2xl text-[0.95rem] leading-7 text-[#4f5c4e] sm:mt-[76px] sm:text-base">
                  Twillful designs modern websites for brands that need sharper visuals, clearer messaging, and a front end that feels as polished as the work behind it.
                </p>

                <div className="hero-actions mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8">
                  <a
                    href="#contact"
                    className="rounded-full bg-brand px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#142012] transition hover:translate-y-[-1px] hover:bg-brandBright"
                  >
                    Hire Our Team
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>
      );
    }

    function TwillfulSite() {
      const prefersReducedMotion = useReducedMotion();
      const [formStatus, setFormStatus] = React.useState({ state: "idle", message: "" });
      const [contactChatStarted, setContactChatStarted] = React.useState(false);
      const CONTACT_RELAY_URL = "https://twillful-contact-relay.chwalik.workers.dev/contact";
      const trustRef = React.useRef(null);
      const contactSectionRef = React.useRef(null);
      const contactChatIntentRef = React.useRef(false);

      React.useEffect(() => {
        const node = trustRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              node.classList.add("is-visible");
              observer.disconnect();
            }
          },
          { threshold: 0.22 }
        );

        observer.observe(node);
        return () => observer.disconnect();
      }, []);

      React.useEffect(() => {
        const node = contactSectionRef.current;
        if (!node || contactChatStarted) return;
        if (prefersReducedMotion) {
          setContactChatStarted(true);
          return;
        }

        let lastScrollY = window.scrollY;

        function markScrollIntent() {
          contactChatIntentRef.current = true;
        }

        function handleKeydown(event) {
          if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(event.key)) {
            contactChatIntentRef.current = true;
          }
        }

        function checkContactVisibility() {
          if (!contactChatIntentRef.current) return;

          const rect = node.getBoundingClientRect();
          const sectionTopReached = rect.top <= window.innerHeight * 0.68;
          const sectionStillVisible = rect.bottom >= window.innerHeight * 0.28;

          if (sectionTopReached && sectionStillVisible) {
            setContactChatStarted(true);
            window.removeEventListener("scroll", handleScroll);
          }
        }

        function handleScroll() {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY + 8) {
            contactChatIntentRef.current = true;
          }

          lastScrollY = currentScrollY;
          checkContactVisibility();
        }

        window.addEventListener("wheel", markScrollIntent, { passive: true });
        window.addEventListener("touchmove", markScrollIntent, { passive: true });
        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
          window.removeEventListener("wheel", markScrollIntent);
          window.removeEventListener("touchmove", markScrollIntent);
          window.removeEventListener("keydown", handleKeydown);
          window.removeEventListener("scroll", handleScroll);
        };
      }, [contactChatStarted, prefersReducedMotion]);

      async function handleContactSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const company = String(formData.get("company") || "").trim();
        const website = String(formData.get("website") || "").trim();
        const phone = String(formData.get("phone") || "").trim();

        if (!name || !company || !phone) {
          setFormStatus({ state: "error", message: "Please add your name, business name, and phone number." });
          return;
        }

        const limits = { name: 100, company: 160, website: 500, phone: 50 };
        for (const [field, value] of Object.entries({ name, company, website, phone })) {
          if (value.length > limits[field]) {
            setFormStatus({ state: "error", message: `${field} is too long (maximum ${limits[field]} characters).` });
            return;
          }
        }

        setFormStatus({ state: "loading", message: "Sending..." });

        try {
          if (CONTACT_RELAY_URL.includes("REPLACE_WITH_YOUR_WORKER_URL")) {
            throw new Error("Relay URL not configured");
          }

          const response = await fetch(CONTACT_RELAY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              company,
              website,
              phone
            })
          });

          if (!response.ok) {
            throw new Error("Webhook request failed");
          }

          form.reset();
          setFormStatus({ state: "success", message: "Inquiry sent. We will follow up soon." });
        } catch (error) {
          setFormStatus({ state: "error", message: "Submission failed. Please try again." });
        }
      }

      return (
        <div>
          <a href="#main" className="skip-link">Skip to content</a>
          <main id="main" tabIndex={-1}>
          <AnimatedHeroHeader />

          <section id="services" className="trust-section px-6 pb-24 pt-24 md:px-10 md:pb-28 md:pt-28 lg:px-16">
            <div ref={trustRef} className="trust-reveal mx-auto max-w-7xl">
              <div className="max-w-4xl">
                <h2
                  className="font-display text-[2.15rem] font-extrabold leading-[1] tracking-[-0.05em] text-[#141414] md:text-[3.4rem]"
                  style={{ fontFamily: '"Canva Sans", "Manrope", sans-serif', fontWeight: 800 }}
                >
                  Trusted by companies large &amp; small.
                </h2>
                <p className="mt-5 max-w-4xl text-base leading-7 text-[#5a6855] md:text-[1.1rem]">
                  Our site designers are experts at turning a vision into a website that looks like a work of art and converts.
                </p>
              </div>

              <div className="trust-marquee" tabIndex={0} role="region" aria-label="Client logos; focus to pause scrolling">
                <div className="trust-track">
                  {[...trustLogos, ...trustLogos].map((logo, index) => (
                    <div key={`${logo.name}-${index}`} className="trust-logo" aria-hidden={index >= trustLogos.length ? true : undefined}>
                      <img src={logo.src} alt={logo.name} className="trust-logo-image" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="gallery-section px-6 py-20 md:px-10 md:py-24 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <div className="px-0 py-6 sm:py-8 md:py-10">
                <div className="gallery-wave py-4">
                  <div className="gallery-track gallery-track--offset">
                    {[...galleryCardsTop, ...galleryCardsTop, ...galleryCardsTop, ...galleryCardsTop].map((card, index) => {
                      const isDuplicate = index >= galleryCardsTop.length;
                      const CardTag = card.url ? "a" : "div";
                      return (
                        <CardTag
                          key={`top-${card.label}-${index}`}
                          aria-hidden={isDuplicate ? true : undefined}
                          tabIndex={card.url && isDuplicate ? -1 : undefined}
                          {...(card.url
                            ? { href: card.url, target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className={`gallery-mini-card ${card.url ? "gallery-mini-card--linked" : ""}`}
                          style={{
                            background: card.background,
                            "--wave-offset": card.offset,
                            "--wave-delay": card.delay
                          }}
                        >
                          <span className="gallery-hover-pill">{card.company || card.label}</span>
                          <span className="gallery-mini-card-art" aria-hidden="true">
                            {card.image && <img src={card.image} alt="" className="gallery-mini-card-image" />}
                            {!card.image && (
                              <>
                                <span className="gallery-mini-card-grid" />
                                <span className="gallery-mini-card-line" />
                                <span className="gallery-mini-card-circle" />
                                <span className="gallery-mini-card-label">{card.label}</span>
                              </>
                            )}
                          </span>
                        </CardTag>
                      );
                    })}
                  </div>
                </div>

                <div className="mx-auto max-w-2xl px-4 py-14 text-center md:py-16">
                  <h2
                    className="font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#141414] md:text-[4.25rem]"
                    style={{ fontFamily: '"Canva Sans", "Manrope", sans-serif', fontWeight: 800 }}
                  >
                    Our portfolio is an art gallery.
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5a6855] md:text-lg">
                    Select a linked project in our gallery of art to see our work in action.
                  </p>
                </div>

                <div className="gallery-wave py-4">
                  <div className="gallery-track gallery-track--reverse">
                    {[...galleryCardsBottom, ...galleryCardsBottom, ...galleryCardsBottom, ...galleryCardsBottom].map((card, index) => {
                      const isDuplicate = index >= galleryCardsBottom.length || galleryCardsTop.some(item => item.label === card.label);
                      const CardTag = card.url ? "a" : "div";
                      return (
                        <CardTag
                          key={`bottom-${card.label}-${index}`}
                          aria-hidden={isDuplicate ? true : undefined}
                          tabIndex={card.url && isDuplicate ? -1 : undefined}
                          {...(card.url
                            ? { href: card.url, target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className={`gallery-mini-card ${card.url ? "gallery-mini-card--linked" : ""}`}
                          style={{
                            background: card.background,
                            "--wave-offset": card.offset,
                            "--wave-delay": card.delay
                          }}
                        >
                          <span className="gallery-hover-pill gallery-hover-pill--bottom">{card.company || card.label}</span>
                          <span className="gallery-mini-card-art" aria-hidden="true">
                            {card.image && <img src={card.image} alt="" className="gallery-mini-card-image" />}
                            {!card.image && (
                              <>
                                <span className="gallery-mini-card-grid" />
                                <span className="gallery-mini-card-line" />
                                <span className="gallery-mini-card-circle" />
                                <span className="gallery-mini-card-label">{card.label}</span>
                              </>
                            )}
                          </span>
                        </CardTag>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" ref={contactSectionRef} className="bg-white px-6 py-24 md:px-10 md:py-28 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <h2
                  className="font-display text-[2.7rem] font-extrabold leading-[0.96] tracking-[-0.05em] text-[#141414] md:text-[4.1rem]"
                  style={{ fontFamily: '"Canva Sans", "Manrope", sans-serif', fontWeight: 800 }}
                >
                  Ready for a website that makes your business proud?
                </h2>
              </div>

              <div className="mt-14 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
                <div className="grid gap-6 sm:grid-cols-[auto_1fr] lg:items-start">
                  <div>
                    <div className="max-w-sm text-[1rem] leading-8 text-[#5a6855]">
                      Submit your information in this form. One of our team members will drop you a text to see if we're the right web design agency for you.
                    </div>

                    <div className={`contact-chat ${contactChatStarted ? "is-started" : ""}`} aria-hidden="true">
                      {contactChatStarted && (
                        <>
                          <div className="contact-chat-first">
                            <div className="contact-bubble contact-bubble--typing-first">
                              <span className="contact-bubble-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                              </span>
                            </div>

                            <div className="contact-bubble contact-bubble--incoming">
                              Hey. We have an old website that needs a facelift. Can you guys help us?
                            </div>
                          </div>

                          <div className="contact-chat-response">
                            <div className="contact-bubble contact-bubble--typing">
                              <span className="contact-bubble-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                              </span>
                            </div>

                            <div className="contact-bubble contact-bubble--reply">
                              Thanks for reaching out! We can absolutely help with that. We'll review your current site and put together a little proposal for you.
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <form className="grid gap-x-8 gap-y-7 md:grid-cols-2" onSubmit={handleContactSubmit}>
                    <label className="block">
                      <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#7b8676]">
                        Name
                      </span>
                      <input
                        name="name"
                        maxLength={100}
                        required
                        className="w-full border-0 border-b border-[#cfd7c9] bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition focus:border-[#95b475]"
                        placeholder=""
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#7b8676]">
                        Business Name
                      </span>
                      <input
                        name="company"
                        maxLength={160}
                        required
                        className="w-full border-0 border-b border-[#cfd7c9] bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition focus:border-[#95b475]"
                        placeholder=""
                      />
                    </label>

                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#7b8676]">
                        Current Website
                      </span>
                      <input
                        name="website"
                        maxLength={500}
                        type="text"
                        className="w-full border-0 border-b border-[#cfd7c9] bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition focus:border-[#95b475]"
                        placeholder=""
                      />
                    </label>

                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#7b8676]">
                        Phone Number
                      </span>
                      <input
                        name="phone"
                        maxLength={50}
                        type="tel"
                        required
                        className="w-full border-0 border-b border-[#cfd7c9] bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition focus:border-[#95b475]"
                        placeholder=""
                      />
                    </label>

                    <div className="md:col-span-2 flex flex-wrap items-center gap-5 pt-2">
                      <button
                        type="submit"
                        disabled={formStatus.state === "loading"}
                        className="rounded-full bg-brand px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#142012] transition hover:translate-y-[-1px] hover:bg-brandBright"
                      >
                        {formStatus.state === "loading" ? "Sending..." : "Send Inquiry"}
                      </button>

                      <p
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className={`text-sm ${
                          formStatus.state === "error" ? "text-[#a34848]" : "text-[#5a6855]"
                        }`}
                      >
                        {formStatus.message}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          </main>
          <footer className="bg-white px-6 pb-10 text-sm text-brand md:px-10 lg:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 pt-8 md:flex-row md:items-center md:justify-between">
              <div>© <span id="year">{new Date().getFullYear()}</span> twillful.</div>
              <div className="flex items-center gap-5">
                <a href="#about" className="transition hover:text-brandDeep">Portfolio</a>
                <a href="/zaptap/" className="transition hover:text-brandDeep">ZapTap</a>
                <a href="#contact" className="transition hover:text-brandDeep">Hire Us</a>
              </div>
            </div>
          </footer>
        </div>
      );
    }


export default TwillfulSite;
