export interface IAsteroid {
  id: string;
  name: string;
  absoluteMagnitude: number;
  nasaUrl: string;
  estimatedDiameter: IAsteroidEstimatedDiameter;
  closeApproachDate: string;
  closeApproachTime: string;
  missDistance: string;
  relativeVelocity: string;
  isPotentiallyHazardous: boolean;
}

export interface IAsteroidEstimatedDiameter {
  min: number;
  max: number;
}
