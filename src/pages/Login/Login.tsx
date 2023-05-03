import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import AuthContainer from 'layouts/AuthContainer';
import InputControl from 'components/InputControl';

import { loginSchema } from './config/validationSchema';
import styles from './Login.module.scss';

import { routes } from 'constants/routes';

interface ILoginValues {
  login: string;
  password: string;
}

const defaultValues = {
  login: '',
  password: '',
};

const Login = () => {
  const { control, handleSubmit } = useForm<ILoginValues>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = () => {
    console.log('submit');
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
          <InputControl control={control} label="Login" name="login" />
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
