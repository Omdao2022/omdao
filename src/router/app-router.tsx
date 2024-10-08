import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import {
  ExchangePage,
  ProjectPage,
  ProjectsPage,
  RootLayout,
  ReferralPage,
  ReferralTransactionsPage,
  JoinUs
} from '../pages';
import { PATHS } from './constants';

export const appRouter = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.JOINUS,
        element: <JoinUs />,
      },
      {
        path: PATHS.EXCHANGE,
        element: <ExchangePage />,
      },
      {
        path: PATHS.ROOT,
        element: <ProjectsPage />,
      },
      {
        path: PATHS.PROJECTS,
        element: <ProjectsPage />,
      },
      {
        path: `${PATHS.PROJECTS}/:symbol`,
        element: <ProjectPage />,
        loader: ({ params }) => {
          if (!params.symbol) {
            return redirect(PATHS.ROOT);
          }

          return null;
        },
      },
      {
        path: `${PATHS.PROJECTS}/:symbol/:refcode`,
        element: <ProjectPage />,
        loader: ({ params }) => {
          if (!params.symbol) {
            return redirect(PATHS.ROOT);
          }

          return null;
        },
      },
      {
        path: `${PATHS.REFERRAL}/:refcode`,
        element: <ReferralPage />,
      },
      {
        path: `${PATHS.REFERRAL}/:refcode/:symbol`,
        element: <ReferralTransactionsPage />,
      },
      {
        path: "*",
        element: <Navigate to={PATHS.ROOT} replace />,
      },
    ],
  },
]);
