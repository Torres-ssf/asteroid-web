import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    margin-top: 50px;
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

export const AsteroidInputContainer = styled.div`
  flex: 1;
  position: relative;
  text-align: center;

  input {
    border: 2px solid #fff;
    border-radius: 5px;
    padding: 10px 20px;
    position: absolute;
    transform: translate(50%, -50%);
    top: 50%;
    right: 50%;

    &:focus {
      border-color: #197bbd;
    }
  }
`;

export const AsteroidsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
