import { OnfleetMetadata } from '@onfleet/node-onfleet/metadata';

import { useUser } from '../../../integrations/firebase/components/UserProvider';
import { transformSheetToTaskData } from '../../../utils/onFleet/transformSheeToTaskData';
import { transformTaskDataToOnFleetTasks } from '../../../utils/onFleet/transformTaskDataToOnFleetTasks';

export const useTransformSheetToOnFleetTasks = () => {
  const { user } = useUser();

  // Metadata
  const metadata: OnfleetMetadata[] = [
    {
      name: 'User ID',
      type: 'string',
      visibility: ['api'],
      value: user?.uid
    }
  ];

  return async (tasksXlsx: File) => {
    const taskData = await transformSheetToTaskData(tasksXlsx);
    return transformTaskDataToOnFleetTasks(taskData, metadata);
  };
};
