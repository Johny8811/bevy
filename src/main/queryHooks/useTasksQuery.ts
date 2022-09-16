import { format } from 'date-fns';

import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { TASKS } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';
import { OurOnFleetTask } from '../types/tasks';

type TasksQueryParams = {
  completeAfter: Date;
  completeBefore?: Date;
  userId?: string;
};

export const useTasksQuery = () => {
  const fetchBackend = useFetchBackend();

  return ({
    completeAfter,
    completeBefore,
    userId
  }: TasksQueryParams): Promise<OurOnFleetTask[]> => {
    const queryParams = buildUrlQueryParams([
      {
        param: 'startDate',
        value: format(completeAfter, 'MM/dd/yyyy')
      },
      completeBefore && {
        param: 'endDate',
        value: format(completeBefore, 'MM/dd/yyyy')
      },
      userId
        ? {
            param: 'userId',
            value: userId
          }
        : undefined
    ]);

    return fetchBackend({
      method: Methods.get,
      url: `${TASKS}?${queryParams}`
    });
  };
};
