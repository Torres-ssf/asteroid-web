import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import { appApi } from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { ValidationErrors, getValidationErrors } from '../../util';

import {
  Container,
  Content,
  FormContainer,
  LinkToSignUp,
  Background,
} from './styles';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [inputErrors, setInputErrors] = useState<ValidationErrors>(
    {} as ValidationErrors,
  );
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Must be a valid email')
            .required('Email is required'),
          password: Yup.string().min(
            6,
            'Password length is at least 6 characters',
          ),
          passwordConfirmation: Yup.string()
            .oneOf(
              [Yup.ref('password'), undefined],
              'Password Confirmation must match Password',
            )
            .required('Password Confirmation is required'),
        });

        await schema.validate(
          { name, email, password, passwordConfirmation },
          {
            abortEarly: false,
          },
        );

        setInputErrors({});

        await appApi.post('/users', {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Account created successfully',
          description: 'You can already sign in ',
        });
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
          title: 'Error while creating new account',
          description:
            description === ''
              ? 'An error ocorrered, please check your network connection and try again'
              : description,
        });
      }
    },
    [addToast, history, name, email, password, passwordConfirmation],
  );

  return (
    <Container>
      <Background />
      <Content>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h1>New user</h1>

            <Input
              name="name"
              type="text"
              placeholder="Name"
              icon={FiUser}
              value={name}
              error={inputErrors.name}
              onChange={e => setName(e.target.value)}
            />

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

            <Input
              name="password_confirmation"
              type="password"
              placeholder="Password Confirmation"
              icon={FiLock}
              value={passwordConfirmation}
              error={inputErrors.passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
            />

            <Button type="submit">Create account</Button>
          </form>

          <LinkToSignUp to="/">
            <FiArrowLeft />
            Back to sign in page
          </LinkToSignUp>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
