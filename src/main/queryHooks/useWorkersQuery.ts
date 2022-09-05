import { OnfleetWorker } from '@onfleet/node-onfleet/Resources/Workers';
import { useFetchOnFleet } from '../integrations/fetch/hooks/useFetchOnFleet';
import { Methods } from '../integrations/fetch/fetchApi';
import { ON_FLEET_WORKERS } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';

export const useWorkersQuery = () => {
  const fetchOnFleet = useFetchOnFleet();

  const queryParams = buildUrlQueryParams([{ param: 'filter', value: 'id,name,phone' }]);

  return (): Promise<Pick<OnfleetWorker, 'id' | 'name' | 'phone'>> =>
    fetchOnFleet({
      method: Methods.get,
      url: `${ON_FLEET_WORKERS}?${queryParams}`
    });
};
