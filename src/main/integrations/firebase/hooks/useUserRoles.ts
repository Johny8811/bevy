import { useRemoteConfig } from '../components/RemoteConfigProvider';
import { useUser } from '../components/UserProvider';

export const useUserRoles = () => {
  const { userRoles } = useRemoteConfig();
  const { user } = useUser();

  return userRoles && user && userRoles[user?.uid];
};
