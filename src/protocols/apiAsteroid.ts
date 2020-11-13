export interface IAPIData {
  near_earth_objects: INearEarthObjects;
}

export interface INearEarthObjects {
  [key: string]: IAPIAsteroid[];
}

export interface IAPIAsteroid {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  nasa_jpl_url: string;
  estimated_diameter: IEstimatedDiameter;
  close_approach_data: ICloseApproachData[];
  is_potentially_hazardous_asteroid: boolean;
}

export interface ICloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  miss_distance: IMissDistance;
  relative_velocity: IRelativeVelocity;
}

export interface IMissDistance {
  astronomical: string;
  lunar: string;
  kilometers: string;
  miles: string;
}

export interface IRelativeVelocity {
  kilometers_per_second: string;
  kilometers_per_hour: string;
  miles_per_hour: string;
}

export interface IEstimatedDiameterRange {
  estimated_diameter_max: number;
  estimated_diameter_min: number;
}

export interface IEstimatedDiameter {
  kilometers: IEstimatedDiameterRange;
  meters: IEstimatedDiameterRange;
  miles: IEstimatedDiameterRange;
  feet: IEstimatedDiameterRange;
}
