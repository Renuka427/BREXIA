import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CheckCircle2, RefreshCcw, Cpu, Brain, Terminal, Zap, Fingerprint, X } from 'lucide-react';

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
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          position: 'fixed', inset: 0, zIndex: 3000, 
          background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          style={{ 
            width: '100%', maxWidth: 540, background: 'var(--surface)', 
            borderRadius: 32, border: '1px solid var(--border)',
            padding: '40px', boxShadow: 'var(--shadow-medium)',
            position: 'relative', overflow: 'hidden'
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Subtle Glow */}
          <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', pointerEvents: 'none', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                 <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-glow)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    {type === 'generate_password' ? <Fingerprint size={20} /> : <Shield size={20} />}
                 </div>
                 <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 950, letterSpacing: 3, fontFamily: "'Space Mono', monospace" }}>
                    TACTICAL_OVERRIDE // v2.1
                 </div>
              </div>
              <button 
                onClick={onClose}
                style={{ background: 'var(--surface-soft)', border: 'none', width: 40, height: 40, borderRadius: '50%', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
              >
                <X size={20} />
              </button>
            </div>

            {fixStatus === 'fixing' ? (
                <div style={{ minHeight: 320 }}>
                    <h2 style={{ fontSize: 26, color: 'var(--text-primary)', fontWeight: 950, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                       <Cpu className="animate-pulse" color="var(--accent)" /> INITIALIZING_PROTOCOL...
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>BREXIA AI is executing automated remediation vectors.</p>
                    
                    <div style={{ background: 'rgba(0,0,0,0.05)', borderRadius: 20, padding: 24, border: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", height: 220, overflowY: 'auto' }}>
                        {terminalLines.map((line, i) => (
                           <motion.div 
                             key={i}
                             initial={{ opacity: 0, x: -10 }} 
                             animate={{ opacity: 1, x: 0 }}
                             style={{ fontSize: 12, color: i === terminalLines.length - 1 ? 'var(--accent)' : 'var(--success)', marginBottom: 12, display: 'flex', gap: 10, fontWeight: 600 }}
                           >
                             <span style={{ opacity: 0.3 }}>[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                             <span>{i === terminalLines.length - 1 ? '> ' : '√ '}{line}</span>
                           </motion.div>
                        ))}
                        <div className="terminal-cursor" />
                    </div>
                </div>
            ) : fixStatus === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 0 40px var(--accent-glow)' }}>
                        <CheckCircle2 color="var(--success)" size={40} />
                    </div>
                    <h2 style={{ fontSize: 32, color: 'var(--text-primary)', fontWeight: 950, marginBottom: 12 }}>THREAT_NEUTRALIZED</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 40, lineHeight: 1.6, fontWeight: 500 }}>The identity node has been re-secured. Lateral movement vectors have been invalidated.</p>
                    <button 
                       onClick={onClose}
                       style={{ background: 'var(--accent)', color: '#FFF', padding: '16px 48px', borderRadius: 16, border: 'none', fontWeight: 950, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: 1 }}
                    >
                        COMPLETE PROTOCOL
                    </button>
                </motion.div>
            ) : type === 'generate_password' ? (
              <>
                <h2 style={{ fontSize: 32, color: 'var(--text-primary)', fontWeight: 950, marginBottom: 12, letterSpacing: -0.8 }}>NEURAL KEY SYNTHESIS</h2>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 32, fontWeight: 500 }}>
                  Synthesizing a high-entropy key for identity node re-indexing.
                </p>

                <div style={{ background: 'var(--surface-soft)', borderRadius: 24, padding: 32, border: '1px solid var(--border)', marginBottom: 32, position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <div style={{ fontSize: 9, color: 'var(--accent)', fontWeight: 900, fontFamily: "'Space Mono', monospace", letterSpacing: 2 }}>ENTROPY_ANALYSIS</div>
                        <div style={{ fontSize: 10, color: 'var(--text-primary)', fontWeight: 950 }}>STRENGTH: {entropy}%</div>
                    </div>
                    <div style={{ width: '100%', height: 6, background: 'var(--border-soft)', borderRadius: 100, overflow: 'hidden', marginBottom: 24 }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${entropy}%` }} style={{ height: '100%', background: 'var(--accent)', boxShadow: '0 0 15px var(--accent)' }} />
                    </div>
                    <div style={{ fontSize: 24, color: 'var(--text-primary)', fontFamily: "'Space Mono', monospace", wordBreak: 'break-all', textAlign: 'center', letterSpacing: 2, minHeight: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                    {password}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button 
                    onClick={generatePassword}
                    style={{ flex: 1, padding: '18px', borderRadius: 16, background: 'var(--surface-soft)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: 12, fontWeight: 950, cursor: 'pointer', transition: '0.2s' }}
                  >
                    RE-SYNTHESIZE
                  </button>
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText(password);
                        setCopied(true);
                        setTimeout(() => handleApplyFix(), 800);
                    }}
                    style={{ flex: 1.5, padding: '18px', borderRadius: 16, background: copied ? 'var(--success)' : 'var(--accent)', border: 'none', color: '#FFF', fontSize: 12, fontWeight: 950, cursor: 'pointer', boxShadow: 'var(--shadow-medium)', transition: '0.2s' }}
                  >
                    {copied ? 'SYNTHESIZED ✓' : 'DEPLOY IDENTITY KEY'}
                  </button>
                </div>
              </>
            ) : type === 'open_2fa_guide' ? (
              <>
                <h2 style={{ fontSize: 32, color: 'var(--text-primary)', fontWeight: 950, marginBottom: 12, letterSpacing: -0.8 }}>IDENTITY LOCKDOWN</h2>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 32, fontWeight: 500 }}>
                   Neural bind required for this identity node. Activating multi-vector validation.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                   {[
                     { icon: <RefreshCcw size={16}/>, title: "Invalidate Sessions", desc: "Forcing global logout protocol." },
                     { icon: <Shield size={16}/>, title: "Apply Virtual MFA", desc: "Generating neural recovery keys." },
                     { icon: <Lock size={16}/>, title: "Hardware Fingerprint", desc: "Restricting node to validated hardware." },
                   ].map((s, i) => (
                     <div key={i} style={{ display: 'flex', gap: 16, background: 'var(--surface-soft)', padding: '16px 20px', borderRadius: 16, border: '1px solid var(--border)' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>{s.icon}</div>
                        <div>
                          <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 950, marginBottom: 2 }}>{s.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{s.desc}</div>
                        </div>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={handleApplyFix}
                  style={{ width: '100%', padding: '18px', borderRadius: 16, background: 'var(--accent)', border: 'none', color: '#FFF', fontSize: 13, fontWeight: 950, cursor: 'pointer', boxShadow: 'var(--shadow-medium)', letterSpacing: 1 }}
                >
                  INITIALIZE NODE LOCKDOWN →
                </button>
              </>
            ) : (
              <div style={{ color: 'var(--text-primary)', textAlign: 'center', padding: 40, fontWeight: 900 }}>INITIALIZING SELECT OPTION...</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
