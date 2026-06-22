// ========================================
// About Section Component
// She Can Foundation - Smart Contact Portal
// ========================================

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiLightningBolt, HiGlobe, HiAcademicCap, HiSparkles } from 'react-icons/hi';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Features data
  const features = [
    {
      icon: HiLightningBolt,
      title: 'Tech Education',
      description: 'Free coding bootcamps and technical skills training for women from all backgrounds.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: HiGlobe,
      title: 'Global Network',
      description: 'Connect with 50,000+ women tech professionals across 100+ countries.',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      icon: HiAcademicCap,
      title: 'Mentorship Program',
      description: 'One-on-one guidance from industry leaders at top tech companies.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: HiSparkles,
      title: 'Career Support',
      description: 'Job placement assistance, resume reviews, and interview preparation.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl transform rotate-3" />
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-8 text-white">
                <div className="aspect-[4/3] rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👩‍💻</div>
                    <p className="text-xl font-semibold text-white/90">Empowering Women</p>
                    <p className="text-white/70">in Technology Since 2019</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -right-4 lg:right-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                  <span className="text-3xl">📈</span>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Success Rate</div>
                  <div className="text-3xl font-bold gradient-text">94%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 mb-6">
              <span className="font-medium">About Us</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Building the Future with{' '}
              <span className="gradient-text">Women in Tech</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8">
              She Can Foundation is dedicated to breaking the glass ceiling in technology. 
              We provide comprehensive support systems, from education to employment, 
              ensuring every woman has the opportunity to thrive in the digital age.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} style={{ color: 'inherit' }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8"
            >
              <a
                href="#impact"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                See Our Impact
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
