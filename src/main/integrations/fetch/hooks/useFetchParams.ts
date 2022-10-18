import { useUser } from '../../firebase/components/UserProvider';
import { Params } from '../fetchApi';

export const useFetchParams = () => {
  const { user } = useUser();

  const getParamsWithAuthorization = async (params: Params) => {
    const accessToken = await user?.getIdToken();

    return {
      ...params,
      headers: {
        ...params.headers,
        Authorization: `Bearer ${accessToken}`
      }
    };
  };

  return { getParamsWithAuthorization };
};
