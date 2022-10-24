import { CreateTaskProps, OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { TASKS_BATCH_CREATE } from '../integrations/fetch/endpoints';

// TODO: rename
export const useOnFleetCreateTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return (tasks: CreateTaskProps[]): Promise<OnfleetTask[]> => {
    return fetchBackend({
      url: TASKS_BATCH_CREATE,
      body: { tasks }
    });
  };
};
