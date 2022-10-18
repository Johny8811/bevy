import { useEffect, useState } from 'react';

import { useTasksQuery } from '../../../queryHooks/useTasksQuery';
import { useWorkersQuery } from '../../../queryHooks/useWorkersQuery';
import { useTasksTomorrowQuery } from '../../../queryHooks/useTasksTomorrowQuery';
import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { TaskData, OurOnFleetTask } from '../../../types/tasks';
import { OnFleetWorkers } from '../../../types/workers';
import { useUser } from '../../../integrations/firebase/components/UserProvider';
import { mapOnFleetTasksToTasks } from '../utils/mapOnFleetTasksToTasks';
import { DateRange } from '../components/SelectDateRange';

export const useTasksData = ({ completeAfter, completeBefore }: DateRange) => {
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
    const userId = user?.uid;

    if (userId && hasRole('dispatcher')) {
      return tasksQuery({ userId });
    }

    if (userId && hasRole('root') && completeAfter && completeBefore) {
      return tasksQuery({ completeAfter, completeBefore, userId });
    }

    if (userId && hasRole('user') && completeAfter) {
      return tasksQuery({ completeAfter, userId });
    }

    return new Promise((resolve) => {
      resolve([]);
    });
  };

  useEffect(() => {
    if (workers) {
      fetchTasks()
        .then((onFleetTasks) => setTasks(mapOnFleetTasksToTasks(onFleetTasks, workers)))
        .catch(() => {
          // TODO: log error
          openSnackBar({
            text: `Something went wrong while getting data`,
            severity: 'error'
          });
        });
    }
  }, [completeAfter, completeBefore, workers]);

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
