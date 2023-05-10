import * as yup from 'yup';

import { validationMessages } from 'constants/validationMessages';

//TODO: password validation
export const signUpSchema = yup.object({
  userName: yup.string().required(validationMessages.REQUIRED),
  password: yup
    .string()
    .required(validationMessages.REQUIRED)
    .min(8, validationMessages.MIN_LENGTH(8)),
  confirmPassword: yup
    .string()
    .required(validationMessages.REQUIRED)
    .min(8, validationMessages.MIN_LENGTH(8))
    .oneOf([yup.ref('password')], validationMessages.PASSWORDS_NOT_MATCH),
});
