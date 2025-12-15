/**
 * Image Converter Service
 * Implementation of IImageConverter
 * 
 * @format
 */

import {IImageConverter} from '../../domain/interfaces/IImageConverter';

export class ImageConverterService implements IImageConverter {
  async convertToBase64(uri: string): Promise<string> {
    try {
      // Try using react-native-fs if available
      try {
        const RNFS = require('react-native-fs');
        const base64 = await RNFS.readFile(uri, 'base64');
        return base64;
      } catch (fsError) {
        // Fallback to fetch method for React Native
        return await this.convertUsingFetch(uri);
      }
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw new Error('Failed to convert image to base64');
    }
  }

  private async convertUsingFetch(uri: string): Promise<string> {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix if present
        const base64 = base64String.includes(',')
          ? base64String.split(',')[1]
          : base64String;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

