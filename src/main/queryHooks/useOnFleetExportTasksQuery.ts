import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useLoading } from '../integrations/fetch/components/LoadingProvider';
import { fetchApi, Methods } from '../integrations/fetch/fetchApi';
import { ON_FLEET_EXPORT_TASKS_TO_DB } from '../integrations/fetch/endpoints';

export const useOnFleetExportTasksQuery = () => {
  const { startLoading, stopLoading } = useLoading();

  return async (): Promise<OnfleetTask[]> => {
    startLoading?.();

    const response = await fetchApi({
      method: Methods.get,
      url: ON_FLEET_EXPORT_TASKS_TO_DB
    });

    stopLoading?.();
    return response;
  };
};
