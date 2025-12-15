/**
 * Image Converter Interface
 * Abstraction for image conversion operations
 * 
 * @format
 */

export interface IImageConverter {
  /**
   * Converts image URI to base64 string
   * @param uri - Image URI (file:// or content://)
   * @returns Promise with base64 string
   */
  convertToBase64(uri: string): Promise<string>;
}

