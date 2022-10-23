import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

import { Methods, fetchApi } from '../integrations/fetch/fetchApi';
import { useFetchParams } from '../integrations/fetch/hooks/useFetchParams';
import { TASKS } from '../integrations/fetch/endpoints';
import { buildUrlQueryParams } from '../utils/buildUrlQueryParams';

const QUERY_NAME = 'tasks';

type TasksQueryParams = {
  completeAfter: Date | null;
  completeBefore: Date | null;
};

export const useTasksQueryV2 = (
  tasksQueryParams: Omit<TasksQueryParams, 'userId'>,
  enabled: boolean = true
) => {
  const { getParamsWithAuthorization } = useFetchParams();

  return useQuery(
    [QUERY_NAME, tasksQueryParams],
    async () => {
      const { completeAfter, completeBefore } = tasksQueryParams;

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
      const fetchParams = await getParamsWithAuthorization({
        method: Methods.get,
        url: `${TASKS}?${queryParams}`
      });

      return fetchApi(fetchParams);
    },
    {
      enabled
    }
  );
};
