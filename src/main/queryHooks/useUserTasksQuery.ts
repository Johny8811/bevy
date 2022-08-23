import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';
import { format } from 'date-fns';

import { useLoading } from '../integrations/fetch/components/LoadingProvider';
import { fetchApi, Methods } from '../integrations/fetch/fetchApi';
import { USER_TASKS } from '../integrations/fetch/endpoints';

export const useUserTasksQuery = () => {
  const { startLoading, stopLoading } = useLoading();

  return async (userId: string, date: Date): Promise<OnfleetTask[]> => {
    startLoading?.();

    const response = await fetchApi({
      method: Methods.get,
      url: `${USER_TASKS}?userId=${userId}&date=${format(date, 'MM/dd/yyyy')}`
    });

    stopLoading?.();
    return response;
  };
};
