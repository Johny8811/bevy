import { useLoading } from '../components/LoadingProvider';

import { useUser } from '../../firebase/components/UserProvider';
import { fetchApi, Params } from '../fetchApi';

export const useFetchBackend = () => {
  const { startLoading, stopLoading } = useLoading();
  const { user } = useUser();

  return async (params: Params) => {
    startLoading?.();

    const accessToken = await user?.getIdToken();
    const response = await fetchApi({
      ...params,
      headers: {
        ...params.headers,
        Authorization: `Bearer ${accessToken}`
      }
    });

    stopLoading?.();
    return response;
  };
};
