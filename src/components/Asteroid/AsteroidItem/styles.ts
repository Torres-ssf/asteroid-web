import styled from 'styled-components';

export const Container = styled.span`
  color: #197bbd;
  flex: 1 1 calc(33% - 40px);
  margin: 12px 20px;

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
  color: #333;
`;

export const Paragraph = styled.p`
  color: #197bbd;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 2px;
`;
