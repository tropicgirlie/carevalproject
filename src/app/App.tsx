import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home } from './pages/Home';
import { LandingAlt } from './pages/LandingAlt';
import { Methodology } from './pages/Methodology';
import { Prompts } from './pages/Prompts';
import { Leaderboard } from './pages/Leaderboard';
import { Submit } from './pages/Submit';
import { Resources } from './pages/Resources';
import { License } from './pages/License';
import { CommandPalette } from './components/CommandPalette';
import { Menu, X } from 'lucide-react';
import logoImage from 'figma:asset/af770bb6497312fe6818fc1e22f4a20cfba2af25.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/prompts', label: 'Prompts' },
  { to: '/leaderboard', label: 'Leaderboard' },
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
      className="sticky top-0 z-50 glass border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <motion.img
              src={logoImage}
              alt="CAREVAL Logo"
              className="h-8"
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
                className="relative px-4 py-2 rounded-lg transition-colors"
              >
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary rounded-lg shadow-soft"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive(link.to)
                      ? 'text-primary-foreground'
                      : 'text-slate-grey hover:text-deep-navy'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="ml-2">
              <CommandPalette />
            </div>
          </div>
          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-warm-grey transition-colors"
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
            className="lg:hidden border-t border-border/50 bg-white/95 backdrop-blur-sm overflow-hidden"
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
                    className={`block px-4 py-3 rounded-lg transition-all ${
                      isActive(link.to)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-grey hover:text-deep-navy hover:bg-warm-grey'
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
    <footer className="border-t border-border/50 bg-white/50 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <p className="text-slate-grey leading-relaxed max-w-2xl mx-auto">
            CAREVAL is an AI evaluation benchmark developed within the{' '}
            <a
              href="https://momops.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors font-medium"
            >
              MomOps
            </a>{' '}
            research programme by{' '}
            <a
              href="https://luana.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors font-medium"
            >
              Luana Micheau
            </a>
            .
          </p>
          <p className="text-sm text-slate-grey">
            Released under the{' '}
            <Link
              to="/license"
              className="text-primary hover:text-secondary transition-colors font-medium"
            >
              CAREVAL Research Licence
            </Link>{' '}
            © 2024–2025
          </p>
        </motion.div>
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
          <Route path="/submit" element={<Submit />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/license" element={<License />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-soft-ivory flex flex-col">
      <Navigation />
      <AnimatedRoutes />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}