import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthActions } from 'providers/auth';

import AuthContainer from 'layouts/AuthContainer';

import InputControl from 'components/InputControl';
import Button from 'components/Button';

import { routes } from 'constants/routes';

import styles from './Login.module.scss';
import { loginSchema } from './config/validationSchema';

interface ILoginValues {
  userName: string;
  password: string;
}

const defaultValues = {
  userName: '',
  password: '',
};

const Login = () => {
  const { signIn } = useAuthActions();

  const { control, handleSubmit } = useForm<ILoginValues>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: ILoginValues) => {
    try {
      await signIn(values);
      navigate(routes.CHAT);
    } catch (err) {
      //TODO: errors
      console.log(err);
    }
  };

  const footer = (
    <Link className={styles.link} to={routes.SIGN_UP}>
      Don&#39;t have an account? <span>Sign up</span>
    </Link>
  );

  return (
    <AuthContainer footer={footer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldsWrapper}>
          <InputControl control={control} label="Login" name="userName" />
          <InputControl control={control} label="Password" name="password" type="password" />
        </div>
        <div className={styles.buttonWrapper}>
          <Button>Login</Button>
        </div>
      </form>
    </AuthContainer>
  );
};

export default Login;
