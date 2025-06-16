import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline'
import styles from './LandingPage.module.css'

const features = [
  {
    name: 'Exclusive Content',
    description: 'Access our carefully curated collection of specialized resources and insider knowledge',
    icon: DocumentTextIcon,
  },
  {
    name: 'Complete Privacy',
    description: 'Fully anonymous access with private payment options and encrypted connections',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Automated Access',
    description: 'Instant, 24/7 automated delivery of all resources upon subscription',
    icon: ArrowPathIcon,
  },
  {
    name: 'Private Community',
    description: 'Optional access to our anonymous community of industry professionals',
    icon: UserGroupIcon,
  },
]

const LandingPage = () => {
  const plans = [
    {
      name: 'Monthly Access',
      price: '$49.99',
      period: 'per month',
      features: [
        'Full content library access',
        'Weekly content updates',
        'Anonymous browsing',
        'Private downloads',
        'Cancel anytime'
      ]
    },
    {
      name: 'Annual Access',
      price: '$499.99',
      period: 'per year',
      features: [
        'Everything in Monthly',
        'Save 15%',
        'Early access to new content',
        'Private community access',
        'Premium support'
      ]
    }
  ]

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.heroTitle}>
            Exclusive Industry Insights
            <span className={styles.heroHighlight}>Private Access</span>
          </h1>
          <p className={styles.heroDescription}>
            Gain instant access to our specialized knowledge base. Automated delivery,
            complete privacy, and continuous updates ensure you stay ahead in your field.
          </p>
          <div className={styles.buttonGroup}>
            <Link to="/register" className={styles.primaryButton}>
              Access Now
            </Link>
            <Link to="/preview" className={styles.secondaryButton}>
              Preview Content
            </Link>
          </div>
        </motion.div>
      </div>

      <div className={styles.features}>
        <div className={styles.featuresHeader}>
          <motion.h2 
            className={styles.featuresTitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Premium Access
          </motion.h2>
          <motion.p 
            className={styles.featuresSubtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Specialized Knowledge Base
          </motion.p>
          <motion.p 
            className={styles.featuresDescription}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Join our exclusive platform for instant access to premium industry resources
          </motion.p>
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.featureIcon}>
                  <feature.icon aria-hidden="true" />
                </div>
                <h3 className={styles.featureTitle}>{feature.name}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <div className={styles.ctaContainer}>
          <motion.h2 
            className={styles.ctaTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span>Ready to get started?</span>
            <span className={styles.ctaSubtitle}>Get access today.</span>
          </motion.h2>
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/register" className={styles.primaryButton}>
              Get Started
            </Link>
            <Link to="/login" className={styles.secondaryButton}>
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage