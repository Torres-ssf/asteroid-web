import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';

import DayPicker, { DateUtils } from 'react-day-picker';

import { differenceInDays, set, format, isBefore } from 'date-fns';

import ReactPaginate from 'react-paginate';

import { FiSearch } from 'react-icons/fi';

import { asteroidApiId, asteroiApiWeekly } from '../../services/api';

import Header from '../../components/Header';
import Asteroid from '../../components/Asteroid';
import LoadingContainer from '../../components/LoadingContainer';

import { IAppAsteroid } from '../../protocols';

import { extractAsteroiBulkData, extractSingleAsteroidData } from '../../util';

import {
  Container,
  AsteroidsList,
  AsteroidFilterContainer,
  CalendarContainer,
  AsteroidInputContainer,
  FeedbackMessage,
} from './styles';

import 'react-day-picker/lib/style.css';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

const Main: React.FC = () => {
  const [asteroids, setAsteroids] = useState<IAppAsteroid[]>([]);

  const [currentAsteroids, setCurrentAsteroids] = useState<IAppAsteroid[]>([]);

  const [loading, setLoading] = useState(false);

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

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setCurrentPage(1);

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

        console.log(res.data);

        setAsteroids(asteroidArr);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchData();
  }, [dateRange]);

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

  const handleSearchButton = useCallback(async () => {
    if (searchInput !== '') {
      setLoading(true);
      setCurrentPage(1);

      try {
        const res = await asteroidApiId.get(searchInput);

        const asteroidData = extractSingleAsteroidData(res.data);

        setAsteroids([{ ...asteroidData, asteroidListNumber: 1 }]);
      } catch (err) {
        console.log(err.response);
        setAsteroids([]);
      }

      setLoading(false);
    }
  }, [setLoading, searchInput]);

  const handlePageChange = useCallback(({ selected: pageSelected }) => {
    setCurrentPage(pageSelected + 1);

    if (filterContainerRef.current) {
      filterContainerRef.current.scrollIntoView();
    }
  }, []);

  const modifies = useMemo(() => {
    return {
      start: dateRange.from,
      end: dateRange.to,
    };
  }, [dateRange]);

  const asteroidList = useMemo(() => {
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

  const asteroidView = useMemo(() => {
    if (loading) {
      return <LoadingContainer />;
    }

    if (asteroids.length === 0) {
      return (
        <p style={{ fontSize: 20, color: '#c53030' }}>
          No objects found for the given date/id
        </p>
      );
    }

    return (
      <>
        {asteroidList}
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
      </>
    );
  }, [
    asteroids,
    asteroidList,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
  ]);

  return (
    <Container>
      <Header userName="Sergio" />
      <h2>Near Earth Objects</h2>

      <AsteroidFilterContainer ref={filterContainerRef}>
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
          <div>
            <input
              type="text"
              placeholder="asteroid id"
              value={searchInput}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleSearchButton}>
              <FiSearch size={20} />
            </button>
          </div>
        </AsteroidInputContainer>
      </AsteroidFilterContainer>

      <AsteroidsList>{asteroidView}</AsteroidsList>
    </Container>
  );
};

export default Main;
