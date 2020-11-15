import styled from 'styled-components';

import { FiSearch } from 'react-icons/fi';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    margin-top: 50px;
  }

  @media (max-width: 1200px) {
    h2 {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 700px) {
    h2 {
      font-size: 2rem;
    }
  }
`;

export const AsteroidFilterContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 70px auto;
  width: 100%;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 40px;
  }

  @media (max-width: 1100px) {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 700px) {
    margin: 30px auto;
    flex-direction: column;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 20px;
    }
  }
`;

export const CalendarContainer = styled.div`
  flex: 1;
  text-align: center;

  .Selectable
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .Selectable
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`;

export const SearchIcon = styled(FiSearch)``;

export const AsteroidInputContainer = styled.div`
  flex: 1;
  position: relative;
  text-align: center;

  div {
    display: flex;
    flex-direction: row;
    position: absolute;
    transform: translate(50%, -50%);
    top: 50%;
    right: 50%;
    justify-content: center;
    width: 100%;
    align-items: center;

    input {
      border: 2px solid #fff;
      border-radius: 5px;
      height: 48px;
      padding: 10px 20px;

      &:focus {
        border-color: #197bbd;
      }
    }

    button {
      background: #197bbd;
      color: #f4ede8;
      border: 1px solid #197bbd;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin-left: 12px;
      transition: 500ms;

      &:hover {
        background: #f4ede8;
        color: #197bbd;
      }
    }
  }

  @media (max-width: 700px) {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;

    div {
      margin: 40px 0;
      position: relative;
      transform: unset;
      top: unset;
      right: unset;
    }

    input {
      width: 220px;
    }
  }
`;

export const AsteroidsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1300px) {
    margin: 0 30px;
  }

  @media (max-width: 800px) {
    margin: 0 20px;
  }

  @media (max-width: 500px) {
    margin: 0 5px;
  }

  ul {
    display: flex;
    margin: 10px 0 0;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 600px) {
      font-size: 0.9rem;
    }

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;

      a {
        border: none;
        border-radius: 5px;
        color: #3899bf;
        cursor: pointer;
        margin: 6px;
        padding: 8px 12px;
      }
    }

    li.active a {
      color: white;
      background-color: #3899bf;
    }

    li.disabled {
      display: none;
    }
  }
`;

export const FeedbackMessage = styled.p`
  color: #c53030;
`;
