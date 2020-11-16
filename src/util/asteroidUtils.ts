import { IAppAsteroid, IAPIAsteroid, IAPIData } from '../protocols';

export const extractAsteroiBulkData = (
  asteroidData: IAPIData,
): IAppAsteroid[] => {
  const asteroidsArr: Omit<IAppAsteroid, 'asteroidListNumber'>[] = [];

  const { near_earth_objects } = asteroidData;

  const asteroidMultiDaysData = Object.values(near_earth_objects);

  for (let i = 0; i < asteroidMultiDaysData.length; i += 1) {
    const asteroidDailyData: IAPIAsteroid[] = asteroidMultiDaysData[i];

    for (let j = 0; j < asteroidDailyData.length; j += 1) {
      const singleAsteroidData = extractSingleAsteroidData(
        asteroidDailyData[j],
      );

      asteroidsArr.push(singleAsteroidData);
    }
  }

  return asteroidsArr
    .sort((a, b) => a.missDistance - b.missDistance)
    .map((asteroid, index) => ({ ...asteroid, asteroidListNumber: index }));
};

export const extractSingleAsteroidData = (
  singleAsteroidData: IAPIAsteroid,
): Omit<IAppAsteroid, 'asteroidListNumber'> => {
  const {
    id,
    name,
    absolute_magnitude_h,
    nasa_jpl_url,
    estimated_diameter,
    close_approach_data,
    is_potentially_hazardous_asteroid,
  } = singleAsteroidData;

  const {
    close_approach_date,
    close_approach_date_full,
    miss_distance,
    relative_velocity,
  } = close_approach_data[0];

  const {
    meters: { estimated_diameter_max: max, estimated_diameter_min: min },
  } = estimated_diameter;

  const { kilometers_per_second } = relative_velocity;

  const missDistance = parseFloat(miss_distance.kilometers);

  const estimatedDiameter = {
    min,
    max,
  };

  return {
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
  };
};
