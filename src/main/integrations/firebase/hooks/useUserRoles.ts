import { useRemoteConfig } from '../components/RemoteConfigProvider';
import { useUser } from '../components/UserProvider';

export const useUserRoles = () => {
  const { usersRoles } = useRemoteConfig();
  const { user } = useUser();

  return usersRoles && user && usersRoles[user?.uid];
};
