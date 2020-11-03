import React, {
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';

import { IconBaseProps } from 'react-icons/lib/cjs';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({ icon: Icon, error, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete="off"
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
