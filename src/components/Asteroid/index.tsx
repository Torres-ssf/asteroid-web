import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';

import { BsBookmarkDash, BsBookmarkCheck } from 'react-icons/bs';
import AsteroidItem from './AsteroidItem';
import { IAppAsteroid } from '../../protocols';

import { Container, ListNumber, BookmarkIconContainer } from './styles';

const Asteroid: React.FC<IAppAsteroid> = ({
  id,
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
  const [bookmarked, setBookmarked] = useState(true);

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
    return missDistance.toLocaleString().concat(' kilometers');
  }, [missDistance]);

  const asteroidSpeed = useMemo(() => {
    return parseFloat(relativeVelocity).toFixed(2).concat(' km/s');
  }, [relativeVelocity]);

  const diameter = useMemo(() => {
    const formatedMin = estimatedDiameter.min.toLocaleString();
    const formatedMax = estimatedDiameter.max.toLocaleString();

    return `${formatedMin} ~ ${formatedMax} meters`;
  }, [estimatedDiameter]);

  const link = useMemo(() => {
    return (
      <a href={nasaUrl} target="_blank" rel="noopener noreferrer">
        Link
      </a>
    );
  }, [nasaUrl]);

  return (
    <Container>
      <ListNumber>{listNumber}</ListNumber>

      <AsteroidItem heading="Asteroid name">{name}</AsteroidItem>

      <AsteroidItem heading="Is potentially hazardous">
        {isHazardous}
      </AsteroidItem>

      <AsteroidItem heading="Approach date">{aproachDate}</AsteroidItem>

      <AsteroidItem heading="Approach time">{time}</AsteroidItem>

      <AsteroidItem heading="Distance from Earth">
        {proximityDistance}
      </AsteroidItem>

      <AsteroidItem heading="Estimated Diameter">{diameter}</AsteroidItem>

      <AsteroidItem heading="Approximate speed">{asteroidSpeed}</AsteroidItem>

      <AsteroidItem heading="Asteroid Id">{id}</AsteroidItem>

      <AsteroidItem heading="Nasa page link">{link}</AsteroidItem>

      <BookmarkIconContainer>
        <button type="button" title="Bookmark this asteroid">
          <BsBookmarkDash size={24} color="#CAC6C7" />
        </button>
      </BookmarkIconContainer>
    </Container>
  );
};

export default Asteroid;
