import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information Collection',
      content: `We collect information that you provide directly to us, including:
        • Account information (name, email, profile picture)
        • Payment information (processed securely through our payment providers)
        • Usage data and preferences
        • Communication data when you contact us`
    },
    {
      title: 'How We Use Your Information',
      content: `Your information is used for:
        • Providing and maintaining our services
        • Processing your transactions
        • Sending important notifications
        • Improving our platform
        • Protecting against fraud and abuse`
    },
    {
      title: 'Data Security',
      content: `We implement robust security measures:
        • End-to-end encryption for sensitive data
        • Regular security audits and updates
        • Secure data storage and transmission
        • Access controls and authentication
        • Regular backup procedures`
    },
    {
      title: 'Information Sharing',
      content: `We do not sell your personal information. We share data only:
        • With your explicit consent
        • To process your transactions
        • To comply with legal obligations
        • To protect rights and safety`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:
        • Access your personal data
        • Correct inaccurate data
        • Request data deletion
        • Opt-out of communications
        • Export your data`
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to:
        • Maintain your session
        • Remember your preferences
        • Analyze platform usage
        • Enhance security
        You can control cookie settings in your browser.`
    }
  ];

  return (
    <motion.div
      className={styles.privacyContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.heroSection}>
        <motion.div 
          className={styles.iconWrapper}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <ShieldCheckIcon className={styles.icon} />
        </motion.div>
        <motion.h1 
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </motion.p>
        <motion.p 
          className={styles.introduction}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          At DeepNiche Vault, we take your privacy seriously. This policy describes how we collect,
          use, and protect your personal information when you use our platform.
        </motion.p>
      </div>

      <div className={styles.contentSection}>
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            className={styles.section}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.sectionContent}>
              {section.content.split('\n').map((paragraph, i) => (
                <p key={i} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div 
          className={styles.contactSection}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 + sections.length * 0.1 }}
        >
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.paragraph}>
            If you have any questions about our Privacy Policy, please contact us at:{' '}
            <a href="mailto:privacy@deepnichevault.com" className={styles.link}>
              privacy@deepnichevault.com
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy; 