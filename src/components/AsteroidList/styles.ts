import styled from 'styled-components';

export const Container = styled.div`
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
