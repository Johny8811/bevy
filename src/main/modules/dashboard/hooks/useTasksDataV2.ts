import { useEffect } from 'react';

// import { useWorkersQuery } from '../../../queryHooks/useWorkersQuery';
// import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
// import { TaskData, OurOnFleetTask } from '../../../types/tasks';
// import { OnFleetWorkers } from '../../../types/workers';
// import { useUser } from '../../../integrations/firebase/components/UserProvider';
// import { mapOnFleetTasksToTasks } from '../utils/mapOnFleetTasksToTasks';

import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';
import { useTasksQueryV2 } from '../../../queryHooks/useTasksQueryV2';
import { DateRange } from '../components/SelectDateRange';

export const useTasksDataV2 = ({ completeAfter, completeBefore }: DateRange) => {
  const hasRole = useHasRole();
  const { data, isFetching, refetch } = useTasksQueryV2(
    { completeAfter, completeBefore },
    hasRole('dispatcher')
  );

  useEffect(() => {
    if (hasRole('root') && completeAfter && completeBefore) {
      refetch();
    }

    if (hasRole('user') && completeAfter) {
      refetch();
    }
  }, [completeAfter, completeBefore]);

  return { data, isFetching };
};
