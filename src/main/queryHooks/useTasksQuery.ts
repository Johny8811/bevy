import { format } from 'date-fns';

import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { TASKS } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';
import { OurOnFleetTask } from '../types/tasks';

type TasksQueryParams = {
  completeAfter?: Date;
  completeBefore?: Date;
  userId: string;
};

export const useTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return ({
    completeAfter,
    completeBefore,
    userId
  }: TasksQueryParams): Promise<OurOnFleetTask[]> => {
    const queryParams = buildUrlQueryParams([
      completeAfter && {
        param: 'completeAfter',
        value: format(completeAfter, 'MM/dd/yyyy')
      },
      completeBefore && {
        param: 'completeBefore',
        value: format(completeBefore, 'MM/dd/yyyy')
      },
      {
        param: 'userId',
        value: userId
      }
    ]);

    return fetchBackend({
      method: Methods.get,
      url: `${TASKS}?${queryParams}`
    });
  };
};
