"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Shield, AlertTriangle, Fingerprint, Activity, 
  Terminal, Lock, Eye, Globe, Zap, Cpu, 
  ChevronRight, ArrowRight, Download, Share2, 
  RefreshCcw, Menu, X, PlusCircle, CheckCircle2,
  Brain
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
      @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      
      .cursor-blink {
        animation: cursor-blink 1s step-end infinite;
        display: inline-block;
        width: 10px;
        height: 18px;
        background: #7C3AED;
        margin-left: 4px;
        vertical-align: middle;
      }

      .scan-line {
        position: fixed; inset: 0; width: 100%; height: 100%;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        z-index: 2000; background-size: 100% 4px, 3px 100%; pointer-events: none; opacity: 0.1;
      }
      .noise-overlay {
        position: fixed; inset: 0; width: 100%; height: 100%;
        background-image: url("https://grainy-gradients.vercel.app/noise.svg");
        opacity: 0.05; z-index: 2001; pointer-events: none; mix-blend-mode: overlay;
      }
      .scanning-beam {
        position: fixed; top: 0; left: 0; width: 100%; height: 2px;
        background: linear-gradient(to right, transparent, rgba(124, 58, 237, 0.2), #00f0ff, rgba(124, 58, 237, 0.2), transparent);
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
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
        background: linear-gradient(135deg, #7C3AED, #00f0ff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 18px;
        animation: pulseGlow 2s infinite ease-in-out;
        box-shadow: 0 0 30px rgba(124, 58, 237, 0.4);
      }
      .brand-text {
        font-family: 'Syne', sans-serif;
        font-weight: 900;
        margin: 0;
        text-shadow: 0 0 20px rgba(255,255,255,0.2);
        transition: all 0.3s ease;
        font-size: 32px;
        letter-spacing: 0.1em;
        background: linear-gradient(to bottom, #fff, #7C3AED);
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
      .text-accent { color: #7C3AED; }
      .text-danger { color: #F43F5E; }
      .tagline {
        font-size: 13px;
        opacity: 0.6;
        color: #fff;
        letter-spacing: 2px;
        margin-top: 6px;
        font-family: 'Space Mono', monospace;
      }
      @keyframes slowPan { from { background-position: 0% 0%; } to { background-position: 100% 100%; } }
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      .logo-glow { text-shadow: 0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.2); }
      .hud-grid {
        background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 30px 30px;
        position: fixed; inset: 0; pointer-events: none; z-index: 0;
      }
      .ai-decision {
        background: rgba(124, 58, 237, 0.05);
        border: 1px solid rgba(124, 58, 237, 0.2);
        border-radius: 20px;
        padding: 32px;
        margin-bottom: 24px;
        position: relative;
        overflow: hidden;
      }
      .ai-decision h3 {
        font-family: 'Space Mono', monospace;
        font-size: 10px;
        color: #7C3AED;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 16px;
      }
      .ai-decision p {
        font-size: 18px !important;
        line-height: 1.6 !important;
        color: #F1F5F9;
        font-weight: 600;
        margin: 0;
      }
      .alert-bar {
        background: linear-gradient(90deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05));
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 12px;
        padding: 16px 24px;
        color: #FCA5A5;
        font-weight: 800;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 32px;
        animation: neonBreathing 3s infinite;
      }
      .behavior-box {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        padding: 24px;
        margin-bottom: 32px;
      }
      .behavior-box h4 {
        font-family: 'Space Mono', monospace;
        font-size: 10px;
        color: rgba(148, 163, 184, 0.6);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 12px;
      }
      .behavior-box p {
        font-size: 15px !important;
        color: #CBD5E1;
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
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #fff;
        font-size: 12px;
        font-weight: 950;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .quick-actions button:hover {
        background: rgba(124, 58, 237, 0.1);
        border-color: #7C3AED;
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(124, 58, 237, 0.2);
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
        color: rgba(148, 163, 184, 0.6);
        text-align: center;
        margin-top: 16px !important;
        font-weight: 500;
      }
      .dot {
        width: 6px;
        height: 6px;
        background: #a855f7;
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
        background: linear-gradient(to bottom, transparent, rgba(162, 89, 255, 0.05), transparent);
        z-index: 2;
        pointer-events: none;
        animation: scanMove 4s linear infinite;
      }

      @keyframes scanMove {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(800PX); }
      }

      .terminal-window {
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid rgba(124, 58, 237, 0.2);
        border-radius: 16px;
        padding: 32px;
        position: relative;
        overflow: hidden;
        min-height: 400px;
        box-shadow: inset 0 0 40px rgba(124, 58, 237, 0.05);
      }

      .terminal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        padding-bottom: 16px;
      }

      .terminal-text {
        font-family: 'Space Mono', monospace;
        font-size: 14px;
        color: #10B981;
        white-space: pre-wrap;
        line-height: 1.6;
      }

      .terminal-cursor {
        display: inline-block;
        width: 8px;
        height: 15px;
        background: #10B981;
        margin-left: 4px;
        vertical-align: middle;
        animation: cursor-blink 1s step-end infinite;
      }

      /* ── RESPONSIVE ANIMATIONS ── */
      @keyframes scanMove {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(800PX); }
      }
    `}</style>
  );
}

// ── Shared UI Components ─────────────────────────────────────────────────────
function TopNav() {
  return (
    <nav className="top-nav" style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1000, background: "rgba(5, 7, 10, 0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s" }}>
      <button 
        onClick={() => { window.location.reload(); }}
        style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <img src="/bx-logo-light.png" alt="BX" style={{ width: 32, height: 32, borderRadius: 8, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }} />
        <div style={{ textAlign: "left" }}>
          <h1 className="brand-text" style={{ fontSize: 18, letterSpacing: 3, display: "flex", gap: "8px", alignItems: "center" }}>BREXIA <span style={{ color: "#7C3AED" }}>// INTEL</span></h1>
          <div className="tagline" style={{ fontSize: 7, marginTop: 0 }}>Breach Risk & Exposure Intelligence Analyzer</div>
        </div>
      </button>
      <div className="hud-telemetry-desktop" style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "6px 16px", fontSize: 10, color: "rgba(16, 185, 129, 0.8)", fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10B981" }} />
          SYSTEM: ONLINE
        </div>
      </div>
    </nav>
  );
}

function TypingText({ text, delay = 20, pause = 0, style = {} }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let timeout;
    if (pause > 0) {
      timeout = setTimeout(() => setStarted(true), pause);
    } else {
      setStarted(true);
    }
    return () => clearTimeout(timeout);
  }, [pause]);

  useEffect(() => {
    if (!started || !text) return;
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [started, text, delay]);

  return <span style={style}>{displayedText}<span className="terminal-cursor" style={{ width: 4, height: 12, background: "#7C3AED", marginLeft: 4, display: "inline-block", verticalAlign: "middle" }} /></span>;
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
    <div className="hero-main-wrapper" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "85vh", overflow: "hidden", padding: 0 }}>

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

      {/* Extreme Radial background glow */}
      <div style={{ position: "absolute", width: "150vw", height: "150vh", borderRadius: "50%", background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 75%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

      {/* Orbital Resonance: Kinetic Rings */}
      <div className="hero-rings" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "150vw", height: "150vh", pointerEvents: "none" }}>
        {[100, 80, 60, 40, 20, 10].map((sizePercent, i) => (
          <div key={i} style={{ 
            position: "absolute", width: `${sizePercent}vw`, height: `${sizePercent * 1.5}vh`, 
            borderRadius: "50%", 
            border: `1px solid rgba(255,255,255,${0.05+(i<2?0.04:0.02)})`, 
            top: "50%", left: "50%", 
            transform: "translate(-50%,-50%)", 
            animation: `spin ${sizePercent < 40 ? 10 : 30 + i*15}s linear infinite ${i%2===0?"":"reverse"}`, 
            opacity: scanning ? 1 : 0.85,
            boxShadow: scanning && sizePercent < 50 ? `0 0 60px rgba(124, 58, 237, ${0.4 + (i*0.1)})` : (sizePercent < 30 ? "0 0 20px rgba(255,255,255,0.05)" : "none"),
            pointerEvents: "none" 
          }} >
             {scanning && i === 3 && (
               <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "conic-gradient(from 0deg, #7C3AED, transparent 60%)", animation: "radarSweep 2s linear infinite", opacity: 0.3 }} />
             )}
          </div>
        ))}
      </div>

      {/* Status Badge */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, marginBottom: 32, zIndex: 1, animation: scanning ? "flicker 1.5s infinite" : "none" }}>
        <img className="hero-logo-img" src="/bx-logo-light.png" alt="BX" style={{ width: 64, height: 64, borderRadius: 16, boxShadow: "0 0 30px rgba(255, 255, 255, 0.15)", animation: "float 4s ease-in-out infinite" }} />
        <div className="hero-status-badge" style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 30, padding: "8px 20px", animation: "springIn 0.8s ease both", fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "'Space Mono', monospace", letterSpacing: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: scanning ? "#F43F5E" : "#10B981", boxShadow: `0 0 12px ${scanning ? "#F43F5E" : "#10B981"}` }} />
          {scanning ? "THREAT ANALYSIS ACTIVE" : "ACTIVE BREACH NETWORK • v7.42"}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!scanning ? (
          /* ── STAGE 1: SEARCH UI ── */
          <motion.div
            key="search-ui"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", zIndex: 1, position: "relative", width: "100%" }}
          >
            <h1 className="fluid-hero-title blue-cyber-glow logo-glow" style={{ 
              margin: "0 0 12px", 
              fontWeight: 950, 
              color: "#fff", 
              fontFamily: "'Syne', sans-serif", 
              lineHeight: 1, 
              background: "linear-gradient(to bottom, #fff 100%, rgba(255,255,255,0.3))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase"
            }}>
              BREXIA
            </h1>
            <p className="hero-tagline" style={{ 
              margin: "12px 0 64px", 
              fontSize: "clamp(1rem, 2vw, 1.2rem)", 
              color: "#fff", 
              fontFamily: "'Space Mono', monospace", 
              maxWidth: 800, 
              marginInline: "auto", 
              lineHeight: 1.6, 
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              fontWeight: 900,
              opacity: 0.6,
            }}>
              SCAN. SCORE. SECURE.
            </p>

            <div style={{ width: "100%", maxWidth: 850, margin: "0 auto", position: "relative" }}>
              <div className="hero-input-container" style={{ 
                position: "relative", 
                display: "flex", 
                background: "rgba(15, 23, 42, 0.4)", 
                backdropFilter: "blur(20px)", 
                border: `1px solid ${focused ? "rgba(124, 58, 237, 0.5)" : "rgba(255,255,255,0.08)"}`, 
                borderRadius: 24, 
                padding: "8px",
                boxShadow: focused ? "0 0 60px rgba(124, 58, 237, 0.2)" : "0 20px 60px rgba(0,0,0,0.3)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
                <div className="hero-input-field" style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="EMAIL, USERNAME, OR PASSWORD..."
                    style={{ 
                      width: "100%", background: "transparent", border: "none", 
                      padding: "24px 32px", color: "#fff", fontSize: 18, outline: "none", 
                    fontFamily: "'Space Mono', monospace", letterSpacing: 2,
                      fontWeight: 600
                    }}
                    onKeyDown={e => e.key === "Enter" && handleScan()}
                  />
                </div>
                <button
                  className="hero-scan-btn"
                  onClick={() => handleScan()}
                  disabled={scanning}
                  style={{ 
                    background: scanning ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #7C3AED, #EC4899)", 
                    border: "none", padding: "0 54px", color: "#fff", 
                    fontWeight: 950, fontSize: 16, cursor: scanning ? "not-allowed" : "pointer", 
                    fontFamily: "'Syne', sans-serif", letterSpacing: 3, 
                    textTransform: "uppercase", transition: "all 0.3s",
                    borderRadius: 18,
                    boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)"
                  }}
                  onMouseEnter={e => { if(!scanning) { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.filter = "brightness(1.1)"; } }}
                  onMouseLeave={e => { if(!scanning) { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(1)"; } }}>
                  START SCAN
                </button>
              </div>

              <div className="mobile-email-pills" style={{ display: "flex", gap: 16, marginTop: 40, justifyContent: "center" }}>
                {["john@example.com", "hunter_42", "SecurePass12!@"].map((ex, i) => (
                  <button key={i} onClick={() => setEmail(ex)} style={{ 
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", 
                    borderRadius: 12, padding: "10px 20px", color: "rgba(148, 163, 184, 0.4)", 
                    fontSize: 11, fontFamily: "'Space Mono', monospace", cursor: "pointer", transition: "all 0.2s",
                    fontWeight: 700
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(124, 58, 237, 0.1)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.color = "rgba(148, 163, 184, 0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
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
            <div style={{ 
              background: "rgba(15, 23, 42, 0.5)", 
              padding: "48px", 
              borderRadius: 32, 
              border: "1px solid rgba(124, 58, 237, 0.3)", 
              backdropFilter: "blur(40px)",
              boxShadow: "0 0 100px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={styles.cardLabel}>INTELLIGENCE SYNTHESIS IN PROGRESS</div>
                <div className="hud-number" style={{ color: "#7C3AED", fontSize: 10 }}>NODE_04: SYNCED</div>
              </div>
              
              <div style={{ position: "relative", marginBottom: 32 }}>
                 <div style={{ height: 4, width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((scanAnalysisIndex + 1) / scanAnalysisMessages.length) * 100}%` }}
                      style={{ height: "100%", background: "linear-gradient(to right, #7C3AED, #00f0ff)", borderRadius: 2, boxShadow: "0 0 10px #7C3AED" }}
                    />
                 </div>
              </div>

              <ScanSteps activeIndex={scanAnalysisIndex} steps={scanAnalysisMessages} />
              
              <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center" }}>
                 <div style={{ display: "flex", gap: 32 }}>
                    <div style={{ textAlign: "center" }}>
                       <div style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.5)", marginBottom: 4 }}>ENTROPY</div>
                       <div className="hud-number" style={{ fontSize: 14, color: "#fff" }}>{Math.random().toFixed(4)}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                       <div style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.5)", marginBottom: 4 }}>LATENCY</div>
                       <div className="hud-number" style={{ fontSize: 14, color: "#fff" }}>0.00{Math.floor(Math.random()*99)}s</div>
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
        <span style={{ fontSize: 13, color: "rgba(148,163,184,0.7)", letterSpacing: 3, marginTop: 4, fontFamily: "'Space Mono', monospace", fontWeight: 800 }}>RISK</span>
      </div>
    </div>
  );
}


// ── Highlighted AI Insight Panel ────────────────────────────────────────────
function AIPanel({ data, openai }) {
  const highlights = { "HIGH RISK": "#F24E1E", "BREACH": "#FF9326", "EXPOSED": "#F24E1E", "CRITICAL": "#F24E1E", "SECURE": "#0ACF83", "RECOMMENDED": "#A259FF", "ANALYSIS": "#FF7262" };
  const highlight = (text) => {
    let result = []; let remaining = text;
    const words = Object.keys(highlights);
    while (remaining.length > 0) {
      let matched = false;
      for (const w of words) {
        const idx = remaining.toUpperCase().indexOf(w);
        if (idx !== -1) {
          if (idx > 0) result.push(<span key={result.length}>{remaining.slice(0, idx)}</span>);
          result.push(<span key={result.length} style={{ color: highlights[w], fontWeight: 700, background: `${highlights[w]}18`, padding: "1px 5px", borderRadius: 3, fontSize: "0.85em" }}>{remaining.slice(idx, idx + w.length)}</span>);
          remaining = remaining.slice(idx + w.length);
          matched = true; break;
        }
      }
      if (!matched) { result.push(<span key={result.length}>{remaining}</span>); break; }
    }
    return result;
  };

  if (openai) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "rgba(124, 58, 237, 0.05)", border: "1px solid rgba(124, 58, 237, 0.2)", borderRadius: 16, padding: "24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, padding: "8px 16px", background: openai.priority === "high" ? "#F43F5E" : "#FB923C", color: "#fff", fontSize: 9, fontWeight: 900, fontFamily: "'Space Mono', monospace", borderBottomLeftRadius: 12 }}>
            PRIORITY: {openai.priority?.toUpperCase()}
          </div>
          <div style={{ fontSize: 10, color: "#7C3AED", letterSpacing: 2, marginBottom: 12, fontWeight: 800, fontFamily: "'Space Mono', monospace" }}>AI STRATEGIC ADVISORY</div>
          <h3 className="dashboard-heading" style={{ margin: "0 0 12px", fontSize: 18, color: "#F1F5F9" }}>{openai.summary}</h3>
          <p style={{ fontSize: 14, color: "#AFC2D5", lineHeight: 1.7, margin: "0 0 20px" }}>
             {openai.advisory}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧠</div>
            <div>
              <div style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.5)", fontWeight: 800 }}>AI ANALYST INSIGHT</div>
              <div style={{ fontSize: 12, color: "#FFF", fontWeight: 600 }}>{openai.insight}</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.4)", textAlign: "center", fontStyle: "italic", fontFamily: "'Space Mono', monospace", marginTop: 8 }}>
          ※ Generated using AI-assisted threat intelligence
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {data.map((section, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: section.color, marginBottom: 6, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{section.label}</div>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(203,213,225,0.85)", lineHeight: 1.65 }}>
            {highlight(section.text)}
          </p>
        </div>
      ))}
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
      <div style={{ fontSize: 10, color: "rgba(148,163,184,0.6)", marginBottom: 6, letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>{label}</div>
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
        <circle cx="50" cy="50" r="40" fill="#111111" />
        {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} opacity="0.85" />)}
        <circle cx="50" cy="50" r="22" fill="#111111" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {paths.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "rgba(203,213,225,0.75)" }}>{p.label}</span>
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
      style={{
        position: "relative",
        background: "rgba(255, 255, 255, 0.02)",
        border: `1px solid ${isHovered ? "rgba(124, 58, 237, 0.4)" : "rgba(255, 255, 255, 0.05)"}`,
        borderRadius: 24,
        padding: "32px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        backdropFilter: "blur(12px)",
        boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(124, 58, 237, 0.1)" : "none",
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
            fontSize: 10, fontWeight: 900, letterSpacing: 1.5, 
            color: breach.severity === "CRITICAL" ? "#F43F5E" : "#FB923C", 
            fontFamily: "'Space Mono', monospace", 
            marginBottom: 4,
            animation: breach.severity === "CRITICAL" ? "flicker 2s infinite" : "none"
          }}>
            {breach.severity}
          </div>
          <div className="hud-number" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            {breach.date}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, zIndex: 1 }}>
        <h4 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: -0.5 }}>
          {breach.displayName || breach.name || breach.breach_name}
        </h4>
        <div style={{ fontSize: 13, color: "rgba(148, 163, 184, 0.8)", lineHeight: 1.5, marginBottom: 16 }}>
          {breach.description || "Active identity correlation confirmed in specialized leak dataset."}
        </div>
      </div>

      <div style={{ zIndex: 1, pt: 16, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
                                     <div style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.5)", fontWeight: 800, marginBottom: 2 }}>DATA LEAKED</div>
          <div style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>{breach.type}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.5)", fontWeight: 800, marginBottom: 2 }}>EXPOSURE COUNT</div>
          <div className="hud-number" style={{ fontSize: 14, color: "#7C3AED", fontWeight: 900 }}>{breach.records}</div>
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
            <div style={{ fontSize: 10, color: "rgba(148,163,184,0.6)", marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>{e.year}</div>
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: e.severity === "high" ? "#F24E1E" : e.severity === "med" ? "#FF9326" : "#0ACF83", border: `2px solid ${e.severity === "high" ? "#F24E1E" : e.severity === "med" ? "#FF9326" : "#0ACF83"}`, boxShadow: `0 0 10px ${e.severity === "high" ? "#F24E1E" : e.severity === "med" ? "#FF9326" : "#0ACF83"}66`, zIndex: 1, transition: "transform 0.2s", transform: hovered === i ? "scale(1.5)" : "scale(1)" }} />
            <div style={{ marginTop: 10, fontSize: 11, color: "rgba(203,213,225,0.8)", textAlign: "center", maxWidth: 80, lineHeight: 1.4 }}>{e.label}</div>
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
  if (!steps || steps.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "20px 0" }}>
      {steps.map((s, i) => {
        const isPast = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <div key={i} style={{ 
            display: "flex", alignItems: "center", gap: 16, 
            opacity: isActive ? 1 : isPast ? 0.7 : 0.2, 
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isActive ? "translateX(10px)" : "translateX(0)"
          }}>
            <div style={{ 
              width: 22, height: 22, borderRadius: "50%", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              background: isPast ? "#10B981" : isActive ? "#7C3AED" : "rgba(255,255,255,0.05)", 
              border: isActive ? "2px solid rgba(124, 58, 237, 0.5)" : "none",
              transition: "all 0.4s", fontSize: 11 
            }}>
              {isPast ? <CheckCircle2 size={14} color="#fff" /> : isActive ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", animation: "pulse 0.8s infinite" }} /> : ""}
            </div>
            <span style={{ 
              fontSize: 14, 
              color: isPast ? "#10B981" : isActive ? "#e2e8f0" : "rgba(148,163,184,0.3)", 
              fontFamily: "'Space Mono', monospace",
              fontWeight: isActive ? 700 : 400,
              letterSpacing: isActive ? 1 : 0
            }}>{s}</span>
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
      {/* Corner Brackets Removed per User Request */}
      
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
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: "#7C3AED", boxShadow: "0 0 10px #7C3AED" }} />
          <div style={{ fontSize: 11, fontWeight: 900, color: "#7C3AED", letterSpacing: 2, fontFamily: "'Space Mono', monospace" }}>BX CORE :: NEURAL_ENGINE_ACTIVE</div>
        </div>
        <div style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.4)", fontFamily: "'Space Mono', monospace" }}>{new Date().toLocaleTimeString()}</div>
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
        <div style={{ color: "rgba(148, 163, 184, 0.4)", fontFamily: "'Space Mono', monospace", fontSize: 13 }}>
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
        <span style={{ fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.6)", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>{label.toUpperCase()}</span>
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
    <div style={{ position: "relative", paddingLeft: 24, borderLeft: "2px solid rgba(124, 58, 237, 0.2)" }}>
      {events.map((ev, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 + 0.5 }}
          style={{ position: "relative", marginBottom: 24 }}
        >
          <div style={{ position: "absolute", left: -31, top: 4, width: 12, height: 12, borderRadius: "50%", background: ev.severity === "High" ? "#F43F5E" : "#7C3AED", border: "3px solid #05070A", boxShadow: `0 0 10px ${ev.severity === "High" ? "#F43F5E" : "#7C3AED"}` }} />
          <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{ev.date}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 800 }}>{(ev.name || "Unknown Threat").toUpperCase()} ({ev.type || "Data leaked"})</div>
          <div style={{ fontSize: 10, color: ev.severity === "High" ? "#F43F5E" : "#7C3AED", fontWeight: 900, marginTop: 4, letterSpacing: 1 }}>{ev.impact || "CORE THREAT INDEXED"}</div>
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
    <div style={{ background: "#05070A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", padding: 20, fontFamily: "'Space Mono', monospace", height: 200, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F43F5E" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FACC15" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
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
                <div style={{ fontSize: 12, color: "rgba(148, 163, 184, 0.6)", marginTop: 4 }}>{b.type}</div>
             </div>
             <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 20 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 800 }}>IMPACT:</span>
                <span style={{ fontSize: 24, fontWeight: 950, color: b.riskScore > 80 ? "#F43F5E" : "#fff" }}>{b.riskScore}%</span>
             </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function AIDecisionCard({ status, reason }) {
  const getColor = () => {
    if (status === "CRITICAL") return "#F43F5E";
    if (status === "MODERATE") return "#FB923C";
    return "#10B981";
  };
  const color = getColor();

  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}33`, borderRadius: 20, padding: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 900, letterSpacing: 1, marginBottom: 12 }}>NEURAL DECISION</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 950, color }}>{status}</div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}`, animation: "pulse 2s infinite" }} />
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{reason}</p>
    </div>
  );
}

function RiskWhyCard({ score, bullets }) {
  const getRiskColor = (s) => {
    if (s > 80) return "#F43F5E";
    if (s > 60) return "#FB923C";
    if (s > 40) return "#FACC15";
    return "#10B981";
  };
  const color = getRiskColor(score);

  return (
    <div style={{ background: "rgba(15, 23, 42, 0.4)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: 24, padding: "clamp(20px, 4vw, 32px)" }}>
       <div className="cyber-stack">
          <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <motion.path 
                initial={{ strokeDasharray: "0, 100" }} 
                animate={{ strokeDasharray: `${score}, 100` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" 
              />
            </svg>
            <div style={{ position: "absolute", fontSize: 24, fontWeight: 900, color }}>{score}</div>
          </div>
          <div style={{ flex: 1 }}>
             <h4 style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 900, letterSpacing: 2, marginBottom: 12 }}>WHY THIS SCORE?</h4>
             <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {bullets?.map((b, i) => (
                   <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#fff", marginBottom: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: color }} />
                    {b}
                  </li>
                ))}
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
        <div style={{ ...styles.glassCard, padding: "24px 32px", borderLeft: "4px solid #F43F5E", background: "rgba(244, 63, 94, 0.03)" }}>
          <div className="cyber-stack" style={{ justifyContent: "space-between", width: "100%" }}>
            <div>
              <div style={{ fontSize: 11, color: "#F43F5E", fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>🚨 BREACH DETECTED</div>
              <h2 style={{ fontSize: 32, fontWeight: 950, color: "#fff", margin: 0, letterSpacing: -1 }}>{breach.name.toUpperCase()} ({breach.date})</h2>
            </div>
            <div style={{ background: "rgba(244, 63, 94, 0.2)", border: "1px solid #F43F5E", borderRadius: 8, padding: "6px 12px", color: "#F43F5E", fontSize: 10, fontWeight: 900 }}>
              SEVERITY: {story.security_risk?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* AI Narrative Intelligence */}
        <div style={{ ...styles.glassCard, padding: 32, flex: 1, overflowY: "auto", position: "relative" }} className="hide-scrollbar">
           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
             <Brain size={18} color="#7C3AED" />
             <h3 style={{ fontSize: 14, color: "#fff", fontWeight: 900, letterSpacing: 1 }}>AI BREACH INTELLIGENCE</h3>
           </div>

           <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <section>
                <div style={{ fontSize: 11, color: "#7C3AED", fontWeight: 900, marginBottom: 8 }}>🧠 About this website</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>{story.about_site}</div>
              </section>

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

              <section>
                <div style={{ fontSize: 11, color: "#00f0ff", fontWeight: 900, marginBottom: 8 }}>🛠 How the breach happened</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>{story.breach_mechanics}</div>
              </section>

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

              <section>
                <div style={{ fontSize: 11, color: "#F43F5E", fontWeight: 900, marginBottom: 8 }}>⚠️ Why this is dangerous</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>{story.user_danger || story.why_it_matters}</div>
              </section>
           </div>

           <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 60, background: "linear-gradient(to top, rgba(15,23,42,0.8), transparent)", pointerEvents: "none" }} />
        </div>
      </div>

      {/* RIGHT: SECURITY CONTROL PANEL */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, overflow: "hidden" }}>
        
        {/* Risk Visuals */}
        <div style={{ ...styles.glassCard, padding: 32 }}>
          <h3 style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 900, letterSpacing: 2, marginBottom: 24 }}>STRATEGIC RISK ASSESSMENT</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <RiskBar label="Phishing Risk" value={metrics.phishing_risk} color="#7C3AED" />
            <RiskBar label="Account Takeover" value={metrics.takeover_risk} color="#F43F5E" />
            <RiskBar label="Identity Tracking" value={metrics.identity_risk} color="#00f0ff" />
          </div>
        </div>

        {/* Password Lab */}
        <div style={{ ...styles.glassCard, padding: 32, flex: 1 }}>
           <PasswordLab />
        </div>

        {/* Action Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            <button 
              onClick={() => onSetModal("rotate_secrets")}
              style={{ ...styles.neonButton, background: "linear-gradient(135deg, #7C3AED, #4F46E5)", border: "none", color: "#fff", padding: 16, borderRadius: 12, fontWeight: 900, fontSize: 12 }}
            >
              🔒 CHANGE PASSWORD NOW
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button onClick={() => onSetModal("open_2fa_guide")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: 12, borderRadius: 12, fontWeight: 800, fontSize: 10 }}>🛡️ ENABLE 2FA</button>
              <button onClick={() => onSetModal("scan_reuse")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: 12, borderRadius: 12, fontWeight: 800, fontSize: 10 }}>🔍 SCAN REUSE</button>
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
        <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 900, color: color }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ height: "100%", background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
    </div>
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
    if (!pw) return { label: "N/A", color: "rgba(255,255,255,0.1)" };
    if (pw.length > 14 && /[A-Z]/.test(pw) && /\d/.test(pw) && /[!@#$%^&*]/.test(pw)) return { label: "STRONG", color: "#10B981" };
    if (pw.length > 8) return { label: "MEDIUM", color: "#FACC15" };
    return { label: "WEAK", color: "#F43F5E" };
  };

  const strength = checkStrength(customPw || password);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Lock size={14} color="#00f0ff" />
          <h3 style={{ fontSize: 13, color: "#fff", fontWeight: 900, letterSpacing: 1, margin: 0 }}>PASSWORD LAB</h3>
        </div>
        {copied && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 9, color: "#10B981", fontWeight: 900, letterSpacing: 1 }}>COPIED!</motion.div>
        )}
      </div>

      <div>
        <div style={{ fontSize: 10, color: "rgba(148, 163, 184, 0.4)", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>GENERATED ENTROPY</div>
        <div style={{ position: "relative", display: "flex", gap: 8 }}>
           <input 
              readOnly 
              value={password}
              style={{ flex: 1, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0, 240, 255, 0.1)", borderRadius: 8, padding: "12px", color: flicker ? "transparent" : "#00f0ff", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, outline: "none", textAlign: "center" }}
           />
           <button onClick={copy} style={{ background: "rgba(0, 240, 255, 0.1)", border: "1px solid rgba(0, 240, 255, 0.2)", borderRadius: 8, padding: "0 12px", color: "#00f0ff", cursor: "pointer", display: "flex", alignItems: "center" }}>
             <Download size={14} />
           </button>
           {flicker && <div style={{ position: "absolute", top: 0, left: 0, width: "calc(100% - 40px)", height: "100%", background: "rgba(0, 240, 255, 0.05)", borderRadius: 8, animation: "flicker 0.2s infinite" }} />}
        </div>
        <button onClick={generate} style={{ width: "100%", marginTop: 8, background: "rgba(0, 240, 255, 0.15)", border: "1px solid rgba(0, 240, 255, 0.2)", borderRadius: 8, padding: "10px", color: "#00f0ff", fontSize: 10, fontWeight: 900, cursor: "pointer", letterSpacing: 1 }}>[ GENERATE NEW ]</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "rgba(0,0,0,0.2)", padding: 12, borderRadius: 12 }}>
         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={options.symbols} onChange={e => setOptions({...options, symbols: e.target.checked})} />
            <span style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.6)", fontWeight: 700 }}>SYMBOLS</span>
         </div>
         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={options.numbers} onChange={e => setOptions({...options, numbers: e.target.checked})} />
            <span style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.6)", fontWeight: 700 }}>NUMBERS</span>
         </div>
         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={options.upper} onChange={e => setOptions({...options, upper: e.target.checked})} />
            <span style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.6)", fontWeight: 700 }}>UPPERCASE</span>
         </div>
         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="range" min="8" max="32" value={length} onChange={e => setLength(parseInt(e.target.value))} style={{ width: 30 }} />
            <span style={{ fontSize: 9, color: "rgba(148, 163, 184, 0.6)", fontWeight: 700 }}>LEN: {length}</span>
         </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.03)" }} />

      <div>
        <div style={{ fontSize: 10, color: "rgba(148, 163, 184, 0.4)", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>✍️ AUDIT CUSTOM SECRET</div>
        <input 
          placeholder="ENTER PASSWORD..."
          value={customPw}
          onChange={e => setCustomPw(e.target.value)}
          style={{ width: "100%", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: "12px", color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: 12, outline: "none" }}
        />
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
           <div style={{ height: 4, flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: strength.label === "STRONG" ? "100%" : strength.label === "MEDIUM" ? "60%" : strength.label === "WEAK" ? "30%" : "0%", background: strength.color, transition: "all 0.3s" }} />
           </div>
           <div style={{ fontSize: 9, fontWeight: 950, color: strength.color }}>{strength.label}</div>
        </div>
      </div>
    </div>
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
        ...styles.glassCard,
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
      style={{ marginTop: 64, width: "100%", maxWidth: 1100, margin: "64px auto 0 auto" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F43F5E", animation: "pulse 1.5s infinite" }} />
        <h3 style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
          LIVE_GLOBAL_TELEMETRY_FEED
        </h3>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {history.map((scan, i) => (
          <motion.div
            key={scan.time + i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{ 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.05)", 
              borderRadius: 16, padding: "16px 20px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              backdropFilter: "blur(10px)"
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
                {scan.email.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + "*".repeat(gp3.length))}
              </div>
              <div style={{ fontSize: 9, color: "rgba(148,163,184,0.4)", fontFamily: "'Space Mono', monospace" }}>
                {new Date(scan.time).toLocaleTimeString()}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: scan.risk > 70 ? "#F43F5E" : scan.risk > 40 ? "#FB923C" : "#10B981" }}>
                {scan.risk}%
              </div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", fontWeight: 900 }}>RISK</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
    // Removed hydration logic to ensure fresh start on reload
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
  }, [email, apiData, remediationReport, scanHistory, initialized]);

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
      // Step 1: Data Retrieval
      const res = await fetch('/api/scan', { method: 'POST', body: JSON.stringify({ email: searchEmail }) }); 
      const data = await res.json(); 
      
      setApiData(data); 
      setSystemStats(generateSystemStats(searchEmail, data.breaches || [], data.riskScore || 0));
      if (data.intelligence) setRemediationReport(data.intelligence);
      
      // Step 2: Start AI Analysis
      setIsStreaming(true);
      setAiThinking(true);
      setAiStory(null);
      
      const aiRes = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: searchEmail, 
          breaches: data.breaches, 
          riskScore: data.riskScore 
        })
      });

      if (aiRes.ok) {
        const storyData = await aiRes.json();
        setAiStory(storyData);
        setAiThinking(false);
        setIsStreaming(false);

        // EXTRA: Pick most recent breach for "Threats Story" View
        if (data.breaches && data.breaches.length > 0) {
          const primary = [...data.breaches].sort((a,b) => parseInt(b.date || 0) - parseInt(a.date || 0))[0];
          setMainBreach(primary);
          
          try {
            const tRes = await fetch("/api/ai-breach", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ breach: primary })
            });
            if (tRes.ok) {
              const tData = await tRes.json();
              setThreatAiStory(tData);
            }
          } catch (te) {
            console.error("Threat Story Fetch Error:", te);
          }
        }

        // Transition from "Loading" to "Dashboard"
        setTimeout(() => {
          setScanDone(true);
          setScanning(false);
          if (analysisInterval) clearInterval(analysisInterval);
        }, 800);
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
    switch(action) {
      case "generate_password":
      case "open_2fa_guide":
        setModalType(action);
        setIsModalOpen(true);
        break;
      case "secure_email":
        alert("Initializing Identity Shield protocol...\nCheck your secondary email for the security audit link.");
        break;
      default:
        console.warn("Unknown Auto-Fix Action:", action);
    }
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
      }
    } catch (te) {
      console.error("Threat Story Select Fetch Error:", te);
    }
  };

  if (loading) return (
    <div style={{ height: "100vh", background: "#05070A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
      <ParticleField />
      <motion.div 
        animate={{ scale: [1, 1.15, 1], rotate: [0, 2, -2, 0], filter: ["brightness(1) drop-shadow(0 0 20px rgba(124, 58, 237, 0.4))", "brightness(1.4) drop-shadow(0 0 50px rgba(124, 58, 237, 0.8))", "brightness(1) drop-shadow(0 0 20px rgba(124, 58, 237, 0.4))"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/bx-logo-light.png" alt="BX" style={{ width: 120, height: 120, borderRadius: 24 }} />
      </motion.div>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <h1 className="brand-text logo-glow">
          BREXIA
        </h1>
        <p className="tagline" style={{ fontSize: 13, opacity: 0.9, letterSpacing: 2, color: "#fff", textShadow: "0 0 10px rgba(124, 58, 237, 0.5)" }}>
          Breach Risk & Exposure Intelligence Analyzer
        </p>
      </div>
      <div style={{ width: 320, height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden", marginTop: 20, position: "relative", boxShadow: "0 0 20px rgba(124, 58, 237, 0.2)" }}>
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, transparent, #7C3AED, #00f0ff, transparent)" }}
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
        .dashboard-grid {
           grid-template-columns: 1.1fr 0.9fr;
        }
        .nav-item:hover { background: rgba(162, 89, 255,0.08) !important; }
        .breach-row:hover { background: rgba(162, 89, 255,0.05) !important; }
        .scan-btn:hover { box-shadow: 0 0 24px rgba(162, 89, 255,0.4) !important; transform: translateY(-1px) !important; }
        .cyber-card:hover { transform: scale(1.02); box-shadow: 0 10px 40px rgba(0,0,0,0.3); background: rgba(255,255,255,0.04) !important; border-color: rgba(255,255,255,0.12) !important; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.3) !important; }
        .dashboard-font { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        .dashboard-heading { font-family: 'Outfit', sans-serif !important; }
      `}</style>

      <div className="hud-grid" />
      <div className="scanning-beam" />

      <TacticalHUD stats={systemStats} />
      <ParticleField />

      <main className="main-container" style={{ ...styles.main, paddingTop: "120px" }}>
        <div style={{ maxWidth: "100%", margin: "0 auto", width: "100%" }}>
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
                
                <div className="cyber-card target-card-mobile" style={{ ...styles.glassCard, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "linear-gradient(to bottom, #7C3AED, #EC4899)" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(124, 58, 237, 0.1)", border: "1px solid rgba(124, 58, 237, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👤</div>
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(148, 163, 184, 0.5)", fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 4 }}>TARGET IDENTITY</div>
                      <h2 className="dashboard-heading" style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "#F1F5F9", letterSpacing: -0.5 }}>{email}</h2>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: 8, padding: "8px 16px" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite" }} />
                      <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>ANALYSIS COMPLETE</span>
                    </div>
                  </div>
                </div>

                <div className="tabs-wrapper" style={{ position: "relative", width: "100%", marginBottom: 32 }}>
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
                          onClick={() => {
                            setActiveTab(tab.id);
                            window.scrollTo({ top: 0, behavior: "instant" });
                          }}
                          style={{
                            padding: "12px 28px",
                            borderRadius: 12,
                            background: active ? "rgba(162, 89, 255, 0.15)" : "transparent",
                            color: active ? "#A259FF" : "rgba(148, 163, 184, 0.5)",
                            border: active ? "1px solid rgba(162, 89, 255, 0.3)" : "1px solid transparent",
                            fontSize: 12,
                            fontWeight: 900,
                            letterSpacing: 1.5,
                            cursor: "pointer",
                            fontFamily: "'Space Mono', monospace",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: active ? "0 0 20px rgba(162, 89, 255, 0.2)" : "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px"
                          }}
                        >
                          <span className="tab-icon" style={{ color: active ? "#A259FF" : "currentColor" }}>{tab.icon}</span>
                          <span className="tab-label" style={{ color: active ? "#fff" : "currentColor" }}>{tab.label}</span>
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
                      transition={{ duration: 0.3 }}
                    >
                      <div className="cyber-grid" style={{ marginBottom: 24, overflow: "visible" }}>
                        {/* LEFT COLUMN: AI BRAIN */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                           {/* AI Summary Hero */}
                           <div style={{ ...styles.glassCard, padding: "32px", border: "1px solid rgba(124, 58, 237, 0.2)", position: "relative", overflow: "hidden" }}>
                              <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, background: "radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                 <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7C3AED", boxShadow: "0 0 10px #7C3AED" }} />
                                 <h3 style={{ fontSize: 13, color: "#fff", fontWeight: 950, letterSpacing: 1, textTransform: "uppercase" }}>🧠 AI Security Summary</h3>
                              </div>
                              <div style={{ minHeight: "80px" }}>
                                <TypingText 
                                  text={aiStory?.overview?.security_summary || "BREXIA is synthesizing your identity footprint and dark-web exposure vectors for a holistic security overview..."} 
                                  style={{ fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontWeight: 500 }}
                                />
                              </div>
                           </div>

                           <RiskWhyCard 
                              score={apiData.riskScore} 
                              bullets={aiStory?.overview?.why_score} 
                           />

                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                           <div style={{ ...styles.glassCard, padding: "32px", background: "rgba(15, 23, 42, 0.2)" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                                 <Globe size={18} color="rgba(255,255,255,0.4)" />
                                 <h3 style={{ fontSize: 13, color: "#fff", fontWeight: 950, letterSpacing: 1, textTransform: "uppercase" }}>📊 Exposure Timeline</h3>
                              </div>
                              <ExposureTimeline events={aiStory?.overview?.timeline} />
                           </div>

                           <AIDecisionCard 
                              status={aiStory?.overview?.identity_status} 
                              reason={aiStory?.overview?.status_reason} 
                           />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "threats" && (
                    <motion.div 
                      key="threats"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ display: "flex", flexDirection: "column", gap: 24 }}
                    >
                      {/* BREACH SELECTOR BAR */}
                      {apiData?.breaches?.length > 1 && (
                        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, flexShrink: 0 }}>
                          {apiData.breaches.map((b, bi) => (
                            <button
                              key={bi}
                              onClick={() => handleBreachSelect(bi)}
                              style={{
                                padding: "10px 20px",
                                borderRadius: 12,
                                background: selectedBreachIndex === bi ? "rgba(124, 58, 237, 0.15)" : "rgba(255,255,255,0.03)",
                                border: `1px solid ${selectedBreachIndex === bi ? "#7C3AED" : "rgba(255,255,255,0.1)"}`,
                                color: selectedBreachIndex === bi ? "#fff" : "rgba(255,255,255,0.4)",
                                fontSize: 11,
                                fontWeight: 900,
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                                transition: "all 0.2s"
                              }}
                            >
                              {selectedBreachIndex === bi && <span style={{ marginRight: 8 }}>🎯</span>}
                              {b.name.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="dashboard-grid" style={{ display: "grid", gap: 32, overflow: "visible", flex: 1 }}>
                        {mainBreach ? (
                          <>
                             {/* LEFT: MAIN STORY */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                              <KineticCard style={{ borderLeft: `8px solid ${getRiskColor(mainBreach.riskScore || 90)}`, padding: 40 }}>
                                <div className="breach-signature-subtitle" style={{ fontSize: 13, color: getRiskColor(mainBreach.riskScore || 90), fontWeight: 950, marginBottom: 8, letterSpacing: 2 }}>
                                  ⚡ {mainBreach.riskScore > 80 ? 'CRITICAL' : 'ELEVATED'} BREACH SIGNATURE
                                </div>
                                <h1 className="breach-hero-title" style={{ fontSize: 48, fontWeight: 950, color: "#fff", margin: "0 0 16px 0", letterSpacing: -1.5 }}>
                                  {mainBreach.name.toUpperCase()}
                                </h1>
                                <div style={{ display: "flex", gap: 32 }}>
                                  <div>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 900, marginBottom: 4 }}>EXPOSURE YEAR</div>
                                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>{mainBreach.date}</div>
                                  </div>
                                  <div>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 900, marginBottom: 4 }}>DATA VOLUME</div>
                                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>{mainBreach.records || "1.2M+"}</div>
                                  </div>
                                </div>
                              </KineticCard>

                              <motion.div 
                                key={`story-${selectedBreachIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                style={{ ...styles.glassCard, padding: 40, flex: 1, background: "rgba(124, 58, 237, 0.03)" }}
                              >
                                {threatAiStory ? (
                                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                    <div>
                                      <div style={{ fontSize: 11, color: "#7C3AED", fontWeight: 900, letterSpacing: 2, marginBottom: 16 }}>🧠 AI FORENSICS</div>
                                      <p style={{ fontSize: 16, color: "#fff", lineHeight: 1.6, margin: 0 }}>{threatAiStory.breach_mechanics || threatAiStory.how_it_happened}</p>
                                    </div>
                                    <div style={{ padding: 24, background: "rgba(251, 146, 60, 0.05)", border: "1px solid rgba(251, 146, 60, 0.1)", borderRadius: 16 }}>
                                      <div style={{ fontSize: 11, color: "#FB923C", fontWeight: 900, letterSpacing: 2, marginBottom: 12 }}>⚠️ WHY THIS MATTERS</div>
                                      <p style={{ fontSize: 15, color: "#AFC2D5", lineHeight: 1.6, margin: 0 }}>{threatAiStory.user_danger || threatAiStory.why_it_matters}</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
                                    <RefreshCcw className="animate-spin" size={24} style={{ marginBottom: 16 }} />
                                    Synthesizing forensic intelligence...
                                  </div>
                                )}
                              </motion.div>
                            </div>

                            {/* RIGHT: VISUAL & ACTION */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                              <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{ ...styles.glassCard, padding: 32 }}
                              >
                                <h4 style={{ fontSize: 11, color: "#7C3AED", fontWeight: 900, letterSpacing: 2, marginBottom: 24 }}>RISK VECTORS</h4>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                                   {MOCK.dataTypes.map((dt, i) => (
                                      <div key={i}>
                                         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{dt.label}</span>
                                            <span style={{ fontSize: 12, color: dt.color, fontWeight: 900 }}>{dt.value}%</span>
                                         </div>
                                         <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                                            <motion.div 
                                               initial={{ width: 0 }} 
                                               animate={{ width: `${dt.value}%` }} 
                                               style={{ height: "100%", background: dt.color, borderRadius: 2 }} 
                                            />
                                         </div>
                                      </div>
                                   ))}
                                </div>
                              </motion.div>

                              <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                style={{ ...styles.glassCard, padding: 32, background: "rgba(16, 185, 129, 0.03)", border: "1px solid rgba(16, 185, 129, 0.1)" }}
                              >
                                <h4 style={{ fontSize: 11, color: "#10B981", fontWeight: 900, letterSpacing: 2, marginBottom: 24 }}>PRIORITY ACTIONS</h4>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
                                  <button onClick={() => { setModalType("open_2fa_guide"); setIsModalOpen(true); }} style={{ background: "linear-gradient(135deg, #10B981, #059669)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 16, borderRadius: 12, color: "#000", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
                                    <Shield size={16} /> LOCK IDENTITY SURFACE
                                  </button>
                                  <button onClick={() => { setModalType("generate_password"); setIsModalOpen(true); }} style={{ background: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 16, borderRadius: 12, fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
                                    <Lock size={16} /> ROTATE ACCESS SECRETS
                                  </button>
                                </div>
                              </motion.div>
                            </div>
                          </>
                        ) : (
                          <div style={{ gridColumn: "1 / -1", padding: 100, textAlign: "center" }}>
                            <RefreshCcw className="animate-spin" size={48} style={{ margin: "0 auto 24px auto", color: "rgba(255,255,255,0.2)" }} />
                            <h2 style={{ color: "rgba(255,255,255,0.3)" }}>Initializing exposure intelligence...</h2>
                          </div>
                        )}
                      </div>
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
                          <div style={{ gridColumn: "1 / -1", padding: "100px", textAlign: "center", background: "rgba(255,255,255,0.02)", borderRadius: 32, border: "2px dashed rgba(255,255,255,0.05)" }}>
                             <div style={{ fontSize: 64, marginBottom: 24 }}>🕸️</div>
                             <h3 style={{ color: "rgba(255,255,255,0.3)", fontSize: 24 }}>NO ACTIVE SURFACE VECTORS DETECTED</h3>
                             <p style={{ color: "rgba(148,163,184,0.4)", fontSize: 16 }}>Your identity signatures have not been correlated with any known dark-web or public data leaks.</p>
                          </div>
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
                      <AdvancedBreachInsight 
                        story={threatAiStory} 
                        breach={mainBreach}
                        breachCount={apiData.breaches?.length || 0}
                        fixing={fixing}
                        isSecured={isSecured}
                        onFixAll={handleFixAll}
                        onFix={handleFix}
                        onSetModal={(type) => { setModalType(type); setIsModalOpen(true); }}
                      />
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
    backgroundColor: "#05070A",
    color: "#fff",
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden"
  },
  main: {
    paddingTop: 120,
    paddingBottom: 80,
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    overflow: "visible"
  },
  glassCard: {
    background: "linear-gradient(135deg, rgba(162, 89, 255, 0.08), rgba(15, 23, 42, 0.5))",
    backdropFilter: "blur(40px) saturate(1.4)",
    border: "1px solid rgba(162, 89, 255, 0.15)",
    borderRadius: 16,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.03)"
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: 900,
    color: "#7C3AED",
    letterSpacing: 2,
    marginBottom: 24,
    fontFamily: "'Space Mono', monospace"
  }
};
