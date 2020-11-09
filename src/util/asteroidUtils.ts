import { IAsteroid } from '../protocols/asteroidProtocols';

export const extractAsteroidDailyData = (asteroidData: any) => {
  const asteroidsArr: IAsteroid[] = [];

  const { near_earth_objects } = asteroidData;

  const asteroidsDataArr = Object.values(near_earth_objects)[0] as any;

  for (let i = 0; i < asteroidsDataArr.length; i += 1) {
    const {
      id,
      name,
      absolute_magnitude_h,
      nasa_jpl_url,
      estimated_diameter,
      close_approach_data,
      is_potentially_hazardous_asteroid,
    } = asteroidsDataArr[i];

    const {
      close_approach_date,
      close_approach_date_full,
      miss_distance,
      relative_velocity,
    } = close_approach_data[0] as any;

    const {
      meters: { estimated_diameter_max: max, estimated_diameter_min: min },
    } = estimated_diameter as any;

    const { kilometers_per_second } = relative_velocity as any;

    const missDistance = miss_distance.kilometers;

    const estimatedDiameter = {
      min,
      max,
    };

    asteroidsArr.push({
      id,
      name,
      absoluteMagnitude: absolute_magnitude_h,
      nasaUrl: nasa_jpl_url,
      estimatedDiameter,
      closeApproachDate: close_approach_date,
      closeApproachTime: close_approach_date_full,
      missDistance,
      relativeVelocity: kilometers_per_second,
      isPotentiallyHazardous: is_potentially_hazardous_asteroid,
    });
  }

  return asteroidsArr;
};
