import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DayPicker, { DateUtils } from 'react-day-picker';

import { differenceInDays, set, format, isBefore } from 'date-fns';

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

  useEffect(() => {
    const fetchData = async () => {
      if (searchInput !== '') {
        try {
          const res = await asteroidApiId.get(searchInput);

          const asteroidData = extractSingleAsteroidData(res.data);

          setAsteroids([asteroidData]);
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

          asteroidArr.sort((a, b) => a.missDistance - b.missDistance);

          setAsteroids(asteroidArr);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [searchInput, dateRange]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    [],
  );

  const asteroidsList = useMemo(() => {
    return asteroids.map((asteroid, index) => {
      return (
        <Asteroid
          id={asteroid.id}
          key={asteroid.id}
          name={asteroid.name}
          asteroidListNumber={index}
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
  }, [asteroids]);

  const handleDayClick = useCallback(
    day => {
      setSearchInput('');

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

      <AsteroidsList>{asteroidsList}</AsteroidsList>
    </Container>
  );
};

export default Main;
