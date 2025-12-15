/**
 * Building Repository Interface
 * Abstraction for building data access
 * 
 * @format
 */

import {Building} from '../entities/Building';

export interface IBuildingRepository {
  /**
   * Analyzes a building image and returns building information
   * @param imageBase64 - Base64 encoded image string
   * @returns Promise with Building entity
   */
  analyzeBuilding(imageBase64: string): Promise<Building>;
}

