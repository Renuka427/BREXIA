"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Shield, AlertTriangle, Fingerprint, Activity, 
  Terminal, Lock, Eye, Globe, Zap, Cpu, 
  ChevronRight, ArrowRight, Download, Share2, 
  RefreshCcw, Menu, X, PlusCircle, CheckCircle2,
  Brain, User, Target, ShieldAlert, ZapOff, Flame, TrendingUp, Settings, RotateCcw, Check
} from "lucide-react";
import ActionModal from "../components/ActionModal";
import { supabase } from "@/lib/supabase";

// ── Animated Particles Background ──────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5, a: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(162, 89, 255,${p.a})`;
        ctx.fill();
      });
      
      // Plexus / Neural Networking Lines
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

// ── Global Keyframe Injection ─────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
      @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.2); } 50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.4); } }
      @keyframes matrixBg { 0% { background-position: 0% 0%; } 100% { background-position: 0% 100%; } }
      @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.4); transform: scale(1); } 50% { box-shadow: 0 0 45px rgba(0, 255, 255, 0.7); transform: scale(1.05); } }
      @keyframes progressMove { 0% { background-position: 0% 0%; } 100% { background-position: 200% 0%; } }
      @keyframes neonBreathing { 0%, 100% { border-color: rgba(124, 58, 237, 0.3); box-shadow: 0 0 10px rgba(124, 58, 237, 0.1); } 50% { border-color: rgba(124, 58, 237, 0.8); box-shadow: 0 0 30px rgba(124, 58, 237, 0.3); } }
      @keyframes springIn { 0% { opacity: 0; transform: scale(0.8) translateY(30px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
      @keyframes radarSweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } 80% { opacity: 0.9; } }
      @keyframes beamDrift { 0% { transform: translateY(-100%); opacity: 0; } 10% { opacity: 0.3; } 90% { opacity: 0.3; } 100% { transform: translateY(100vh); opacity: 0; } }
      @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
      .cursor-blink {
        animation: cursor-blink 1s step-end infinite;
        display: inline-block;
        width: 10px;
        height: 18px;
        background: var(--accent);
        margin-left: 4px;
        vertical-align: middle;
      }

      .scan-line {
        position: fixed; inset: 0; width: 100%; height: 100%;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(var(--text-primary-rgb, 0,0,0), 0.05) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
        z-index: 2000; background-size: 100% 4px, 3px 100%; pointer-events: none; opacity: 0.05;
      }
      .noise-overlay {
        position: fixed; inset: 0; width: 100%; height: 100%;
        background-image: url("https://grainy-gradients.vercel.app/noise.svg");
        opacity: 0.03; z-index: 2001; pointer-events: none; mix-blend-mode: overlay;
      }
      .scanning-beam {
        position: fixed; top: 0; left: 0; width: 100%; height: 2px;
        background: linear-gradient(to right, transparent, rgba(124, 58, 237, 0.1), #00f0ff, rgba(124, 58, 237, 0.1), transparent);
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
        z-index: 1500; pointer-events: none; animation: beamDrift 8s infinite linear;
      }
      .hud-number {
        font-family: 'Space Mono', monospace !important;
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        letter-spacing: -0.05em;
      }

      .bx-logo {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 18px;
        animation: pulseGlow 2s infinite ease-in-out;
        box-shadow: 0 0 30px var(--accent-glow);
      }
      .brand-text {
        font-family: 'Syne', sans-serif;
        font-weight: 900;
        margin: 0;
        text-shadow: 0 0 20px var(--accent-glow);
        transition: all 0.3s ease;
        font-size: 38px;
        letter-spacing: 0.1em;
        background: linear-gradient(to bottom, var(--text-primary), var(--accent));
        WebkitBackgroundClip: text;
        WebkitTextFillColor: transparent;
      }
      @media (max-width: 640px) {
        .brand-text {
          font-size: 24px !important;
          letter-spacing: 0.05em !important;
        }
      }
      @media (max-width: 480px) {
        .brand-text {
          font-size: 20px !important;
          letter-spacing: 0 !important;
        }
      }
      .risk-score {
        font-size: 64px;
        font-weight: bold;
        font-family: 'Syne', sans-serif;
      }
      .small { font-size: 13px; }
      h1 { font-size: 32px; }
      h2 { font-size: 24px; }
      p { font-size: 16px; }
      .text-accent { color: var(--accent); }
      .text-danger { color: var(--danger); }
      .tagline {
        font-size: 13px;
        opacity: 0.6;
        color: var(--text-primary);
        letter-spacing: 2px;
        margin-top: 6px;
        font-family: 'Space Mono', monospace;
      }
      @keyframes slowPan { from { background-position: 0% 0%; } to { background-position: 100% 100%; } }
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      .logo-glow { text-shadow: 0 0 30px var(--accent-glow), 0 0 60px var(--accent-glow); }
      .hud-grid {
        background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
        background-size: 30px 30px;
        position: fixed; inset: 0; pointer-events: none; z-index: 0;
        opacity: 0.3;
      }
      .ai-decision {
        background: var(--accent-glow);
        border: 1px solid var(--accent);
        border-radius: 20px;
        padding: 32px;
        margin-bottom: 24px;
        position: relative;
        overflow: hidden;
      }
      .ai-decision h3 {
        font-family: 'Space Mono', monospace;
        font-size: 10px;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 16px;
      }
      .ai-decision p {
        font-size: 18px !important;
        line-height: 1.6 !important;
        color: var(--text-primary);
        font-weight: 600;
        margin: 0;
      }
      .alert-bar {
        background: linear-gradient(90deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 12px;
        padding: 16px 24px;
        color: var(--danger);
        font-weight: 800;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 32px;
        animation: neonBreathing 3s infinite;
      }
      .behavior-box {
        background: var(--surface-soft);
        border: 1px solid var(--border-soft);
        border-radius: 20px;
        padding: 24px;
        margin-bottom: 32px;
      }
      .behavior-box h4 {
        font-family: 'Space Mono', monospace;
        font-size: 10px;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 12px;
      }
      .behavior-box p {
        font-size: 15px !important;
        color: var(--text-secondary);
        margin: 0;
      }
      .quick-actions {
        display: flex;
        gap: 16px;
      }
      .quick-actions button {
        flex: 1;
        padding: 16px;
        border-radius: 12px;
        background: var(--surface-soft);
        border: 1px solid var(--border-soft);
        color: var(--text-primary);
        font-size: 12px;
        font-weight: 950;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .quick-actions button:hover {
        background: var(--accent-glow);
        border-color: var(--accent);
        transform: translateY(-2px);
        box-shadow: 0 5px 20px var(--accent-glow);
      }
      .status-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 900;
        font-family: 'Space Mono', monospace;
        letter-spacing: 1px;
      }
      .status-pill.OPTIMAL { background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.2); }
      .status-pill.STABLE { background: rgba(59, 130, 246, 0.1); color: #3B82F6; border: 1px solid rgba(59, 130, 246, 0.2); }
      .status-pill.AT_RISK { background: rgba(245, 158, 11, 0.1); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.2); }
      .status-pill.CRITICAL { background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2); }
      
      .risk-explain {
        font-size: 13px !important;
        color: var(--text-muted);
        text-align: center;
        margin-top: 16px !important;
        font-weight: 500;
      }
      .dot {
        width: 6px;
        height: 6px;
        background: var(--accent);
        border-radius: 50%;
        animation: blink 1s infinite;
      }
      .dot.delay { animation-delay: 0.2s; }
      .dot.delay2 { animation-delay: 0.4s; }

      .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(to bottom, transparent, var(--accent-glow), transparent);
        z-index: 2;
        pointer-events: none;
        animation: scanMove 4s linear infinite;
      }

      @keyframes scanMove {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(800PX); }
      }

      .terminal-window {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 32px;
        position: relative;
        overflow: hidden;
        min-height: 400px;
        box-shadow: inset 0 0 40px var(--accent-glow);
      }

      .terminal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-bottom: 1px solid var(--border-soft);
        padding-bottom: 16px;
      }

      .terminal-text {
        font-family: 'Space Mono', monospace;
        font-size: 14px;
        color: var(--success);
        white-space: pre-wrap;
        line-height: 1.6;
      }

      .terminal-cursor {
        display: inline-block;
        width: 8px;
        height: 15px;
        background: var(--success);
        margin-left: 4px;
        vertical-align: middle;
        animation: cursor-blink 1s step-end infinite;
      }

      @keyframes scanMove {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(800PX); }
      }
      @keyframes feedSlide {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .threat-feed-item {
        animation: feedSlide 0.5s ease-out forwards;
      }
      .probability-card:hover {
        background: var(--surface-soft) !important;
        border-color: var(--accent) !important;
      }
    `}</style>
  );
}

// ── Shared UI Components ─────────────────────────────────────────────────────
function TopNav() {
  return (
    <nav className="top-nav" style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "8px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1000, background: "var(--glass-bg)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", transition: "all 0.3s" }}>
      <button 
        onClick={() => { window.location.reload(); }}
        style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <img src="/bx-logo-light.png" alt="BX" style={{ width: 34, height: 34, borderRadius: 8, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }} />
        <div style={{ textAlign: "left" }}>
          <h1 className="brand-text" style={{ fontSize: 20, letterSpacing: 2, display: "flex", gap: "6px", alignItems: "center" }}>BREXIA <span style={{ color: "#7C3AED" }}>// INTEL</span></h1>
          <div className="tagline hud-telemetry-desktop" style={{ fontSize: 7, marginTop: 0 }}>Breach Risk &amp; Exposure Intelligence Analyzer</div>
        </div>
      </button>
      {/* Telemetry pill — hidden on mobile via CSS */}
      <div className="hud-telemetry-desktop" style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "6px 16px", fontSize: 10, color: "rgba(16, 185, 129, 0.8)", fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10B981" }} />
          SYSTEM: ONLINE
        </div>
      </div>
    </nav>
  );
}

function TypingText({ text, style = {} }) {
  // Animation disabled per user request for faster UX
  return <span style={style}>{text}</span>;
}

// ── Hero Input Component ─────────────────────────────────────────────────────
function HeroInput({ email, setEmail, focused, setFocused, handleScan, scanning, scanDone, scanAnalysisIndex, scanAnalysisMessages }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ["EMAIL ADDRESS...", "USERNAME ID...", "SECURE PASSWORD..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-main-wrapper" style={{ position: "relative", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", overflow: "hidden", padding: "0 24px" }}>

      {/* Animated background orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", animation: "floatOrb 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)", animation: "floatOrb 10s ease-in-out infinite 2s" }} />
        <div style={{ position: "absolute", top: "40%", right: "15%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,145,178,0.08) 0%, transparent 70%)", animation: "floatOrb 12s ease-in-out infinite 4s" }} />
        {/* Rotating ring accent */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(124,58,237,0.06)", animation: "rotateRing 30s linear infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(124,58,237,0.04)", animation: "rotateRing 20s linear infinite reverse", pointerEvents: "none" }} />
      </div>

      {/* Atmospheric Scanning Effects */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="scanning-beam"
            style={{ width: "100%", height: "2px", position: "fixed", top: "50%", zIndex: 2000 }}
          />
        )}
      </AnimatePresence>

      {/* Status Badge — centered, spaced below the logo */}
      <div className="hero-main-section" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, marginBottom: 40, zIndex: 1, width: "100%", margin: "0 auto", paddingTop: 24 }}>
        <img className="hero-logo-img" src="/bx-logo-light.png" alt="BX" style={{ width: 64, height: 64, borderRadius: 14, boxShadow: "0 0 30px rgba(255, 255, 255, 0.15)", animation: "float 4s ease-in-out infinite" }} />
        <div className="hero-status-badge" style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--surface-soft)", border: "1px solid var(--border)", borderRadius: 14, padding: "8px 20px", animation: "springIn 0.8s ease both", fontSize: 10, color: "var(--text-secondary)", fontFamily: "'Space Mono', monospace", letterSpacing: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: scanning ? "#F43F5E" : "#10B981", boxShadow: `0 0 12px ${scanning ? "#F43F5E" : "#10B981"}` }} />
          {scanning ? "THREAT ANALYSIS ACTIVE" : "ACTIVE BREACH NETWORK • v7.42.1"}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!scanning ? (
          /* ── STAGE 1: SEARCH UI ── */
          <motion.div
            key="search-ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", zIndex: 1, position: "relative", width: "100%" }}
          >
            {/* Staggered hero text */}
            <motion.h1
              className="fluid-hero-title blue-cyber-glow logo-glow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                margin: "0 auto 10px", fontWeight: 950, color: "var(--text-primary)", 
                fontFamily: "'Syne', sans-serif", lineHeight: 1, 
                background: "linear-gradient(135deg, var(--text-primary) 50%, var(--accent))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                textTransform: "uppercase",
                textAlign: "center",
                display: "inline-block",
                whiteSpace: "nowrap",
                transform: (typeof window !== 'undefined' && window.innerWidth < 480) ? "translateX(-6px)" : "none"
              }}
            >
              BREXIA
            </motion.h1>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                margin: "10px 0 18px", fontSize: "clamp(0.7rem, 2vw, 1rem)",
                color: "var(--text-primary)", fontFamily: "'Space Mono', monospace",
                maxWidth: 700, marginInline: "auto", lineHeight: 1.6,
                letterSpacing: "0.5em", textTransform: "uppercase", fontWeight: 900, opacity: 0.9,
              }}
            >
              SCAN. SCORE. SECURE.
            </motion.p>

            {/* Animated decorative stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" }}
            >
              {[
                { label: "BREACHES TRACKED", value: "28B+", color: "var(--danger)" },
                { label: "SCAN LATENCY", value: "<2s", color: "var(--success)" },
                { label: "DATA POINTS", value: "1.4T", color: "var(--accent)" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                  style={{
                    background: "var(--surface-soft)", border: `1px solid ${stat.color}33`,
                    borderRadius: 100, padding: "6px 18px",
                    display: "flex", alignItems: "center", gap: 8
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 950, color: stat.color, fontFamily: "'Space Mono', monospace" }}>{stat.value}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-muted)", letterSpacing: 1.5 }}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", maxWidth: 1200, margin: "0 auto", position: "relative" }}
            >
              <div className="hero-input-container" style={{ 
                position: "relative", display: "flex",
                background: "var(--surface)",
                backdropFilter: "var(--glass-blur)",
                border: `2px solid ${focused ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 16, padding: "8px",
                boxShadow: focused ? "0 0 0 4px var(--accent-glow), 0 20px 60px rgba(0,0,0,0.12)" : "0 8px 40px rgba(0,0,0,0.08)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: "glowPulse 4s ease-in-out infinite"
              }}>
                <div className="hero-input-field" style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="EMAIL, USERNAME, OR PASSWORD..."
                    style={{ 
                      width: "100%", background: "transparent", backgroundColor: "transparent", border: "none",
                      padding: "22px 28px", color: "var(--text-primary)", fontSize: 17, outline: "none",
                      fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, fontWeight: 600
                    }}
                    onKeyDown={e => e.key === "Enter" && handleScan()}
                  />
                </div>
                <button
                  className="hero-scan-btn"
                  onClick={() => handleScan()}
                  disabled={scanning}
                  style={{ 
                    background: scanning ? "var(--surface-soft)" : "linear-gradient(135deg, var(--accent) 0%, #EC4899 100%)",
                    border: "none", padding: "0 48px", color: "#fff",
                    fontWeight: 950, fontSize: 15, cursor: scanning ? "not-allowed" : "pointer",
                    fontFamily: "'Syne', sans-serif", letterSpacing: 3,
                    textTransform: "uppercase", transition: "all 0.3s",
                    borderRadius: 12,
                    boxShadow: scanning ? "none" : "0 8px 24px rgba(124,58,237,0.4)",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={e => { if(!scanning) { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.6)"; } }}
                  onMouseLeave={e => { if(!scanning) { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.4)"; } }}>
                  START SCAN
                </button>
              </div>

              {/* Example pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mobile-email-pills"
                style={{ display: "flex", gap: 12, marginTop: 32, justifyContent: "center", flexWrap: "wrap" }}
              >
                <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'Space Mono', monospace", alignSelf: "center", letterSpacing: 1 }}>TRY:</span>
                {["john@example.com", "hunter_42", "SecurePass12!@"].map((ex, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(124,58,237,0.12)" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setEmail(ex)}
                    style={{ 
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10, padding: "9px 18px",
                      color: "var(--text-secondary)", fontSize: 11,
                      fontFamily: "'Space Mono', monospace", cursor: "pointer",
                      fontWeight: 700, transition: "color 0.2s"
                    }}
                  >
                    {ex}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* ── STAGE 2: IMMERSIVE SCANNING CONSOLE ── */
          <motion.div
            key="scanning-console"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(40px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ width: "100%", maxWidth: 640, zIndex: 10 }}
          >
            <div className="cyber-card" style={{ 
              padding: "48px", 
              borderRadius: 32, 
              background: "var(--surface)",
              boxShadow: "var(--shadow-medium)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 900, letterSpacing: 2 }}>INTELLIGENCE_SYNTHESIS_IN_PROGRESS</div>
                <div style={{ color: "var(--accent)", fontSize: 10, fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>NODE_04: SYNCED</div>
              </div>
              
              <div style={{ position: "relative", marginBottom: 40 }}>
                 <div style={{ height: 6, width: "100%", background: "var(--surface-soft)", borderRadius: 100, overflow: "hidden", border: "1px solid var(--border-soft)" }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((scanAnalysisIndex + 1) / scanAnalysisMessages.length) * 100}%` }}
                      style={{ height: "100%", background: "linear-gradient(to right, var(--accent), var(--success))", borderRadius: 100 }}
                    />
                 </div>
              </div>

              <ScanSteps activeIndex={scanAnalysisIndex} steps={scanAnalysisMessages} />
              
              <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid var(--border-soft)", display: "flex", justifyContent: "center" }}>
                 <div style={{ display: "flex", gap: 48 }}>
                    <div style={{ textAlign: "center" }}>
                       <div style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 6, fontWeight: 900 }}>ENTROPY</div>
                       <div style={{ fontSize: 16, color: "var(--text-primary)", fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>{Math.random().toFixed(4)}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                       <div style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 6, fontWeight: 900 }}>LATENCY</div>
                       <div style={{ fontSize: 16, color: "var(--text-primary)", fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>0.00{Math.floor(Math.random()*99)}s</div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Animated Risk Ring ──────────────────────────────────────────────────────
function RiskRing({ score, size = 140 }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      setDisplayed(Math.round(p * score));
      if (p < 1) requestAnimationFrame(animate);
    };
    const t = setTimeout(() => requestAnimationFrame(animate), 400);
    return () => clearTimeout(t);
  }, [score]);

  const r = 54, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (displayed / 100) * circ;
  const color = displayed < 40 ? "#0ACF83" : displayed < 70 ? "#FF9326" : "#F24E1E";
  const trackColor = displayed < 40 ? "rgba(10, 207, 131,0.12)" : displayed < 70 ? "rgba(251,146,60,0.12)" : "rgba(244,63,94,0.12)";

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth="8" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" filter="url(#glow)"
          style={{ transition: "stroke 0.5s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span className="risk-score hud-number" style={{ color, lineHeight: 1, textShadow: `0 0 20px ${color}` }}>{displayed}</span>
        <span style={{ fontSize: 13, color: "var(--text-secondary)", letterSpacing: 3, marginTop: 4, fontFamily: "'Space Mono', monospace", fontWeight: 800 }}>RISK</span>
      </div>
    </div>
  );
}


// ── Helper Component for Typewriter AI Logs ──────────────────────────────
function AILogLine({ text, delay }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || !text) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20); // extremely fast typing speed
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "var(--text-primary)", display: "flex", gap: 12, lineHeight: 1.6, opacity: 0.9 }}>
      <span style={{ color: "var(--accent)" }}>&gt;</span>
      <span>{displayed}{started && displayed.length < text?.length && <span style={{ animation: "pulse 1s infinite" }}>_</span>}</span>
    </div>
  );
}

// ── Highlighted AI Insight Panel (LIVE DECISION ENGINE) ───────────────────
function AIPanel({ data, openai }) {
  const isError = openai?.priority === "ERROR";
  
  // Combine all AI data into terminal thinking logs
  let logs = [];
  if (isError) {
    logs = [
      "initiating neural handshake...",
      "correlating secondary breach vectors...",
      "applying adaptive forensic models...",
      "synthesizing high-fidelity intelligence..."
    ];
  } else if (data && data.length > 0) {
    logs = data.map(d => d.text);
  } else if (openai) {
    logs = [
      "scanning breach signatures...",
      "correlating leaked identity vectors...",
      "mapping attack probability...",
      "generating exploit model..."
    ];
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "8px 0" }}>
      
      {/* 1. AI STATUS LINE (TOP) */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 1.5s infinite" }} />
        <div style={{ fontSize: 12, letterSpacing: 1.5, color: "var(--text-primary)", fontWeight: 800, fontFamily: "'Space Mono', monospace", textTransform: "uppercase" }}>
          AI ENGINE ACTIVE • ANALYZING BREACH PATTERNS
        </div>
      </div>

      {/* 2. LIVE ANALYSIS FEED */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "16px 8px" }}>
        {logs.map((log, i) => (
          <AILogLine key={i} text={(log || "").toLowerCase()} delay={i * 800} />
        ))}
      </div>

      {/* 3. FINAL DECISION CORE */}
      <div className="ai-core" style={{
        marginTop: 16,
        padding: "40px 20px",
        borderRadius: 24,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 16,
        position: "relative",
        overflow: "hidden",
        boxShadow: "var(--shadow-soft)"
      }}>
        {/* Animated glow orb behind text */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 180, height: 180, background: isError ? "var(--text-secondary)" : (openai?.priority === "CRITICAL" ? "var(--danger)" : "var(--warning)"), filter: "blur(60px)", opacity: 0.15, pointerEvents: "none" }} />
        
        <div style={{ fontSize: 11, letterSpacing: 2.5, color: "var(--text-secondary)", fontFamily: "'Space Mono', monospace", fontWeight: 700, zIndex: 1 }}>
          THREAT MODEL READY
        </div>
        
        <h2 style={{ 
          margin: 0, 
          fontSize: 26, 
          fontWeight: 900, 
          color: "var(--text-primary)",
          letterSpacing: -0.5,
          zIndex: 1
        }}>
          {isError ? "ANALYSIS HALTED" : (openai?.priority === "CRITICAL" ? "CRITICAL RISK DETECTED" : "HIGH RISK DETECTED")}
        </h2>

        {/* Mini Insight Tags */}
        {openai?.metrics && !isError && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 12, zIndex: 1 }}>
            <div style={{ padding: "6px 14px", borderRadius: 20, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 10, fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              PHISHING <span style={{ color: "var(--danger)" }}>↑ {openai.metrics.phishing_risk}%</span>
            </div>
            <div style={{ padding: "6px 14px", borderRadius: 20, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 10, fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              TAKEOVER <span style={{ color: "var(--warning)" }}>↑ {openai.metrics.takeover_risk}%</span>
            </div>
            <div style={{ padding: "6px 14px", borderRadius: 20, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 10, fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              IDENTITY <span style={{ color: "var(--accent)" }}>↑ {openai.metrics.identity_risk}%</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ── Mini Line Chart ─────────────────────────────────────────────────────────
function LineChart({ data, color = "#A259FF", label }) {
  const w = 260, h = 80;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (w - 20) + 10;
    const y = h - 10 - ((v - min) / (max - min || 1)) * (h - 20);
    return `${x},${y}`;
  }).join(" ");
  return (
    <div>
      <div style={{ fontSize: 10, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>{label}</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke={color} strokeWidth="2" points={pts} strokeLinecap="round" strokeLinejoin="round" />
        <polygon fill={`url(#grad-${label})`} points={`10,${h - 10} ${pts} ${w - 10},${h - 10}`} />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * (w - 20) + 10;
          const y = h - 10 - ((v - min) / (max - min || 1)) * (h - 20);
          return <circle key={i} cx={x} cy={y} r="3" fill={color} opacity="0.8" />;
        })}
      </svg>
    </div>
  );
}

// ── Pie Chart ───────────────────────────────────────────────────────────────
function PieChart({ slices }) {
  const total = slices.reduce((a, s) => a + s.value, 0);
  let angle = -Math.PI / 2;
  const paths = slices.map(s => {
    const a1 = angle, a2 = angle + (s.value / total) * Math.PI * 2;
    angle = a2;
    const x1 = 50 + 40 * Math.cos(a1), y1 = 50 + 40 * Math.sin(a1);
    const x2 = 50 + 40 * Math.cos(a2), y2 = 50 + 40 * Math.sin(a2);
    const large = a2 - a1 > Math.PI ? 1 : 0;
    return { d: `M50,50 L${x1},${y1} A40,40 0 ${large},1 ${x2},${y2}Z`, color: s.color, label: s.label, pct: Math.round(s.value / total * 100) };
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <svg width="90" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="var(--surface-soft)" />
        {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} opacity="0.85" />)}
        <circle cx="50" cy="50" r="22" fill="var(--surface)" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {paths.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{p.label}</span>
            <span className="hud-number" style={{ fontSize: 11, color: p.color, marginLeft: "auto", fontWeight: 700 }}>{p.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Breach Card Component (Animated) ────────────────────────────────────────
function BreachCard({ breach, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cyber-card"
      style={{
        position: "relative",
        background: "var(--surface)",
        border: `1px solid ${isHovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 24,
        padding: "32px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isHovered ? "var(--shadow-medium)" : "var(--shadow-soft)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)"
      }}
    >
      {/* Background Kinetic Glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 0%, ${breach.severity === "CRITICAL" ? "rgba(244, 63, 94, 0.15)" : "rgba(124, 58, 237, 0.15)"} 0%, transparent 70%)`,
              borderRadius: 24,
              pointerEvents: "none",
              zIndex: 0
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
        <div style={{ 
          width: 56, height: 56, borderRadius: 16, 
          background: "rgba(255,255,255,0.03)", 
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)"
        }}>
          {breach.icon && (
            <img 
              src={breach.icon} 
              alt={breach.displayName || "Breach Icon"} 
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
              onError={(e) => { 
                e.currentTarget.style.display = 'none'; 
                const fallback = e.currentTarget.nextSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          )}
          <div className="logo-fallback" style={{ 
            display: breach.icon ? 'none' : 'flex', 
            width: "100%", height: "100%", 
            alignItems: "center", justifyContent: "center", 
            fontSize: 20, fontWeight: 900, color: "#7C3AED" 
          }}>
            {breach.logoFallback || (breach.name ? breach.name.substring(0, 2).toUpperCase() : "BX")}
          </div>
        </div>
        
        <div style={{ textAlign: "right" }}>
          <div style={{ 
            fontSize: 10, fontWeight: 950, letterSpacing: 2, 
            color: breach.severity === "CRITICAL" ? "var(--danger)" : "var(--warning)", 
            fontFamily: "'Space Mono', monospace", 
            marginBottom: 4,
            animation: breach.severity === "CRITICAL" ? "flicker 2s infinite" : "none"
          }}>
            {breach.severity}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 700 }}>
            {breach.date}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, zIndex: 1 }}>
        <h4 style={{ fontSize: 22, fontWeight: 950, color: "var(--text-primary)", marginBottom: 8, letterSpacing: -0.5 }}>
          {breach.displayName || breach.name || breach.breach_name}
        </h4>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>
          {breach.description || "Active identity correlation confirmed in specialized leak dataset."}
        </div>
      </div>

      <div style={{ zIndex: 1, pt: 16, borderTop: "1px solid var(--border-soft)", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16 }}>
        <div>
          <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 900, marginBottom: 2 }}>DATA_LEAKED</div>
          <div style={{ fontSize: 12, color: "var(--text-primary)", fontWeight: 800 }}>{breach.type}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 900, marginBottom: 2 }}>EXPOSURE_COUNT</div>
          <div style={{ fontSize: 16, color: "var(--accent)", fontWeight: 950 }}>{breach.records}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Breach Timeline ─────────────────────────────────────────────────────────
function Timeline({ events }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ overflowX: "auto", paddingBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", minWidth: 520, position: "relative", paddingTop: 48 }}>
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(162, 89, 255,0.4) 10%, rgba(162, 89, 255,0.4) 90%, transparent)" }} />
        {events.map((e, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", cursor: "pointer" }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>{e.year}</div>
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: e.severity === "high" ? "#F24E1E" : e.severity === "med" ? "#FF9326" : "#0ACF83", border: `2px solid ${e.severity === "high" ? "#F24E1E" : e.severity === "med" ? "#FF9326" : "#0ACF83"}`, boxShadow: `0 0 10px ${e.severity === "high" ? "#F24E1E" : e.severity === "med" ? "#FF9326" : "#0ACF83"}66`, zIndex: 1, transition: "transform 0.2s", transform: hovered === i ? "scale(1.5)" : "scale(1)" }} />
            <div style={{ marginTop: 10, fontSize: 11, color: "var(--text-muted)", textAlign: "center", maxWidth: 80, lineHeight: 1.4 }}>{e.label}</div>
            {hovered === i && (
              <div style={{ position: "absolute", top: -44, background: "#1e2d45", border: "1px solid rgba(162, 89, 255,0.3)", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#e2e8f0", whiteSpace: "nowrap", zIndex: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", pointerEvents: "none" }}>
                <div style={{ fontWeight: 700, color: "#A259FF", marginBottom: 3 }}>{e.year}</div>
                {e.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Scan Animation ──────────────────────────────────────────────────────────
function ScanSteps({ steps = [], activeIndex = 0 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {steps.map((s, i) => {
        const isPast = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <div key={i} style={{ 
            display: "flex", alignItems: "center", gap: 20, 
            opacity: isActive ? 1 : isPast ? 0.8 : 0.25, 
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isActive ? "translateX(8px)" : "translateX(0)"
          }}>
            <div style={{ 
              width: 24, height: 24, borderRadius: "50%", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              background: isPast ? "var(--success)" : isActive ? "var(--accent)" : "var(--surface-soft)", 
              transition: "all 0.4s", fontSize: 11 
            }}>
              {isPast ? <CheckCircle2 size={14} color="#fff" /> : isActive ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", animation: "pulse 0.8s infinite" }} /> : ""}
            </div>
            <span style={{ 
              fontSize: 14, 
              color: isPast ? "var(--success)" : isActive ? "var(--text-primary)" : "var(--text-muted)", 
              fontFamily: "'Space Mono', monospace",
              fontWeight: isActive ? 800 : 500,
              letterSpacing: 0.5
            }}>{s.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Secondary Views ────────────────────────────────────────────────────────
// (Removed duplicates)

// ── Tactical HUD Overlay ──────────────────────────────────────────────────
function TacticalHUD({ stats }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e) => setCoords({ x: Math.floor(e.clientX), y: Math.floor(e.clientY) });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="tactical-hud-mobile" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1100, color: "rgba(124, 58, 237, 0.3)", fontFamily: "'Space Mono', monospace", fontSize: 9 }}>
      {/* Corner Brackets */}
      <div style={{ position: "absolute", top: 20, left: 20, width: 30, height: 30, borderTop: "1px solid", borderLeft: "1px solid" }} />
      <div style={{ position: "absolute", top: 20, right: 20, width: 30, height: 30, borderTop: "1px solid", borderRight: "1px solid" }} />
      <div style={{ position: "absolute", bottom: 20, left: 20, width: 30, height: 30, borderBottom: "1px solid", borderLeft: "1px solid" }} />
      <div style={{ position: "absolute", bottom: 20, right: 20, width: 30, height: 30, borderBottom: "1px solid", borderRight: "1px solid" }} />
      
      {/* HUD Data Readouts */}
      <div style={{ position: "absolute", top: 120, left: 25, display: "flex", flexDirection: "column", gap: 10 }} className="hud-telemetry-desktop">
        <div style={{ animation: "flicker 2s infinite" }}>CORE_INIT: {stats.coreInit}</div>
        <div style={{ animation: "flicker 3.5s infinite" }}>SEC_BUFFER: {stats.secBuffer}</div>
      </div>
      <div style={{ position: "absolute", bottom: 120, right: 25, textAlign: "right", display: "flex", flexDirection: "column", gap: 10 }} className="hud-telemetry-desktop">
        <div>LNG_COORD: {stats.lngCoord || coords.x}</div>
        <div>LAT_STATE: {stats.latState}</div>
        <div style={{ color: "#00f0ff" }}>NEURAL_MAP: {stats.neuralMap}</div>
      </div>
    </div>
  );
}

// ── Cyber Terminal Component ──────────────────────────────────────────────
function CyberTerminal({ text, isStreaming, thinking }) {
  return (
    <div className="terminal-window">
      <div className="scan-line" />
      
      <div className="terminal-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}>{new Date().toLocaleTimeString()}</div>
      </div>

      {thinking && (
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
          <div className="flex gap-2">
            <div className="dot" />
            <div className="dot delay" />
            <div className="dot delay2" />
          </div>
          <span style={{ fontSize: 13, color: "#A855F7", fontWeight: 700, fontFamily: "'Space Mono', monospace", animation: "flicker 2s infinite" }}>
            BREXIA AI IS SYNTHESIZING THREAT INTELLIGENCE...
          </span>
        </div>
      )}

      {!thinking && !text && !isStreaming && (
        <div style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace", fontSize: 13 }}>
          {">"} WAITING FOR NEURAL INGESTION SEQUENCE...
        </div>
      )}

      {(text || isStreaming) && (
        <div className="terminal-text">
          {text}
          {isStreaming && <span className="terminal-cursor" />}
        </div>
      )}
    </div>
  );
}
function RiskProgress({ label, value, color = "#7C3AED" }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 900, color: "var(--text-secondary)", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>{label.toUpperCase()}</span>
        <span style={{ fontSize: 13, fontWeight: 950, color: "#fff", fontFamily: "'Space Mono', monospace" }}>{value}%</span>
      </div>
      <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.03)" }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${color}CC, ${color})`, boxShadow: `0 0 15px ${color}66` }}
        />
      </div>
    </div>
  );
}

function AttackFlow({ steps: customSteps }) {
  const defaultSteps = [
    { icon: "👤", text: "Identity", color: "#fff" },
    { icon: "🌐", text: "Service Leak", color: "#F43F5E" },
    { icon: "📡", text: "Dark Web", color: "#7C3AED" },
    { icon: "⚠️", text: "Hacker Attempt", color: "#FB923C" }
  ];

  const steps = customSteps || defaultSteps;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px 0", position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.2), transparent)", zIndex: 0 }} />
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 + 0.8 }}
            style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(15, 23, 42, 0.8)", border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: `0 0 20px ${s.color}22` }}>
              {s.icon}
            </div>
            <div style={{ fontSize: 9, fontWeight: 900, color: s.color, letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>{s.text.toUpperCase()}</div>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.2 + 0.9, duration: 0.4 }}
              style={{ flex: 1, height: 2, background: i === 0 ? "rgba(244, 63, 94, 0.3)" : "rgba(124, 58, 237, 0.3)", transformOrigin: "left" }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
function ExposureTimeline({ events }) {
  if (!events || events.length === 0) return null;
  return (
    <div style={{ position: "relative", paddingLeft: 24, borderLeft: "2px solid var(--accent-glow)" }}>
      {events.map((ev, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 + 0.5 }}
          style={{ position: "relative", marginBottom: 32 }}
        >
          <div style={{ 
            position: "absolute", left: -31, top: 4, width: 14, height: 14, 
            borderRadius: "50%", background: ev.severity === "High" ? "var(--danger)" : "var(--accent)", 
            border: "3px solid var(--bg)", boxShadow: `0 0 10px ${ev.severity === "High" ? "var(--danger)" : "var(--accent)"}` 
          }} />
          <div style={{ fontSize: 13, fontWeight: 950, color: "var(--text-primary)", marginBottom: 4 }}>{ev.date}</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 900, textTransform: "uppercase" }}>{(ev.name || "Unknown Threat")} • {ev.type || "Data leaked"}</div>
          <div style={{ fontSize: 10, color: ev.severity === "High" ? "var(--danger)" : "var(--accent)", fontWeight: 950, marginTop: 6, letterSpacing: 1.5 }}>{ev.impact || "CORE THREAT INDEXED"}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Kinetic Components ────────────────────────────────────────────────────────
function useMouseTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 30;
    const y = (clientY - window.innerHeight / 2) / 30;
    setTilt({ x, y });
  };
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
  return tilt;
}

function NeuralPlexus({ nodes = 8 }) {
  return (
    <div style={{ position: "relative", width: "100%", height: 300, background: "rgba(0,0,0,0.2)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(124, 58, 237, 0.1)" }}>
      <svg style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: nodes }).map((_, i) => {
          const cx = 50 + 35 * Math.cos((i * 2 * Math.PI) / nodes);
          const cy = 50 + 35 * Math.sin((i * 2 * Math.PI) / nodes);
          return (
            <React.Fragment key={i}>
              <motion.line 
                x1="50%" y1="50%" x2={`${cx}%`} y2={`${cy}%`}
                stroke="rgba(124, 58, 237, 0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
              <motion.circle 
                cx={`${cx}%`} cy={`${cy}%`} r="3"
                fill="#7C3AED"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              />
              <circle cx={`${cx}%`} cy={`${cy}%`} r="12" fill="url(#nodeGlow)" />
            </React.Fragment>
          );
        })}
        <circle cx="50%" cy="50%" r="6" fill="#00f0ff" style={{ filter: "drop-shadow(0 0 10px #00f0ff)" }} />
        <motion.circle 
          cx="50%" cy="50%" r="40" 
          stroke="#00f0ff" strokeWidth="1" strokeDasharray="5,5" fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div style={{ position: "absolute", bottom: 16, right: 16, fontSize: 9, color: "rgba(0, 240, 255, 0.4)", fontFamily: "'Space Mono', monospace" }}>IDENTITY_CORE_SPRING_ACTIVE</div>
    </div>
  );
}

function ForensicTerminal({ logs = [] }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <div style={{ background: "var(--background)", borderRadius: 16, border: "1px solid var(--border)", padding: 20, fontFamily: "'Space Mono', monospace", height: 200, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--danger)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--warning)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} />
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", fontSize: 11, color: "#4ade80", lineHeight: 1.6 }}>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: 4, display: "flex", gap: 10 }}>
            <span style={{ color: "rgba(74, 222, 128, 0.3)" }}>[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
            <span>{log}</span>
          </div>
        ))}
        {logs.length === 0 && <div style={{ color: "rgba(255,255,255,0.1)" }}>Awaiting neural telemetry...</div>}
        <motion.div animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ display: "inline-block", width: 8, height: 14, background: "#4ade80", marginLeft: 4, verticalAlign: "middle" }} />
      </div>
    </div>
  );
}

function ThreatTopology({ breaches = [] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
      {breaches.map((b, i) => {
        const size = b.riskScore > 80 ? 1.1 : b.riskScore > 50 ? 1 : 0.9;
        return (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{ 
              background: "rgba(255,255,255,0.02)", 
              border: `1px solid ${b.riskScore > 80 ? "rgba(244, 63, 94, 0.2)" : "rgba(124, 58, 237, 0.2)"}`, 
              borderRadius: 24, padding: 24, 
              position: "relative", overflow: "hidden",
              minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "space-between"
            }}
          >
             <div style={{ fontSize: 40, position: "absolute", bottom: -10, right: -10, opacity: 0.05, filter: "grayscale(1)" }}>{b.name.charAt(0)}</div>
             <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                   <div style={{ fontSize: 10, color: b.riskScore > 80 ? "#F43F5E" : "#7C3AED", fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>NODE_ID: {i+1}</div>
                   <div style={{ width: 12, height: 12, borderRadius: "50%", background: b.riskScore > 80 ? "#F43F5E" : "#7C3AED", boxShadow: `0 0 10px ${b.riskScore > 80 ? "#F43F5E" : "#7C3AED"}` }} />
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: 0 }}>{b.name.toUpperCase()}</h4>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>{b.type}</div>
             </div>
             <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 20 }}>
                <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 800 }}>IMPACT:</span>
                <span style={{ fontSize: 24, fontWeight: 950, color: b.riskScore > 80 ? "#F43F5E" : "#fff" }}>{b.riskScore}%</span>
             </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function AIDecisionCard({ status, reason }) {
  const color = status === "CRITICAL" ? "var(--danger)" : status === "MODERATE" ? "var(--warning)" : "var(--success)";

  return (
    <div className="cyber-card" style={{ background: "var(--surface-soft)", border: `1px solid ${color}`, borderRadius: 24, padding: "24px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: (typeof window !== 'undefined' && window.innerWidth < 768) ? "column" : "row", gap: (typeof window !== 'undefined' && window.innerWidth < 768) ? 12 : 24, alignItems: (typeof window !== 'undefined' && window.innerWidth < 768) ? "flex-start" : "center" }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 900, letterSpacing: 2, marginBottom: 8 }}>NEURAL_DECISION</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 950, color }}>{status}</div>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 15px ${color}`, animation: "pulse 2s infinite" }} />
          </div>
        </div>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
          {reason || "Neural model is processing cross-vector telemetry for a final identity determination..."}
        </p>
      </div>
    </div>
  );
}

function RiskWhyCard({ score, bullets }) {
  const color = score > 80 ? "var(--danger)" : score > 60 ? "var(--warning)" : "var(--success)";

  return (
    <div className="cyber-card" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: (typeof window !== 'undefined' && window.innerWidth < 768) ? "24px" : "32px" }}>
       <div style={{ 
         display: "flex", 
         flexDirection: (typeof window !== 'undefined' && window.innerWidth < 768) ? "column" : "row", 
         alignItems: (typeof window !== 'undefined' && window.innerWidth < 768) ? "flex-start" : "center", 
         gap: (typeof window !== 'undefined' && window.innerWidth < 768) ? 24 : 32 
       }}>
          <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, margin: (typeof window !== 'undefined' && window.innerWidth < 768) ? "0 auto" : "0" }}>
            <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--surface-soft)" strokeWidth="3" />
              <motion.path 
                initial={{ strokeDasharray: "0, 100" }} 
                animate={{ strokeDasharray: `${score}, 100` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" 
              />
            </svg>
            <div style={{ position: "absolute", fontSize: 24, fontWeight: 950, color }}>{score}</div>
          </div>
          <div style={{ flex: 1, width: "100%" }}>
             <h4 style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 900, letterSpacing: 2, marginBottom: 16 }}>STRATEGIC_RISK_JUSTIFICATION</h4>
             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {bullets?.map((b, i) => (
                   <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, marginTop: 6, flexShrink: 0 }} />
                    {b}
                  </li>
                )) || (
                  <li style={{ color: "var(--text-muted)", fontSize: 12, fontStyle: "italic" }}>Awaiting neural risk correlation...</li>
                )}
             </ul>
          </div>
       </div>
    </div>
  );
}

function AdvancedBreachInsight({ story, breach, breachCount, fixing, isSecured, onFixAll, onFix, onSetModal }) {
  if (!story || !breach) return null;

  // Real-time metrics based on breach data
  const metrics = story.risk_metrics || {
    phishing_risk: 70,
    takeover_risk: 50,
    identity_risk: 80
  };

  return (
    <div className="cyber-grid" style={{ overflow: "visible" }}>
      {/* LEFT: AI BREACH INTELLIGENCE CORE */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, overflow: "hidden" }}>
        {/* Breach Header */}
        <div style={{ background: "var(--surface-soft)", borderLeft: "4px solid var(--danger)", padding: "24px 32px", borderRadius: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--danger)", fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>🚨 BREACH DETECTED</div>
              <h2 style={{ fontSize: 32, fontWeight: 950, color: "var(--text-primary)", margin: 0 }}>{breach.name.toUpperCase()} ({breach.date})</h2>
            </div>
            <div style={{ background: "var(--danger)", borderRadius: 8, padding: "6px 12px", color: "#FFF", fontSize: 10, fontWeight: 900 }}>
              SEVERITY: {story.security_risk?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* AI Narrative Intelligence */}
        <div className="cyber-card" style={{ padding: 32, flex: 1, overflowY: "auto", position: "relative" }}>
           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
             <Brain size={18} color="var(--accent)" />
             <h3 style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 900, letterSpacing: 1 }}>AI BREACH INTELLIGENCE</h3>
           </div>

           <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <section>
                <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 900, marginBottom: 8 }}>🧠 ABOUT THIS SITE</div>
                <div style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6 }}>{story.about_site}</div>
              </section>

              <div style={{ height: 1, background: "var(--border-soft)" }} />

              <section>
                <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 900, marginBottom: 8 }}>🛠 HOW IT HAPPENED</div>
                <div style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6 }}>{story.breach_mechanics}</div>
              </section>

              <div style={{ height: 1, background: "var(--border-soft)" }} />

              <section>
                <div style={{ fontSize: 11, color: "var(--danger)", fontWeight: 900, marginBottom: 8 }}>⚠️ WHY IT IS DANGEROUS</div>
                <div style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6 }}>{story.user_danger}</div>
              </section>
           </div>
        </div>
      </div>

      {/* RIGHT: RISK ASSESSMENT & TOOLS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="cyber-card" style={{ padding: 32 }}>
          <h3 style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 900, letterSpacing: 2, marginBottom: 24 }}>STRATEGIC RISK ASSESSMENT</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <RiskBar label="Phishing Risk" value={metrics.phishing_risk} color="var(--accent)" />
            <RiskBar label="Account Takeover" value={metrics.takeover_risk} color="var(--danger)" />
            <RiskBar label="Identity Tracking" value={metrics.identity_risk} color="var(--success)" />
          </div>
        </div>


      </div>
    </div>
  );
}

function RiskBar({ label, value, color }) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "var(--text-secondary)" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 950, color: color }}>{value}%</span>
      </div>
      <div style={{ height: 8, background: "var(--surface-soft)", borderRadius: 100, overflow: "hidden" }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ height: "100%", background: color }}
        />
      </div>
    </div>
  );
}

function CompactIdentityBar({ email, riskScore }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card compact-identity-bar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        padding: "16px 24px",
        marginBottom: 32,
        width: "100%",
        boxShadow: "var(--shadow-soft)",
        flexWrap: "wrap",
        gap: 16
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", flexShrink: 0
        }}>
          <User size={24} />
        </div>
        <div style={{ minWidth: 200 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", letterSpacing: -0.5, wordBreak: "break-all" }}>{email}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} />
            <span style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 900, letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>IDENTITY_SECURE</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 800, letterSpacing: 1 }}>RISK_LEVEL</div>
          <div style={{ fontSize: 18, fontWeight: 950, color: riskScore > 70 ? "var(--danger)" : "var(--success)" }}>{riskScore}%</div>
        </div>
      </div>
    </motion.div>
  );
}

function PasswordLab() {
  const [password, setPassword] = useState("X7@kP9#zLm!2");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ symbols: true, numbers: true, upper: true });
  const [customPw, setCustomPw] = useState("");
  const [flicker, setFlicker] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setFlicker(true);
    setTimeout(() => {
      const chars = "abcdefghijklmnopqrstuvwxyz" + (options.upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") + (options.numbers ? "0123456789" : "") + (options.symbols ? "!@#$%^&*" : "");
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      setPassword(result);
      setFlicker(false);
    }, 200);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkStrength = (pw) => {
    if (!pw) return { label: "N/A", color: "#CBD5E1" };
    if (pw.length > 14 && /[A-Z]/.test(pw) && /\d/.test(pw) && /[!@#$%^&*]/.test(pw)) return { label: "STRONG", color: "#16A34A" };
    if (pw.length > 8) return { label: "MEDIUM", color: "#CA8A04" };
    return { label: "WEAK", color: "#E11D48" };
  };

  const strength = checkStrength(customPw || password);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Lock size={14} color="var(--accent)" />
          <h3 style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 900, letterSpacing: 1, margin: 0 }}>PASSWORD LAB</h3>
        </div>
        {copied && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 9, color: "var(--success)", fontWeight: 900, letterSpacing: 1 }}>COPIED!</motion.div>
        )}
      </div>

      <div>
        <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>GENERATED ENTROPY</div>
        <div style={{ position: "relative", display: "flex", gap: 8 }}>
           <input 
              readOnly 
              value={password}
              style={{ flex: 1, background: "var(--surface-soft)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px", color: flicker ? "transparent" : "var(--accent)", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, outline: "none", textAlign: "center" }}
           />
           <button onClick={copy} style={{ background: "var(--accent-glow)", border: "1px solid var(--border)", borderRadius: 8, padding: "0 12px", color: "var(--accent)", cursor: "pointer", display: "flex", alignItems: "center" }}>
             <Download size={14} />
           </button>
           {flicker && <div style={{ position: "absolute", top: 0, left: 0, width: "calc(100% - 40px)", height: "100%", background: "var(--accent-glow)", borderRadius: 8, animation: "pulse 0.2s infinite" }} />}
        </div>
        <button onClick={generate} style={{ width: "100%", marginTop: 8, background: "var(--accent)", border: "none", borderRadius: 8, padding: "12px", color: "#FFF", fontSize: 10, fontWeight: 900, cursor: "pointer", letterSpacing: 1 }}>[ GENERATE NEW ]</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "var(--surface-soft)", padding: 12, borderRadius: 12 }}>
         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={options.symbols} onChange={e => setOptions({...options, symbols: e.target.checked})} />
            <span style={{ fontSize: 9, color: "var(--text-secondary)", fontWeight: 700 }}>SYMBOLS</span>
         </div>
         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={options.numbers} onChange={e => setOptions({...options, numbers: e.target.checked})} />
            <span style={{ fontSize: 9, color: "var(--text-secondary)", fontWeight: 700 }}>NUMBERS</span>
         </div>
         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={options.upper} onChange={e => setOptions({...options, upper: e.target.checked})} />
            <span style={{ fontSize: 9, color: "var(--text-secondary)", fontWeight: 700 }}>UPPERCASE</span>
         </div>
         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="range" min="8" max="32" value={length} onChange={e => setLength(parseInt(e.target.value))} style={{ width: 30 }} />
            <span style={{ fontSize: 9, color: "var(--text-secondary)", fontWeight: 700 }}>LEN: {length}</span>
         </div>
      </div>

      <div style={{ height: 1, background: "var(--border-soft)" }} />

        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
           <div style={{ height: 4, flex: 1, background: "var(--border-soft)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: strength.label === "STRONG" ? "100%" : strength.label === "MEDIUM" ? "60%" : strength.label === "WEAK" ? "30%" : "0%", background: strength.color, transition: "all 0.3s" }} />
           </div>
           <div style={{ fontSize: 9, fontWeight: 950, color: strength.color }}>{strength.label}</div>
        </div>
      </div>
  );
}





// ── Security Alert Panel (Refactored Live Alert UI) ─────────────────────────

function SecurityAlertPanel({ data, onAction }) {
  if (!data) return (
    <div style={{ padding: 100, textAlign: "center", background: "var(--surface-soft)", borderRadius: 32, border: "1px solid var(--border)" }}>
      <RefreshCcw className="animate-spin" size={40} color="var(--accent)" style={{ margin: "0 auto 20px", opacity: 0.3 }} />
      <h3 style={{ color: "var(--text-muted)", fontSize: 18, fontWeight: 950, letterSpacing: 2 }}>SYNTHESIZING_INTELLIGENCE</h3>
    </div>
  );

  const getRiskColor = (level) => {
    const l = level?.toLowerCase();
    if (l === "critical" || l === "high") return "var(--danger)";
    if (l === "medium") return "var(--warning)";
    return "var(--success)";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: (typeof window !== 'undefined' && window.innerWidth < 768) ? 24 : 40 }}>
      
      {/* SECTION: DEFENSE ACTIONS (Primary Focus) */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: (typeof window !== 'undefined' && window.innerWidth < 768) ? "24px" : "32px", borderRadius: 24, boxShadow: "var(--shadow-medium)", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ShieldAlert size={20} color="var(--accent)" />
          <h3 style={{ fontSize: (typeof window !== 'undefined' && window.innerWidth < 768) ? 12 : 14, color: "var(--text-primary)", fontWeight: 950, letterSpacing: 1, margin: 0 }}>ACTIVE DEFENSE PROTOCOLS</h3>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
           <button onClick={() => onAction('secure_email')} style={{ flex: 1, minWidth: 140, padding: "16px", background: "var(--surface-soft)", border: "1px solid var(--border-soft)", borderRadius: 12, color: "var(--text-primary)", fontSize: 11, fontWeight: 950, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" }}>
             <Lock size={16} color="var(--accent)" /> LOCK ACCOUNTS
           </button>
           <button onClick={() => onAction('open_2fa_guide')} style={{ flex: 1, minWidth: 140, padding: "16px", background: "var(--surface-soft)", border: "1px solid var(--border-soft)", borderRadius: 12, color: "var(--text-primary)", fontSize: 11, fontWeight: 950, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" }}>
             <Fingerprint size={16} color="var(--accent)" /> ENABLE 2FA
           </button>
           <button onClick={() => onAction('generate_password')} style={{ flex: 1, minWidth: 140, padding: "16px", background: "var(--surface-soft)", border: "1px solid var(--border-soft)", borderRadius: 12, color: "var(--text-primary)", fontSize: 11, fontWeight: 950, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" }}>
             <RotateCcw size={16} color="var(--accent)" /> FORCE RESET
           </button>
        </div>
      </div>



      <div className="cyber-card" style={{ padding: (typeof window !== 'undefined' && window.innerWidth < 768) ? "24px" : "32px" }}>
         <PasswordLab />
      </div>
    </div>
  );
}



function FixingOverlay({ isSuccess = false }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        position: "fixed", inset: 0, background: "var(--background)", 
        backdropFilter: "blur(24px)", zIndex: 3000, 
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: (typeof window !== 'undefined' && window.innerWidth < 768) ? 20 : 32 
      }}
    >
      <div className="hud-grid" style={{ opacity: 0.15 }} />
      <div className="scanning-beam" style={{ opacity: 0.15 }} />
      
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div 
            key="fixing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ position: "relative" }}
            >
              <Shield size={80} color="var(--accent)" style={{ filter: "drop-shadow(0 0 20px var(--accent))" }} />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ position: "absolute", inset: -20, border: "2px solid var(--accent)", borderRadius: "50%" }} 
              />
            </motion.div>

            <div style={{ textAlign: "center", width: "100%", maxWidth: "80vw" }}>
              <h2 style={{ fontSize: (typeof window !== 'undefined' && window.innerWidth < 768) ? 14 : 24, fontWeight: 950, color: "var(--text-primary)", letterSpacing: 4, margin: "0 0 8px", fontFamily: "'Syne', sans-serif" }}>DEFENSE_ENGAGED</h2>
              <p style={{ fontSize: 9, color: "var(--text-secondary)", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>REMEDIATING...</p>
            </div>

            <div style={{ width: (typeof window !== 'undefined' && window.innerWidth < 768) ? 240 : 300, height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 100, overflow: "hidden", border: "1px solid var(--border-soft)", position: "relative" }}>
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, transparent, var(--accent), var(--success), transparent)" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              style={{ width: 100, height: 100, borderRadius: "50%", background: "var(--success-glow)", border: "2px solid var(--success)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)" }}
            >
              <Check size={48} color="var(--success)" />
            </motion.div>
            <div style={{ padding: "0 20px" }}>
              <h2 style={{ fontSize: (typeof window !== 'undefined' && window.innerWidth < 768) ? 20 : 28, fontWeight: 950, color: "var(--text-primary)", letterSpacing: 2, margin: "0 0 12px", fontFamily: "'Syne', sans-serif" }}>SUCCESS</h2>
              <p style={{ fontSize: (typeof window !== 'undefined' && window.innerWidth < 768) ? 12 : 13, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>Identity Shield initialized. Check email for audit.</p>
            </div>
            <div style={{ fontSize: 10, color: "var(--success)", fontWeight: 900, fontFamily: "'Space Mono', monospace", letterSpacing: 3, background: "rgba(16, 185, 129, 0.1)", padding: "8px 20px", borderRadius: 100, border: "1px solid rgba(16, 185, 129, 0.3)" }}>
              STATUS: SECURED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "flex", gap: 48, marginTop: 12, opacity: isSuccess ? 0 : 1, transition: "opacity 0.3s" }}>
         <div style={{ textAlign: "center" }}>
           <div style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 4, fontWeight: 900 }}>ENCRYPTION</div>
           <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>AES-256</div>
         </div>
         <div style={{ textAlign: "center" }}>
           <div style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 4, fontWeight: 900 }}>PROTOCOL</div>
           <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>TLS 1.3</div>
         </div>
      </div>
    </motion.div>
  );
}

function KineticCard({ children, style = {}, className = "" }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = (y - centerY) / 20;
    const rotY = (centerX - x) / 20;
    setRotate({ x: rotX, y: rotY });
  };

  const reset = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`cyber-card ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        ...style
      }}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}

// ── Recent Global Telemetry ────────────────────────────────────────────────
function RecentScans({ history }) {
  if (!history || history.length === 0) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      style={{ marginTop: 80, width: "100%", maxWidth: 1100, margin: "80px auto 0 auto" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--danger)", animation: "pulse 1.5s infinite" }} />
        <h3 style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
          LIVE_GLOBAL_TELEMETRY_FEED
        </h3>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {history.map((scan, i) => (
          <motion.div
            key={scan.time + i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cyber-card"
            style={{ 
              background: "var(--surface)", 
              border: "1px solid var(--border)", 
              borderRadius: 20, padding: "20px 24px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              boxShadow: "var(--shadow-soft)"
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                {scan.email.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + "*".repeat(gp3.length))}
              </div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
                {new Date(scan.time).toLocaleTimeString()}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 950, color: scan.risk > 70 ? "var(--danger)" : scan.risk > 40 ? "var(--warning)" : "var(--success)" }}>
                {scan.risk}%
              </div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 900, letterSpacing: 1 }}>RISK</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── iOS-Style Settings Sheet ──────────────────────────────────────────────
function SettingsPanel({ appearance, onAppearanceChange }) {
  const options = [
    { id: 'dark', label: 'Dark Mode' },
    { id: 'light', label: 'Light Mode' }
  ];

  const handleClick = (e, id) => {
    // Trigger Liquid Morph
    const overlay = document.getElementById("theme-transition-overlay");
    if (overlay) {
      overlay.style.top = `${e.clientY - 50}px`;
      overlay.style.left = `${e.clientX - 50}px`;
      overlay.classList.remove("animate-morph");
      void overlay.offsetWidth; // Force reflow
      overlay.classList.add("animate-morph");
    }
    
    // Switch Theme with delay for animation coverage
    setTimeout(() => {
      onAppearanceChange(id);
    }, 250);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600, marginBottom: 16, paddingLeft: 4 }}>APPEARANCE</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {options.map((opt) => (
            <label 
              key={opt.id}
              className="theme-option"
              onClick={(e) => handleClick(e, opt.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: 16,
                cursor: "pointer",
                transition: "all 0.2s",
                background: appearance === opt.id ? "var(--accent-glow)" : "transparent"
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)" }}>{opt.label}</span>
              <input 
                type="radio" 
                name="theme" 
                value={opt.id} 
                checked={appearance === opt.id}
                readOnly
              />
            </label>
          ))}
        </div>
      </div>
      
      {/* Subtle Cyber Line */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--accent), transparent)", opacity: 0.2, marginTop: 8 }} />
    </div>
  );
}

// ── Main Controller ──────────────────────────────────────────────────────────
export default function BrexiaDashboard() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanAnalysisIndex, setScanAnalysisIndex] = useState(0);
  const [apiData, setApiData] = useState(null);
  const [scanDone, setScanDone] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedThreat, setExpandedThreat] = useState(null);
  const [remediationReport, setRemediationReport] = useState(null);
  const [fetchingRemediation, setFetchingRemediation] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [appearance, setAppearance] = useState('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [systemStats, setSystemStats] = useState({
    threatLevel: "NIL",
    coreInit: "SUCCESS",
    secBuffer: "OPTIMAL",
    lngCoord: "0.000",
    latState: "READY",
    neuralMap: "PASSIVE"
  });

  const generateSystemStats = (emailVal, breaches, riskScore) => {
    // Deterministic hash for coordinates and variation
    const seed = emailVal.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      threatLevel: riskScore > 80 ? "CRITICAL" : riskScore > 50 ? "ELEVATED" : "NIL",
      coreInit: "SUCCESS",
      secBuffer: riskScore > 70 ? "DEGRADED" : "OPTIMAL",
      lngCoord: (Math.sin(seed) * 500 + 500).toFixed(3),
      latState: breaches.length > 0 ? "INDEXED" : "CLEAR",
      neuralMap: breaches.length > 0 ? "ACTIVE" : "PASSIVE"
    };
  };

  const [neuralIndex, setNeuralIndex] = useState(0);
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiStory, setAiStory] = useState(null);
  const [fixing, setFixing] = useState(false);
  const [fixSuccess, setFixSuccess] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  const [mainBreach, setMainBreach] = useState(null);
  const [threatAiStory, setThreatAiStory] = useState(null);
  const [selectedBreachIndex, setSelectedBreachIndex] = useState(0);

  const neuralMessages = [
    "Mapping breach signatures...",
    "Correlating identity vectors...",
    "Decrypting exposure patterns...",
    "Generating AI security insights...",
    "Analyzing lateral movement risk...",
    "Finalizing remediation blueprints..."
  ];

  const scanAnalysisMessages = [
    "Connecting to breach intelligence network...",
    "Decrypting dark web datasets...",
    "Found matching identity signatures...",
    "Analyzing cross-platform attack vectors...",
    "Correlating handle metadata...",
    "Initializing neural threat model...",
    "Synthesizing elite intelligence...",
    "COMMITTING TO SECURE LEDGER..."
  ];

  const MOCK = {
    dataTypes: [
      { label: "Emails", value: 45, color: "#7C3AED" },
      { label: "Passwords", value: 30, color: "#EC4899" },
      { label: "Personal Info", value: 25, color: "#00f0ff" }
    ]
  };

  useEffect(() => {
    let interval;
    if (fetchingRemediation) {
      interval = setInterval(() => {
        setNeuralIndex(prev => (prev + 1) % neuralMessages.length);
      }, 2500);
    } else {
      setNeuralIndex(0);
    }
    return () => clearInterval(interval);
  }, [fetchingRemediation]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    
    // Theme initialization
    const savedTheme = localStorage.getItem('brexia_appearance') || 'dark';
    setAppearance(savedTheme);
    
    setInitialized(true);
    
    // Fetch Global Scan History from Supabase API
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        
        if (data && Array.isArray(data)) {
          setScanHistory(data.map(s => ({
            email: s.target,
            count: 0, 
            risk: s.risk_score,
            time: new Date(s.created_at).getTime()
          })));
        }
      } catch (err) {
        console.error("History loading failed:", err);
      }
    };

    fetchHistory();
    return () => clearTimeout(t);
  }, []);

  // Realtime Listener for Global Scans
  useEffect(() => {
    const channel = supabase
      .channel('public:scans')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'scans' }, (payload) => {
        setScanHistory(prev => {
          const newScan = {
            email: payload.new.target,
            count: 0,
            risk: payload.new.risk_score,
            time: new Date(payload.new.created_at).getTime()
          };
          const filtered = prev.filter(h => h.email !== newScan.email);
          return [newScan, ...filtered].slice(0, 10);
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;
    const session = { email, apiData, remediationReport, scanHistory };
    localStorage.setItem('brexia_session', JSON.stringify(session));
    localStorage.setItem('brexia_appearance', appearance);
  }, [email, apiData, remediationReport, scanHistory, initialized, appearance]);

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (theme) => {
      if (theme === 'light') {
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
      } else if (theme === 'dark') {
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark-mode', isDark);
        root.classList.toggle('light-mode', !isDark);
      }
    };
    
    // Subtle delay to allow overlay to expand
    const t = setTimeout(() => applyTheme(appearance), 50);
    return () => clearTimeout(t);
  }, [appearance]);

  const handleScan = async (targetEmail) => {
    const searchEmail = (typeof targetEmail === "string" ? targetEmail : email) || "";
    if (!searchEmail || !searchEmail.trim()) return;
    if (typeof targetEmail === "string") setEmail(targetEmail);
    
    setScanning(true); setScanDone(false); setScanAnalysisIndex(0);
    setStreamText(""); setIsStreaming(false);
    
    const analysisInterval = setInterval(() => {
      setScanAnalysisIndex(prev => (prev < scanAnalysisMessages.length - 1 ? prev + 1 : prev));
    }, 550);

    try { 
      // Step 1: Data Retrieval — get real breach data
      const res = await fetch('/api/scan', { method: 'POST', body: JSON.stringify({ email: searchEmail }) }); 
      const data = await res.json(); 
      
      setApiData(data); 
      setSystemStats(generateSystemStats(searchEmail, data.breaches || [], data.riskScore || 0));
      if (data.intelligence) setRemediationReport(data.intelligence);

      // ── Set mainBreach immediately so Threats tab works right away ──
      if (data.breaches && data.breaches.length > 0) {
        const primary = [...data.breaches].sort((a,b) => parseInt(b.date || 0) - parseInt(a.date || 0))[0];
        setMainBreach(primary);
      }

      // ── Transition to Dashboard IMMEDIATELY (don't wait for AI) ──
      setScanAnalysisIndex(scanAnalysisMessages.length - 1);
      setScanDone(true);
      setScanning(false);
      if (analysisInterval) clearInterval(analysisInterval);

      // Step 2: AI Enrichment (async — populates AI tab when ready, doesn't block UI)
      setIsStreaming(true);
      setAiThinking(true);
      
      try {
        const aiRes = await fetch('/api/ai-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: searchEmail, breaches: data.breaches, riskScore: data.riskScore })
        });
        if (aiRes.ok) {
          const storyData = await aiRes.json();
          if (storyData && !storyData.error) setAiStory(storyData);
        }
      } catch (aiErr) {
        console.warn("AI enrichment skipped:", aiErr.message);
      } finally {
        setAiThinking(false);
        setIsStreaming(false);
      }

      // Step 3: Fetch forensics for the primary breach (async)
      if (data.breaches && data.breaches.length > 0) {
        const primary = [...data.breaches].sort((a,b) => parseInt(b.date || 0) - parseInt(a.date || 0))[0];
        try {
          const tRes = await fetch("/api/ai-breach", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ breach: primary })
          });
          if (tRes.ok) {
            const tData = await tRes.json();
            setThreatAiStory(tData);
          } else {
            const tData = await tRes.json();
            setThreatAiStory({ error: tData.error || "Gemini API rejected request." });
          }
        } catch (te) {
          console.warn("Threat forensics skipped:", te.message);
          setThreatAiStory({ error: te.message });
        }
      }

    } catch (e) { 
      console.error("Scan Error:", e); 
      setScanning(false);
      if (analysisInterval) clearInterval(analysisInterval);
    }
  };

  const handleFixAll = async () => {
    if (!apiData?.email) return;
    setFixing(true);
    
    try {
      const res = await fetch("/api/remediate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: apiData.email })
      });
      
      if (res.ok) {
        // High-end animation delay
        setTimeout(() => {
          setFixing(false);
          setIsSecured(true);
        }, 2500);
      }
    } catch (e) {
      console.error("Remediation Error:", e);
      setFixing(false);
    }
  };

  const handleFix = (action) => {
    setFixing(true);
    setFixSuccess(false);
    
    setTimeout(() => {
      if (action === 'secure_email') {
        setFixSuccess(true);
        setTimeout(() => {
          setFixing(false);
          setFixSuccess(false);
        }, 1200);
      } else {
        setFixing(false);
        switch(action) {
          case "generate_password":
          case "open_2fa_guide":
            setModalType(action);
            setIsModalOpen(true);
            break;
          default:
            console.warn("Unknown Auto-Fix Action:", action);
        }
      }
    }, 1000);
  };

  const downloadAudit = () => {
    if (!remediationReport) return;
    const header = `BREXIA NEURAL AUDIT\nENTITY: ${apiData?.email || email}\nSCAN TIMESTAMP: ${new Date().toLocaleString()}\nRISK SCORE: ${apiData?.riskScore || 0}\n\nREMEDIATION PROTOCOLS:\n${'='.repeat(30)}\n\n`;
    const body = remediationReport.map(r => `[${r.title}]\nRISK: ${r.risk}\nATTACK TYPE: ${r.attack_type}\nTACTICAL STEPS:\n${r.steps.map(f => `  - ${f}`).join('\n')}\n`).join('\n---\n');
    const blob = new Blob([header + body], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BREXIA_AUDIT_${apiData?.email?.split('@')[0] || 'report'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  };

  const getRiskColor = (score) => {
    if (score > 80) return "#F43F5E";
    if (score > 60) return "#FB923C";
    if (score > 40) return "#FACC15";
    return "#10B981";
  };

  const severityColor = (s) => {
    const code = s?.toUpperCase();
    if (code === "CRITICAL") return "#F43F5E";
    if (code === "HIGH") return "#FB923C";
    if (code === "MED" || code === "MEDIUM") return "#FACC15";
    return "#10B981";
  };

  const handleBreachSelect = async (index) => {
    if (!apiData?.breaches?.[index]) return;
    setSelectedBreachIndex(index);
    const selected = apiData.breaches[index];
    setMainBreach(selected);
    setThreatAiStory(null); // Loading state

    try {
      const tRes = await fetch("/api/ai-breach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breach: selected })
      });
      if (tRes.ok) {
        const tData = await tRes.json();
        setThreatAiStory(tData);
      } else {
        const tData = await tRes.json();
        setThreatAiStory({ error: tData.error || "Gemini API rejected request." });
      }
    } catch (te) {
      console.error("Threat Story Select Fetch Error:", te);
      setThreatAiStory({ error: te.message });
    }
  };

  if (loading) return (
    <div className="initiate-page" style={{ height: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, position: "relative", overflow: "hidden" }}>
      <div className="hud-grid" style={{ opacity: 0.05 }} />
      <div className="scanning-beam" style={{ opacity: 0.05 }} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="initiate-logo-box"
        style={{ 
          background: "var(--surface)", 
          borderRadius: 32, 
          padding: 32, 
          boxShadow: "var(--shadow-soft)",
          border: "1px solid var(--border)",
          zIndex: 10
        }}
      >
        <img src="/bx-logo-light.png" alt="BX" style={{ width: 80, height: 80, borderRadius: 16 }} />
      </motion.div>

      <div style={{ textAlign: "center", zIndex: 10 }}>
        <h1 style={{ fontSize: 44, fontWeight: 950, color: "var(--text-primary)", margin: "0 0 8px", letterSpacing: 4, fontFamily: "'Syne', sans-serif" }}>
          BREXIA
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-secondary)", letterSpacing: 2, fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>
          BREACH RISK ANALYZER
        </p>
      </div>

      <div style={{ width: 600, maxWidth: "90%", height: 6, background: "var(--surface-soft)", borderRadius: 100, overflow: "hidden", marginTop: 12, border: "1px solid var(--border-soft)", position: "relative" }}>
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, transparent, var(--accent), var(--success), transparent)" }}
        />
      </div>
    </div>
  );

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800;900&family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(162, 89, 255,0.2); border-radius: 4px; }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes springIn{0%{opacity:0;transform:scale(0.95)}100%{opacity:1;transform:scale(1)}}
        @keyframes floatOrb{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-30px) scale(1.05)}}
        @keyframes rotateRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(124,58,237,0.15)}50%{box-shadow:0 0 60px rgba(124,58,237,0.4)}}
        @keyframes scanLine{0%{top:-2px}100%{top:100%}}
        .dashboard-grid { grid-template-columns: 1.1fr 0.9fr; }
        .nav-item:hover { background: rgba(162, 89, 255,0.08) !important; }
        .breach-row:hover { background: rgba(162, 89, 255,0.05) !important; }
        .scan-btn:hover { box-shadow: 0 0 24px rgba(162, 89, 255,0.4) !important; transform: translateY(-1px) !important; }
        .cyber-card:hover { transform: scale(1.02); box-shadow: 0 10px 40px rgba(0,0,0,0.3); background: rgba(255,255,255,0.04) !important; border-color: rgba(255,255,255,0.12) !important; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.3) !important; }
        .dashboard-font { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        .dashboard-heading { font-family: 'Outfit', sans-serif !important; }
        
        /* EXPLICIT LIGHT MODE OVERRIDES FOR INPUT */
        .light-mode .hero-input-container { background: #FFFFFF !important; box-shadow: 0 8px 40px rgba(99,102,241,0.12) !important; }
        .light-mode .hero-input-field { background: transparent !important; }
        .light-mode .hero-input-field input { background: transparent !important; color: #0F172A !important; }
        .light-mode .hero-input-field input::placeholder { color: #94A3B8 !important; }
        /* MOBILE RESPONSIVE */
        @media (max-width: 640px) {
          .hero-main-wrapper { padding: 0 24px !important; min-height: 85vh !important; }
          .hero-input-container { flex-direction: column !important; border-radius: 16px !important; padding: 12px !important; }
          .hero-scan-btn { width: 100% !important; padding: 18px 24px !important; border-radius: 12px !important; font-size: 14px !important; margin-top: 8px; }
          .hero-input-field input { padding: 18px 20px !important; font-size: 15px !important; letter-spacing: 1px !important; }
          .mobile-email-pills { flex-wrap: wrap !important; gap: 8px !important; justify-content: center !important; padding: 0 4px; }
          .mobile-email-pills button { font-size: 9px !important; padding: 8px 12px !important; }
          .fluid-hero-title { font-size: clamp(3rem, 11vw, 5.5rem) !important; }
          .hero-tagline { font-size: 0.6rem !important; letter-spacing: 0.2em !important; }
          .tabs-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .tabs-wrapper > div { min-width: max-content; }
          .main-container { padding-left: 20px !important; padding-right: 20px !important; }
          .cyber-card { border-radius: 16px !important; }
          .cyber-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          
          /* Settings Sheet Mobile Fix */
          .settings-overlay {
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 0;
          }
          
          .settings-sheet {
            position: relative;
            width: 100%;
            max-width: 550px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 28px;
            padding: 20px 32px 32px 32px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.5);
            z-index: 1;
            overflow: hidden;
            transform-origin: center;
          }

          @media (max-width: 768px) {
            .settings-overlay {
              align-items: flex-end !important;
              padding-bottom: 0 !important;
            }
            .settings-sheet {
              max-width: 100% !important;
              border-radius: 28px 28px 0 0 !important;
              padding: 20px 20px calc(24px + env(safe-area-inset-bottom, 24px)) 20px !important;
              margin-bottom: 0 !important;
              bottom: 0 !important;
              border-bottom: none !important;
            }
          }
        }
        @media (max-width: 480px) {
          .hero-main-wrapper { padding: 0 12px !important; }
          .fluid-hero-title { font-size: clamp(2.5rem, 10vw, 4rem) !important; }
        }
        @media (max-width: 640px) {
          .hud-telemetry-desktop { display: none !important; }
          .top-nav { padding: 8px 16px !important; }
          .tactical-hud-mobile { display: none !important; }
        }
      `}</style>

      <AnimatePresence>
        {fixing && <FixingOverlay isSuccess={fixSuccess} />}
      </AnimatePresence>

      <TacticalHUD stats={systemStats} />
      <ParticleField />

      {/* TOP-RIGHT SETTINGS TRIGGER */}
      <div style={{ position: "fixed", top: 75, right: 20, zIndex: 1200 }}>
        <motion.button 
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSettingsOpen(true)}
          style={{ 
            background: "var(--surface)", 
            border: "1px solid var(--border)", borderRadius: "12px", 
            padding: "10px", color: "var(--text-primary)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
          }}
        >
          <Settings size={20} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isSettingsOpen && (
          <div className="settings-overlay">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }} 
            />
            <motion.div 
              className="settings-sheet"
              initial={(typeof window !== 'undefined' && window.innerWidth < 768) ? { y: "100%" } : { scale: 0.9, opacity: 0, y: 20 }}
              animate={(typeof window !== 'undefined' && window.innerWidth < 768) ? { y: 0 } : { scale: 1, opacity: 1, y: 0 }}
              exit={(typeof window !== 'undefined' && window.innerWidth < 768) ? { y: "100%" } : { scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            >
              {/* iOS Drag Handle */}
              <div style={{ width: 36, height: 5, background: "var(--text-muted)", borderRadius: 10, margin: "0 auto 24px auto", opacity: 0.4 }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", letterSpacing: -0.5, margin: 0, fontFamily: "'Outfit', sans-serif" }}>Settings</h2>
                <button onClick={() => setIsSettingsOpen(false)} style={{ background: "rgba(124, 58, 237, 0.05)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)", cursor: "pointer" }}>
                  <X size={20} />
                </button>
              </div>

              <SettingsPanel 
                appearance={appearance} 
                onAppearanceChange={setAppearance} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="main-container" style={{ ...styles.main, paddingTop: "80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <AnimatePresence mode="wait">
            {!apiData || Object.keys(apiData).length === 0 ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroInput
                  email={email} setEmail={setEmail}
                  focused={focused} setFocused={setFocused}
                  handleScan={handleScan}
                  scanning={scanning} scanDone={scanDone}
                  scanAnalysisIndex={scanAnalysisIndex}
                  scanAnalysisMessages={scanAnalysisMessages}
                />
                <RecentScans history={scanHistory} />
              </motion.div>
            ) : (
              <div className="dashboard-font" style={{ animation: "springIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                
                <CompactIdentityBar email={email} riskScore={apiData.riskScore} />

                <div className="tabs-wrapper">
                  <div className="mobile-scroll-tabs" style={{ display: "flex", gap: 12, background: "rgba(15, 23, 42, 0.3)", borderRadius: 16, padding: "8px", border: "1px solid rgba(255,255,255,0.05)", width: "100%", overflowX: "auto" }}>
                    {[
                      { id: "overview", label: "OVERVIEW", icon: <Activity size={20} strokeWidth={1.5} /> },
                      { id: "threats", label: "THREATS", icon: <AlertTriangle size={20} strokeWidth={1.5} /> },
                      { id: "exposure", label: "EXPOSURE", icon: <Fingerprint size={20} strokeWidth={1.5} /> },
                      { id: "ai", label: "AI INSIGHT", icon: <Brain size={20} strokeWidth={1.5} /> }
                    ].map(tab => {
                      const active = activeTab === tab.id;
                      return (
                        <button 
                          key={tab.id}
                          className={active ? "tab-active" : "nav-item"}
                          onClick={() => {
                            setActiveTab(tab.id);
                            window.scrollTo({ top: 0, behavior: "instant" });
                          }}
                          style={{
                            padding: "12px 28px",
                            borderRadius: 12,
                            background: active ? "var(--accent-glow)" : "transparent",
                            color: active ? "var(--accent)" : "var(--text-secondary)",
                            border: active ? "1px solid rgba(124, 58, 237, 0.3)" : "1px solid transparent",
                            fontSize: 12,
                            fontWeight: 900,
                            letterSpacing: 1.5,
                            cursor: "pointer",
                            fontFamily: "'Space Mono', monospace",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px"
                          }}
                        >
                          <span className="tab-icon" style={{ color: "inherit" }}>{tab.icon}</span>
                          <span className="tab-label" style={{ color: active ? "var(--text-primary)" : "inherit" }}>{tab.label}</span>
                        </button>
                      );
                    })}
                    
                    {scanDone && (
                      <button 
                        onClick={() => {
                          setApiData(null); setScanDone(false); setScanning(false); setEmail(""); setActiveTab("overview");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        style={{
                          padding: "12px 28px",
                          borderRadius: 12,
                          background: "rgba(239, 68, 68, 0.1)",
                          color: "#EF4444",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          fontSize: 12,
                          fontWeight: 900,
                          letterSpacing: 1.5,
                          cursor: "pointer",
                          fontFamily: "'Space Mono', monospace",
                          transition: "all 0.3s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          boxShadow: "0 0 15px rgba(239, 68, 68, 0.2)"
                        }}
                      >
                        <span className="tab-icon"><RefreshCcw size={20} strokeWidth={2} /></span>
                        <span className="tab-label">RESTART</span>
                      </button>
                    )}
                  </div>
                </div>


                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div 
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ width: "100%" }}
                    >
                      <div style={{ maxWidth: (typeof window !== 'undefined' && window.innerWidth < 768) ? "100%" : 1000, margin: "0 auto", width: "100%" }}>
                        <div className="cyber-grid overview-layout" style={{ marginBottom: 24, overflow: "visible", width: "100%" }}>
                        {/* LEFT COLUMN: AI BRAIN */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                           <RiskWhyCard 
                              score={apiData.riskScore} 
                              bullets={aiStory?.overview?.why_score} 
                           />


                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                           {apiData.breaches && apiData.breaches.length > 0 && (
                             <div className="cyber-card" style={{ padding: "32px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                                   <Globe size={18} color="var(--text-muted)" />
                                   <h3 style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 950, letterSpacing: 1, textTransform: "uppercase" }}>📊 Exposure Timeline</h3>
                                </div>
                                <ExposureTimeline events={aiStory?.overview?.timeline} />
                             </div>
                           )}

                           <AIDecisionCard 
                              status={aiStory?.overview?.identity_status} 
                              reason={aiStory?.overview?.status_reason} 
                           />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  )}

                  {activeTab === "threats" && (
                    <motion.div 
                      key="threats"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      style={{ display: "flex", flexDirection: "column", gap: 32 }}
                    >
                      {apiData.breaches && apiData.breaches.length > 0 ? (
                        <SecurityAlertPanel 
                          data={aiStory?.threat_intelligence} 
                          onAction={(type) => handleFix(type)} 
                        />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          style={{ padding: "80px 40px", textAlign: "center", background: "var(--surface)", borderRadius: 32, border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
                        >
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                            {[200, 300, 400].map((s, i) => (
                              <motion.div key={i}
                                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0, 0.15] }}
                                transition={{ duration: 4, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
                                style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: "1px solid var(--success)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
                              />
                            ))}
                          </div>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            style={{ margin: "0 auto 24px", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", filter: "drop-shadow(0 0 24px rgba(34,197,94,0.5))" }}
                          >
                            <Target size={64} color="var(--success)" />
                          </motion.div>
                          <motion.h3
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{ color: "var(--success)", fontSize: 28, fontWeight: 950, letterSpacing: -0.5, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}
                          >
                            ZERO THREATS ACTIVE
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.7, maxWidth: 540, margin: "0 auto", fontWeight: 500 }}
                          >
                            The tactical defense perimeter is secure. No active attack vectors, credential stuffing attempts, or malicious activities detected.
                          </motion.p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "exposure" && (
                    <motion.div 
                      key="exposure"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                        {apiData.breaches && apiData.breaches.length > 0 ? (
                           apiData.breaches.map((b, i) => <BreachCard key={i} breach={b} index={i} />)
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{ gridColumn: "1 / -1", padding: "80px 40px", textAlign: "center", background: "var(--surface)", borderRadius: 32, border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
                          >
                            {/* Animated shield pulse rings */}
                            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                              {[200, 300, 400].map((s, i) => (
                                <motion.div key={i}
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0, 0.15] }}
                                  transition={{ duration: 4, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
                                  style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: "1px solid var(--success)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
                                />
                              ))}
                            </div>

                            {/* Shield icon animated */}
                            <motion.div
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              style={{ fontSize: 80, marginBottom: 24, filter: "drop-shadow(0 0 24px rgba(34,197,94,0.5))" }}
                            >
                              🛡️
                            </motion.div>

                            <motion.h3
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              style={{ color: "var(--success)", fontSize: 28, fontWeight: 950, letterSpacing: -0.5, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}
                            >
                              IDENTITY CLEAN
                            </motion.h3>

                            <motion.p
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.45 }}
                              style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 32px", fontWeight: 500 }}
                            >
                              BREXIA's neural scanner cross-referenced <strong style={{ color: "var(--text-primary)" }}>28 billion+</strong> breach records and found <strong style={{ color: "var(--success)" }}>zero correlations</strong> to your identity. Your digital footprint appears untouched across all monitored dark-web ecosystems.
                            </motion.p>

                            {/* AI message badge */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6, type: "spring" }}
                              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 100, padding: "10px 24px" }}
                            >
                              <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", boxShadow: "0 0 12px var(--success)" }}
                              />
                              <span style={{ fontSize: 12, fontWeight: 900, color: "var(--success)", fontFamily: "'Space Mono', monospace", letterSpacing: 1.5 }}>AI VERDICT: NO EXPOSURE DETECTED</span>
                            </motion.div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                   {activeTab === "ai" && (
                    <motion.div 
                      key="ai"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    >
                      {apiData.breaches && apiData.breaches.length > 0 ? (
                        threatAiStory ? (
                          <AIPanel 
                            data={!threatAiStory.error ? [
                              { label: "TARGET PROFILE", color: "#A259FF", text: threatAiStory.about_site },
                              { label: "ATTACK VECTOR", color: "#FF9326", text: threatAiStory.breach_mechanics },
                              { label: "EXPLOIT DANGER", color: "#F43F5E", text: threatAiStory.user_danger },
                              { label: "THREAT INTELLIGENCE", color: "#0ACF83", text: threatAiStory.why_it_matters }
                            ] : []} 
                            openai={!threatAiStory.error ? {
                              priority: threatAiStory.security_risk || "CRITICAL",
                              summary: `${mainBreach?.name?.toUpperCase() || "IDENTITY"} COMPROMISE FORENSICS`,
                              advisory: threatAiStory.why_it_matters || "Neural engines have completed a deep scan of this specific breach. Review the tactical breakdown below.",
                              metrics: threatAiStory.risk_metrics
                            } : {
                              priority: "ERROR",
                              summary: "GEMINI CONNECTION FAILED",
                              advisory: `AI Engine halted: ${threatAiStory.error}`,
                              metrics: { phishing_risk: 0, takeover_risk: 0, identity_risk: 0 }
                            }} 
                          />
                        ) : (
                          <div style={{ padding: "100px 40px", textAlign: "center", background: "var(--surface)", borderRadius: 32, border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "radial-gradient(circle at top, rgba(124, 58, 237, 0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              style={{ width: 64, height: 64, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <Brain size={48} color="var(--accent)" style={{ filter: "drop-shadow(0 0 20px rgba(124, 58, 237, 0.4))" }} />
                            </motion.div>
                            <h3 style={{ color: "var(--text-primary)", fontSize: 22, fontWeight: 950, letterSpacing: 2, marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>PROCESSING INTELLIGENCE</h3>
                            <p style={{ color: "var(--text-secondary)", fontSize: 13, fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>Correlating dark-web data streams...</p>
                          </div>
                        )
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6 }}
                          style={{ padding: "60px 40px", textAlign: "center", background: "var(--surface)", borderRadius: 32, border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
                        >
                          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "radial-gradient(circle at top, rgba(124, 58, 237, 0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                          <Brain size={64} color="var(--accent)" style={{ margin: "0 auto 24px", filter: "drop-shadow(0 0 20px rgba(124, 58, 237, 0.4))" }} />
                          <h3 style={{ color: "var(--text-primary)", fontSize: 26, fontWeight: 950, letterSpacing: -0.5, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>AI CONTINUOUS MONITORING</h3>
                          <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 32px" }}>
                            BREXIA's neural engine is actively correlating dark-web data streams. Your digital fingerprint is currently producing <strong style={{ color: "var(--success)" }}>no behavioral anomalies</strong>.
                          </p>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 400, margin: "0 auto", textAlign: "left" }}>
                             <div style={{ padding: "20px", background: "var(--surface-soft)", borderRadius: 16, border: "1px solid var(--border-soft)" }}>
                               <div style={{ color: "var(--success)", fontSize: 11, fontWeight: 900, marginBottom: 6, letterSpacing: 1 }}>NEURAL STATE</div>
                               <div style={{ color: "var(--text-primary)", fontSize: 18, fontWeight: 950 }}>OPTIMAL</div>
                             </div>
                             <div style={{ padding: "20px", background: "var(--surface-soft)", borderRadius: 16, border: "1px solid var(--border-soft)" }}>
                               <div style={{ color: "var(--accent)", fontSize: 11, fontWeight: 900, marginBottom: 6, letterSpacing: 1 }}>NODES SCANNED</div>
                               <div style={{ color: "var(--text-primary)", fontSize: 18, fontWeight: 950 }}>14.2B+</div>
                             </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
        </div>

        <ActionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          type={modalType} 
          data={threatAiStory}
        />
        
      </main>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    position: "relative",
    width: "100%",
    maxWidth: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    overflowX: "hidden"
  },
  main: {
    width: "100%",
    maxWidth: "none",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: (typeof window !== 'undefined' && window.innerWidth < 768) ? 40 : 80,
    paddingBottom: 80,
    paddingLeft: (typeof window !== 'undefined' && window.innerWidth < 768) ? 0 : 24,
    paddingRight: (typeof window !== 'undefined' && window.innerWidth < 768) ? 0 : 24,
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    overflow: "visible"
  },
  glassCard: {
    background: "var(--surface)",
    backdropFilter: "var(--glass-blur)",
    border: "1px solid var(--border)",
    borderRadius: 24,
    boxShadow: "var(--shadow-soft)"
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: 900,
    color: "var(--accent)",
    letterSpacing: 2,
    marginBottom: 24,
    fontFamily: "'Space Mono', monospace"
  }
};
