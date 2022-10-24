import { OnFleetWorkers } from '../types/workers';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { Methods } from '../integrations/fetch/fetchApi';
import { ON_FLEET_GET_WORKERS } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';

export const useWorkersQuery = () => {
  const fetchBackend = useFetchBackend();

  const queryParams = buildUrlQueryParams([{ param: 'filter', value: 'id,name,phone' }]);

  return (): Promise<OnFleetWorkers> =>
    fetchBackend({
      method: Methods.get,
      url: `${ON_FLEET_GET_WORKERS}?${queryParams}`
    });
};
