import styled from 'styled-components';

export const Container = styled.header`
  background: #28262e;
  width: 100%;
  padding: 32px 0;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    max-width: 1120px;
    margin: 0 auto;

    button {
      background: transparent;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media (max-width: 1200px) {
      span,
      button {
        margin: 0 30px;
      }
    }
  }
`;

export const UserContainer = styled.span`
  display: flex;
  flex-direction: column;

  a {
    color: #197bbd;
  }
`;
