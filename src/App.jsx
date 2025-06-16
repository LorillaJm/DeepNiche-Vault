import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Navbar from './components/Navbar'
import styles from './App.module.css'
import './styles/variables.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsAuthenticated(!!currentUser)
      setIsLoading(false)
    });

    return () => unsubscribe();
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setUser(null)
      setIsAuthenticated(false)
      toast.success('Successfully logged out')
      navigate('/')
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.appWrapper}
      >
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
          user={user}
        />
        
        <main className={styles.mainContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet context={{ isAuthenticated, setIsAuthenticated, user, setUser }} />
          </motion.div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerGrid}>
              <div className={styles.footerSection}>
                <h3>About DeepNiche Vault</h3>
                <p>
                  Secure access to premium industry knowledge with uncompromising privacy.
                  Join our platform to unlock exclusive content and insights.
                </p>
              </div>
              <div className={styles.footerSection}>
                <h3>Quick Links</h3>
                <ul className={styles.footerLinks}>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  {!isAuthenticated && (
                    <>
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/register">Register</Link></li>
                    </>
                  )}
                </ul>
              </div>
              <div className={styles.footerSection}>
                <h3>Legal</h3>
                <ul className={styles.footerLinks}>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>&copy; {new Date().getFullYear()} DeepNiche Vault. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--green-900)',
              color: 'var(--text-white)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              boxShadow: 'var(--shadow-md)',
            },
            success: {
              iconTheme: {
                primary: 'var(--green-400)',
                secondary: 'var(--green-900)',
              },
              duration: 3000,
            },
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default App