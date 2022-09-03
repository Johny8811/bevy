import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { Methods } from '../integrations/fetch/fetchApi';
import { TASKS_TOMORROW } from '../integrations/fetch/endpoints';
import { OurOnFleetTask } from '../types/tasks';

export const useTasksTomorrowQuery = () => {
  const fetchBackend = useFetchBackend();

  return (): Promise<OurOnFleetTask[]> => {
    return fetchBackend({
      method: Methods.get,
      url: `${TASKS_TOMORROW}`
    });
  };
};
