import { array, boolean, number, object, string } from 'yup';

export const badImportsValidationSchema = array().of(
  object().shape({
    name: string().required(),
    phoneNumber: string().required(),
    street: string().required(),
    houseNumber: string().required(),
    city: string().required(),
    country: string().required(),
    skipSMSNotifications: boolean(),
    recipientNotes: string(),
    postalCode: string(),
    completeAfter: number(),
    completeBefore: number(),
    quantity: number()
  })
);
