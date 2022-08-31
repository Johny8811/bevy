import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { Methods } from '../integrations/fetch/fetchApi';
import { TASKS_TOMORROW } from '../integrations/fetch/endpoints';

export const useTasksTomorrowQuery = () => {
  const fetchBackend = useFetchBackend();

  return (): Promise<OnfleetTask[]> => {
    return fetchBackend({
      method: Methods.get,
      url: `${TASKS_TOMORROW}`
    });
  };
};
