import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { TASKS_BATCH_CREATE } from '../integrations/fetch/endpoints';
import { CreateTaskProps } from '../types/tasks';

export const useCreateTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return (tasks: CreateTaskProps[]): Promise<OnfleetTask[]> => {
    return fetchBackend({
      url: TASKS_BATCH_CREATE,
      body: tasks
    });
  };
};
