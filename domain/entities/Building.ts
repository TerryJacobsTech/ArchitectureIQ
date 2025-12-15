/**
 * Building Entity
 * Core business object representing building information
 * 
 * @format
 */

export class Building {
  constructor(
    public readonly name: string | null,
    public readonly architectureStyle: string | null,
    public readonly description: string,
  ) {}

  static create(
    name: string | null,
    architectureStyle: string | null,
    description: string,
  ): Building {
    return new Building(name, architectureStyle, description);
  }

  static empty(): Building {
    return new Building(null, null, 'No information available.');
  }

  hasName(): boolean {
    return this.name !== null && this.name.trim().length > 0;
  }

  hasArchitectureStyle(): boolean {
    return (
      this.architectureStyle !== null &&
      this.architectureStyle.trim().length > 0
    );
  }
}

