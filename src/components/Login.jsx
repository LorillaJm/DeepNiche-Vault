import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { signInWithGoogle } from '../config/firebase'
import styles from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setIsAuthenticated, setUser, isAuthenticated } = useOutletContext()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Implement your regular email/password login here
      toast.error('Email/password login not implemented yet')
    } catch (error) {
      toast.error('Failed to login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const user = await signInWithGoogle()
      setUser(user)
      setIsAuthenticated(true)
      toast.success('Successfully logged in with Google!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Failed to login with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render the login form if already authenticated
  if (isAuthenticated) {
    return null
  }

  return (
    <motion.div 
      className={styles.loginContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.formWrapper}>
        <div>
          <motion.div 
            className={styles.logoContainer}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className={styles.logoBackground}></div>
            <div className={styles.logoIcon}>
              <LockClosedIcon className="h-6 w-6 text-primary-600" />
            </div>
          </motion.div>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Sign in to your account
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Or{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              start your 14-day free trial
            </Link>
          </motion.p>
        </div>

        <div className={styles.authOptions}>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className={styles.googleButton}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className={styles.googleIcon} />
            Sign in with Google
          </button>

          <div className={styles.divider}>
            <span>Or continue with email</span>
          </div>
        </div>

        <motion.form 
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={styles.input}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.rememberForgot}>
            <div className={styles.checkbox}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={styles.checkboxInput}
              />
              <label htmlFor="remember-me" className="text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <a href="#" className={styles.forgotPassword}>
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            <LockClosedIcon className={styles.buttonIcon} aria-hidden="true" />
            {isLoading ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </motion.form>
      </div>
    </motion.div>
  )
}

export default Login