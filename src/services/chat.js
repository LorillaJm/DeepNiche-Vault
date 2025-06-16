import { OpenAI } from 'openai';
import { OPENAI_CONFIG, isApiKeyConfigured, getApiKeyStatus } from '../config/openai.config';

class ChatService {
  constructor() {
    if (!isApiKeyConfigured()) {
      console.error(getApiKeyStatus());
      throw new Error('OpenAI API key is required. Check the console for more information.');
    }

    this.openai = new OpenAI({
      apiKey: OPENAI_CONFIG.apiKey,
      dangerouslyAllowBrowser: true // Note: In production, API calls should be made through a backend
    });
    
    // Default system message to define chatbot behavior
    this.systemMessage = {
      role: "system",
      content: `You are a helpful support assistant for DeepNiche Vault, a platform for professional templates and resources. 
      You can help users with:
      - Finding and using templates
      - Account and subscription issues
      - Technical support
      - Best practices for using our tools
      - Navigating the platform
      
      Always be professional, concise, and solution-oriented. If you can't help with something, direct users to human support.
      Current features include: template downloads, content library, scheduled releases, and favorites system.`
    };
  }

  /**
   * Get response from the AI assistant
   * @param {Array} messages - Chat history
   * @returns {Promise<string>} AI response
   */
  async getResponse(messages) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: OPENAI_CONFIG.model,
        messages: [this.systemMessage, ...messages],
        temperature: OPENAI_CONFIG.temperature,
        max_tokens: OPENAI_CONFIG.maxTokens,
        presence_penalty: 0.6,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error getting chat response:', error);
      throw new Error(error.message || 'Failed to get response from assistant');
    }
  }

  /**
   * Generate quick replies based on user query
   * @param {string} query - User's message
   * @returns {Promise<Array>} Array of suggested replies
   */
  async getSuggestedReplies(query) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: OPENAI_CONFIG.model,
        messages: [
          this.systemMessage,
          {
            role: "user",
            content: query
          },
          {
            role: "system",
            content: "Generate 3 short, relevant follow-up questions the user might ask next. Return them as a JSON array."
          }
        ],
        temperature: OPENAI_CONFIG.temperature,
        max_tokens: 100,
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return [];
    }
  }

  /**
   * Check if query needs human support
   * @param {string} query - User's message
   * @returns {Promise<boolean>}
   */
  async needsHumanSupport(query) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: OPENAI_CONFIG.model,
        messages: [
          {
            role: "system",
            content: "Analyze if this query requires human support. Return 'true' or 'false'. Consider things like refunds, complex technical issues, or account-specific problems as needing human support."
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0,
        max_tokens: 5,
      });

      return completion.choices[0].message.content.toLowerCase() === 'true';
    } catch (error) {
      console.error('Error checking human support:', error);
      return true;
    }
  }
}

// Create and export a single instance
export const chatService = new ChatService(); 