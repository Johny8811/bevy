import { useRemoteConfig } from '../components/RemoteConfigProvider';
import { useUser } from '../components/UserProvider';
import { ROLES } from '../constants';

export const useHasRole = () => {
  const { userRoles } = useRemoteConfig();
  const { user } = useUser();

  return (role: ROLES) => {
    const roles = userRoles ? userRoles[user?.uid || ''] : [];

    if (role === 'user' && roles.length === 0) {
      return true;
    }

    return roles.includes(role);
  };
};
