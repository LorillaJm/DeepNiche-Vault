import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon, 
  ArrowDownTrayIcon,
  StarIcon,
  InboxIcon,
  BellIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  ClockIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import styles from './Dashboard.module.css';
import ChatSupport from './ChatSupport';
import { templateService } from '../services/templates';

const templates = [
  {
    id: 1,
    name: 'Financial Statement Template',
    description: 'Comprehensive template for creating professional financial statements',
    icon: DocumentTextIcon,
    category: 'Finance',
    downloads: 1234,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Invoice Template',
    description: 'Professional invoice template with automatic calculations',
    icon: ClipboardDocumentListIcon,
    category: 'Billing',
    downloads: 2345,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Budget Planning Template',
    description: 'Detailed budget planning and tracking template',
    icon: DocumentTextIcon,
    category: 'Planning',
    downloads: 1567,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Business Plan Template',
    description: 'Comprehensive business plan template with financial projections',
    icon: ClipboardDocumentListIcon,
    category: 'Planning',
    downloads: 1890,
    rating: 4.6,
  },
];

const recentUpdates = [
  {
    id: 1,
    title: 'New Financial Templates Added',
    description: "We've added 5 new financial templates to help with your business planning",
    date: '2024-03-20',
    type: 'new_content'
  },
  {
    id: 2,
    title: 'Template Updates',
    description: 'Updated tax calculation formulas in financial templates for 2024',
    date: '2024-03-18',
    type: 'update'
  },
  {
    id: 3,
    title: 'Platform Enhancement',
    description: 'Added new export options for all templates',
    date: '2024-03-15',
    type: 'feature'
  }
];

const supportTickets = [
  {
    id: 1,
    subject: 'Template Access Issue',
    status: 'open',
    lastUpdate: '2024-03-20',
    priority: 'high'
  },
  {
    id: 2,
    subject: 'Download Problem',
    status: 'in_progress',
    lastUpdate: '2024-03-19',
    priority: 'medium'
  }
];

const scheduledContent = [
  {
    id: 1,
    title: 'Q1 2024 Financial Planning Bundle',
    description: 'Complete set of financial planning templates and tools for Q1 2024',
    releaseDate: '2024-04-01',
    type: 'bundle',
    items: [
      'Q1 Budget Template',
      'Cash Flow Projection Tool',
      'Investment Planning Guide'
    ],
    thumbnail: '/images/q1-bundle.jpg'
  },
  {
    id: 2,
    title: 'Tax Season Preparation Kit',
    description: 'Essential templates and guides for tax season preparation',
    releaseDate: '2024-03-25',
    type: 'kit',
    items: [
      'Tax Checklist Template',
      'Expense Tracking Sheet',
      'Tax Deduction Guide'
    ],
    thumbnail: '/images/tax-kit.jpg'
  },
  {
    id: 3,
    title: 'Business Growth Strategy Templates',
    description: 'Strategic planning templates for business expansion',
    releaseDate: '2024-04-15',
    type: 'templates',
    items: [
      'Market Analysis Template',
      'Growth Projection Tools',
      'Action Plan Builder'
    ],
    thumbnail: '/images/growth-templates.jpg'
  }
];

const contentLibrary = [
  {
    id: 'temp001',
    title: 'Business Plan Template',
    description: 'Comprehensive business plan template with financial projections',
    type: 'template',
    category: 'Business',
    format: 'xlsx',
    tags: ['planning', 'finance', 'startup'],
    downloads: 1234,
    rating: 4.8,
    lastUpdated: '2024-03-15'
  },
  {
    id: 'doc001',
    title: 'Tax Deduction Guide 2024',
    description: 'Complete guide to business tax deductions for 2024',
    type: 'document',
    category: 'Finance',
    format: 'pdf',
    tags: ['tax', 'finance', 'guide'],
    downloads: 956,
    rating: 4.9,
    lastUpdated: '2024-03-10'
  },
  {
    id: 'tool001',
    title: 'ROI Calculator',
    description: 'Interactive tool for calculating return on investment',
    type: 'tool',
    category: 'Finance',
    format: 'xlsx',
    tags: ['calculator', 'finance', 'investment'],
    downloads: 789,
    rating: 4.7,
    lastUpdated: '2024-03-01'
  },
  // Add more content items...
];

const categories = [
  'All',
  'Dashboard',
  'Landing',
  'Blog',
  'E-commerce',
  'Portfolio'
];

const types = ['All', 'React', 'Bootstrap', 'Tailwind', 'HTML/CSS'];
const formats = ['All', 'pdf', 'xlsx', 'doc', 'ppt'];
const sources = ['All', 'Material UI', 'Bootstrap Themes', 'Tailwind UI', 'ThemeWagon', 'Creative Tim', 'StartBootstrap'];

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('templates');
  const [upcomingContent, setUpcomingContent] = useState([]);
  const [availableContent, setAvailableContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState({});
  const [templateStats, setTemplateStats] = useState({
    total: 0,
    downloads: 0,
    favorites: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSource, setSelectedSource] = useState('All');
  const templatesPerPage = 10;
  
  useEffect(() => {
    // Filter content based on release dates
    const now = new Date();
    const upcoming = scheduledContent.filter(
      content => new Date(content.releaseDate) > now
    ).sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    
    const available = scheduledContent.filter(
      content => new Date(content.releaseDate) <= now
    );
    
    setUpcomingContent(upcoming);
    setAvailableContent(available);
  }, []);

  useEffect(() => {
    fetchTemplates();
    fetchTemplateStats();
  }, [selectedCategory, selectedType, searchQuery, selectedSource]);

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let results = await templateService.getAllTemplates();
      
      // Apply filters
      if (selectedCategory !== 'All') {
        results = results.filter(template => template.category === selectedCategory);
      }
      
      if (selectedType !== 'All') {
        results = results.filter(template => template.type === selectedType);
      }
      
      if (selectedSource !== 'All') {
        results = results.filter(template => template.source === selectedSource);
      }
      
      if (searchQuery) {
        results = results.filter(template => 
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort templates by downloads (most popular first)
      results.sort((a, b) => b.downloads - a.downloads);

      // Preload images for visible templates
      const visibleTemplates = results.slice(0, templatesPerPage);
      await Promise.all(
        visibleTemplates.map(template => preloadImage(template.thumbnailUrl))
          .map(p => p.catch(e => console.log('Image preload failed:', e)))
      );

      setTemplates(results);
      setCurrentPage(1);
      
      setTemplateStats({
        total: results.length,
        downloads: results.reduce((sum, template) => sum + template.downloads, 0),
        favorites: favorites
      });
    } catch (err) {
      setError('Failed to load templates. Please try again later.');
      console.error('Error loading templates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTemplateStats = async () => {
    try {
      const allTemplates = await templateService.getAllTemplates();
      const totalDownloads = allTemplates.reduce((sum, template) => sum + template.downloads, 0);
      
      setTemplateStats({
        total: allTemplates.length,
        downloads: totalDownloads,
        favorites: favorites
      });
    } catch (error) {
      console.error('Error fetching template stats:', error);
    }
  };

  // Configure Fuse.js for search
  const fuseOptions = {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'tags', weight: 0.2 },
      { name: 'category', weight: 0.1 }
    ],
    threshold: 0.3,
    includeScore: true
  };

  const fuse = useMemo(() => new Fuse(contentLibrary, fuseOptions), []);

  // Filter and search content
  const filteredContent = useMemo(() => {
    let results = contentLibrary;

    // Apply search if query exists
    if (searchQuery) {
      results = fuse.search(searchQuery).map(result => result.item);
    }

    // Apply filters
    return results.filter(item => {
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      const typeMatch = selectedType === 'All' || item.type === selectedType;
      const formatMatch = selectedFormat === 'All' || item.format === selectedFormat;
      return categoryMatch && typeMatch && formatMatch;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedFormat]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedFormat('All');
    setSearchQuery('');
  };

  const toggleFavorite = (templateId) => {
    setFavorites(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const formatReleaseDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getDaysUntilRelease = (dateString) => {
    const now = new Date();
    const releaseDate = new Date(dateString);
    const diffTime = Math.abs(releaseDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDownload = (sourceUrl) => {
    window.open(sourceUrl, '_blank');
  };

  const paginateTemplates = (templates) => {
    const startIndex = (currentPage - 1) * templatesPerPage;
    const endIndex = startIndex + templatesPerPage;
    return templates.slice(startIndex, endIndex);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Access your premium templates and resources - Over 100+ Professional Templates
          </p>
        </motion.div>

        <motion.div 
          className={styles.statsGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <DocumentTextIcon className="h-6 w-6" />
              </div>
              <div className={styles.statInfo}>
                <dt className={styles.statLabel}>Total Templates</dt>
                <dd className={styles.statValue}>{templateStats.total}+</dd>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <ArrowDownTrayIcon className="h-6 w-6" />
              </div>
              <div className={styles.statInfo}>
                <dt className={styles.statLabel}>Total Downloads</dt>
                <dd className={styles.statValue}>{templateStats.downloads.toLocaleString()}</dd>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <HeartIcon className="h-6 w-6" />
              </div>
              <div className={styles.statInfo}>
                <dt className={styles.statLabel}>Favorites</dt>
                <dd className={styles.statValue}>{favorites.length}</dd>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIcon}>
                <InboxIcon className="h-6 w-6" />
              </div>
              <div className={styles.statInfo}>
                <dt className={styles.statLabel}>Template Sources</dt>
                <dd className={styles.statValue}>5</dd>
              </div>
            </div>
          </div>
        </motion.div>

        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'templates' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            <DocumentTextIcon className="h-5 w-5" />
            Templates
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'updates' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('updates')}
          >
            <BellIcon className="h-5 w-5" />
            Updates
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'scheduled' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('scheduled')}
          >
            <CalendarIcon className="h-5 w-5" />
            Scheduled Content
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'favorites' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <HeartIcon className="h-5 w-5" />
            Favorites
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'support' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            Support
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'library' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('library')}
          >
            <DocumentTextIcon className="h-5 w-5" />
            Content Library
          </button>
        </div>

        {activeTab === 'templates' && (
          <motion.div 
            className={styles.templatesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Free Templates</h2>
              <div className={styles.templateFilters}>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.filterSelect}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={styles.filterSelect}
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select 
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className={styles.filterSelect}
                >
                  {sources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
            
            {isLoading && (
              <div className={styles.loadingState}>
                <span className={styles.loader}></span>
                <p>Loading templates...</p>
              </div>
            )}
            
            {error && (
              <div className={styles.errorState}>
                <p>{error}</p>
                <button onClick={fetchTemplates} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}
            
            <div className={styles.templateGrid}>
              {paginateTemplates(templates).map((template) => (
                <motion.div
                  key={template.id}
                  className={`${styles.templateCard} ${template.isPro ? styles.proTemplate : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.templateImageWrapper}>
                    <img 
                      src={template.thumbnailUrl} 
                      alt={template.name}
                      className={styles.templateImage}
                      loading="lazy"
                      onError={(e) => {
                        if (!imageError[template.id]) {
                          setImageError(prev => ({
                            ...prev,
                            [template.id]: true
                          }));
                          e.target.src = `https://flowbite.s3.amazonaws.com/templates/flowbite-${template.category.toLowerCase()}-template/flowbite-${template.category.toLowerCase()}-template-preview.png`;
                        }
                      }}
                    />
                    <div className={styles.templateOverlay}>
                      <div className={styles.templateBadges}>
                        <span className={styles.sourceTag}>{template.source}</span>
                        {template.isPro && (
                          <span className={`${styles.pricingBadge} ${styles.proBadge}`}>
                            <SparklesIcon className="h-4 w-4" />
                            {template.isEnterprise ? 'Enterprise' : 'Pro'}
                          </span>
                        )}
                        {!template.isPro && (
                          <span className={`${styles.pricingBadge} ${styles.freeBadge}`}>
                            Free
                          </span>
                        )}
                      </div>
                      <button 
                        className={styles.favoriteButton}
                        onClick={() => toggleFavorite(template.id)}
                        aria-label={favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        {favorites.includes(template.id) ? (
                          <HeartIconSolid className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={styles.templateContent}>
                    <div className={styles.templateHeader}>
                      <h3 className={styles.templateTitle}>{template.name}</h3>
                      {template.price > 0 && (
                        <span className={styles.priceTag}>
                          <CurrencyDollarIcon className="h-4 w-4" />
                          {template.price}
                        </span>
                      )}
                    </div>
                    
                    <p className={styles.templateDescription}>{template.description}</p>
                    
                    <div className={styles.templateMeta}>
                      <div className={styles.templateTags}>
                        <span className={styles.categoryTag}>{template.category}</span>
                        <span className={styles.typeTag}>
                          <CodeBracketIcon className="h-4 w-4" />
                          {template.type}
                        </span>
                      </div>
                      
                      <div className={styles.templateStats}>
                        <span className={styles.downloads} title="Total Downloads">
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          {template.downloads.toLocaleString()}
                        </span>
                        <span className={styles.rating} title="Average Rating">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          {template.rating}
                        </span>
                      </div>
                    </div>

                    <div className={styles.templateFeatures}>
                      {template.features.map((feature, index) => (
                        <span 
                          key={index} 
                          className={`${styles.featureTag} ${template.isPro && index > 3 ? styles.proFeature : ''}`}
                        >
                          {feature}
                          {template.isPro && index > 3 && <SparklesIcon className="h-3 w-3 ml-1" />}
                        </span>
                      ))}
                    </div>

                    <div className={styles.templateActions}>
                      <button 
                        className={styles.viewButton}
                        onClick={() => window.open(template.sourceUrl, '_blank')}
                      >
                        <GlobeAltIcon className="h-5 w-5" />
                        Preview
                      </button>
                      <button 
                        className={`${styles.downloadButton} ${template.isPro ? styles.proButton : ''}`}
                        onClick={() => window.open(template.downloadUrl, '_blank')}
                      >
                        {template.isPro ? (
                          <>
                            <SparklesIcon className="h-5 w-5" />
                            Get Pro
                          </>
                        ) : (
                          <>
                            <ArrowDownTrayIcon className="h-5 w-5" />
                            Download
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.paginationContainer}>
              <div className={styles.paginationInfo}>
                Showing {((currentPage - 1) * templatesPerPage) + 1} to {Math.min(currentPage * templatesPerPage, templates.length)} of {templates.length} templates
              </div>
              <div className={styles.paginationControls}>
                <button
                  className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                  Previous
                </button>
                <div className={styles.pageNumbers}>
                  {Array.from({ length: Math.ceil(templates.length / templatesPerPage) }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.activePage : ''}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  className={`${styles.paginationButton} ${currentPage >= Math.ceil(templates.length / templatesPerPage) ? styles.disabled : ''}`}
                  onClick={() => setCurrentPage(prev => Math.min(Math.ceil(templates.length / templatesPerPage), prev + 1))}
                  disabled={currentPage >= Math.ceil(templates.length / templatesPerPage)}
                >
                  Next
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'updates' && (
          <motion.div 
            className={styles.updatesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Updates</h2>
            </div>
            <div className={styles.updatesList}>
              {recentUpdates.map((update, index) => (
                <motion.div
                  key={update.id}
                  className={styles.updateCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className={styles.updateIcon}>
                    <BellIcon className="h-6 w-6" />
                  </div>
                  <div className={styles.updateContent}>
                    <h3 className={styles.updateTitle}>{update.title}</h3>
                    <p className={styles.updateDescription}>{update.description}</p>
                    <span className={styles.updateDate}>{update.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'scheduled' && (
          <motion.div 
            className={styles.scheduledSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {upcomingContent.length > 0 && (
              <>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Upcoming Releases</h2>
                </div>
                <div className={styles.scheduledGrid}>
                  {upcomingContent.map((content, index) => (
                    <motion.div
                      key={content.id}
                      className={styles.scheduledCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <div className={styles.scheduledContent}>
                        <div className={styles.scheduledHeader}>
                          <div className={styles.scheduledInfo}>
                            <span className={`${styles.scheduledBadge} ${styles[content.type]}`}>
                              {content.type}
                            </span>
                            <h3 className={styles.scheduledTitle}>{content.title}</h3>
                            <p className={styles.scheduledDescription}>{content.description}</p>
                          </div>
                        </div>
                        <div className={styles.scheduledMeta}>
                          <div className={styles.releaseInfo}>
                            <CalendarIcon className="h-5 w-5" />
                            <span>Releases: {formatReleaseDate(content.releaseDate)}</span>
                          </div>
                          <div className={styles.countdownInfo}>
                            <ClockIcon className="h-5 w-5" />
                            <span>{getDaysUntilRelease(content.releaseDate)} days until release</span>
                          </div>
                        </div>
                        <div className={styles.scheduledItems}>
                          <h4 className={styles.itemsTitle}>Included Items:</h4>
                          <ul className={styles.itemsList}>
                            {content.items.map((item, i) => (
                              <li key={i} className={styles.itemEntry}>
                                <LockClosedIcon className="h-4 w-4" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button className={styles.notifyButton}>
                          <BellIcon className="h-4 w-4" />
                          Notify me on release
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {availableContent.length > 0 && (
              <>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Recently Released</h2>
                </div>
                <div className={styles.scheduledGrid}>
                  {availableContent.map((content, index) => (
                    <motion.div
                      key={content.id}
                      className={styles.scheduledCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <div className={styles.scheduledContent}>
                        <div className={styles.scheduledHeader}>
                          <div className={styles.scheduledInfo}>
                            <span className={`${styles.scheduledBadge} ${styles[content.type]}`}>
                              {content.type}
                            </span>
                            <h3 className={styles.scheduledTitle}>{content.title}</h3>
                            <p className={styles.scheduledDescription}>{content.description}</p>
                          </div>
                        </div>
                        <div className={styles.scheduledMeta}>
                          <div className={styles.releaseInfo}>
                            <CalendarIcon className="h-5 w-5" />
                            <span>Released: {formatReleaseDate(content.releaseDate)}</span>
                          </div>
                        </div>
                        <div className={styles.scheduledItems}>
                          <h4 className={styles.itemsTitle}>Included Items:</h4>
                          <ul className={styles.itemsList}>
                            {content.items.map((item, i) => (
                              <li key={i} className={styles.itemEntry}>
                                <DocumentTextIcon className="h-4 w-4" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button className={styles.downloadButton}>
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          Download Bundle
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === 'favorites' && (
          <motion.div 
            className={styles.favoritesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Your Favorites</h2>
            </div>
            <div className={styles.templateGrid}>
              {templates
                .filter(template => favorites.includes(template.id))
                .map((template, index) => (
                  <motion.div
                    key={template.id}
                    className={styles.templateCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className={styles.templateImageWrapper}>
                      <img 
                        src={template.thumbnailUrl} 
                        alt={template.name}
                        className={styles.templateImage}
                        onError={(e) => {
                          if (!imageError[template.id]) {
                            setImageError(prev => ({
                              ...prev,
                              [template.id]: true
                            }));
                            e.target.src = 'https://via.placeholder.com/400x300?text=Template+Preview';
                          }
                        }}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f3f4f6'
                        }}
                      />
                      <div className={styles.templateOverlay}>
                        <span className={styles.sourceTag}>{template.source}</span>
                        <button 
                          className={styles.favoriteButton}
                          onClick={() => toggleFavorite(template.id)}
                        >
                          <HeartIconSolid className="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    </div>

                    <div className={styles.templateContent}>
                      <h3 className={styles.templateTitle}>{template.name}</h3>
                      <p className={styles.templateDescription}>{template.description}</p>
                      
                      <div className={styles.templateMeta}>
                        <div className={styles.templateTags}>
                          <span className={styles.categoryTag}>{template.category}</span>
                          <span className={styles.typeTag}>
                            <CodeBracketIcon className="h-4 w-4" />
                            {template.type}
                          </span>
                        </div>
                        
                        <div className={styles.templateStats}>
                          <span className={styles.downloads}>
                            <ArrowDownTrayIcon className="h-4 w-4" />
                            {template.downloads.toLocaleString()}
                          </span>
                          <span className={styles.rating}>
                            <StarIcon className="h-4 w-4 text-yellow-400" />
                            {template.rating}
                          </span>
                        </div>
                      </div>

                      <div className={styles.templateFeatures}>
                        {template.features.map((feature, index) => (
                          <span key={index} className={styles.featureTag}>
                            {feature}
                          </span>
                        ))}
                      </div>

                      <button 
                        className={styles.viewButton}
                        onClick={() => window.open(template.sourceUrl, '_blank')}
                      >
                        View Template
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'support' && (
          <motion.div 
            className={styles.supportSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Support Inbox</h2>
              <button className={styles.newTicketButton}>
                New Ticket
              </button>
            </div>
            <div className={styles.supportList}>
              {supportTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  className={styles.supportCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className={styles.supportIcon}>
                    <InboxIcon className="h-6 w-6" />
                  </div>
                  <div className={styles.supportContent}>
                    <h3 className={styles.supportTitle}>{ticket.subject}</h3>
                    <div className={styles.supportMeta}>
                      <span className={`${styles.supportStatus} ${styles[ticket.status]}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <span className={`${styles.supportPriority} ${styles[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                      <span className={styles.supportDate}>{ticket.lastUpdate}</span>
                    </div>
                  </div>
                  <button className={styles.viewTicketButton}>
                    View
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'library' && (
          <motion.div 
            className={styles.librarySection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.searchContainer}>
              <div className={styles.searchBar}>
                <MagnifyingGlassIcon className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search templates, documents, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button
                    className={styles.clearSearch}
                    onClick={() => setSearchQuery('')}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
                <button
                  className={styles.filterButton}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FunnelIcon className="h-5 w-5" />
                  Filters
                </button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    className={styles.filtersPanel}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.filterGroup}>
                      <label>Category:</label>
                      <div className={styles.filterOptions}>
                        {categories.map(category => (
                          <button
                            key={category}
                            className={`${styles.filterOption} ${
                              selectedCategory === category ? styles.selected : ''
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.filterGroup}>
                      <label>Type:</label>
                      <div className={styles.filterOptions}>
                        {types.map(type => (
                          <button
                            key={type}
                            className={`${styles.filterOption} ${
                              selectedType === type ? styles.selected : ''
                            }`}
                            onClick={() => setSelectedType(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.filterGroup}>
                      <label>Format:</label>
                      <div className={styles.filterOptions}>
                        {formats.map(format => (
                          <button
                            key={format}
                            className={`${styles.filterOption} ${
                              selectedFormat === format ? styles.selected : ''
                            }`}
                            onClick={() => setSelectedFormat(format)}
                          >
                            {format.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      className={styles.resetFilters}
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.searchResults}>
              <div className={styles.resultsHeader}>
                <h3 className={styles.resultsTitle}>
                  {filteredContent.length} {filteredContent.length === 1 ? 'result' : 'results'}
                  {searchQuery && ` for "${searchQuery}"`}
                </h3>
                <div className={styles.activeFilters}>
                  {selectedCategory !== 'All' && (
                    <span className={styles.filterTag}>
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('All')}>
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  )}
                  {selectedType !== 'All' && (
                    <span className={styles.filterTag}>
                      {selectedType}
                      <button onClick={() => setSelectedType('All')}>
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  )}
                  {selectedFormat !== 'All' && (
                    <span className={styles.filterTag}>
                      {selectedFormat.toUpperCase()}
                      <button onClick={() => setSelectedFormat('All')}>
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.contentGrid}>
                {filteredContent.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={styles.contentHeader}>
                      <div className={styles.contentType}>
                        <span className={`${styles.typeIndicator} ${styles[item.type]}`}>
                          {item.type}
                        </span>
                        <span className={styles.formatBadge}>
                          {item.format.toUpperCase()}
                        </span>
                      </div>
                      <button 
                        className={styles.favoriteButton}
                        onClick={() => toggleFavorite(item.id)}
                      >
                        {favorites.includes(item.id) ? (
                          <HeartIconSolid className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <h3 className={styles.contentTitle}>{item.title}</h3>
                    <p className={styles.contentDescription}>{item.description}</p>

                    <div className={styles.contentMeta}>
                      <div className={styles.metaStats}>
                        <span className={styles.downloads}>
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          {item.downloads}
                        </span>
                        <span className={styles.rating}>
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          {item.rating}
                        </span>
                      </div>
                      <span className={styles.lastUpdated}>
                        Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>

                    <div className={styles.contentTags}>
                      {item.tags.map(tag => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className={styles.downloadButton}>
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      Download {item.format.toUpperCase()}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <ChatSupport />
    </div>
  );
};

export default Dashboard;