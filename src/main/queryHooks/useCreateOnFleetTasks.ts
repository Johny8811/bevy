import { CreateTaskProps, OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';
import { fetchApi } from '../integrations/fetch/fetchApi';
import { OnFleetTasksBatchUrl } from '../integrations/fetch/endpoints';
import { useLoading } from '../integrations/fetch/components/LoadingProvider';

export const useCreateOnFleetTasks = () => {
  const { startLoading, stopLoading } = useLoading();

  return async (tasks: CreateTaskProps[]): Promise<OnfleetTask[]> => {
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
};
