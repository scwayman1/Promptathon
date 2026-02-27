/*
  DESIGN: "Cinematic Coastal" — Immersive Editorial Modernism
  Coastline College Prompt-a-thon Landing Page
  Brand: #003764 (navy), #6BC4E8 (sky), #3CB4E5 (coastal)
  Font: Outfit (headlines), Source Sans 3 (body)
  
  ELEVATED DESIGN PRINCIPLES:
  - Full-bleed cinematic photography backgrounds
  - Layered depth with parallax and glass morphism
  - Editorial typography with dramatic scale contrast
  - Generous whitespace as active design element
  - Subtle film grain and texture for warmth
  - Smooth, confident motion — never flashy
*/

import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RegistrationForm from "@/components/RegistrationForm";

// CDN URLs — official Coastline logos + generated cinematic imagery
const ASSETS = {
  logoHorizontal: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028511378/zyjSOUrDohFPGzwY.png",
  logoSecondary: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028511378/lZbSsAzHqizIKCtw.png",
  heroCinematic: "https://private-us-east-1.manuscdn.com/sessionFile/BVKmAYF3K0sU7QfnlOZL1l/sandbox/2WGfB52DDEumBXgxXvThSM-img-1_1772169732000_na1fn_aGVyby1jaW5lbWF0aWM.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlZLbUFZRjNLMHNVN1FmbmxPWkwxbC9zYW5kYm94LzJXR2ZCNTJEREV1bUJYZ3hYdlRoU00taW1nLTFfMTc3MjE2OTczMjAwMF9uYTFmbl9hR1Z5YnkxamFXNWxiV0YwYVdNLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=vmczYigOMEmxuYZH1vtZINEfnlEvl~XcqGWNkJkoPHqZe5zOOgtMiyUypPKvGLaogycp3c2t9LWw8LvPdGgbQEWHveBoSsPzr0srEeqrSrzaCl-h3YUFV~c7VJrnBZgOXb7-ZIh55ru86YzrvN79JveI05abj~gPBV-Pv058V9g271zGAF-81g8mYdXPUwhrA1WHIpY~~V2Ic6HHLoDtkSSvQ-Hz-6DWr~KLfLRtUqFM5~GuPr8r9tpQuJ-xKqYNwrOaVIVKw5aTtBk7ttVJFRD0yOyh~LHrScbnMiaSckhqJdcNSH2hPT8ABw~PyNHPtM85AJ0nYhAah5cXVfvGTA__",
  neuralOcean: "https://private-us-east-1.manuscdn.com/sessionFile/BVKmAYF3K0sU7QfnlOZL1l/sandbox/2WGfB52DDEumBXgxXvThSM-img-2_1772169723000_na1fn_YWJzdHJhY3QtbmV1cmFs.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlZLbUFZRjNLMHNVN1FmbmxPWkwxbC9zYW5kYm94LzJXR2ZCNTJEREV1bUJYZ3hYdlRoU00taW1nLTJfMTc3MjE2OTcyMzAwMF9uYTFmbl9ZV0p6ZEhKaFkzUXRibVYxY21Gcy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=LykGNldA2h5r1cFoIx1f4dbxIBPgEQOSSCkHxCZCldPDIDqyo4sJGBdciAupb5izgtdEdhPyRaRuuHl-U1x-ldbJvew9iTZGVkQw0xaqbukG80TtzLIs9OmRvwnYLaYMhARoH0RbdhsCJEPWxBp78nm-PtLerOXpNPi8Jnu4ocJ2uvRXkDlTviePXclZz2k~QiEAG7syVAXeH1wpBvG86Gzrlhfe2quTYgp7xqvH7-Tvrd57CrnHKZzn~Ndlezv4trGBLuw-3-4KGAa-urvOmx-Zw~HAOEEKfERvQgBGoMyhyMP2eIw88x0Rq~9qxZuGTR7gbEn~4jAaWFdMIj3uxg__",
  aerialCoast: "https://private-us-east-1.manuscdn.com/sessionFile/BVKmAYF3K0sU7QfnlOZL1l/sandbox/2WGfB52DDEumBXgxXvThSM-img-3_1772169727000_na1fn_Y29sbGFib3JhdGlvbi1lbGV2YXRlZA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlZLbUFZRjNLMHNVN1FmbmxPWkwxbC9zYW5kYm94LzJXR2ZCNTJEREV1bUJYZ3hYdlRoU00taW1nLTNfMTc3MjE2OTcyNzAwMF9uYTFmbl9ZMjlzYkdGaWIzSmhkR2x2YmkxbGJHVjJZWFJsWkEuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=vxXRk~rnx9iMvsmKlzF5ZEB1L~LXG1tdOcBGmPbxHVs8yXxubrpxfQ62BTlrUAI-qI3he0NF6yJnmcVQeEBnHdC4fFEqbfqoBolhyKbXmEhXarx1Hoy1FamgJ~UFXffJHe2tnNYJ1~HZ11rOQS3nyLxFoZoKkutyf7PFcyieYCaR9-yGMEnfACxZpdOfNEDGgJO0yo6Z9TD5SDjacyBTsA5dlrIStjO~uOGVNZty9EVwOFEG1D5kXx2uglVtRD24qEAOHsd1CLsV81ENu9ZBP~l1CJkcEGYcR5Xs9wQk-AOgCtsVKIY9PqDMmQN53Hrhtpz5er80HXMPFIRTNW2lDQ__",
  waterTexture: "https://private-us-east-1.manuscdn.com/sessionFile/BVKmAYF3K0sU7QfnlOZL1l/sandbox/2WGfB52DDEumBXgxXvThSM-img-4_1772169717000_na1fn_dGV4dHVyZS1ncmFpbg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlZLbUFZRjNLMHNVN1FmbmxPWkwxbC9zYW5kYm94LzJXR2ZCNTJEREV1bUJYZ3hYdlRoU00taW1nLTRfMTc3MjE2OTcxNzAwMF9uYTFmbl9kR1Y0ZEhWeVpTMW5jbUZwYmcuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uyfv8HRGjVxpmFzHgvoPXjxgad3sKftByY96SEP3Ei0TrQBzfg2Ofx7bBNlpyEoIo9NFw~dABMhL8f~zfAmz5jrcD~1svfziih3K78K5TFmjHgRiSEKm4~GpJ5eGqji1yUDY3gUcO-UlbdIud-n4pDHAmQWuTV17~L1py4N4q-xNTqEzVshbkK9XJhQP-wJcltliAwWg7NOaldwtw~liGQeiB806izPZyxjpampZavQ1vGeEx8EvrRjRRp4gNCXXUjb2jsdEIT96JSjpp6xn~6RWGHlQkCU4G87Pl~DLWHNKTIMUFCXUh4pG3Jme3Emr9OhlWuFTEd5mqF2VsFjDpQ__",
  dolphinShield: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028511378/A57cohGDpkEfVxfQoh3NLX/dolphin-shield_c875c504.jpg",
  closingHorizon: "https://private-us-east-1.manuscdn.com/sessionFile/BVKmAYF3K0sU7QfnlOZL1l/sandbox/2WGfB52DDEumBXgxXvThSM-img-5_1772169731000_na1fn_Y2xvc2luZy1ob3Jpem9u.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlZLbUFZRjNLMHNVN1FmbmxPWkwxbC9zYW5kYm94LzJXR2ZCNTJEREV1bUJYZ3hYdlRoU00taW1nLTVfMTc3MjE2OTczMTAwMF9uYTFmbl9ZMnh2YzJsdVp5MW9iM0pwZW05dS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VCxtFtSZo5HQXNwfpKupop7fQakyR6N4-AOBIoyCjYbGBPvByzhfX8M~gmMs5qfWempP3vP8b2Hov1dGj0Lg9z7awfxd7yRK75A7HqyBggfhQF2OHzExF6-cwsb2FicLtxEOrYTf3WZ-f8aTn7XASKn3-01r6S2nwA8Vc0OoELdRj-QbIvSqydZa848jhG~LjCl9oplCdH7fvaC~OU7O90QI1L8e1nmbZ1M~UijtPmPTQIuwT0kZAgRvZPO6WG3sZUtFgXS620Tdbha-iIJ9F2ZMFdpGsCwqtxfn0~UEUa5qP3E1BdaAyEnl6NxwQrC1Eio9aNeXYkoFU7RVJH2aOw__",
};

/* ─── Reusable fade-in wrapper with stagger ─── */
function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const { ref, isVisible } = useScrollAnimation(0.08);
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transforms[direction],
        transition: `opacity 1s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s, transform 1s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   1. HERO SECTION — Full-bleed cinematic with parallax
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic background image with parallax */}
      <motion.div
        className="absolute inset-0 animate-slow-zoom"
        style={{
          backgroundImage: `url(${ASSETS.heroCinematic})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          y: bgY,
        }}
      />

      {/* Gradient overlay — balanced to let the ocean image breathe while keeping text crisp */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(0,15,40,0.72) 0%, 
              rgba(0,30,65,0.45) 30%, 
              rgba(0,30,65,0.35) 55%, 
              rgba(0,15,40,0.8) 100%
            )
          `,
        }}
      />

      {/* Subtle animated gradient layer */}
      <div
        className="absolute inset-0 opacity-25 animate-horizon-drift"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(60,180,229,0.1) 30%, transparent 50%, rgba(107,196,232,0.08) 70%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Film grain texture */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <img
            src={ASSETS.logoSecondary}
            alt="Coastline College"
            className="h-9 sm:h-11 mx-auto"
            style={{ filter: "brightness(0) invert(1)", opacity: 1 }}
          />
        </motion.div>

        {/* Headline — dramatic editorial scale with strong contrast */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-white leading-[0.9] mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 12vw, 9rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.5), 0 12px 80px rgba(0,0,0,0.3)",
          }}
        >
          Prompt-a-thon
        </motion.h1>

        {/* Subheading — refined tracking */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.23, 1, 0.32, 1] }}
          className="text-sm sm:text-base tracking-[0.25em] uppercase mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            color: "#ffffff",
            textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          Coastline College Spring Break AI Hackathon
        </motion.p>

        {/* Thin divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.23, 1, 0.32, 1] }}
          className="w-24 h-px mx-auto mb-8"
          style={{ background: "rgba(60,180,229,0.7)" }}
        />

        {/* 50 years line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-14"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            color: "rgba(200,235,250,1)",
            textShadow: "0 2px 10px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          Celebrating 50 Years of Innovation
        </motion.p>

        {/* Legacy statement — italic editorial */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto italic"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.8,
              textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            In 1976, Coastline reimagined access through distance learning.
            <br />
            In 2026, we explore the next frontier together.
          </p>
        </motion.div>

        {/* Dolphin shield logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.0, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 flex justify-center"
        >
          <img
            src={ASSETS.dolphinShield}
            alt="Coastline College Dolphins"
            className="h-28 sm:h-36 md:h-40 rounded-2xl"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
              border: "2px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              padding: "8px",
            }}
          />
        </motion.div>

        {/* Glass panel invitation */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4, ease: [0.23, 1, 0.32, 1] }}
          className="glass-panel p-8 sm:p-10 md:p-14 text-left max-w-3xl mx-auto"
        >
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              lineHeight: 1.9,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            Hello Coastline Colleagues,
          </p>
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              fontWeight: 400,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            You are invited to join us for a fun, collaborative, and hands-on
            Prompt-a-thon on April 1 from 12:00 PM to 4:00 PM at the Coastline
            College Student Services Center.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              fontWeight: 400,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            This three-hour event brings employees together to form teams and
            use AI tools to develop creative, practical solutions that can
            support our students, programs, and college operations. Whether you
            are new to AI or already exploring it in your work, this event is
            designed to be welcoming, engaging, and useful for everyone.
          </p>
        </motion.div>

      </motion.div>

      {/* Hero CTA Button — outside the parallax-fade container so it stays fully visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-20 mt-12 text-center"
      >
        <a
          href="#register"
          className="inline-block px-14 py-5 text-lg sm:text-xl transition-all duration-300 hover:scale-[1.05] hover:brightness-110"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #3CB4E5 0%, #6BC4E8 100%)",
            color: "#ffffff",
            letterSpacing: "0.04em",
            textDecoration: "none",
            borderRadius: "100px",
            boxShadow: "0 0 30px rgba(60,180,229,0.5), 0 0 60px rgba(60,180,229,0.2), 0 4px 20px rgba(0,0,0,0.3)",
            textShadow: "0 1px 3px rgba(0,55,100,0.4)",
            border: "2px solid rgba(255,255,255,0.25)",
          }}
        >
          Register Now
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 300,
            }}
          >
            Scroll
          </span>
          <div className="w-px h-8" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. TIMELINE SECTION — Cinematic split with neural imagery
   ═══════════════════════════════════════════════════════════ */
function TimelineSection() {
  const { ref: lineRef, isVisible: lineVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative overflow-hidden" style={{ background: "#001a2e" }}>
      {/* Gradient transition from hero */}
      <div className="absolute top-0 left-0 right-0 h-32" style={{ background: "linear-gradient(180deg, rgba(0,20,40,1) 0%, transparent 100%)" }} />
      {/* Neural ocean background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${ASSETS.neuralOcean})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,26,46,0.85) 0%, rgba(0,26,46,0.7) 50%, rgba(0,26,46,0.9) 100%)",
        }}
      />

      <div className="relative z-10 py-28 sm:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-20">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(60,180,229,0.7)",
                fontWeight: 400,
              }}
            >
              A Legacy of Pioneering
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "#ffffff",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              50 Years of
              <br />
              <span style={{ color: "#3CB4E5" }}>Breaking New Ground</span>
            </h2>
          </FadeIn>

          {/* Timeline */}
          <div className="relative" ref={lineRef}>
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 hidden sm:block">
              <div
                className="h-full"
                style={{
                  background: "linear-gradient(90deg, rgba(60,180,229,0.1), #3CB4E5, rgba(60,180,229,0.1))",
                  width: lineVisible ? "100%" : "0%",
                  transition: "width 2s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-16 sm:gap-0">
              {/* 1976 */}
              <FadeIn className="relative z-10 text-center flex-1" delay={0.3}>
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-8"
                  style={{
                    background: "#3CB4E5",
                    boxShadow: "0 0 20px rgba(60,180,229,0.4), 0 0 60px rgba(60,180,229,0.15)",
                  }}
                />
                <p
                  className="text-5xl sm:text-6xl mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#ffffff",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  1976
                </p>
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    maxWidth: "220px",
                    margin: "0 auto",
                  }}
                >
                  Coastline pioneers
                  <br />
                  distance learning
                </p>
              </FadeIn>

              {/* 2026 */}
              <FadeIn className="relative z-10 text-center flex-1" delay={0.6}>
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-8"
                  style={{
                    background: "#6BC4E8",
                    boxShadow: "0 0 20px rgba(107,196,232,0.4), 0 0 60px rgba(107,196,232,0.15)",
                  }}
                />
                <p
                  className="text-5xl sm:text-6xl mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#3CB4E5",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  2026
                </p>
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    maxWidth: "220px",
                    margin: "0 auto",
                  }}
                >
                  Coastline launches its first
                  <br />
                  institutional AI Prompt-a-thon
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. EVENT DETAILS — Clean editorial with generous space
   ═══════════════════════════════════════════════════════════ */
function EventDetailsSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#fafcfe" }}>
      {/* Gradient transition from dark timeline */}
      <div className="absolute top-0 left-0 right-0 h-24" style={{ background: "linear-gradient(180deg, #001a2e 0%, #fafcfe 100%)" }} />
      {/* Subtle water texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url(${ASSETS.waterTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 pt-36 sm:pt-48 pb-28 sm:pb-40">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-8">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "#3CB4E5",
                fontWeight: 400,
              }}
            >
              What to Expect
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "#003764",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              An Afternoon of
              <br />
              Discovery
            </h2>
          </FadeIn>

          {/* Date / Location / Time pill */}
          <FadeIn className="flex justify-center mb-20" delay={0.15}>
            <div
              className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-8 py-4"
              style={{
                background: "rgba(0,55,100,0.04)",
                borderRadius: "100px",
                border: "1px solid rgba(0,55,100,0.06)",
              }}
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#003764", fontWeight: 500 }}>
                  April 1, 2026
                </span>
              </span>
              <span className="w-px h-4" style={{ background: "rgba(0,55,100,0.12)" }} />
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#003764", fontWeight: 500 }}>
                  Student Services Center
                </span>
              </span>
              <span className="w-px h-4" style={{ background: "rgba(0,55,100,0.12)" }} />
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#003764", fontWeight: 500 }}>
                  12:00 – 4:00 PM
                </span>
              </span>
            </div>
          </FadeIn>

          {/* Schedule blocks */}
          <div className="space-y-0">
            <FadeIn delay={0.2}>
              <div
                className="flex flex-col sm:flex-row gap-6 sm:gap-16 py-12"
                style={{ borderBottom: "1px solid rgba(0,55,100,0.06)" }}
              >
                <div className="sm:w-48 shrink-0">
                  <p
                    className="text-3xl sm:text-4xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#3CB4E5",
                      fontWeight: 600,
                      lineHeight: 1.1,
                    }}
                  >
                    12:00
                    <span className="text-lg ml-1" style={{ fontWeight: 400, color: "rgba(60,180,229,0.6)" }}>PM</span>
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(0,55,100,0.35)",
                      fontWeight: 300,
                    }}
                  >
                    to 1:00 PM
                  </p>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl sm:text-2xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#003764",
                      fontWeight: 600,
                    }}
                  >
                    Networking and lunch
                  </h3>
                  <p
                    className="text-base"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#4a6a82",
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >
                    Connect with colleagues from across departments over a catered lunch. Build the connections that will fuel your afternoon of collaboration.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 py-12">
                <div className="sm:w-48 shrink-0">
                  <p
                    className="text-3xl sm:text-4xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#003764",
                      fontWeight: 600,
                      lineHeight: 1.1,
                    }}
                  >
                    1:00
                    <span className="text-lg ml-1" style={{ fontWeight: 400, color: "rgba(0,55,100,0.35)" }}>PM</span>
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(0,55,100,0.35)",
                      fontWeight: 300,
                    }}
                  >
                    to 4:00 PM
                  </p>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl sm:text-2xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#003764",
                      fontWeight: 600,
                    }}
                  >
                    Team-based Prompt-a-thon
                  </h3>
                  <p
                    className="text-base"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#4a6a82",
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >
                    Using AI tools to build solutions for Coastline. Form teams, explore AI tools, and develop creative solutions for real challenges facing our students and programs.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Reassurance badges */}
          <FadeIn delay={0.5}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                "All instructions, tools, and project information will be provided on-site",
                "No preparation or prior AI experience is required",
              ].map((text, i) => (
                <div
                  key={i}
                  className="elevated-card p-6 flex items-start gap-4"
                >
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(60,180,229,0.08)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Invitation continuation */}
          <FadeIn delay={0.6}>
            <div className="mt-20 text-center">
              <p
                className="text-base sm:text-lg max-w-2xl mx-auto italic"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#3a5a72",
                  lineHeight: 1.9,
                  fontWeight: 400,
                }}
              >
                Please come with your curiosity, your ideas, and a willingness to
                collaborate across departments. This is an excellent opportunity to
                connect with colleagues, explore emerging tools, and contribute
                innovative ideas that can make a meaningful impact.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. WHY THIS MATTERS — Full-bleed aerial with glass overlay
   ═══════════════════════════════════════════════════════════ */
function WhyThisMattersSection() {
  const { ref: parallaxRef, offset } = useParallax(0.08);
  const items = [
    "AI literacy is becoming foundational across industries.",
    "Coastline continues its tradition of meeting students where the future is forming.",
    "Innovation here is collaborative, practical, and student-centered.",
    "This event is about exploration, not perfection.",
  ];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "80vh" }}>
      {/* Gradient transition from light section */}
      <div className="absolute top-0 left-0 right-0 h-24 z-20" style={{ background: "linear-gradient(180deg, #fafcfe 0%, transparent 100%)" }} />
      {/* Full-bleed aerial coastline background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${ASSETS.aerialCoast})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${offset}px)`,
          willChange: "transform",
        }}
      />
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,30,60,0.82) 0%, rgba(0,40,70,0.78) 50%, rgba(0,30,60,0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative z-10 py-28 sm:py-40">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-20">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(60,180,229,0.7)",
                fontWeight: 400,
              }}
            >
              The Bigger Picture
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "#ffffff",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Why This Matters
            </h2>
          </FadeIn>

          <div className="space-y-8 max-w-3xl mx-auto">
            {items.map((item, i) => (
              <FadeIn key={i} delay={0.15 * (i + 1)}>
                <div className="flex items-start gap-6">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-3 shrink-0"
                    style={{
                      background: "#3CB4E5",
                      boxShadow: "0 0 10px rgba(60,180,229,0.4)",
                    }}
                  />
                  <p
                    className="text-lg sm:text-xl"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >
                    {item}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. COLLABORATION PANEL — Elevated cards with depth
   ═══════════════════════════════════════════════════════════ */
function CollaborationSection() {
  const items = [
    {
      title: "Cross-department collaboration",
      description: "Work alongside colleagues from different areas of the college",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      ),
    },
    {
      title: "Practical tools",
      description: "Hands-on experience with AI tools you can use in your work",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: "Student impact",
      description: "Build solutions that directly support Coastline students",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: "#fafcfe" }}>
      {/* Gradient transition from dark section */}
      <div className="absolute top-0 left-0 right-0 h-24 z-20" style={{ background: "linear-gradient(180deg, rgba(0,30,60,0.6) 0%, #fafcfe 100%)" }} />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url(${ASSETS.waterTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 py-28 sm:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-20">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "#3CB4E5",
                fontWeight: 400,
              }}
            >
              Built Together
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "#003764",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The Spirit of
              <br />
              Collaboration
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {items.map((item, i) => (
              <FadeIn key={i} delay={0.12 * (i + 1)}>
                <div className="elevated-card p-8 sm:p-10 h-full">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,55,100,0.06), rgba(60,180,229,0.08))",
                      color: "#003764",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="text-xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#003764",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#5a7a92",
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. REGISTRATION SECTION — The primary CTA of the page
   ═══════════════════════════════════════════════════════════ */
function RegistrationSection() {
  return (
    <section id="register" className="relative overflow-hidden" style={{ background: "#fafcfe" }}>
      <div className="relative z-10 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "#3CB4E5",
                fontWeight: 400,
              }}
            >
              Be Part of It
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "#003764",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Register Now
            </h2>
            <p
              className="text-base sm:text-lg max-w-xl mx-auto"
              style={{
                fontFamily: "var(--font-body)",
                color: "#4a6a82",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              We hope you will join us for an energizing afternoon of learning, creativity, and collaboration.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <RegistrationForm embedded />
          </FadeIn>

          <FadeIn delay={0.35}>
            <p
              className="mt-10 text-center text-sm"
              style={{
                fontFamily: "var(--font-body)",
                color: "#7a9ab2",
                fontWeight: 300,
              }}
            >
              Space planning is based on responses, so please register if you plan to attend.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. CLOSING SECTION — Twilight horizon with elegant sign-off
   ═══════════════════════════════════════════════════════════ */
function ClosingSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Twilight horizon background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${ASSETS.closingHorizon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,20,40,0.75) 0%, rgba(0,30,55,0.6) 40%, rgba(0,20,40,0.8) 100%)",
        }}
      />

      <div className="relative z-10 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p
              className="text-lg mb-3"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
              }}
            >
              Thank you,
            </p>
            <p
              className="text-3xl sm:text-4xl mb-3"
              style={{
                fontFamily: "var(--font-display)",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              Aeron and Scott
            </p>
            <p
              className="text-base mb-14"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.45)",
                fontWeight: 300,
              }}
            >
              Coastline College
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="w-16 h-px mx-auto mb-10"
              style={{ background: "rgba(60,180,229,0.3)" }}
            />
            <img
              src={ASSETS.logoHorizontal}
              alt="Coastline College"
              className="h-8 sm:h-10 mx-auto"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.4 }}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER — Minimal
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      className="py-8 text-center"
      style={{
        background: "#001020",
      }}
    >
      <p
        className="text-xs"
        style={{
          fontFamily: "var(--font-body)",
          color: "rgba(255,255,255,0.2)",
          fontWeight: 300,
          letterSpacing: "0.08em",
        }}
      >
        Coastline College &middot; Celebrating 50 Years of Innovation &middot; 1976–2026
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TimelineSection />
      <EventDetailsSection />
      <WhyThisMattersSection />
      <CollaborationSection />
      <RegistrationSection />
      <ClosingSection />
      <Footer />
    </div>
  );
}
