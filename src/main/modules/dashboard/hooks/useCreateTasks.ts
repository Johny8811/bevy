import { useState } from 'react';

import { useCreateOnFleetTasks } from '../../../queryHooks/useCreateOnFleetTasks';
import { CreateTasksResponse } from '../../../types/tasks';
import { useTransformSheetToOnFleetTasks } from './useTransformSheetToOnFleetTasks';

export const useCreateTasks = () => {
  const [result, setResult] = useState<CreateTasksResponse | null>(null);

  const transformSheetToOnFleetTasks = useTransformSheetToOnFleetTasks();
  const createOnFleetTasks = useCreateOnFleetTasks();

  const createTasks = async (file: File) => {
    const onFleetTasks = await transformSheetToOnFleetTasks(file);
    const response =
      // FIXME: we have to re-type response here, cause onFleet has bad typing here - check onFleet types
      onFleetTasks && ((await createOnFleetTasks(onFleetTasks)) as unknown as CreateTasksResponse);

    setResult(response);
  };

  return {
    result,
    createTasks
  };
};
