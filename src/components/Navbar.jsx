import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const getInitials = (name) => {
  if (!name) return 'U';
  return name.charAt(0).toUpperCase();
};

const getRandomColor = () => {
  const colors = [
    '#4F46E5', // indigo
    '#7C3AED', // violet
    '#EC4899', // pink
    '#EF4444', // red
    '#F59E0B', // amber
    '#10B981', // emerald
    '#3B82F6', // blue
    '#6366F1', // indigo
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const UserAvatar = ({ user }) => {
  const [bgColor] = React.useState(() => getRandomColor());
  const initial = getInitials(user?.displayName);
  
  if (user?.photoURL) {
    return (
      <img 
        src={user.photoURL} 
        alt={user.displayName} 
        className={styles.userAvatar}
      />
    );
  }

  return (
    <div 
      className={styles.userLetterAvatar}
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
};

const Navbar = ({ isAuthenticated, onLogout, user }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>
          <img 
            src="/circular.svg" 
            alt="DeepNiche Vault Logo" 
            className={styles.logoImage}
          />
          <span className={styles.logoText}>DeepNiche Vault</span>
        </Link>
        
        <div className={styles.navLinks}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
              <div className={styles.userProfile}>
                <UserAvatar user={user} />
                <span className={styles.userName}>{user?.displayName || 'User'}</span>
              </div>
              <button onClick={onLogout} className={styles.navLink}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.loginLink}>
                Login
              </Link>
              <Link to="/register" className={styles.getStartedButton}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar