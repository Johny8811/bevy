import { CreateTaskProps, OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';
import { fetchApi } from '../integrations/fetch/fetchApi';
import { ON_FLEET_TASKS_BATCH_URL } from '../integrations/fetch/endpoints';
import { useLoading } from '../integrations/fetch/components/LoadingProvider';

export const useCreateOnFleetTasksQuery = () => {
  const { startLoading, stopLoading } = useLoading();

  return async (tasks: CreateTaskProps[]): Promise<OnfleetTask[]> => {
    startLoading?.();

    const response = await fetchApi({
      url: ON_FLEET_TASKS_BATCH_URL,
      headers: {
        Authorization: 'Basic YTNkMmFkNThjNmE2MmFmMWNkNjRmNjdkZjZjZTAzYzc6'
      },
      body: JSON.stringify({ tasks })
    });

    stopLoading?.();
    return response;
  };
};
