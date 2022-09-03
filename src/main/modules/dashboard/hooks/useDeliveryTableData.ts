import { useEffect, useState } from 'react';

import { useTasksQuery } from '../../../queryHooks/useTasksQuery';
import { useTasksTomorrowQuery } from '../../../queryHooks/useTasksTomorrowQuery';
import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { TaskData, OurOnFleetTask } from '../../../types/tasks';
import { useUser } from '../../../integrations/firebase/components/UserProvider';
import { mapOnFleetTasksToDeliveryTable } from '../utils/mapOnFleetTasksToDeliveryTable';

export const useDeliveryTableData = (selectedDay: Date | null) => {
  const { user } = useUser();
  const { openSnackBar } = useSnackBar();
  const hasRole = useHasRole();

  const tasksQuery = useTasksQuery();
  const tasksTomorrowQuery = useTasksTomorrowQuery();

  const [tasks, setTasks] = useState<
    | ({ id: string } & Pick<
        TaskData,
        'name' | 'phoneNumber' | 'street' | 'houseNumber' | 'city' | 'country' | 'quantity'
      >)[]
    | []
  >([]);

  const handleMapAndSetTasks = (onFleetTask: OurOnFleetTask[]) =>
    setTasks(mapOnFleetTasksToDeliveryTable(onFleetTask));

  const fetchTasks = async () => {
    try {
      if (hasRole('dispatcher')) {
        const data = await tasksTomorrowQuery();
        handleMapAndSetTasks(data);
      }

      if (hasRole('root') && selectedDay) {
        const data = await tasksQuery(selectedDay);
        handleMapAndSetTasks(data);
      }

      if (hasRole('user') && selectedDay) {
        const data = await tasksQuery(selectedDay, user?.uid);
        handleMapAndSetTasks(data);
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
    fetchTasks();
  }, [selectedDay]);

  return tasks;
};
