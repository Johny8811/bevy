import { useState } from 'react';
import { OnfleetMetadata } from '@onfleet/node-onfleet/metadata';

import { useOnFleetCreateTasksQuery } from '../../../queryHooks/useOnFleetCreateTasksQuery';
import { TaskData, CreateBatchTasksResponse } from '../../../types/tasks';
import { mapTaskDataToCreateTasksProps } from '../../../utils/onFleet/mapTaskDataToCreateTasksProps';
import { useUser } from '../../../integrations/firebase/components/UserProvider';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';

export const useCreateTasks = () => {
  const { user } = useUser();
  const { openSnackBar } = useSnackBar();
  const [result, setResult] = useState<CreateBatchTasksResponse | null>(null);

  const createOnFleetTasks = useOnFleetCreateTasksQuery();

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
    const onFleetTasks = mapTaskDataToCreateTasksProps(tasks, metadata);
    const res =
      // FIXME: we have to re-type response here, because of bad onFleet typing - check onFleet types
      (await createOnFleetTasks(onFleetTasks)) as unknown as CreateBatchTasksResponse;

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
