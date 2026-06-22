// ========================================
// Testimonials Section Component
// She Can Foundation - Smart Contact Portal
// ========================================

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      quote: 'She Can Foundation completely transformed my career trajectory. The mentorship and hands-on training gave me the confidence to land my dream job at Google.',
      avatar: '👩‍💻',
      company: 'Google',
    },
    {
      id: 2,
      name: 'Ananya Patel',
      role: 'Full Stack Developer',
      quote: 'Coming from a non-tech background, I was skeptical at first. But the supportive community and structured curriculum helped me transition into tech in just 6 months.',
      avatar: '👩‍🔬',
      company: 'Microsoft',
    },
    {
      id: 3,
      name: 'Meera Reddy',
      role: 'Data Scientist',
      quote: 'The coding bootcamp was intense but incredibly rewarding. I not only learned to code but also built lasting friendships with other women in tech.',
      avatar: '👩‍🎓',
      company: 'Amazon',
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      role: 'UX Designer',
      quote: 'The career support didn\'t end after the bootcamp. The ongoing mentorship helped me negotiate a 40% higher salary than what was initially offered.',
      avatar: '🎨',
      company: 'Adobe',
    },
  ];

  // Navigation functions
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-600 mb-6">
            <span className="font-medium">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Success Stories from <span className="gradient-text">Our Alumni</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from the women who transformed their careers through our programs.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Main Testimonial Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                {/* Quote Icon */}
                <div className="text-6xl text-purple-200 mb-6">"</div>
                
                {/* Quote Text */}
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8"
                >
                  {testimonials[current].quote}
                </motion.p>
                
                {/* Author Info */}
                <motion.div
                  key={`author-${current}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-gray-600">{testimonials[current].role}</p>
                    <p className="text-purple-600 font-medium text-sm">
                      at {testimonials[current].company}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === index
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <HiChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <p className="text-center text-gray-500 mb-6">Our alumni work at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Adobe'].map((company) => (
              <span key={company} className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
