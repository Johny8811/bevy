import { OurOnFleetTask } from '../../../types/tasks';

export const mapOnFleetTasksToDeliveryTable = (tasks: OurOnFleetTask[]) =>
  tasks.map((task) => ({
    id: task.id,
    name: task.recipients[0]?.name,
    phoneNumber: task.recipients[0]?.phone,
    recipientNotes: task.recipients[0]?.notes,
    street: task.destination.address.street,
    city: task.destination.address.city,
    postalCode: task.destination.address.postalCode,
    country: task.destination.address.country,
    completeAfter: task.completeAfter,
    completeBefore: task.completeBefore,
    quantity: task.quantity,
    estimatedArrivalTime: task.estimatedArrivalTime,
    slot: task.slot,
    deliveredAt: task.completionDetails.time
  }));
