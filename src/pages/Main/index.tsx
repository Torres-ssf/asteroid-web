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

  const [dateFrom, setDateFrom] = useState<Date>(
    set(new Date(), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }),
  );
  const [dateTo, setDateTo] = useState<Date>(
    set(new Date(), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }),
  );
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
      } else if (dateFrom && dateTo) {
        try {
          const strFrom = format(dateFrom, 'yyyy-MM-dd');
          const strTo = format(dateTo, 'yyyy-MM-dd');

          const res = await asteroiApiWeekly.get('', {
            params: {
              start_date: strFrom,
              end_date: strTo,
            },
          });

          const asteroidArr = extractAsteroiBulkData(res.data);

          setAsteroids(asteroidArr);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [searchInput, dateFrom, dateTo]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    [],
  );

  const asteroidsList = useMemo(() => {
    return asteroids
      .sort((a, b) => a.missDistance - b.missDistance)
      .map((asteroid, index) => {
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
        from: dateFrom,
        to: dateTo,
      });

      const diffInDays = differenceInDays(to, from);

      if (from && !to) {
        setDateFrom(from);
        setDateTo(from);
      } else if (diffInDays > 7) {
        if (isBefore(from, dateFrom)) {
          setDateFrom(from);
          setDateTo(from);
        } else {
          setDateFrom(to);
          setDateTo(to);
        }
      } else {
        setDateFrom(from);
        setDateTo(to);
      }
    },
    [dateFrom, dateTo],
  );

  const modifies = useMemo(() => {
    return {
      start: dateFrom,
      end: dateTo,
    };
  }, [dateFrom, dateTo]);

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
            selectedDays={[dateFrom, { from: dateFrom, to: dateTo }]}
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
