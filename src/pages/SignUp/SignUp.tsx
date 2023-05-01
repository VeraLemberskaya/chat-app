import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import AuthContainer from 'layouts/AuthContainer';
import Input from 'components/Input';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

import { signUpSchema } from './config/validationSchema';
import styles from './SignUp.module.scss';

import { routes } from 'constants/routes';

interface ISignUpValues {
  login: string;
  password: string;
  passwordRepeat: string;
}

const defaultValues = {
  login: '',
  password: '',
  passwordRepeat: '',
};

const SignUp = () => {
  const { control, handleSubmit } = useForm<ISignUpValues>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = () => {
    console.log('submit');
  };

  const footer = (
    <Link className={styles.link} to={routes.SIGN_IN}>
      Already have an account? <span>Sign In</span>
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
          <Controller
            control={control}
            name="passwordRepeat"
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
              <Input
                error={error?.message}
                isError={invalid}
                label="passwordRepeat"
                type="password"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button>Sign Up</Button>
        </div>
      </form>
    </AuthContainer>
  );
};

export default SignUp;
