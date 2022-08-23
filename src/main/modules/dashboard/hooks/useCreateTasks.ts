import { useState } from 'react';
import { OnfleetMetadata } from '@onfleet/node-onfleet/metadata';

import { useCreateOnFleetTasksQuery } from '../../../queryHooks/useCreateOnFleetTasksQuery';
import { TaskData, CreateBatchTasksResponse } from '../../../types/tasks';
import { transformTaskDataToOnFleetTasks } from '../../../utils/onFleet/transformTaskDataToOnFleetTasks';
import { useUser } from '../../../integrations/firebase/components/UserProvider';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { Props as BadImportsDialog } from '../components/BadImportsDialog/Dialog';

export const useCreateTasks = () => {
  const { user } = useUser();
  const { openSnackBar } = useSnackBar();
  const [result, setResult] = useState<Pick<
    BadImportsDialog,
    'importedCount' | 'failedTasks'
  > | null>(null);

  const createOnFleetTasks = useCreateOnFleetTasksQuery();

  // Metadata
  const metadata: OnfleetMetadata[] = [
    {
      name: 'User ID',
      type: 'string',
      visibility: ['api'],
      value: user?.uid
    }
  ];

  const createTasks = async (tasks: TaskData[]) => {
    const onFleetTasks = transformTaskDataToOnFleetTasks(tasks, metadata);
    const response =
      // FIXME: we have to re-type response here, because of bad onFleet typing - check onFleet types
      (await createOnFleetTasks(onFleetTasks)) as unknown as CreateBatchTasksResponse;

    if (response.errors.length === 0) {
      openSnackBar({
        text: `${response.tasks.length} tasks was successfully created.`,
        severity: 'success'
      });
    } else {
      openSnackBar({
        text: `Some tasks was not imported (${response.errors.length})`,
        severity: 'error'
      });
      setResult({
        importedCount: response.tasks.length,
        failedTasks: response.errors
      });
    }
  };

  return {
    result,
    createTasks
  };
};
