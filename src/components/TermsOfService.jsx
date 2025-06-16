import React from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import styles from './TermsOfService.module.css';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using DeepNiche Vault, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our service. We reserve the right to modify these terms at any time, and we'll notify you of any changes by posting the new Terms of Service on this page.`
    },
    {
      title: 'User Accounts',
      content: `To use our services, you must:
        • Be at least 18 years old
        • Register for an account with valid information
        • Maintain the security of your account
        • Accept responsibility for all activities under your account
        • Notify us immediately of any security breaches`
    },
    {
      title: 'Service Rules',
      content: `When using our platform, you agree not to:
        • Violate any laws or regulations
        • Infringe on intellectual property rights
        • Share malicious software or content
        • Attempt to gain unauthorized access
        • Interfere with the proper working of the service`
    },
    {
      title: 'Content and Data',
      content: `You retain all rights to any content you submit, post, or display on our platform. By providing content, you grant us a license to use, modify, and distribute it within our services. We may remove any content that violates these terms or our policies.`
    },
    {
      title: 'Payment Terms',
      content: `For paid services:
        • Payments are processed securely through our providers
        • Fees are non-refundable unless required by law
        • We may change our fees with prior notice
        • You agree to pay all applicable taxes
        • Subscription terms are specified at purchase`
    },
    {
      title: 'Termination',
      content: `We may terminate or suspend your account and access to our services:
        • For violations of these terms
        • At our sole discretion without notice
        • Upon your request to delete your account
        Upon termination, your right to use the service will cease immediately.`
    },
    {
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law:
        • We provide the service "as is" without warranties
        • We're not liable for any indirect damages
        • Our liability is limited to the amount paid for the service
        • We don't guarantee uninterrupted or secure access`
    }
  ];

  return (
    <motion.div
      className={styles.termsContainer}
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
          <DocumentTextIcon className={styles.icon} />
        </motion.div>
        <motion.h1 
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Terms of Service
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
          Please read these Terms of Service carefully before using DeepNiche Vault.
          These terms govern your use of our platform and services.
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
            If you have any questions about our Terms of Service, please contact us at:{' '}
            <a href="mailto:legal@deepnichevault.com" className={styles.link}>
              legal@deepnichevault.com
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TermsOfService; 