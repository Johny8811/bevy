import { useEffect, useState } from 'react';

import { useUserTasksQuery } from '../../../queryHooks/useUserTasksQuery';
import { useTasksTomorrowQuery } from '../../../queryHooks/useTasksTomorrowQuery';

import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { TaskData } from '../../../types/tasks';
import { useUser } from '../../../integrations/firebase/components/UserProvider';

export const useDeliveryTableData = (selectedDay: Date | null) => {
  const { user } = useUser();
  const userTasksQuery = useUserTasksQuery();
  const nextDayTasksQuery = useTasksTomorrowQuery();

  const nextDayTasksQuery = useNextDayTasksQuery();
  const { openSnackBar } = useSnackBar();
  const hasRole = useHasRole();

  const [userTasks, setUserTasks] = useState<
    | ({ id: string } & Pick<
        TaskData,
        'name' | 'phoneNumber' | 'street' | 'houseNumber' | 'city' | 'country' | 'quantity'
      >)[]
    | []
  >([]);

  useEffect(() => {
    if (hasRole('dispatcher')) {
      nextDayTasksQuery().then((tasks) => {
        setUserTasks(
          tasks.map((task) => ({
            id: task.id,
            name: task.recipients[0]?.name,
            phoneNumber: task.recipients[0]?.phone,
            street: task.destination.address.street,
            houseNumber: task.destination.address.number,
            city: task.destination.address.city,
            country: task.destination.address.country,
            quantity: task.quantity
          }))
        );
      });
    } else if (user?.uid && selectedDay) {
      userTasksQuery(user?.uid, selectedDay)
        .then((tasks) =>
          setUserTasks(
            tasks.map((task) => ({
              id: task.id,
              name: task.recipients[0]?.name,
              phoneNumber: task.recipients[0]?.phone,
              street: task.destination.address.street,
              houseNumber: task.destination.address.number,
              city: task.destination.address.city,
              country: task.destination.address.country,
              quantity: task.quantity
            }))
          )
        )
        .catch((e) => {
          openSnackBar({
            text: `Something went wrong while getting data - ${e.message}`,
            severity: 'error'
          });
        });
    }
  }, [selectedDay]);

  return userTasks;
};
