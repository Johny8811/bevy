import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { ON_FLEET_EXPORT_TASKS_TO_DB } from '../integrations/fetch/endpoints';
import { Task } from '../types/tasks';

export const useOnFleetExportTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  // TODO: have to be mutation - use POST, PATCH or PUT instead of GET
  return (): Promise<Task[]> => {
    return fetchBackend({
      method: Methods.get,
      url: ON_FLEET_EXPORT_TASKS_TO_DB
    });
  };
};
