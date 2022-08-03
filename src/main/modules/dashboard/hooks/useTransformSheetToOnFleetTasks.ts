import { useUser } from '../../../integrations/firebase/context/UserProvider';
import { transformSheetToOnFleet } from '../../../utils/transformSheeToOnFleet';

export const useTransformSheetToOnFleetTasks = () => {
  const { user } = useUser();

  return (tasksXlsx: File) => user && transformSheetToOnFleet(tasksXlsx, user?.uid);
};
