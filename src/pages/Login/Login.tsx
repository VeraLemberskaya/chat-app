import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'components/Input';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import AuthContainer from 'layouts/AuthContainer';

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
          <Controller
            control={control}
            name="login"
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
              <Input
                error={error?.message}
                isError={invalid}
                label="Login"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
              <Input
                error={error?.message}
                isError={invalid}
                label="Password"
                type="password"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button>Login</Button>
        </div>
      </form>
    </AuthContainer>
  );
};

export default Login;
