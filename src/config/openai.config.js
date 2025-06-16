// OpenAI API Configuration
export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '', // Default to empty string if not set
  model: 'gpt-3.5-turbo', // Default model
  temperature: 0.7,
  maxTokens: 150
};

// Helper function to check if API key is configured
export const isApiKeyConfigured = () => {
  return Boolean(OPENAI_CONFIG.apiKey);
};

// Helper function to get API key status message
export const getApiKeyStatus = () => {
  if (!OPENAI_CONFIG.apiKey) {
    return 'OpenAI API key is missing. Please configure VITE_OPENAI_API_KEY in your .env file.';
  }
  return 'OpenAI API key is configured.';
};