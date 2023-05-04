import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import AuthContainer from 'layouts/AuthContainer';

import Button from 'components/Button';
import InputControl from 'components/InputControl';

import { routes } from 'constants/routes';

import { signUpSchema } from './config/validationSchema';
import styles from './SignUp.module.scss';


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
          <InputControl control={control} label="Login" name="login" />
          <InputControl control={control} label="Password" name="password" type="password" />
          <InputControl
            control={control}
            label="passwordRepeat"
            name="passwordRepeat"
            type="password"
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
