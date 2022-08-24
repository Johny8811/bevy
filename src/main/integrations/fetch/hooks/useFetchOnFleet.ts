import { useLoading } from '../components/LoadingProvider';

import { Params, fetchApi } from '../fetchApi';

export const useFetchOnFleet = () => {
  const { startLoading, stopLoading } = useLoading();

  return async (params: Params) => {
    startLoading?.();

    const response = await fetchApi({
      ...params,
      headers: {
        ...params.headers,
        Authorization: 'Basic YTNkMmFkNThjNmE2MmFmMWNkNjRmNjdkZjZjZTAzYzc6'
      }
    });

    stopLoading?.();
    return response;
  };
};
