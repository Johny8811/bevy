import { CreateTaskProps } from '@onfleet/node-onfleet/Resources/Tasks';
import { OnfleetMetadata } from '@onfleet/node-onfleet/metadata';
import { TaskData } from '../../types/tasks';

export const formTaskDataToOnFleetTasks = (
  {
    name,
    phoneNumber,
    recipientNotes,
    skipSMSNotifications,
    houseNumber,
    street,
    city,
    postalCode,
    country,
    completeAfter,
    completeBefore,
    quantity
  }: TaskData,
  metadata: OnfleetMetadata[]
): CreateTaskProps => {
  return {
    recipients: [
      {
        name,
        phone: phoneNumber,
        notes: recipientNotes,
        skipSMSNotifications
      }
    ],
    destination: {
      address: {
        number: houseNumber,
        street,
        city,
        postalCode,
        country
      }
    },
    completeAfter,
    completeBefore,
    quantity,
    metadata
  };
};
