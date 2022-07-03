type Roles = 'admin' | 'dispatcher' | 'user';

type Permissions = 'permissions_one' | 'permissions_two';

export type User = {
  id: string;
  name: string;
  permissions: Permissions[];
  roles: Roles[];
};

// TODO: just test user, remove after real data will be available
export const TEST_USER: User = {
  id: '1',
  name: 'robin',
  permissions: ['permissions_one'],
  roles: ['admin']
};
