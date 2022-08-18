import { array, boolean, number, object, string } from 'yup';

export const badImportsValidationSchema = array().of(
  object().shape({
    name: string().required(),
    phoneNumber: string().required(),
    skipSMSNotifications: boolean(),
    recipientNotes: string(),
    street: string().required(),
    number: string().required(),
    city: string().required(),
    postalCode: string(),
    country: string().required(),
    completeAfter: number(),
    completeBefore: number(),
    quantity: number()
  })
);
