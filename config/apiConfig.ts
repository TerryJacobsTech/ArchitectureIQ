/**
 * API Configuration
 * 
 * IMPORTANT: For production, use environment variables or secure storage
 * Never commit API keys to version control
 * 
 * @format
 */

import {OPENAI_API_KEY as ENV_API_KEY} from '@env';

// Get API key from .env file
export const OPENAI_API_KEY = (ENV_API_KEY && typeof ENV_API_KEY === 'string' && ENV_API_KEY.trim()) || '';

