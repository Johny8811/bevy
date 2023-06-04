import { useQuery } from '@tanstack/react-query';

import { OnFleetWorkers } from '../types/workers';
import { fetchApi, Methods } from '../integrations/fetch/fetchApi';
import { ON_FLEET_GET_WORKERS } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';
import { useFetchParams } from '../integrations/fetch/hooks/useFetchParams';

const QUERY_NAME = 'workers';

export const useWorkersQueryV2 = () => {
  const { getParamsWithAuthorization } = useFetchParams();

  return useQuery([QUERY_NAME], async (): Promise<OnFleetWorkers> => {
    const queryParams = buildUrlQueryParams([{ param: 'filter', value: 'id,name,phone' }]);

    const fetchParams = await getParamsWithAuthorization({
      method: Methods.get,
      url: `${ON_FLEET_GET_WORKERS}?${queryParams}`
    });

    return fetchApi(fetchParams);
  });
};
