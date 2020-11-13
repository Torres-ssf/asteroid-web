import styled from 'styled-components';

export const Container = styled.span`
  color: #197bbd;
  display: flex;
  flex-direction: column;
  flex: 1 1 calc(33% - 40px);
  margin: 12px 20px;
  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 720px) {
    margin: 20px 26px;
    flex: 1 1 calc(50% - 52px);
  }

  @media (max-width: 500px) {
    text-align: center;
    margin: 12px 20px;
    flex: unset;
  }
`;

export const Heading = styled.p`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 8px;
  color: #333;
`;

export const Paragraph = styled.p`
  color: #197bbd;
  font-size: 1.2rem;
  font-weight: 500;
`;
