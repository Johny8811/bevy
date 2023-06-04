export type TaskPreview = {
  id: string;
  name: string;
  phoneNumber: string;
  skipSMSNotifications: boolean | undefined;
  recipientNotes: string | undefined;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string | undefined;
  country: string;
  completeAfter: number | undefined;
  completeBefore: number | undefined;
  quantity: number | undefined;
  // FIXME: will see if "pickupTask" will be here
  pickupTask: boolean;
};
