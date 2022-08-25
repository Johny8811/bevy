import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { Methods } from '../integrations/fetch/fetchApi';
import { NEXT_DAY_TASKS } from '../integrations/fetch/endpoints';

export const useNextDayTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return (): Promise<OnfleetTask[]> => {
    return fetchBackend({
      method: Methods.get,
      url: `${NEXT_DAY_TASKS}`
    });
  };
};
