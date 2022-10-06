import { CreateTaskProps } from '@onfleet/node-onfleet/Resources/Tasks';
import { OnfleetMetadata } from '@onfleet/node-onfleet/metadata';
import { TaskData } from '../../types/tasks';

export const mapTaskDataToCreateTasksProps = (
  tasks: TaskData[],
  metadata: OnfleetMetadata[]
): CreateTaskProps[] => {
  return tasks.map((task) => {
    const {
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
    } = task;
    const address = {
      number: houseNumber,
      street,
      city,
      postalCode,
      country
    };
    // we pass address also to task notes, onFleet sometimes incorrectly recognise address
    const taskNotes = `Destination:
      ${houseNumber} ${street}
      ${city} ${country} ${postalCode}
    `;

    return {
      recipients: [
        {
          name,
          phone: phoneNumber,
          notes: recipientNotes,
          skipSMSNotifications
        }
      ],
      destination: { address },
      notes: taskNotes,
      completeAfter,
      completeBefore,
      quantity,
      metadata
    };
  });
};
