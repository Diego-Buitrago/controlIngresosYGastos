import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../ErrorPage';
import { Login } from '../notAuth';

import { AuthLayout, Dashboard, ExpenseType, Expenses, Income, Users } from '../auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute >
        <Login />
      </PublicRoute>        
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: (
      <PrivateRoute >
        <AuthLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <Dashboard />
        )
      },
      {
        path: "income",
        element: <Income />
      },
      {
        path: "expenses",
        element: <Expenses />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "expenseType",
        element: <ExpenseType />
      }
    ]
  },
]);

/* export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <CompleteListPage />
      },
      {
        path: "login",
        element: (
          <PublicRoute isAuthenticated={isAuthenticated}>
            <h2>Login Page</h2>
          </PublicRoute>
        )
      },
    ]
  },
  {
    path: "/app",
    element: (
      <PrivateRoute isAuthenticated={isAuthenticated}>
        <StoreLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "men",
        element: <MensPage />
      },
      {
        path: "women",
        element: <WomensPage />
      },
      {
        path: "new",
        element: <NewProduct />
      },
      {
        path: "product/:id",
        element: <ProductById />
      },
    ]
  }
]); */