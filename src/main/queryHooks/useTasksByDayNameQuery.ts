import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { TASKS_GET_TASKS_BY_DAY_NAME } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';
import { OurOnFleetTask } from '../types/tasks';

type DayNameParam = 'yesterday' | 'today' | 'tomorrow';

export const useTasksByDayNameQuery = () => {
  const fetchBackend = useFetchBackend();

  return (dayName: DayNameParam): Promise<OurOnFleetTask[]> => {
    const queryParams = buildUrlQueryParams([
      {
        param: 'dayName',
        value: dayName
      }
    ]);

    return fetchBackend({
      method: Methods.get,
      url: `${TASKS_GET_TASKS_BY_DAY_NAME}?${queryParams}`
    });
  };
};
