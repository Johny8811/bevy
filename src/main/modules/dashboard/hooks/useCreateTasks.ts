import { useState } from 'react';

import { useOnFleetCreateTasksQuery } from '../../../queryHooks/useOnFleetCreateTasksQuery';
import { CreateTaskProps, CreateBatchTasksResponse } from '../../../types/tasks';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';

export const useCreateTasks = () => {
  const { openSnackBar } = useSnackBar();
  const [result, setResult] = useState<CreateBatchTasksResponse | null>(null);

  const createOnFleetTasks = useOnFleetCreateTasksQuery();

  const createTasks = async (tasks: CreateTaskProps[]) => {
    const res =
      // FIXME: we have to re-type response here, because of bad onFleet typing - check onFleet types
      (await createOnFleetTasks(tasks)) as unknown as CreateBatchTasksResponse;

    if (res.errors.length === 0) {
      openSnackBar({
        text: `${res.tasks.length} tasks was successfully created.`,
        severity: 'success'
      });
    } else {
      openSnackBar({
        text: `Some tasks was not imported (${res.errors.length})`,
        severity: 'error'
      });
      setResult(res);
    }
  };

  return {
    createTasksResult: result,
    createTasks
  };
};
