// ========================================
// Impact Statistics Section Component
// She Can Foundation - Smart Contact Portal
// ========================================

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { HiUsers, HiAcademicCap, HiBriefcase, HiGlobe } from 'react-icons/hi';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const ImpactStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Stats data
  const stats = [
    {
      icon: HiUsers,
      value: 50000,
      suffix: '+',
      label: 'Women Empowered',
      description: 'Women trained and supported through our programs',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      icon: HiAcademicCap,
      value: 15000,
      suffix: '+',
      label: 'Graduates',
      description: 'Successful graduates from our tech bootcamps',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-100',
      iconBg: 'bg-pink-500',
    },
    {
      icon: HiBriefcase,
      value: 2500,
      suffix: '+',
      label: 'Placements',
      description: 'Women placed in top tech companies worldwide',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-100',
      iconBg: 'bg-yellow-500',
    },
    {
      icon: HiGlobe,
      value: 100,
      suffix: '+',
      label: 'Countries',
      description: 'Global presence across continents',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
      iconBg: 'bg-green-500',
    },
  ];

  return (
    <section id="impact" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 mb-6">
            <span className="font-medium">Our Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Numbers That <span className="gradient-text">Speak Volumes</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Since our founding, we've made significant strides in empowering women 
            across the globe. Here's a snapshot of our journey.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full card-hover">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl ${stat.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-8 h-8 text-white`} style={{ color: 'white' }} />
                </div>

                {/* Number */}
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm">{stat.description}</p>

                {/* Hover Gradient Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Be Part of This Journey?
              </h3>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Whether you want to learn, mentor, or support, there's a place for you at She Can Foundation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all btn-primary"
                >
                  Contact Us
                </a>
                <a
                  href="https://github.com/shecan-foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
