import React from 'react';

import { Container, Heading } from './styles';

interface AsteroidItemProps {
  heading: string;
}

const AsteroidItem: React.FC<AsteroidItemProps> = ({ heading, children }) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      {children}
    </Container>
  );
};

export default AsteroidItem;
