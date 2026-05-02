import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CheckCircle2, RefreshCcw, Cpu, Brain, Terminal, Zap, Fingerprint } from 'lucide-react';

export default function ActionModal({ isOpen, onClose, type, data }) {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [fixStatus, setFixStatus] = useState('idle'); // idle | fixing | success
  const [terminalLines, setTerminalLines] = useState([]);
  const [entropy, setEntropy] = useState(0);

  const defaultFixLog = [
    "Initializing neural handshake with node gateway...",
    "Scanning for credential sprawl patterns...",
    "Invalidating active session tokens across vectors...",
    "Re-salting identity hash with high-entropy entropy...",
    "Securing identity surface. PROTOCOL_SUCCESS."
  ];

  const fixLog = data?.tactical_log || defaultFixLog;

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";
    for (let i = 0; i < 20; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
    setCopied(false);
    setEntropy(Math.floor(Math.random() * 5) + 95); // High entropy simulation
  };

  useEffect(() => {
    if (type === 'generate_password') {
        generatePassword();
        setFixStatus('idle');
    }
  }, [type, isOpen]);

  const handleApplyFix = () => {
    setFixStatus('fixing');
    setTerminalLines([]);
    
    // Simulate terminal log
    let index = 0;
    const interval = setInterval(() => {
      if (index < fixLog.length) {
        setTerminalLines(prev => [...prev, fixLog[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setFixStatus('success'), 200);
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          position: 'fixed', inset: 0, zIndex: 1100, 
          background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(30px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 30, opacity: 0, rotateX: 5 }}
          animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.9, y: 30, opacity: 0, rotateX: -5 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{ 
            width: '100%', maxWidth: 540, background: 'rgba(15, 23, 42, 0.8)', 
            borderRadius: 32, border: '1px solid rgba(255,255,255,0.08)',
            padding: 'clamp(24px, 6vw, 48px)', boxShadow: '0 50px 120px rgba(0,0,0,0.9), inset 0 0 20px rgba(124, 58, 237, 0.1)',
            position: 'relative', overflow: 'hidden',
            perspective: 1000
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Animated Glow Background */}
          <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               opacity: [0.1, 0.2, 0.1]
             }}
             transition={{ duration: 5, repeat: Infinity }}
             style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} 
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                 <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                    {type === 'generate_password' ? <Fingerprint size={18} /> : <Shield size={18} />}
                 </div>
                 <div style={{ fontSize: 10, color: '#7C3AED', fontWeight: 900, letterSpacing: 3, fontFamily: "'Space Mono', monospace" }}>
                    TACTICAL_OVERRIDE
                 </div>
              </div>
              <button 
                onClick={onClose}
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: 32, height: 32, borderRadius: '50%', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: "center", fontSize: 18 }}
              >
                ×
              </button>
            </div>

            {fixStatus === 'fixing' ? (
                <div style={{ minHeight: 300 }}>
                    <h2 style={{ fontSize: 28, color: '#fff', fontWeight: 950, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                       <Cpu className="animate-pulse" color="#7C3AED" /> INITIALIZING FIX...
                    </h2>
                    <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: 14, marginBottom: 32 }}>AI is currently executing specific remediation protocols on your behalf.</p>
                    
                    <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Space Mono', monospace", height: 220, overflowY: 'auto' }}>
                        {terminalLines.map((line, i) => (
                           <motion.div 
                             key={i}
                             initial={{ opacity: 0, x: -10 }} 
                             animate={{ opacity: 1, x: 0 }}
                             style={{ fontSize: 13, color: i === terminalLines.length - 1 ? '#00f0ff' : '#4ade80', marginBottom: 10, display: 'flex', gap: 10 }}
                           >
                             <span style={{ opacity: 0.3 }}>[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                             <span>{i === terminalLines.length - 1 ? '> ' : '√ '}{line}</span>
                           </motion.div>
                        ))}
                        <div className="terminal-cursor" />
                    </div>
                </div>
            ) : fixStatus === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}>
                        <CheckCircle2 color="#10B981" size={48} />
                    </div>
                    <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', color: '#fff', fontWeight: 950, marginBottom: 8 }}>NODE SECURED</h2>
                    <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: 'clamp(13px, 4vw, 15px)', marginBottom: 24, lineHeight: 1.6 }}>Vulnerability neutralized. Identity nodes re-indexed. Posture is stable.</p>
                    <button 
                       onClick={onClose}
                       style={{ background: '#10B981', color: '#000', padding: '16px 40px', borderRadius: 16, border: 'none', fontWeight: 900, fontSize: 14, cursor: 'pointer', transition: '0.2s' }}
                    >
                        CONFIRM & EXIT
                    </button>
                </motion.div>
            ) : type === 'generate_password' ? (
              <>
                <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', color: '#fff', fontWeight: 950, marginBottom: 8, letterSpacing: -0.5 }}>NEURAL SYNTHESIS</h2>
                <p style={{ fontSize: 'clamp(13px, 4vw, 15px)', color: 'rgba(148,163,184,0.7)', lineHeight: 1.5, marginBottom: 24 }}>
                  Generating a high-entropy key via neural sprawl compensation.
                </p>

                <div style={{ background: 'rgba(5, 7, 10, 0.4)', borderRadius: 24, padding: 32, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 32, position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <div style={{ fontSize: 10, color: '#A855F7', fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>ENTROPY_ANALYSIS</div>
                        <div style={{ fontSize: 10, color: '#A855F7', fontWeight: 900 }}>STRENGTH: {entropy}%</div>
                    </div>
                    <div style={{ width: '100%', height: 4, background: 'rgba(124, 58, 237, 0.1)', borderRadius: 2, overflow: 'hidden', marginBottom: 24 }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${entropy}%` }} style={{ height: '100%', background: '#7C3AED', boxShadow: '0 0 10px #7C3AED' }} />
                    </div>
                    <div style={{ fontSize: 'clamp(18px, 5vw, 26px)', color: '#fff', fontFamily: "'Space Mono', monospace", wordBreak: 'break-all', textAlign: 'center', letterSpacing: 2, minHeight: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {password}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                  <button 
                    onClick={generatePassword}
                    style={{ flex: 1, padding: '18px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, fontWeight: 900, cursor: 'pointer', transition: '0.2s' }}
                  >
                    RE-SYNTHESIZE
                  </button>
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText(password);
                        setCopied(true);
                        setTimeout(() => handleApplyFix(), 800);
                    }}
                    style={{ flex: 1.5, padding: '18px', borderRadius: 16, background: copied ? '#10B981' : 'linear-gradient(135deg, #7C3AED, #EC4899)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }}
                  >
                    {copied ? 'SYNTHESIZED ✓' : 'COPY & DEPLOY KEY'}
                  </button>
                </div>
              </>
            ) : type === 'open_2fa_guide' ? (
              <>
                <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', color: '#fff', fontWeight: 950, marginBottom: 8 }}>IDENTITY LOCKDOWN</h2>
                <p style={{ fontSize: 'clamp(13px, 4vw, 15px)', color: 'rgba(148,163,184,0.7)', lineHeight: 1.5, marginBottom: 24 }}>
                   Simulating hardware bind to neutralize missing 2FA node.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                   {[
                     { icon: <RefreshCcw size={14}/>, title: "Invalidate Sessions" },
                     { icon: <Shield size={14}/>, title: "Apply Virtual MFA" },
                     { icon: <Lock size={14}/>, title: "Hardware Bind" },
                   ].map((s, i) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED', flexShrink: 0 }}>{s.icon}</div>
                        <div style={{ fontSize: 'clamp(13px, 4vw, 14px)', color: '#fff', fontWeight: 700 }}>{s.title}</div>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={handleApplyFix}
                  style={{ width: '100%', padding: '18px', borderRadius: 16, background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none', color: '#000', fontSize: 14, fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)' }}
                >
                  INITIALIZE NODE LOCKDOWN →
                </button>
              </>
            ) : (
              <div style={{ color: '#fff', textAlign: 'center', padding: 40 }}>INITIALIZING SELECT OPTION...</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
