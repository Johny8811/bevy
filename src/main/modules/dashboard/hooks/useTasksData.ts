import { useEffect, useMemo } from 'react';

import { useTasksQueryV2 } from '../../../queryHooks/useTasksQueryV2';
import { useWorkersQueryV2 } from '../../../queryHooks/useWorkersQueryV2';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { Task } from '../../../types/tasks';

import { mapOnFleetTasksToTasks } from '../utils/mapOnFleetTasksToTasks';
import { DateRange } from '../components/SelectDateRange';
import { TaskPreview } from '../types/tasks';

export const useTasksData = ({ completeAfter, completeBefore }: DateRange) => {
  const { openSnackBar } = useSnackBar();

  const {
    data: tasksData,
    isError: isTasksError,
    isLoading: isTasksLoading,
    isFetching: isTasksFetching
  } = useTasksQueryV2({ completeAfter, completeBefore }, !!(completeAfter && completeBefore));
  const { data: workersData, isError: isWorkersError } = useWorkersQueryV2();

  useEffect(() => {
    if (isTasksError || isWorkersError) {
      openSnackBar({
        text: `Something went wrong while getting data tasks data. Please try it again.`,
        severity: 'error'
      });
    }
  }, [isTasksError, isWorkersError]);

  const tasks:
    | (Omit<TaskPreview, 'skipSMSNotifications' | 'pickupTask'> &
        Pick<Task, 'estimatedCompletionTime' | 'slot'>)[]
    | [] = useMemo(() => {
    if (tasksData && workersData) {
      return mapOnFleetTasksToTasks(tasksData, workersData);
    }

    return [];
  }, [tasksData]);

  return {
    tasks,
    loading: isTasksLoading && isTasksFetching
  };
};
