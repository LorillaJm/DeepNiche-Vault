import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon,
  XMarkIcon,
  UserCircleIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { chatService } from '../services/chat';
import { isApiKeyConfigured, getApiKeyStatus } from '../config/openai.config';
import styles from './ChatSupport.module.css';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedReplies, setSuggestedReplies] = useState([]);
  const [error, setError] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const checkConfiguration = () => {
      const configured = isApiKeyConfigured();
      setIsConfigured(configured);
      if (configured) {
        setMessages([{
          role: 'assistant',
          content: "Hi! I'm here to help you with any questions about our templates, platform features, or technical support. How can I assist you today?"
        }]);
      } else {
        setError(getApiKeyStatus());
      }
    };
    
    checkConfiguration();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim() || !isConfigured) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      // Check if query needs human support
      const needsHuman = await chatService.needsHumanSupport(inputValue);
      
      if (needsHuman) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "This seems like something I should escalate to our support team. Would you like me to create a support ticket for you?",
          needsHuman: true
        }]);
        setSuggestedReplies(['Yes, create a ticket', "No, let's try something else", "I'll contact support later"]);
      } else {
        // Get AI response
        const response = await chatService.getResponse(messages);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        
        // Get suggested replies
        const suggestions = await chatService.getSuggestedReplies(inputValue);
        setSuggestedReplies(suggestions);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError("Sorry, I'm having trouble connecting. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedReply = (reply) => {
    setInputValue(reply);
    setSuggestedReplies([]);
    inputRef.current?.focus();
  };

  const createSupportTicket = () => {
    // Implementation for creating support ticket
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "I've created a support ticket for you. Our team will contact you via email shortly. Is there anything else I can help you with?"
    }]);
    setSuggestedReplies(['Yes, I have another question', 'No, thank you']);
  };

  return (
    <>
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(true)}
        aria-label="Open support chat"
      >
        <ChatBubbleLeftRightIcon className={styles.chatIcon} />
        <span>Support</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className={styles.chatHeader}>
              <h3>Support Chat</h3>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
                aria-label="Close chat"
              >
                <XMarkIcon className={styles.closeIcon} />
              </button>
            </div>

            <div className={styles.chatMessages}>
              {!isConfigured && (
                <motion.div
                  className={styles.configError}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <LockClosedIcon className={styles.errorIcon} />
                  <div>
                    <h4>Chat Support Unavailable</h4>
                    <p>{error}</p>
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`${styles.message} ${
                    message.role === 'user' ? styles.userMessage : styles.assistantMessage
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.role === 'user' ? (
                    <UserCircleIcon className={styles.messageIcon} />
                  ) : (
                    <ChatBubbleLeftRightIcon className={styles.messageIcon} />
                  )}
                  <div className={styles.messageContent}>
                    <p>{message.content}</p>
                    {message.needsHuman && (
                      <button
                        className={styles.createTicketButton}
                        onClick={createSupportTicket}
                      >
                        Create Support Ticket
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className={`${styles.message} ${styles.assistantMessage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ArrowPathIcon className={`${styles.messageIcon} ${styles.spinning}`} />
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ExclamationCircleIcon className={styles.errorIcon} />
                  <p>{error}</p>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {suggestedReplies.length > 0 && isConfigured && (
              <div className={styles.suggestedReplies}>
                {suggestedReplies.map((reply, index) => (
                  <button
                    key={index}
                    className={styles.suggestionButton}
                    onClick={() => handleSuggestedReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.chatInput}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isConfigured ? "Type your message..." : "Chat support is currently unavailable"}
                disabled={!isConfigured || isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || !isConfigured || isTyping}
                className={styles.sendButton}
              >
                <PaperAirplaneIcon className={styles.sendIcon} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatSupport; 