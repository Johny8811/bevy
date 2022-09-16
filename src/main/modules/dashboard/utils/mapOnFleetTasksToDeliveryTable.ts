import { OurOnFleetTask } from '../../../types/tasks';
import { OnFleetWorkers } from '../../../types/workers';

export const mapOnFleetTasksToDeliveryTable = (tasks: OurOnFleetTask[], workers: OnFleetWorkers) =>
  tasks.map((task) => ({
    id: task.id,
    name: task.recipients[0]?.name,
    phoneNumber: task.recipients[0]?.phone,
    recipientNotes: task.recipients[0]?.notes,
    street: task.destination.address.street,
    city: task.destination.address.city,
    postalCode: task.destination.address.postalCode,
    country: task.destination.address.country,
    // TODO: optimise
    workerName: workers.find((w) => w.id === task.worker)?.name,
    workerPhone: workers.find((w) => w.id === task.worker)?.phone,
    estimatedArrivalTime: task.estimatedArrivalTime,
    order: task.order,
    completeAfter: task.completeAfter,
    completeBefore: task.completeBefore,
    quantity: task.quantity,
    slot: task.slot,
    deliveredAt: task.completionDetails.time
  }));
