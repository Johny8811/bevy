import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { ON_FLEET_EXPORT_TASKS_TO_DB } from '../integrations/fetch/endpoints';
import { OurOnFleetTask } from '../types/tasks';

export const useOnFleetExportTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return (): Promise<OurOnFleetTask[]> => {
    return fetchBackend({
      method: Methods.get,
      url: ON_FLEET_EXPORT_TASKS_TO_DB
    });
  };
};
