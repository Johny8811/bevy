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

  const [workers, setWorkers] = useState<OnFleetWorkers | null>();
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

  // TODO: uuuufff... remove and optimise this shit! one route with different params can handle all cases
  const fetchTasks = async (): Promise<OurOnFleetTask[]> => {
    if (hasRole('dispatcher')) {
      return tasksTomorrowQuery();
    }

    if (hasRole('root') && selectedDay) {
      return tasksQuery(selectedDay);
    }

    if (hasRole('user') && selectedDay) {
      return tasksQuery(selectedDay, user?.uid);
    }

    return new Promise((resolve) => {
      resolve([]);
    });
  };

  useEffect(() => {
    if (workers) {
      fetchTasks()
        .then((onFleetTasks) => setTasks(mapOnFleetTasksToDeliveryTable(onFleetTasks, workers)))
        .catch(() => {
          // TODO: log error
          openSnackBar({
            text: `Something went wrong while getting data`,
            severity: 'error'
          });
        });
    }
  }, [selectedDay, workers]);

  useEffect(() => {
    workersQuery()
      .then((data) => setWorkers(data))
      .catch(() => {
        // TODO: log error
        openSnackBar({
          text: `Something went wrong while getting data`,
          severity: 'error'
        });
      });
  }, []);

  return tasks;
};
