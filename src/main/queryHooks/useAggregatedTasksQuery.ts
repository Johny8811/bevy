import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { Methods } from '../integrations/fetch/fetchApi';
import { TASKS_GET_AGGREGATED_TASKS } from '../integrations/fetch/endpoints';

export const useAggregatedTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return () =>
    fetchBackend({
      method: Methods.get,
      // TODO: get date range & pass it here
      url: `${TASKS_GET_AGGREGATED_TASKS}?completeAfter=2022/09/05&completeBefore=2022/09/06`
    });
};
