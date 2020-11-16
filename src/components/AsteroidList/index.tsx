import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ReactPaginate from 'react-paginate';

import { IAppAsteroid } from '../../protocols';

import Asteroid from '../Asteroid';

import { Container } from './styles';

interface IAsteroidListProps {
  asteroidList: IAppAsteroid[];
}

const AsteroidList: React.FC<IAsteroidListProps> = ({ asteroidList }) => {
  const [currentPageAsteroids, setCurrentPageAsteroids] = useState<
    IAppAsteroid[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPageAsteroids(
      asteroidList.slice((currentPage - 1) * 10, currentPage * 10),
    );
  }, [asteroidList, currentPage]);

  const handlePageChange = useCallback(({ selected: pageSelected }) => {
    setCurrentPage(pageSelected + 1);

    if (containerRef.current) {
      containerRef.current.scrollIntoView();
    }
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(asteroidList.length / 10);
  }, [asteroidList]);

  const asteroidListView = useMemo(() => {
    return currentPageAsteroids.map(asteroid => {
      return (
        <Asteroid
          id={asteroid.id}
          key={asteroid.id}
          asteroidListNumber={asteroid.asteroidListNumber}
          name={asteroid.name}
          absoluteMagnitude={asteroid.absoluteMagnitude}
          isPotentiallyHazardous={asteroid.isPotentiallyHazardous}
          closeApproachDate={asteroid.closeApproachDate}
          closeApproachTime={asteroid.closeApproachTime}
          missDistance={asteroid.missDistance}
          relativeVelocity={asteroid.relativeVelocity}
          estimatedDiameter={asteroid.estimatedDiameter}
          nasaUrl={asteroid.nasaUrl}
        />
      );
    });
  }, [currentPageAsteroids]);

  return (
    <Container ref={containerRef}>
      {asteroidListView}
      <ReactPaginate
        previousLabel="back"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={totalPages}
        forcePage={currentPage - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default AsteroidList;
