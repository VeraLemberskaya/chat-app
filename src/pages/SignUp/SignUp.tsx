import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthActions } from 'providers/auth';

import AuthContainer from 'layouts/AuthContainer';

import Button from 'components/Button';
import InputControl from 'components/InputControl';

import { routes } from 'constants/routes';

import { signUpSchema } from './config/validationSchema';
import styles from './SignUp.module.scss';

interface ISignUpValues {
  userName: string;
  password: string;
  confirmPassword: string;
}

const defaultValues = {
  userName: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const { signUp } = useAuthActions();

  const { control, handleSubmit } = useForm<ISignUpValues>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: ISignUpValues) => {
    try {
      await signUp(values);
      navigate(routes.SIGN_IN);
    } catch (err) {
      //TODO: errors
      console.log(err);
    }
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
          <InputControl control={control} label="Login" name="userName" />
          <InputControl control={control} label="Password" name="password" type="password" />
          <InputControl
            control={control}
            label="Confirm password"
            name="confirmPassword"
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
