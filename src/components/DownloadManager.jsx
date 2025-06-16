import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { storageService } from '../services/storage';
import styles from './DownloadManager.module.css';

const DownloadManager = ({ file, onDownloadComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDownloadProgress(0);

      // Generate secure download URL
      const downloadUrl = await storageService.getSecureDownloadUrl(
        file.s3Key,
        file.name,
        3600 // URL expires in 1 hour
      );

      // Start download with progress tracking
      const response = await fetch(downloadUrl);
      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        loaded += value.length;
        const progress = Math.round((loaded / total) * 100);
        setDownloadProgress(progress);
      }

      // Combine chunks and create download
      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      onDownloadComplete?.();
      setDownloadProgress(100);
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.downloadManager}>
      <div className={styles.fileInfo}>
        <div className={styles.fileDetails}>
          <h3 className={styles.fileName}>{file.name}</h3>
          <p className={styles.fileSize}>{formatFileSize(file.size)}</p>
        </div>
        <div className={styles.securityInfo}>
          <ShieldCheckIcon className={styles.securityIcon} />
          <span>Secure Download</span>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.error}
        >
          {error}
        </motion.div>
      )}

      {downloadProgress > 0 && downloadProgress < 100 && (
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar}
            style={{ width: `${downloadProgress}%` }}
          />
          <span className={styles.progressText}>{downloadProgress}%</span>
        </div>
      )}

      <button
        className={styles.downloadButton}
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ClockIcon className={styles.buttonIcon} />
            Preparing Download...
          </>
        ) : (
          <>
            <ArrowDownTrayIcon className={styles.buttonIcon} />
            Download Securely
          </>
        )}
      </button>

      <p className={styles.expiryNote}>
        <ClockIcon className={styles.clockIcon} />
        Secure download link expires in 1 hour
      </p>
    </div>
  );
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default DownloadManager; 