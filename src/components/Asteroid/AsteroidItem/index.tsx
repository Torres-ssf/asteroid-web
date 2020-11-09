import React from 'react';

import { Container, Heading, Paragraph } from './styles';

interface AsteroidItemProps {
  heading: string;
  paragraph: string;
}

const AsteroidItem: React.FC<AsteroidItemProps> = ({ heading, paragraph }) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <Paragraph>{paragraph}</Paragraph>
    </Container>
  );
};

export default AsteroidItem;
