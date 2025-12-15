# OpenAI API Setup

This app uses OpenAI's Vision API (GPT-4o) to analyze building photos and identify:
- Building names (if visible/identifiable)
- Architectural styles
- Building descriptions

## Setup Instructions

1. **Get an OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Sign up or log in to your OpenAI account
   - Create a new API key

2. **Configure the API Key:**
   - Open `config/apiConfig.ts`
   - Replace `YOUR_OPENAI_API_KEY_HERE` with your actual API key:
   ```typescript
   export const OPENAI_API_KEY = 'sk-your-actual-api-key-here';
   ```

3. **Security Note:**
   - ⚠️ **Never commit your API key to version control**
   - For production, use environment variables or secure storage
   - Consider using `react-native-keychain` or similar for secure storage
   - Add `config/apiConfig.ts` to `.gitignore` if storing keys there

## Usage

1. Take a photo using the camera button
2. The app will automatically analyze the building
3. Results will show:
   - Building name (if identifiable)
   - Architecture style
   - Description

## API Costs

- GPT-4o Vision API charges per image analyzed
- Check OpenAI pricing: https://openai.com/pricing
- Monitor your usage at: https://platform.openai.com/usage

## Troubleshooting

- **"Invalid API Key" error**: Make sure you've set the API key correctly in `config/apiConfig.ts`
- **Network errors**: Check your internet connection
- **Rate limits**: You may hit rate limits on free tier accounts

