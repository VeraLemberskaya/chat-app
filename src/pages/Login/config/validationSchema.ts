import * as yup from 'yup';

import { validationMessages } from 'constants/validationMessages';

export const loginSchema = yup.object({
  userName: yup.string().required(validationMessages.REQUIRED),
  password: yup
    .string()
    .required(validationMessages.REQUIRED)
    .min(8, validationMessages.MIN_LENGTH(8)),
});
