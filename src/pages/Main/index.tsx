import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DayPicker, { DateUtils } from 'react-day-picker';

import { differenceInDays, set, format, isBefore } from 'date-fns';

import ReactPaginate from 'react-paginate';

import { asteroidApiId, asteroiApiWeekly } from '../../services/api';

import Header from '../../components/Header';
import Asteroid from '../../components/Asteroid';

import { IAppAsteroid } from '../../protocols';

import { extractAsteroiBulkData, extractSingleAsteroidData } from '../../util';

import {
  Container,
  AsteroidsList,
  AsteroidFilterContainer,
  CalendarContainer,
  AsteroidInputContainer,
} from './styles';

import 'react-day-picker/lib/style.css';

const Main: React.FC = () => {
  const [asteroids, setAsteroids] = useState<IAppAsteroid[]>([]);
  const [currentAsteroids, setCurrentAsteroids] = useState<IAppAsteroid[]>([]);

  const [dateRange, setDateRange] = useState({
    from: set(new Date(), {
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    to: set(new Date(), {
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
  });

  const [searchInput, setSearchInput] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (searchInput !== '') {
        try {
          const res = await asteroidApiId.get(searchInput);

          const asteroidData = extractSingleAsteroidData(res.data);

          setAsteroids([{ ...asteroidData, asteroidListNumber: 1 }]);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const { from, to } = dateRange;

          const formattedFrom = format(from, 'yyyy-MM-dd');
          const formattedTo = format(to, 'yyyy-MM-dd');

          const res = await asteroiApiWeekly.get('', {
            params: {
              start_date: formattedFrom,
              end_date: formattedTo,
            },
          });

          const asteroidArr = extractAsteroiBulkData(res.data);

          setTotalPages(Math.ceil(asteroidArr.length / 10));

          setAsteroids(asteroidArr);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [searchInput, dateRange]);

  useEffect(() => {
    setCurrentAsteroids(
      asteroids.slice((currentPage - 1) * 10, currentPage * 10),
    );
  }, [asteroids, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(asteroids.length / 10));
  }, [asteroids]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    [],
  );

  const asteroidsList = useMemo(() => {
    return currentAsteroids.map(asteroid => {
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
  }, [currentAsteroids]);

  const handleDayClick = useCallback(
    day => {
      setSearchInput('');

      setCurrentPage(1);

      const { from, to } = DateUtils.addDayToRange(day, {
        from: dateRange.from,
        to: dateRange.to,
      });

      if (!from && !to) {
        return;
      }

      if (from && !to) {
        setDateRange({ from, to: from });
      } else if (differenceInDays(to, from) > 7) {
        if (isBefore(from, dateRange.from)) {
          setDateRange({ from, to: from });
        } else {
          setDateRange({ from: to, to });
        }
      } else {
        setDateRange({ from, to });
      }
    },
    [dateRange],
  );

  const handlePageChange = useCallback(({ selected: pageSelected }) => {
    setCurrentPage(pageSelected + 1);
  }, []);

  const modifies = useMemo(() => {
    return {
      start: dateRange.from,
      end: dateRange.to,
    };
  }, [dateRange]);

  return (
    <Container>
      <Header userName="Sergio" />
      <h2>Near Earth Objects</h2>

      <AsteroidFilterContainer>
        <CalendarContainer>
          <h3>Select a date range</h3>
          <DayPicker
            className="Selectable"
            numberOfMonths={1}
            selectedDays={[
              dateRange.from,
              { from: dateRange.from, to: dateRange.to },
            ]}
            modifiers={modifies}
            onDayClick={handleDayClick}
          />
        </CalendarContainer>
        <AsteroidInputContainer>
          <h3>... or search for an specific asteroid</h3>
          <input
            type="text"
            placeholder="asteroid id"
            value={searchInput}
            onChange={handleInputChange}
          />
        </AsteroidInputContainer>
      </AsteroidFilterContainer>

      <AsteroidsList>
        {asteroidsList}
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
      </AsteroidsList>
    </Container>
  );
};

export default Main;
