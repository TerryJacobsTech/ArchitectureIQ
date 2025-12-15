/**
 * Dependency Injection Container
 * Manages dependencies and provides instances
 * 
 * @format
 */

import {IBuildingRepository} from '../../domain/interfaces/IBuildingRepository';
import {IImageConverter} from '../../domain/interfaces/IImageConverter';
import {OpenAIBuildingRepository} from '../repositories/OpenAIBuildingRepository';
import {ImageConverterService} from '../services/ImageConverterService';
import {AnalyzeBuildingUseCase} from '../../application/usecases/AnalyzeBuildingUseCase';
import {OPENAI_API_KEY} from '../../config/apiConfig';

class DependencyContainer {
  private buildingRepository: IBuildingRepository | null = null;
  private imageConverter: IImageConverter | null = null;
  private analyzeBuildingUseCase: AnalyzeBuildingUseCase | null = null;

  getBuildingRepository(): IBuildingRepository {
    if (!this.buildingRepository) {
      this.buildingRepository = new OpenAIBuildingRepository({
        apiKey: OPENAI_API_KEY,
      });
    }
    return this.buildingRepository;
  }

  getImageConverter(): IImageConverter {
    if (!this.imageConverter) {
      this.imageConverter = new ImageConverterService();
    }
    return this.imageConverter;
  }

  getAnalyzeBuildingUseCase(): AnalyzeBuildingUseCase {
    if (!this.analyzeBuildingUseCase) {
      this.analyzeBuildingUseCase = new AnalyzeBuildingUseCase(
        this.getBuildingRepository(),
        this.getImageConverter(),
      );
    }
    return this.analyzeBuildingUseCase;
  }

  // For testing: allow injection of dependencies
  setBuildingRepository(repository: IBuildingRepository): void {
    this.buildingRepository = repository;
  }

  setImageConverter(converter: IImageConverter): void {
    this.imageConverter = converter;
  }

  reset(): void {
    this.buildingRepository = null;
    this.imageConverter = null;
    this.analyzeBuildingUseCase = null;
  }
}

export const dependencyContainer = new DependencyContainer();

