import OnFleet from '@onfleet/node-onfleet';
import { fetchApi } from '../integrations/fetch/fetchApi';
import { OnFleetTasksBatchUrl } from '../integrations/fetch/endpoints';
import { useLoading } from '../integrations/fetch/components/LoadingProvider';

export const useCreateOnFleetTasks = () => {
  const { startLoading, stopLoading } = useLoading();

  const createTasks: OnFleet['tasks']['batchCreate'] = async (tasks) => {
    startLoading?.();

    const response = await fetchApi({
      url: OnFleetTasksBatchUrl,
      headers: {
        Authorization: 'Basic YTNkMmFkNThjNmE2MmFmMWNkNjRmNjdkZjZjZTAzYzc6'
      },
      body: JSON.stringify({ tasks })
    });

    stopLoading?.();
    return response;
  };

  return createTasks;
};
