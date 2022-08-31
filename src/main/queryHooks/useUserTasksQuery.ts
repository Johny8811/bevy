import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';
import { format } from 'date-fns';

import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { TASKS } from '../integrations/fetch/endpoints';

export const useUserTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return (userId: string, date: Date): Promise<OnfleetTask[]> => {
    return fetchBackend({
      method: Methods.get,
      url: `${TASKS}?userId=${userId}&date=${format(date, 'MM/dd/yyyy')}`
    });
  };
};
