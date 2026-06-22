// ========================================
// Contact Preview Section Component
// She Can Foundation - Smart Contact Portal
// ========================================

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker, HiArrowRight } from 'react-icons/hi';

const ContactPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Contact info items
  const contactInfo = [
    {
      icon: HiMail,
      title: 'Email Us',
      content: 'hello@shecan.org',
      link: 'mailto:hello@shecan.org',
      color: 'purple',
    },
    {
      icon: HiPhone,
      title: 'Call Us',
      content: '+91 123 456 7890',
      link: 'tel:+911234567890',
      color: 'pink',
    },
    {
      icon: HiLocationMarker,
      title: 'Visit Us',
      content: 'Tech Hub, India',
      link: '#',
      color: 'yellow',
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string }> = {
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
    pink: { bg: 'bg-pink-100', icon: 'text-pink-600' },
    yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600' },
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 text-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white mb-6">
              <span className="font-medium">Get in Touch</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Conversation</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8">
              Have questions? Want to get involved? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl ${colorMap[item.color].bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 ${colorMap[item.color].icon}`} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{item.title}</p>
                    <p className="text-white font-medium">{item.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-white/80 mb-6">
                  Whether you want to join our programs, become a mentor, or support our mission, 
                  we're here to help you get started.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Join 50,000+ women in tech',
                    'Free mentorship & training',
                    'Global networking opportunities',
                    'Career support & job placement',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/90">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all btn-primary"
                >
                  Send Us a Message
                  <HiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
