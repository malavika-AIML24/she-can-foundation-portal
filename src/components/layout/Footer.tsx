// ========================================
// Footer Component
// She Can Foundation - Smart Contact Portal
// ========================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiHeart, 
  HiMail, 
  HiPhone, 
  HiLocationMarker,
  HiArrowRight 
} from 'react-icons/hi';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <HiHeart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">She Can Foundation</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering women through technology, education, and opportunity. 
              Join us in building a world where every woman can achieve her dreams.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: FaTwitter, href: '#', label: 'Twitter' },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
                { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                { icon: FaGithub, href: '#', label: 'GitHub' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Our Mission', 'Impact Stories', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <HiArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <HiLocationMarker className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                <span>123 Empowerment Street, Tech Hub, India</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <HiMail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <a href="mailto:hello@shecan.org" className="hover:text-white transition-colors">
                  hello@shecan.org
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <HiPhone className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} She Can Foundation. Made with ❤️ for women empowerment.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/admin" className="hover:text-white transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
