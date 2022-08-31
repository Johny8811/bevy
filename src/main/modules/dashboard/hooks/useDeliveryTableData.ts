import { useEffect, useState } from 'react';
import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useTasksQuery } from '../../../queryHooks/useTasksQuery';
import { useTasksTomorrowQuery } from '../../../queryHooks/useTasksTomorrowQuery';
import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { TaskData } from '../../../types/tasks';
import { useUser } from '../../../integrations/firebase/components/UserProvider';

export const useDeliveryTableData = (selectedDay: Date | null) => {
  const { user } = useUser();
  const { openSnackBar } = useSnackBar();
  const hasRole = useHasRole();

  const tasksQuery = useTasksQuery();
  const tasksTomorrowQuery = useTasksTomorrowQuery();

  const [userTasks, setUserTasks] = useState<
    | ({ id: string } & Pick<
        TaskData,
        'name' | 'phoneNumber' | 'street' | 'houseNumber' | 'city' | 'country' | 'quantity'
      >)[]
    | []
  >([]);

  const transformTasks = (tasks: OnfleetTask[]) => {
    return tasks.map((task) => ({
      id: task.id,
      name: task.recipients[0]?.name,
      phoneNumber: task.recipients[0]?.phone,
      street: task.destination.address.street,
      houseNumber: task.destination.address.number,
      city: task.destination.address.city,
      country: task.destination.address.country,
      quantity: task.quantity
    }));
  };

  const handleFetchTasks = async () => {
    try {
      if (hasRole('dispatcher')) {
        const tasks = await tasksTomorrowQuery();
        setUserTasks(transformTasks(tasks));
      }

      if (hasRole('root') && selectedDay) {
        const tasks = await tasksQuery(selectedDay);
        setUserTasks(transformTasks(tasks));
      }

      if (hasRole('user') && selectedDay) {
        const tasks = await tasksQuery(selectedDay, user?.uid);
        setUserTasks(transformTasks(tasks));
      }
    } catch (e) {
      // TODO: log error
      openSnackBar({
        text: `Something went wrong while getting data`,
        severity: 'error'
      });
    }
  };

  useEffect(() => {
    handleFetchTasks();
  }, [selectedDay]);

  return userTasks;
};
