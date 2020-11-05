export interface IAsteroid {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  nasa_jpl_url: string;
  estimated_diameter: IAsteroidEstimatedDiameter;
  close_approach_date: string;
  close_approach_date_full: string;
  miss_distance: IAsteroidDistance;
  relative_velocity: IAsteroidVelocity;
  is_potentially_hazardous_asteroid: boolean;
}

export interface IAsteroidEstimatedDiameter {
  feet: IEstimatedDiameter;
  kilometers: IEstimatedDiameter;
  meters: IEstimatedDiameter;
  miles: IEstimatedDiameter;
}

export interface IAsteroidDistance {
  astronomical: string;
  kilometers: string;
  lunar: string;
  miles: string;
}

export interface IAsteroidVelocity {
  kilometers_per_hour: string;
  kilometers_per_second: string;
  miles_per_hour: string;
}

export interface IEstimatedDiameter {
  estimated_diameter_max: number;
  estimated_diameter_min: number;
}
