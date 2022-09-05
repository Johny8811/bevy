import { useEffect, useState } from 'react';

import { useTasksQuery } from '../../../queryHooks/useTasksQuery';
import { useWorkersQuery } from '../../../queryHooks/useWorkersQuery';
import { useTasksTomorrowQuery } from '../../../queryHooks/useTasksTomorrowQuery';
import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { TaskData, OurOnFleetTask } from '../../../types/tasks';
import { OnFleetWorkers } from '../../../types/workers';
import { useUser } from '../../../integrations/firebase/components/UserProvider';
import { mapOnFleetTasksToDeliveryTable } from '../utils/mapOnFleetTasksToDeliveryTable';

export const useDeliveryTableData = (selectedDay: Date | null) => {
  const { user } = useUser();
  const { openSnackBar } = useSnackBar();
  const hasRole = useHasRole();

  const tasksQuery = useTasksQuery();
  const tasksTomorrowQuery = useTasksTomorrowQuery();
  const workersQuery = useWorkersQuery();

  const [tasks, setTasks] = useState<
    | ({ id: string } & Pick<
        TaskData,
        | 'name'
        | 'phoneNumber'
        | 'recipientNotes'
        | 'street'
        | 'city'
        | 'postalCode'
        | 'country'
        | 'completeAfter'
        | 'completeBefore'
        | 'quantity'
      > &
        Pick<OurOnFleetTask, 'estimatedArrivalTime' | 'slot'>)[]
    | []
  >([]);

  const handleMapAndSetTasks = (onFleetTask: OurOnFleetTask[], workers: OnFleetWorkers) =>
    setTasks(mapOnFleetTasksToDeliveryTable(onFleetTask, workers));

  const fetchTasks = async () => {
    try {
      const workers = await workersQuery();

      if (hasRole('dispatcher')) {
        const data = await tasksTomorrowQuery();
        handleMapAndSetTasks(data, workers);
      }

      if (hasRole('root') && selectedDay) {
        const data = await tasksQuery(selectedDay);
        handleMapAndSetTasks(data, workers);
      }

      if (hasRole('user') && selectedDay) {
        const data = await tasksQuery(selectedDay, user?.uid);
        handleMapAndSetTasks(data, workers);
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
