import { useRemoteConfig } from '../components/RemoteConfigProvider';
import { useUser } from '../components/UserProvider';
import { ROLES } from '../constants';

export const useHasRole = () => {
  const { usersRoles } = useRemoteConfig();
  const { user } = useUser();

  return (role: ROLES) => {
    if (usersRoles && user) {
      // TODO: investigate typing https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression
      const roles = usersRoles[user?.uid] ? usersRoles[user.uid] : [];

      if (role === 'user' && roles.length === 0) {
        return true;
      }

      return roles.includes(role);
    }

    return false;
  };
};
