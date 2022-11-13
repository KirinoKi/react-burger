import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../services/store';

interface IProtectedRoute {
  children?: ReactNode;
  path: string
}

export function ProtectedRoute({ children, ...rest }: IProtectedRoute) {
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
