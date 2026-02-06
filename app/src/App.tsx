import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Menu, X, Mail, CheckCircle, TrendingUp, Target, Trophy, ChevronDown, Calendar, Users, Globe,
  Crown, Sparkles, Unlock, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Toaster, toast } from 'sonner';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! We will contact you about membership options.');
    (e.target as HTMLFormElement).reset();
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'membership', label: 'Membership' },
    { id: 'videos', label: 'Video Library' },
    { id: 'story', label: 'My Story' },
    { id: 'contact', label: 'Join' },
  ];

  // Membership tiers
  const membershipTiers = [
    {
      name: 'Lifetime Access',
      price: '$497',
      originalPrice: '$1,997',
      badge: 'Best Value',
      badgeColor: 'bg-amber-500',
      features: [
        'Lifetime access to all video content',
        'New videos added monthly',
        'Private community access',
        'Quarterly live Q&A sessions',
        'Swing analysis discounts',
        'Early supporter recognition',
        'Never pay again - ever'
      ],
      cta: 'Get Lifetime Access',
      highlighted: true
    },
    {
      name: 'Annual Membership',
      price: '$197/year',
      originalPrice: '$297/year',
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
      features: [
        'Full video library access',
        'New videos added monthly',
        'Private community access',
        'Monthly live Q&A sessions',
        'Member-only content',
        'Cancel anytime'
      ],
      cta: 'Start Annual Membership',
      highlighted: false
    },
    {
      name: 'Monthly Membership',
      price: '$29/month',
      originalPrice: '$49/month',
      badge: 'Flexible',
      badgeColor: 'bg-slate-500',
      features: [
        'Full video library access',
        'New videos added monthly',
        'Community access',
        'Cancel anytime',
        '7-day free trial'
      ],
      cta: 'Start Free Trial',
      highlighted: false
    }
  ];

  // Video categories preview
  const videoCategories = [
    { name: 'The Driver', count: 'Lessons', icon: Target, image: '/driver.jpg' },
    { name: 'Iron Play', count: 'Lessons', icon: TrendingUp, image: '/iron-shot.jpg' },
    { name: 'Short Game', count: 'Lessons', icon: Trophy, image: '/putting.jpg' },
    { name: 'Course Strategy', count: 'Lessons', icon: Globe, image: '/hero-bg.jpg' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      <Toaster position="top-center" richColors />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-amber-400 z-[100] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-blue-900/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group" whileHover={{ scale: 1.02 }}>
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl rotate-3 group-hover:rotate-6 transition-transform" />
                <div className="absolute inset-0 bg-slate-900 rounded-xl flex items-center justify-center border border-blue-700">
                  <Crown className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-bold text-lg text-white">Golf From Tee to Green</span>
                <p className="text-xs text-blue-400">Online Golf Instruction Since 1986</p>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeSection === link.id ? 'text-blue-400 bg-blue-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => setShowMembershipDialog(true)}
                  className="ml-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border-0 shadow-lg shadow-blue-500/20"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Explore Membership
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button className="lg:hidden p-2 rounded-lg bg-slate-800/50" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.95 }}>
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-blue-900/30">
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button key={link.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.id)} className="block w-full text-left px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors">
                    {link.label}
                  </motion.button>
                ))}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="pt-4">
                  <Button onClick={() => { setShowMembershipDialog(true); setIsMenuOpen(false); }} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                    <Crown className="w-4 h-4 mr-2" />
                    Explore Membership
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 z-10" />
          <img src="/hero-bg.jpg" alt="Golf swing" className="w-full h-full object-cover opacity-60" />
        </div>

        {/* Animated Elements */}
        <motion.div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute bottom-1/4 right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" animate={{ y: [0, 30, 0], scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity }} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Early Access Available
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                Learn the Golf Swing
              </span>
              <br />
              <span className="text-slate-400">the Right Way</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto">
              Simple, clear instruction built on fundamentals — from a coach teaching since 1986. Train anywhere. Improve faster.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Structured video lessons • New lessons added over time • Optional coaching • Learn from anywhere
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-lg px-8 py-6 shadow-xl shadow-blue-500/20 border-0 font-bold">
                  <Crown className="w-5 h-5 mr-2" />
                  Explore Membership
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}
                  className="border-2 border-amber-500/50 text-amber-400 hover:bg-amber-500/10 text-lg px-8 py-6">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Lesson
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '37+', label: 'Years Teaching' },
                { value: 'Decades', label: 'of Coaching Experience' },
                { value: 'Growing', label: 'Video Library' },
                { value: 'Step-by-step', label: 'Skill Building' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-slate-900/50 rounded-xl border border-blue-900/30">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-8 h-8 text-slate-500" />
        </motion.div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-24 bg-slate-950 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-blue-400 font-semibold tracking-wider uppercase text-sm">Start Here</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Membership Options</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Choose the option that fits how you learn. Start with structured lessons, then add coaching if you want faster feedback.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <motion.div key={index} variants={scaleIn} whileHover={{ y: -10 }}>
                <Card className={`h-full relative overflow-hidden ${tier.highlighted ? 'border-2 border-amber-500/50 bg-gradient-to-b from-amber-950/30 to-slate-900' : 'border-slate-800 bg-slate-900/50'}`}>
                  {tier.highlighted && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500" />}
                  <div className={`absolute top-4 right-4 px-3 py-1 ${tier.badgeColor} text-white text-xs font-bold rounded-full`}>
                    {tier.badge}
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      <span className="text-slate-500 line-through ml-2">{tier.originalPrice}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-amber-400' : 'text-blue-400'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => setShowMembershipDialog(true)}
                      className={`w-full ${tier.highlighted ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 hover:from-amber-400 hover:to-amber-300 font-bold' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                    >
                      {tier.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Library Preview */}
      <section id="videos" className="py-24 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-blue-400 font-semibold tracking-wider uppercase text-sm">What's Inside</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Video Library</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              A growing library of lessons covering every part of the game — built around fundamentals that hold up under pressure. New lessons are added as the library expands.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoCategories.map((category, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -5, scale: 1.02 }}>
                <Card className="bg-slate-800/50 border-slate-700/50 hover:border-blue-500/30 transition-all h-full group overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2 py-1 bg-blue-500/90 text-white text-xs font-bold rounded">
                        {category.count}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <category.icon className="w-6 h-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Sample Video CTA */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mt-12 text-center">
            <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-700">
              <img src="/swing-comparison.jpg" alt="Sample lesson preview" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex items-end justify-center pb-8">
                <Button onClick={() => setShowMembershipDialog(true)} className="bg-blue-600 hover:bg-blue-500 text-white">
                  <Unlock className="w-4 h-4 mr-2" />
                  Unlock Full Library
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.span variants={fadeInUp} className="text-blue-400 font-semibold tracking-wider uppercase text-sm">My Journey</motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                From the Range to the World
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="space-y-6 text-slate-300">
                <p className="text-lg">
                  I started giving golf lessons in <span className="text-blue-400 font-bold">1986</span>. For 37 years, I've been on the range, in the studio, and on the course, teaching thousands of students the truth about what really happens in a golf swing.
                </p>
                <p>
                  I've seen every fad, every gimmick, every "revolutionary" training aid come and go. And through it all, I've stuck to one simple principle: <span className="text-amber-400 font-semibold">tell the truth about the swing mechanics.</span>
                </p>
                <p>
                  At 63, I was given an opportunity to take everything I've learned and share it with golfers everywhere. With a little help from ChatGPT (yes, really), Golf From Tee to Green was born.
                </p>
                <p className="text-lg font-semibold text-white">
                  My mission now is simple: help thousands of golfers play better by understanding what actually works.
                </p>
              </motion.div>

              {/* Timeline */}
              <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">1986</div>
                  <div className="text-xs text-slate-500">Started Teaching</div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-amber-500" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">2025</div>
                  <div className="text-xs text-slate-500">Going Global</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-blue-900/30">
                <img src="/instructor.jpg" alt="James Cantrell - Golf Instructor" className="w-full" />
              </div>
              <motion.div className="absolute -bottom-6 -left-6 bg-slate-900 border border-blue-900/30 p-6 rounded-xl shadow-2xl z-20"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">37+ Years</p>
                    <p className="text-slate-400">Teaching Experience</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="py-24 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-blue-400 font-semibold tracking-wider uppercase text-sm">The Difference</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">The Truth About Your Swing</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              No gimmicks. No fads. Just 37 years of understanding what actually works.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Clear Mechanics', desc: 'Understand exactly what your body should be doing at every point in the swing.' },
              { icon: Unlock, title: 'No Secrets', desc: 'I share everything I know. No holding back the "pro secrets" - you get it all.' },
              { icon: TrendingUp, title: 'Real Progress', desc: 'Trackable improvement with clear drills and practice plans that actually work.' },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -5 }}>
                <Card className="bg-slate-800/50 border-slate-700/50 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact/Join Section */}
      <section id="contact" className="py-24 bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-amber-400 font-semibold tracking-wider uppercase text-sm">Get Started</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Ready to Improve Your Game?</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Choose the option that fits how you learn. Start with structured lessons, then add coaching if you want faster feedback.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Benefits */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
              <motion.div variants={fadeInUp} className="bg-slate-900/50 border border-amber-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="w-8 h-8 text-amber-400" />
                  <h3 className="text-2xl font-bold text-white">Lifetime Access</h3>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">$497</span>
                  <span className="text-slate-500 line-through ml-3 text-xl">$1,997</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    'Lifetime access to all videos',
                    'New content every month',
                    'Private community',
                    'Quarterly live Q&A',
                    'Never pay again'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span>One-time payment, lifetime access</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Get Started</h3>
                <p className="text-slate-400 mb-6">Enter your info and we'll send you membership details.</p>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required className="mt-2 bg-slate-900 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required className="mt-2 bg-slate-900 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-300">Phone (optional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" className="mt-2 bg-slate-900 border-slate-600 text-white" />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold py-6">
                    <Crown className="w-5 h-5 mr-2" />
                    Get Membership Details
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    No payment required now. We'll contact you with next steps.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg rotate-3" />
                  <div className="absolute inset-0 bg-slate-900 rounded-lg flex items-center justify-center border border-blue-700">
                    <Crown className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <span className="font-bold text-xl text-white">Golf From Tee to Green</span>
              </div>
              <p className="text-slate-400 max-w-md mb-6">
  Online golf instruction built on fundamentals — from a coach teaching since 1986. Learn from anywhere in the world.
              </p>
              <div className="flex gap-4">
                <a href="mailto:James@GolfFromTeeToGreen.com" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollToSection(link.id)} className="text-slate-400 hover:text-blue-400 transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li>James Cantrell</li>
                <li><a href="mailto:James@GolfFromTeeToGreen.com" className="hover:text-blue-400 transition-colors">James@GolfFromTeeToGreen.com</a></li>
                <li>Teaching since 1986</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Golf From Tee to Green. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Membership Dialog */}
      <Dialog open={showMembershipDialog} onOpenChange={setShowMembershipDialog}>
        <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              Become a Member
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Choose the membership that's right for you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {/* Lifetime */}
            <div className="bg-gradient-to-r from-amber-950/50 to-slate-900 border border-amber-500/30 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-white">Lifetime Access</p>
                  <p className="text-amber-400 text-sm">Best value</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">$497</p>
                  <p className="text-slate-500 line-through text-sm">$1,997</p>
                </div>
              </div>
              <Button onClick={() => { setShowMembershipDialog(false); scrollToSection('contact'); }} className="w-full bg-amber-500 text-slate-900 font-bold hover:bg-amber-400">
Get Lifetime Access
              </Button>
            </div>

            {/* Annual */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-white">Annual Membership</p>
                  <p className="text-blue-400 text-sm">Most popular</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">$197</p>
                  <p className="text-slate-500 text-sm">/year</p>
                </div>
              </div>
              <Button onClick={() => { setShowMembershipDialog(false); scrollToSection('contact'); }} className="w-full bg-blue-600 text-white hover:bg-blue-500">
                Choose Annual
              </Button>
            </div>

            {/* Monthly */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-white">Monthly Membership</p>
                  <p className="text-slate-400 text-sm">7-day free trial</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">$29</p>
                  <p className="text-slate-500 text-sm">/month</p>
                </div>
              </div>
              <Button onClick={() => { setShowMembershipDialog(false); scrollToSection('contact'); }} variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                Start Free Trial
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
