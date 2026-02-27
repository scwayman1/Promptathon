/*
  DESIGN: "Horizon Glass" — Atmospheric Coastal Modernism
  Coastline College Prompt-a-thon Landing Page
  Brand: #003764 (navy), #6BC4E8 (sky), #3CB4E5 (coastal)
  Font: DM Serif Display (headlines), Source Sans 3 (body)
*/

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

// CDN URLs for assets
const ASSETS = {
  heroBackground: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028511378/yPDNUKEmFOcTTEdV.jpg",
  logoHorizontal: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028511378/zyjSOUrDohFPGzwY.png",
  logoSecondary: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028511378/lZbSsAzHqizIKCtw.png",
  collaborationBg: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028511378/QKcSSwmSNkzkbhVk.jpg",
  campusBg: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028511378/LRPGeNFCktJDjBKy.jpg",
};

/* ─── Reusable fade-in wrapper ─── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── 1. HERO SECTION ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-horizon"
        style={{
          background:
            "linear-gradient(135deg, #001a33 0%, #003764 25%, #1a6b9c 45%, #3CB4E5 65%, #6BC4E8 80%, #b8e4f5 95%)",
          backgroundSize: "200% 200%",
        }}
      />
      {/* Hero image overlay for texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${ASSETS.heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "soft-light",
        }}
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,20,50,0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-10"
        >
          <img
            src={ASSETS.logoSecondary}
            alt="Coastline College"
            className="h-10 sm:h-12 mx-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white leading-none mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 40px rgba(0,0,0,0.2)",
          }}
        >
          Prompt-a-thon
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl tracking-wide uppercase mb-8"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.15em",
          }}
        >
          Coastline College Spring Break AI Hackathon
        </motion.p>

        {/* 50 years line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-sm tracking-widest uppercase mb-10"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            color: "rgba(184,228,245,0.8)",
            letterSpacing: "0.2em",
          }}
        >
          Celebrating 50 Years of Innovation
        </motion.p>

        {/* Legacy statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-12"
        >
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
            }}
          >
            In 1976, Coastline reimagined access through distance learning.
            <br />
            In 2026, we explore the next frontier together.
          </p>
        </motion.div>

        {/* Glass panel invitation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="glass-panel p-8 sm:p-10 md:p-12 text-left max-w-3xl mx-auto"
        >
          <p
            className="text-white/90 mb-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.85,
              fontWeight: 400,
            }}
          >
            Hello Coastline Colleagues,
          </p>
          <p
            className="text-white/85 mb-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.85,
              fontWeight: 300,
            }}
          >
            You are invited to join us for a fun, collaborative, and hands-on
            Prompt-a-thon on April 1 from 12:00 PM to 4:00 PM at the Coastline
            College Student Services Center.
          </p>
          <p
            className="text-white/85 mb-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.85,
              fontWeight: 300,
            }}
          >
            This three-hour event brings employees together to form teams and
            use AI tools to develop creative, practical solutions that can
            support our students, programs, and college operations. Whether you
            are new to AI or already exploring it in your work, this event is
            designed to be welcoming, engaging, and useful for everyone.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Wave Divider Component ─── */
function WaveDivider({ flip = false, color = "#f7fafd" }: { flip?: boolean; color?: string }) {
  return (
    <div
      className="w-full overflow-hidden leading-none"
      style={{
        transform: flip ? "scaleY(-1)" : "none",
        marginTop: flip ? "-1px" : "0",
        marginBottom: flip ? "0" : "-1px",
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/* ─── 2. TIMELINE SECTION ─── */
function TimelineSection() {
  const { ref: lineRef, isVisible: lineVisible } = useScrollAnimation(0.3);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "#f7fafd" }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeInSection className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "#003764",
            }}
          >
            A Legacy of Pioneering
          </h2>
          <div
            className="w-16 h-0.5 mx-auto"
            style={{ background: "#3CB4E5" }}
          />
        </FadeInSection>

        {/* Horizontal timeline */}
        <div className="relative" ref={lineRef}>
          {/* Connecting line */}
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2">
            <div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, #003764, #3CB4E5)",
                width: lineVisible ? "100%" : "0%",
                transition: "width 1.5s ease-out",
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-12 sm:gap-0">
            {/* 1976 */}
            <FadeInSection className="relative z-10 text-center flex-1" delay={0.2}>
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #003764, #1a5a8a)",
                  boxShadow: "0 8px 32px rgba(0,55,100,0.2)",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <p
                className="text-4xl sm:text-5xl mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#003764",
                }}
              >
                1976
              </p>
              <p
                className="text-base max-w-xs mx-auto"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#4a6a82",
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                Coastline pioneers distance learning
              </p>
            </FadeInSection>

            {/* Center dot on mobile */}
            <div className="sm:hidden w-px h-16 bg-gradient-to-b from-[#003764] to-[#3CB4E5]" />

            {/* 2026 */}
            <FadeInSection className="relative z-10 text-center flex-1" delay={0.5}>
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #3CB4E5, #6BC4E8)",
                  boxShadow: "0 8px 32px rgba(60,180,229,0.25)",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a4 4 0 0 0-4 4c0 2 2 3 2 6H14c0-3 2-4 2-6a4 4 0 0 0-4-4z" />
                  <path d="M10 12h4" />
                  <path d="M10 15h4" />
                  <path d="M11 18h2" />
                  <circle cx="12" cy="22" r="0" />
                  <path d="M8 22h8" />
                </svg>
              </div>
              <p
                className="text-4xl sm:text-5xl mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#3CB4E5",
                }}
              >
                2026
              </p>
              <p
                className="text-base max-w-xs mx-auto"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#4a6a82",
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                Coastline launches its first institutional AI Prompt-a-thon
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. EVENT DETAILS SECTION ─── */
function EventDetailsSection() {
  return (
    <section className="py-24 sm:py-32 relative" style={{ background: "#ffffff" }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeInSection className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "#003764",
            }}
          >
            What to Expect
          </h2>
          <div
            className="w-16 h-0.5 mx-auto mb-8"
            style={{ background: "#3CB4E5" }}
          />
          {/* Date & Location */}
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-8 py-4 rounded-full"
            style={{
              background: "rgba(0,55,100,0.04)",
              border: "1px solid rgba(0,55,100,0.08)",
            }}
          >
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#003764", fontSize: "0.95rem" }}>
                April 1, 2026
              </span>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ background: "rgba(0,55,100,0.15)" }} />
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#003764", fontSize: "0.95rem" }}>
                Student Services Center
              </span>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ background: "rgba(0,55,100,0.15)" }} />
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#003764", fontSize: "0.95rem" }}>
                12:00 – 4:00 PM
              </span>
            </div>
          </div>
        </FadeInSection>

        <div className="space-y-0">
          {/* Event time block 1 */}
          <FadeInSection delay={0.15}>
            <div
              className="flex flex-col sm:flex-row gap-6 sm:gap-12 py-10"
              style={{ borderBottom: "1px solid rgba(0,55,100,0.08)" }}
            >
              <div className="sm:w-52 shrink-0">
                <p
                  className="text-2xl sm:text-3xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#3CB4E5",
                  }}
                >
                  12:00 – 1:00 PM
                </p>
              </div>
              <div className="flex-1">
                <p
                  className="text-lg mb-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    color: "#003764",
                  }}
                >
                  Networking and lunch (provided)
                </p>
                <p
                  className="text-base"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#5a7a92",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  Connect with colleagues from across departments over a catered lunch.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Event time block 2 */}
          <FadeInSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 py-10">
              <div className="sm:w-52 shrink-0">
                <p
                  className="text-2xl sm:text-3xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#3CB4E5",
                  }}
                >
                  1:00 – 4:00 PM
                </p>
              </div>
              <div className="flex-1">
                <p
                  className="text-lg mb-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    color: "#003764",
                  }}
                >
                  Team-based Prompt-a-thon using AI tools to build solutions for Coastline
                </p>
                <p
                  className="text-base"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#5a7a92",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  Form teams, explore AI tools, and develop creative solutions for real challenges.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Additional details */}
        <FadeInSection delay={0.4}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="glass-panel-light p-6"
              style={{ background: "rgba(247,250,253,0.9)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(60,180,229,0.1)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#003764",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    fontWeight: 400,
                  }}
                >
                  All instructions, tools, and project information will be provided on-site
                </p>
              </div>
            </div>
            <div
              className="glass-panel-light p-6"
              style={{ background: "rgba(247,250,253,0.9)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(60,180,229,0.1)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#003764",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    fontWeight: 400,
                  }}
                >
                  No preparation or prior AI experience is required
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Invitation continuation */}
        <FadeInSection delay={0.5}>
          <div className="mt-14 text-center">
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{
                fontFamily: "var(--font-body)",
                color: "#3a5a72",
                lineHeight: 1.85,
                fontWeight: 300,
              }}
            >
              Please come with your curiosity, your ideas, and a willingness to
              collaborate across departments. This is an excellent opportunity to
              connect with colleagues, explore emerging tools, and contribute
              innovative ideas that can make a meaningful impact.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── 4. WHY THIS MATTERS SECTION ─── */
function WhyThisMattersSection() {
  const items = [
    "AI literacy is becoming foundational across industries.",
    "Coastline continues its tradition of meeting students where the future is forming.",
    "Innovation here is collaborative, practical, and student-centered.",
    "This event is about exploration, not perfection.",
  ];

  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #f0f7fc 0%, #eaf3fa 100%)",
      }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(${ASSETS.collaborationBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <FadeInSection className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "#003764",
            }}
          >
            Why This Matters
          </h2>
          <div
            className="w-16 h-0.5 mx-auto"
            style={{ background: "#3CB4E5" }}
          />
        </FadeInSection>

        <div className="space-y-6">
          {items.map((item, i) => (
            <FadeInSection key={i} delay={0.15 * (i + 1)}>
              <div className="flex items-start gap-5 py-4">
                <div
                  className="w-2 h-2 rounded-full mt-2.5 shrink-0"
                  style={{
                    background:
                      i % 2 === 0
                        ? "#003764"
                        : "#3CB4E5",
                  }}
                />
                <p
                  className="text-base sm:text-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#2a4a62",
                    lineHeight: 1.8,
                    fontWeight: 400,
                  }}
                >
                  {item}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. COLLABORATION PANEL ─── */
function CollaborationSection() {
  const items = [
    {
      title: "Cross-department collaboration",
      description: "Work alongside colleagues from different areas of the college",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Curiosity over expertise",
      description: "No AI experience needed — just bring an open mind",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      ),
    },
    {
      title: "Practical tools",
      description: "Hands-on experience with AI tools you can use in your work",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: "Student impact",
      description: "Build solutions that directly support Coastline students",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative" style={{ background: "#ffffff" }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeInSection className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "#003764",
            }}
          >
            Built on Collaboration
          </h2>
          <div
            className="w-16 h-0.5 mx-auto"
            style={{ background: "#3CB4E5" }}
          />
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <FadeInSection key={i} delay={0.15 * (i + 1)}>
              <div
                className="group p-8 rounded-2xl transition-all duration-500 hover:shadow-lg"
                style={{
                  background: "rgba(240,247,252,0.6)",
                  border: "1px solid rgba(0,55,100,0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,55,100,0.08), rgba(60,180,229,0.12))",
                    color: "#003764",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-lg mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#003764",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#5a7a92",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. RSVP SECTION ─── */
function RSVPSection() {
  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #003764 0%, #002244 100%)",
      }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${ASSETS.heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          mixBlendMode: "soft-light",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <FadeInSection>
          <h2
            className="text-3xl sm:text-4xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "#ffffff",
            }}
          >
            Join Us
          </h2>
          <p
            className="text-base sm:text-lg mb-10 max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            We hope you will join us for an energizing afternoon of learning, creativity, and collaboration.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <a
            href="#"
            className="inline-block px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-[1.03] animate-soft-glow"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              background: "linear-gradient(135deg, #3CB4E5, #6BC4E8)",
              color: "#003764",
              letterSpacing: "0.05em",
              textDecoration: "none",
            }}
            onClick={(e) => {
              e.preventDefault();
              // RSVP link placeholder
              window.open("#", "_blank");
            }}
          >
            RSVP Here
          </a>
        </FadeInSection>

        <FadeInSection delay={0.35}>
          <p
            className="mt-8 text-sm"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 300,
            }}
          >
            Space planning is based on responses, so please register if you plan to attend.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── 7. CLOSING SECTION ─── */
function ClosingSection() {
  return (
    <section
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ background: "#f7fafd" }}
    >
      {/* Subtle watercolor background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url(${ASSETS.campusBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <FadeInSection>
          <p
            className="text-lg mb-2"
            style={{
              fontFamily: "var(--font-body)",
              color: "#4a6a82",
              fontWeight: 300,
            }}
          >
            Thank you,
          </p>
          <p
            className="text-2xl sm:text-3xl mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "#003764",
            }}
          >
            Aeron and Scott
          </p>
          <p
            className="text-base mb-10"
            style={{
              fontFamily: "var(--font-body)",
              color: "#5a7a92",
              fontWeight: 400,
            }}
          >
            Coastline College
          </p>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div
            className="w-16 h-0.5 mx-auto mb-10"
            style={{ background: "rgba(0,55,100,0.1)" }}
          />
          <img
            src={ASSETS.logoHorizontal}
            alt="Coastline College"
            className="h-8 sm:h-10 mx-auto opacity-60"
          />
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer
      className="py-8 text-center"
      style={{
        background: "#002244",
        borderTop: "1px solid rgba(60,180,229,0.1)",
      }}
    >
      <p
        className="text-xs"
        style={{
          fontFamily: "var(--font-body)",
          color: "rgba(255,255,255,0.35)",
          fontWeight: 300,
          letterSpacing: "0.05em",
        }}
      >
        Coastline College &middot; Celebrating 50 Years of Innovation &middot; 1976–2026
      </p>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WaveDivider color="#f7fafd" />
      <TimelineSection />
      <WaveDivider color="#ffffff" flip />
      <EventDetailsSection />
      <WaveDivider color="#f0f7fc" />
      <WhyThisMattersSection />
      <WaveDivider color="#ffffff" />
      <CollaborationSection />
      <WaveDivider color="#002244" />
      <RSVPSection />
      <WaveDivider color="#f7fafd" flip />
      <ClosingSection />
      <Footer />
    </div>
  );
}
