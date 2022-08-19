import { useState } from 'react';

import { useCreateOnFleetTasks } from '../../../queryHooks/useCreateOnFleetTasks';
import { CreateBatchTasksResponse } from '../../../types/tasks';
import { useTransformSheetToOnFleetTasks } from './useTransformSheetToOnFleetTasks';

export const useCreateTasksFromSheet = () => {
  const [result, setResult] = useState<CreateBatchTasksResponse | null>(null);

  const transformSheetToOnFleetTasks = useTransformSheetToOnFleetTasks();
  const createOnFleetTasks = useCreateOnFleetTasks();

  const createTasksFromSheet = async (file: File) => {
    const onFleetTasks = await transformSheetToOnFleetTasks(file);
    const response =
      // FIXME: we have to re-type response here, because of bad onFleet typing - check onFleet types
      onFleetTasks &&
      ((await createOnFleetTasks(onFleetTasks)) as unknown as CreateBatchTasksResponse);

    setResult(response);
  };

  return {
    result,
    createTasksFromSheet
  };
};
