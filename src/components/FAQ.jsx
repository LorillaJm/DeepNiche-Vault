import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionMarkCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [openSection, setOpenSection] = useState(null);

  const faqs = [
    {
      question: 'What is DeepNiche Vault?',
      answer: 'DeepNiche Vault is a secure platform for accessing and managing premium industry knowledge and content. We provide a safe, private environment for professionals to access exclusive information while maintaining complete confidentiality.'
    },
    {
      question: 'How do I get started?',
      answer: 'Getting started is easy! Simply create an account using your email or Google account, verify your email address, and you\'ll have immediate access to our basic features. For premium content, you can upgrade to one of our subscription plans.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take security very seriously. We use industry-standard encryption, secure data storage, and regular security audits to protect your information. All data is encrypted both in transit and at rest, and we follow strict privacy guidelines.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and various digital payment methods. All payments are processed securely through trusted payment providers. For business accounts, we also offer invoice-based payments.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time through your account settings. Once cancelled, you\'ll continue to have access until the end of your current billing period. We don\'t offer refunds for partial months.'
    },
    {
      question: 'How do I contact support?',
      answer: 'Our support team is available 24/7. You can reach us through our contact form, email us at support@deepnichevault.com, or use the live chat feature in your dashboard. For premium users, we also offer priority support.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, we offer mobile apps for both iOS and Android platforms. You can download them from the respective app stores. The mobile apps provide access to all features available on the web platform.'
    },
    {
      question: 'What happens to my data if I delete my account?',
      answer: 'When you delete your account, all your personal data is permanently removed from our systems within 30 days. Any content you\'ve created or uploaded can be exported before deletion. We retain only what\'s required by law.'
    }
  ];

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <motion.div
      className={styles.faqContainer}
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
          <QuestionMarkCircleIcon className={styles.icon} />
        </motion.div>
        <motion.h1 
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Find answers to common questions about DeepNiche Vault
        </motion.p>
      </div>

      <div className={styles.faqSection}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={styles.faqItem}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <button
              className={`${styles.questionButton} ${openSection === index ? styles.active : ''}`}
              onClick={() => toggleSection(index)}
            >
              <span>{faq.question}</span>
              <ChevronDownIcon 
                className={`${styles.chevron} ${openSection === index ? styles.rotate : ''}`}
              />
            </button>
            <AnimatePresence>
              {openSection === index && (
                <motion.div
                  className={styles.answer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className={styles.contactSection}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 + faqs.length * 0.1 }}
      >
        <h2 className={styles.contactTitle}>Still have questions?</h2>
        <p className={styles.contactText}>
          Can't find the answer you're looking for? Please contact our support team.
        </p>
        <a href="mailto:support@deepnichevault.com" className={styles.contactButton}>
          Contact Support
        </a>
      </motion.div>
    </motion.div>
  );
};

export default FAQ; 