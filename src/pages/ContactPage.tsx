// ========================================
// Contact Page
// She Can Foundation - Smart Contact Portal
// ========================================

import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';
import ContactForm from '../components/contact/ContactForm';

const ContactPage = () => {
  // Contact info items
  const contactInfo = [
    {
      icon: HiMail,
      title: 'Email',
      content: 'hello@shecan.org',
      link: 'mailto:hello@shecan.org',
    },
    {
      icon: HiPhone,
      title: 'Phone',
      content: '+91 123 456 7890',
      link: 'tel:+911234567890',
    },
    {
      icon: HiLocationMarker,
      title: 'Address',
      content: '123 Empowerment Street, Tech Hub, India',
      link: '#',
    },
    {
      icon: HiClock,
      title: 'Hours',
      content: 'Mon-Fri: 9AM - 6PM IST',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 mb-6">
            <span className="font-medium">Contact Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about our programs? Want to get involved? Send us a message 
            and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white h-full relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                <p className="text-white/80 mb-8">
                  We're here to help and answer any questions you might have.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.title}
                      href={item.link}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">{item.title}</p>
                        <p className="text-white font-medium">{item.content}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-white/60 mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    {['Twitter', 'LinkedIn', 'Instagram'].map((platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        aria-label={platform}
                      >
                        <span className="text-sm font-medium">{platform[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'How long does it take to get a response?',
                a: 'We typically respond within 24-48 hours during business days.',
              },
              {
                q: 'Can I apply for the program directly?',
                a: 'Yes! Visit our programs page to see upcoming cohorts and apply.',
              },
              {
                q: 'Do you offer mentorship for experienced developers?',
                a: 'Yes, we have programs for all skill levels including senior engineers.',
              },
              {
                q: 'How can I become a volunteer mentor?',
                a: 'Contact us with "Mentor Application" as the subject line.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
