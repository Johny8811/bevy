import { Methods } from '../integrations/fetch/fetchApi';
import { useFetchBackend } from '../integrations/fetch/hooks/useFetchBackend';
import { UPDATE_USER_INFO } from '../integrations/fetch/endpoints';

type Body = {
  userId: string;
  displayName: string;
  photoURL: string;
  email: string;
};

export const useUpdateUserInfoQuery = () => {
  const fetchBackend = useFetchBackend();

  return (body: Body) => {
    return fetchBackend({
      method: Methods.put,
      url: UPDATE_USER_INFO,
      body
    });
  };
};
