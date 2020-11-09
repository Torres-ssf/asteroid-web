import React, { useMemo } from 'react';
import { format } from 'date-fns';

import AsteroidItem from './AsteroidItem';
import { IAsteroid } from '../../protocols/asteroidProtocols';

import { Container, ListNumber } from './styles';

interface AsteroidProps extends IAsteroid {
  asteroidListNumber: number;
}

const Asteroid: React.FC<AsteroidProps> = ({
  name,
  asteroidListNumber,
  isPotentiallyHazardous,
  closeApproachDate,
  closeApproachTime,
  missDistance,
  relativeVelocity,
  estimatedDiameter,
  nasaUrl,
}) => {
  const listNumber = useMemo(() => {
    return `${asteroidListNumber + 1}.`;
  }, [asteroidListNumber]);

  const aproachDate = useMemo(() => {
    const formatedDate = format(
      new Date(closeApproachDate.concat('T03:00')),
      'd MMM yyyy',
    );
    return formatedDate;
  }, [closeApproachDate]);

  const isHazardous = useMemo(() => {
    return isPotentiallyHazardous ? 'Yes' : 'No';
  }, [isPotentiallyHazardous]);

  const time = useMemo(() => {
    return closeApproachTime ? closeApproachTime.split(' ')[1] : 'Unknown';
  }, [closeApproachTime]);

  const proximityDistance = useMemo(() => {
    return parseFloat(missDistance).toLocaleString().concat(' kilometers');
  }, [missDistance]);

  const asteroidSpeed = useMemo(() => {
    return parseFloat(relativeVelocity).toFixed(2).concat(' km/s');
  }, [relativeVelocity]);

  const diameter = useMemo(() => {
    const formatedMin = estimatedDiameter.min.toLocaleString();
    const formatedMax = estimatedDiameter.max.toLocaleString();

    return `${formatedMin} ~ ${formatedMax} meters`;
  }, [estimatedDiameter]);

  return (
    <Container target="_blank" rel="noopener noreferrer" href={nasaUrl}>
      <ListNumber>{listNumber}</ListNumber>
      <AsteroidItem heading="Asteroid name" paragraph={name} />

      <AsteroidItem
        heading="Is potentially hazardous"
        paragraph={isHazardous}
      />
      <AsteroidItem heading="Approach date" paragraph={aproachDate} />

      <AsteroidItem heading="Approach time" paragraph={time} />

      <AsteroidItem
        heading="Distance from Earth"
        paragraph={proximityDistance}
      />

      <AsteroidItem heading="Estimated Diameter" paragraph={diameter} />

      <AsteroidItem heading="Approximate speed" paragraph={asteroidSpeed} />
    </Container>
  );
};

export default Asteroid;
