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
      // TODO: after export is needed re-fetch data by "tasksTomorrowQuery". Currently we have our custom
      //  implementation of queries, we have no option to re-fetch. After implementation of React-Query we can
      //  re-fetch single query
      setTimeout(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }, 4000);
    } catch (e) {
      // TODO: log error
      openSnackBar({
        text: 'Something went wrong while exporting tasks from onFleet',
        severity: 'error'
      });
    }
  };
};
