import { useState } from 'react';

import { OnfleetMetadata } from '@onfleet/node-onfleet/metadata';
import { useCreateOnFleetTasks } from '../../../queryHooks/useCreateOnFleetTasks';
import { TaskData, CreateBatchTasksResponse } from '../../../types/tasks';
import { transformTaskDataToOnFleetTasks } from '../../../utils/onFleet/transformTaskDataToOnFleetTasks';
import { useUser } from '../../../integrations/firebase/components/UserProvider';

export const useCreateTasks = () => {
  const { user } = useUser();
  const [result, setResult] = useState<CreateBatchTasksResponse | null>(null);

  const createOnFleetTasks = useCreateOnFleetTasks();

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

    setResult(response);
  };

  return {
    result,
    createTasks
  };
};
