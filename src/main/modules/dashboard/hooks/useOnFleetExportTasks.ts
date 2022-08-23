import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { useOnFleetExportTasksQuery } from '../../../queryHooks/useOnFleetExportTasksQuery';

export const useOnFleetExportTasks = () => {
  const { openSnackBar } = useSnackBar();
  const onFleetExportTasks = useOnFleetExportTasksQuery();

  return async () => {
    try {
      await onFleetExportTasks();
      openSnackBar({
        text: 'Tasks was successfully exported from onFleet.',
        severity: 'success'
      });
    } catch (e) {
      // TODO: log error
      openSnackBar({
        text: 'Something went wrong while exporting tasks from onFleet',
        severity: 'error'
      });
    }
  };
};
