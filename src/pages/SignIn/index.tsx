import React, { useCallback, useState } from 'react';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Content,
  FormContainer,
  LinkToSignUp,
  Background,
} from './styles';
import getValidationErrors, {
  ValidationErrors,
} from '../../util/getValidationErrors';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [inputErrors, setInputErrors] = useState<ValidationErrors>(
    {} as ValidationErrors,
  );

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password length is at least 6 chars'),
        });

        await schema.validate(
          { email, password },
          {
            abortEarly: false,
          },
        );

        setInputErrors({});

        await signIn({ email, password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          setInputErrors({ ...errors });

          return;
        }

        let description = '';

        if (err.response) {
          const { data: errorData } = err.response;
          if (errorData && errorData.message) {
            description = errorData.message;
          }
        }

        addToast({
          type: 'error',
          title: 'Authentication error',
          description:
            description === ''
              ? 'An error ocorrered, please check your network connection and try again'
              : description,
        });
      }
    },
    [signIn, addToast, email, password],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h1>Log in</h1>

            <Input
              name="email"
              type="email"
              placeholder="Email"
              icon={FiMail}
              value={email}
              error={inputErrors.email}
              onChange={e => setEmail(e.target.value)}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              icon={FiLock}
              value={password}
              error={inputErrors.password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button type="submit">Log in</Button>
          </form>
          <LinkToSignUp to="/signup">
            <FiLogIn />
            Create new account
          </LinkToSignUp>
        </FormContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
