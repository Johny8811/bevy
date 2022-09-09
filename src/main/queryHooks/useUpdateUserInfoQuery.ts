import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { UPDATE_USER_INFO } from '../integrations/fetch/endpoints';

type Body = {
  userId: string;
  displayName: string;
  photoURL: string;
};

export const useUpdateUserInfoQuery = () => {
  const fetchBackend = useFetchBackend();

  return (body: Body) => {
    return fetchBackend({
      method: Methods.put,
      url: UPDATE_USER_INFO,
      // TODO: why our backend need to stringify body and onFleet no?
      body
    });
  };
};
