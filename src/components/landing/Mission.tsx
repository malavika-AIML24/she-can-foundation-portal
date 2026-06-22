// ========================================
// Mission Section Component
// She Can Foundation - Smart Contact Portal
// ========================================

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiEye, HiChip, HiUserGroup, HiStar } from 'react-icons/hi';

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Mission items
  const missions = [
    {
      icon: HiEye,
      title: 'Our Vision',
      description: 'A world where gender doesn\'t determine your access to technology and opportunities in the digital economy.',
      color: 'purple',
    },
    {
      icon: HiChip,
      title: 'Our Approach',
      description: 'Combining cutting-edge technical education with soft skills training and industry mentorship.',
      color: 'pink',
    },
    {
      icon: HiUserGroup,
      title: 'Our Community',
      description: 'A supportive network of 50,000+ women and allies working together to break barriers in tech.',
      color: 'yellow',
    },
    {
      icon: HiStar,
      title: 'Our Promise',
      description: 'Every woman who joins our program receives personalized support until she achieves her career goals.',
      color: 'green',
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600', border: 'border-purple-500' },
    pink: { bg: 'bg-pink-100', icon: 'text-pink-600', border: 'border-pink-500' },
    yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600', border: 'border-yellow-500' },
    green: { bg: 'bg-green-100', icon: 'text-green-600', border: 'border-green-500' },
  };

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 mb-6">
            <span className="font-medium">Our Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Drives <span className="gradient-text">Our Purpose</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We believe in a future where every woman has the skills, confidence, and support 
            to pursue a successful career in technology.
          </p>
        </motion.div>

        {/* Mission Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl bg-gray-50 hover:bg-white border-2 border-transparent hover:border-${colorMap[item.color].border} transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 rounded-xl ${colorMap[item.color].bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-7 h-7 ${colorMap[item.color].icon}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-2xl sm:text-3xl text-gray-900 font-light italic max-w-4xl mx-auto">
            "The question isn't <span className="font-semibold gradient-text">who is going to let me</span>; 
            it's who is going to <span className="font-semibold gradient-text">stop me</span>."
          </blockquote>
          <p className="mt-4 text-gray-500">— Ayn Rand</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
