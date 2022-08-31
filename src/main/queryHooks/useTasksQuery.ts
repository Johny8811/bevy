import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';
import { format } from 'date-fns';

import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { TASKS } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';

export const useTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return (date: Date, userId?: string): Promise<OnfleetTask[]> => {
    const queryParams = buildUrlQueryParams([
      {
        param: 'date',
        value: format(date, 'MM/dd/yyyy')
      },
      userId
        ? {
            param: 'userId',
            value: userId
          }
        : undefined
    ]);

    return fetchBackend({
      method: Methods.get,
      url: `${TASKS}?${queryParams}`
    });
  };
};
