import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  ShieldCheckIcon, 
  LightBulbIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      description: 'With 15+ years in digital content management and security.',
      icon: UserGroupIcon,
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      description: 'Expert in secure content delivery and cloud infrastructure.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Emma Davis',
      role: 'Content Director',
      description: 'Specialist in premium content curation and industry analysis.',
      icon: LightBulbIcon,
    },
    {
      name: 'Alex Rivera',
      role: 'Head of Security',
      description: 'Cybersecurity expert with focus on privacy protection.',
      icon: GlobeAltIcon,
    },
  ];

  return (
    <motion.div
      className={styles.aboutContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.heroSection}>
        <motion.h1 
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          About DeepNiche Vault
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Securing and delivering premium industry knowledge with uncompromising privacy
        </motion.p>
      </div>

      <div className={styles.contentSection}>
        <motion.div 
          className={styles.missionSection}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.sectionText}>
            At DeepNiche Vault, we're committed to providing secure access to premium industry knowledge
            while maintaining the highest standards of privacy and confidentiality. Our platform serves
            as a bridge between exclusive content and professionals who need it, all while ensuring
            complete anonymity and security.
          </p>
        </motion.div>

        <motion.div 
          className={styles.valuesSection}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesList}>
            <div className={styles.valueItem}>
              <h3>Privacy First</h3>
              <p>Your privacy is our top priority. We ensure complete anonymity in all interactions.</p>
            </div>
            <div className={styles.valueItem}>
              <h3>Quality Content</h3>
              <p>We curate and deliver only the highest quality, verified industry information.</p>
            </div>
            <div className={styles.valueItem}>
              <h3>Secure Access</h3>
              <p>State-of-the-art security measures protect your data and content access.</p>
            </div>
            <div className={styles.valueItem}>
              <h3>Continuous Innovation</h3>
              <p>We constantly evolve our platform to meet changing industry needs.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.teamSection}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className={styles.teamMember}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className={styles.memberIcon}>
                  <member.icon className="h-6 w-6" />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberDescription}>{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs; 