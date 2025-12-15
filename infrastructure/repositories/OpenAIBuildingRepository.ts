/**
 * OpenAI Building Repository
 * Implementation of IBuildingRepository using OpenAI API
 * 
 * @format
 */

import {Building} from '../../domain/entities/Building';
import {IBuildingRepository} from '../../domain/interfaces/IBuildingRepository';

interface OpenAIConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIBuildingRepository implements IBuildingRepository {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly maxTokens: number;
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(config: OpenAIConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gpt-4o';
    this.maxTokens = config.maxTokens || 500;
  }

  async analyzeBuilding(imageBase64: string): Promise<Building> {
    try {
      const response = await this.callOpenAIAPI(imageBase64);
      return this.parseResponse(response);
    } catch (error) {
      throw new Error(
        `Failed to analyze building: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private async callOpenAIAPI(imageBase64: string): Promise<OpenAIResponse> {
    const prompt = this.buildPrompt();

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        max_tokens: this.maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || `API error: ${response.status}`,
      );
    }

    return await response.json();
  }

  private buildPrompt(): string {
    return `Analyze this building image and provide the following information in JSON format:
{
  "buildingName": "The name of the building if visible or identifiable, otherwise null",
  "architectureStyle": "The architectural style (e.g., Gothic, Modern, Art Deco, etc.) or null if unclear",
  "description": "A brief description of the building and its architectural features"
}

Please be specific about the architectural style and provide the building name only if you can clearly identify it from signs, plaques, or well-known landmarks.`;
  }

  private parseResponse(response: OpenAIResponse): Building {
    const content = response.choices[0]?.message?.content || '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return Building.create(
          parsed.buildingName || null,
          parsed.architectureStyle || null,
          parsed.description || 'No description available.',
        );
      }
    } catch (parseError) {
      console.warn('Failed to parse JSON from response:', parseError);
    }

    // Fallback: return building with raw description
    return Building.create(null, null, content || 'Unable to analyze the building.');
  }
}

