import { HashRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home } from './pages/Home';
import { LandingAlt } from './pages/LandingAlt';
import { Methodology } from './pages/Methodology';
import { Prompts } from './pages/Prompts';
import { Leaderboard } from './pages/Leaderboard';
import { Submit } from './pages/Submit';
import { Audit } from './pages/Audit';
import { Resources } from './pages/Resources';
import { License } from './pages/License';
import { ExternalLink, Menu, X } from 'lucide-react';
import logoImage from 'figma:asset/af770bb6497312fe6818fc1e22f4a20cfba2af25.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/prompts', label: 'Prompts' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/audit', label: 'Audit' },
  { to: '/submit', label: 'Submit' },
  { to: '/resources', label: 'Resources' },
  { to: '/license', label: 'License' },
];

function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="sticky top-0 z-50 glass"
    >
      <div className="max-w-[1160px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center">
            <motion.img
              src={logoImage}
              alt="CAREVAL Logo"
              className="h-6 sm:h-7"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 text-[14px] font-bold tracking-[0.04em] transition-all ${
                  isActive(link.to)
                    ? 'bg-[#182727] text-[#fffaf0]'
                    : 'text-deep-navy hover:bg-[#f0e8dc]'
                }`}
              >
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#e75d42]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
            <a
              href="https://www.momops.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 flex items-center gap-1.5 border border-[#182727] bg-[#fffaf0] px-3 py-2 text-[14px] font-bold tracking-[0.04em] text-[#182727] shadow-[3px_3px_0_#182727] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#e75d42] hover:text-white hover:shadow-[2px_2px_0_#182727]"
            >
              MomOps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden border border-[#182727]/25 bg-[#fffaf0] p-2 hover:bg-warm-grey transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="lg:hidden border-t border-[#182727]/20 bg-[#fffaf0] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-[16px] font-bold transition-all ${
                      isActive(link.to)
                        ? 'bg-deep-navy text-white'
                        : 'text-deep-navy hover:bg-warm-grey'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-[#182727]/20 bg-[#fffaf0]/60">
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-[14px] text-slate-grey">
          <span className="font-bold text-deep-navy tracking-[0.04em] text-[16px]">CAREVAL Research</span>
          <span>© 2026 CAREVAL Research. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#/resources" className="hover:text-deep-navy transition-colors">Citation Info</a>
            <a href="#/resources" className="hover:text-deep-navy transition-colors">Contact</a>
            <a href="https://momops.org" target="_blank" rel="noopener noreferrer" className="hover:text-deep-navy transition-colors">MomOps</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/landing-alt" element={<LandingAlt />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/rate" element={<Navigate to="/audit" replace />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/partner" element={<Navigate to="/resources" replace />} />
          <Route path="/license" element={<License />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <AnimatedRoutes />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
