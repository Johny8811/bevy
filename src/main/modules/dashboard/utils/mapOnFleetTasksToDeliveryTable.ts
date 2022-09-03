import { formatToDateAndTime } from '../../../utils/formatDates';
import { OurOnFleetTask } from '../../../types/tasks';

export const mapOnFleetTasksToDeliveryTable = (tasks: OurOnFleetTask[]) =>
  tasks.map((task) => ({
    id: task.id,
    name: task.recipients[0]?.name,
    phoneNumber: task.recipients[0]?.phone,
    street: task.destination.address.street,
    houseNumber: task.destination.address.number,
    city: task.destination.address.city,
    country: task.destination.address.country,
    estimatedCompletionTime:
      task.estimatedCompletionTime && formatToDateAndTime(task.estimatedCompletionTime),
    quantity: task.quantity
  }));
