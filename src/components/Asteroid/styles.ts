import styled from 'styled-components';

export const Container = styled.article`
  background: #f4ede8;
  border-radius: 4px;
  color: #312e38;
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  justify-content: center;
  position: relative;
  padding: 40px;
  margin: 5px 0;
  max-width: 1200px;

  @media (max-width: 700px) {
    padding: 30px;
  }

  @media (max-width: 550px) {
    padding: 20px;
  }

  @media (max-width: 500px) {
    margin: 2.5px 0;
  }
`;

export const ListNumber = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const BookmarkIconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  button {
    background: transparent;
    border: none;
  }
`;
