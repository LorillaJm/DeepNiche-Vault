import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { signInWithGoogle } from '../config/firebase'
import styles from './Register.module.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setIsAuthenticated, setUser, isAuthenticated } = useOutletContext()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const user = await signInWithGoogle()
      setUser(user)
      setIsAuthenticated(true)
      toast.success('Successfully registered with Google!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Failed to register with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      // Implement your registration logic here
      toast.error('Email registration not implemented yet')
    } catch (error) {
      toast.error('Failed to register. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render the registration form if already authenticated
  if (isAuthenticated) {
    return null
  }

  return (
    <motion.div 
      className={styles.registerContainer}
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
              <UserPlusIcon className="h-6 w-6 text-primary-600" />
            </div>
          </motion.div>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create your account
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your account
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
            Sign up with Google
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
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={styles.input}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
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
              autoComplete="new-password"
              required
              className={styles.input}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className={styles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            <UserPlusIcon className={styles.buttonIcon} aria-hidden="true" />
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className={styles.terms}>
            By signing up, you agree to our{' '}
            <a href="#" className={styles.termsLink}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className={styles.termsLink}>
              Privacy Policy
            </a>
          </div>
        </motion.form>
      </div>
    </motion.div>
  )
}

export default Register