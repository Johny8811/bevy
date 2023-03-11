import { useEffect, useState } from 'react';

import { useTasksQuery } from '../../../queryHooks/useTasksQuery';
import { useWorkersQuery } from '../../../queryHooks/useWorkersQuery';
import { useTasksByDayNameQuery } from '../../../queryHooks/useTasksByDayNameQuery';
import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { TaskData, OurOnFleetTask } from '../../../types/tasks';
import { OnFleetWorkers } from '../../../types/workers';
import { mapOnFleetTasksToTasks } from '../utils/mapOnFleetTasksToTasks';
import { DateRange } from '../components/SelectDateRange';

export const useTasksData = ({ completeAfter, completeBefore }: DateRange) => {
  const { openSnackBar } = useSnackBar();
  const hasRole = useHasRole();

  const tasksQuery = useTasksQuery();
  const workersQuery = useWorkersQuery();
  const tasksByDayNameQuery = useTasksByDayNameQuery();

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
        Pick<OurOnFleetTask, 'estimatedCompletionTime' | 'slot'>)[]
    | []
  >([]);

  // TODO: uuuufff... remove and optimise this shit! one route with different params can handle all cases
  const fetchTasks = async (): Promise<OurOnFleetTask[]> => {
    if (hasRole('dispatcher')) {
      return tasksByDayNameQuery('tomorrow');
    }

    if (hasRole('root') && completeAfter && completeBefore) {
      return tasksQuery({ completeAfter, completeBefore });
    }

    if (hasRole('user') && completeAfter) {
      return tasksQuery({ completeAfter, completeBefore });
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
