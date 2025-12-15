/**
 * Analyze Building Use Case
 * Orchestrates the business logic for analyzing a building from an image
 * 
 * @format
 */

import {Building} from '../../domain/entities/Building';
import {IBuildingRepository} from '../../domain/interfaces/IBuildingRepository';
import {IImageConverter} from '../../domain/interfaces/IImageConverter';

export class AnalyzeBuildingUseCase {
  constructor(
    private readonly buildingRepository: IBuildingRepository,
    private readonly imageConverter: IImageConverter,
  ) {}

  /**
   * Executes the use case: converts image and analyzes building
   * @param imageUri - URI of the image to analyze
   * @returns Promise with Building entity
   */
  async execute(imageUri: string): Promise<Building> {
    try {
      // Convert image to base64
      const base64Image = await this.imageConverter.convertToBase64(imageUri);

      // Analyze building
      const building = await this.buildingRepository.analyzeBuilding(
        base64Image,
      );

      return building;
    } catch (error) {
      throw new Error(
        `Failed to analyze building: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}

