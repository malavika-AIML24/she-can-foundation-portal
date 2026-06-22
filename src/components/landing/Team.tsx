// ========================================
// Team Section Component
// She Can Foundation - Smart Contact Portal
// ========================================

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Team members data
  const team = [
    {
      name: 'Dr. Priya Mehta',
      role: 'Founder & CEO',
      avatar: '👩‍💼',
      bio: 'Former tech executive with 15+ years of experience passionate about empowering women in STEM.',
      social: { twitter: '#', linkedin: '#' },
    },
    {
      name: 'Anjali Sharma',
      role: 'Head of Programs',
      avatar: '👩‍💻',
      bio: 'EdTech specialist who has designed curriculums for 10,000+ women across multiple programs.',
      social: { twitter: '#', linkedin: '#' },
    },
    {
      name: 'Ritu Patel',
      role: 'Community Lead',
      avatar: '👩‍🎓',
      bio: 'Community builder creating safe spaces for women to learn, grow, and support each other.',
      social: { twitter: '#', linkedin: '#' },
    },
    {
      name: 'Sneha Reddy',
      role: 'Partnerships Director',
      avatar: '👩‍🔬',
      bio: 'Connecting our graduates with top companies and building industry partnerships worldwide.',
      social: { twitter: '#', linkedin: '#' },
    },
  ];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-600 mb-6">
            <span className="font-medium">Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet the <span className="gradient-text">Visionaries</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our passionate team is dedicated to creating opportunities and breaking barriers 
            for women in technology.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-3xl p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-300 card-hover">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                  {member.avatar}
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href={member.social.twitter}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
