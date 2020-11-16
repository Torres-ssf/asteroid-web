import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonAttributes> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Button;
