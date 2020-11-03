import styled from 'styled-components';

export const Container = styled.div`
  height: 24px;
  width: 24px;
  margin-left: 12px;
  position: relative;

  svg {
    margin: 0;
  }

  span {
    width: 160px;
    background: #197bbd;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    bottom: calc(100% + 12px);
    left: calc(50% - 80px);
    color: #f4ede8;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    &::before {
      content: '';
      border-style: solid;
      border-color: #197bbd transparent;
      border-width: 6px 6px 0 6px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
