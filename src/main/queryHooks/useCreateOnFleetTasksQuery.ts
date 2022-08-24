import { CreateTaskProps, OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useFetchOnFleet } from '../integrations/fetch/hooks/useFetchOnFleet';
import { ON_FLEET_TASKS_BATCH_URL } from '../integrations/fetch/endpoints';

export const useCreateOnFleetTasksQuery = () => {
  const fetchOnFleet = useFetchOnFleet();

  return (tasks: CreateTaskProps[]): Promise<OnfleetTask[]> => {
    return fetchOnFleet({
      url: ON_FLEET_TASKS_BATCH_URL,
      body: JSON.stringify({ tasks })
    });
  };
};
