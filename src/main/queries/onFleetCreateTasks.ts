import OnFleet from '@onfleet/node-onfleet';
import { fetchApi } from '../integrations/fetch/fetchApi';
import { OnFleetTasksBatchUrl } from '../integrations/fetch/endpoints';

export const onFleetCreateTasks: OnFleet['tasks']['batchCreate'] = (tasks) =>
  fetchApi({
    url: OnFleetTasksBatchUrl,
    headers: {
      Authorization: 'Basic YTNkMmFkNThjNmE2MmFmMWNkNjRmNjdkZjZjZTAzYzc6'
    },
    body: JSON.stringify({ tasks })
  });
