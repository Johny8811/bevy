import { format } from 'date-fns';

import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { TASKS } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';
import { OurOnFleetTask } from '../types/tasks';

type TasksQueryParams = {
  completeAfter: Date | null;
  completeBefore: Date | null;
};

export const useTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return ({ completeAfter, completeBefore }: TasksQueryParams): Promise<OurOnFleetTask[]> => {
    const queryParams = buildUrlQueryParams([
      completeAfter && {
        param: 'completeAfter',
        value: format(completeAfter, 'MM/dd/yyyy')
      },
      completeBefore && {
        param: 'completeBefore',
        value: format(completeBefore, 'MM/dd/yyyy')
      }
    ]);

    return fetchBackend({
      method: Methods.get,
      url: `${TASKS}?${queryParams}`
    });
  };
};
