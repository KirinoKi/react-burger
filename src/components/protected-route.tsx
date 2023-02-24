import { ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../services/store';

type IProtectedRoute = {
  children?: React.ReactNode;
} & RouteProps;

export function ProtectedRoute ({ children, ...rest }: IProtectedRoute) {
  const user = useSelector(store => store.auth.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
