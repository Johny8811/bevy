import { format } from 'date-fns';

import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { Methods } from '../integrations/fetch/fetchApi';
import { TASKS_GET_AGGREGATED_TASKS } from '../integrations/fetch/endpoints';
import { DateRange } from '../modules/dashboard/components/SelectDateRange';
import { AggregatedTasks } from '../types/tasks';

export const useAggregatedTasksQuery = (dateRange: DateRange) => {
  const fetchBackend = useFetchBackend();

  const after = format(dateRange.completeAfter || new Date(), 'MM/dd/yyyy');
  const before = format(dateRange.completeBefore || new Date(), 'MM/dd/yyyy');
  return (): Promise<AggregatedTasks> =>
    fetchBackend({
      method: Methods.get,
      // TODO: get date range & pass it here
      url: `${TASKS_GET_AGGREGATED_TASKS}?completeAfter=${after}&completeBefore=${before}`
    });
};
