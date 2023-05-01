import * as yup from 'yup';

import { validationMessages } from 'constants/validationMessages';

export const signUpSchema = yup.object({
  login: yup.string().required(validationMessages.REQUIRED),
  password: yup
    .string()
    .required(validationMessages.REQUIRED)
    .min(8, validationMessages.MIN_LENGTH(8)),
  passwordRepeat: yup
    .string()
    .required(validationMessages.REQUIRED)
    .min(8, validationMessages.MIN_LENGTH(8))
    .oneOf([yup.ref('password')], validationMessages.PASSWORDS_NOT_MATCH),
});
