import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactElement;
};

export function ProtectedRoute({ isAllowed, redirectPath = '/', children }: Props) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
}
