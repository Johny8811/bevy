import { useState } from 'react';

import { useCreateOnFleetTasks } from '../../../queryHooks/useCreateOnFleetTasks';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { CreateBatchTasksResponse } from '../../../types/tasks';
import { Props as BadImportsDialog } from '../components/BadImportsDialog/Dialog';
import { useTransformSheetToOnFleetTasks } from './useTransformSheetToOnFleetTasks';

export const useCreateTasksFromSheet = () => {
  const { openSnackBar } = useSnackBar();
  const [result, setResult] = useState<Pick<
    BadImportsDialog,
    'importedCount' | 'failedTasks'
  > | null>(null);

  const transformSheetToOnFleetTasks = useTransformSheetToOnFleetTasks();
  const createOnFleetTasks = useCreateOnFleetTasks();

  const createTasksFromSheet = async (file: File) => {
    const onFleetTasks = await transformSheetToOnFleetTasks(file);
    const response =
      // FIXME: we have to re-type response here, because of bad onFleet typing - check onFleet types
      onFleetTasks &&
      ((await createOnFleetTasks(onFleetTasks)) as unknown as CreateBatchTasksResponse);

    if (response.errors.length === 0) {
      openSnackBar({
        text: `${response.tasks.length} was successfully created.`,
        severity: 'success'
      });
    } else {
      setResult({
        importedCount: response.tasks.length,
        failedTasks: response.errors
      });
    }
  };

  return {
    result,
    createTasksFromSheet
  };
};
