import { useEffect, useState } from 'react';
import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useTasksQuery } from '../../../queryHooks/useTasksQuery';
import { useTasksTomorrowQuery } from '../../../queryHooks/useTasksTomorrowQuery';
import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { TaskData } from '../../../types/tasks';
import { useUser } from '../../../integrations/firebase/components/UserProvider';
import { mapOnFleetTasksToDeliveryTable } from '../utils/mapOnFleetTasksToDeliveryTable';

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

  const handleMapAndSetTasks = (tasks: OnfleetTask[]) =>
    setUserTasks(mapOnFleetTasksToDeliveryTable(tasks));

  const handleFetchTasks = async () => {
    try {
      if (hasRole('dispatcher')) {
        const tasks = await tasksTomorrowQuery();
        handleMapAndSetTasks(tasks);
      }

      if (hasRole('root') && selectedDay) {
        const tasks = await tasksQuery(selectedDay);
        handleMapAndSetTasks(tasks);
      }

      if (hasRole('user') && selectedDay) {
        const tasks = await tasksQuery(selectedDay, user?.uid);
        handleMapAndSetTasks(tasks);
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
