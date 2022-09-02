import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { formatToDateAndTime } from '../../../utils/formatDates';

export const mapOnFleetTasksToDeliveryTable = (tasks: OnfleetTask[]) =>
  tasks.map((task) => ({
    id: task.id,
    name: task.recipients[0]?.name,
    phoneNumber: task.recipients[0]?.phone,
    street: task.destination.address.street,
    houseNumber: task.destination.address.number,
    city: task.destination.address.city,
    country: task.destination.address.country,
    completeAfter: formatToDateAndTime(task.completeAfter),
    completeBefore: formatToDateAndTime(task.completeBefore),
    quantity: task.quantity
  }));
