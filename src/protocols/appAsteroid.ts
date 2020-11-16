export interface IAppAsteroid {
  id: string;
  name: string;
  absoluteMagnitude: number;
  nasaUrl: string;
  estimatedDiameter: IAsteroidEstimatedDiameter;
  closeApproachDate: string;
  closeApproachTime: string;
  missDistance: number;
  relativeVelocity: string;
  isPotentiallyHazardous: boolean;
  asteroidListNumber: number;
}

export interface IAsteroidEstimatedDiameter {
  min: number;
  max: number;
}
