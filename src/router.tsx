import { createBrowserRouter, type RouteObject } from 'react-router'
import Layout from './components/Layout.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Settings from './pages/Settings.tsx'
import Transactions from './pages/Transactions.tsx'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
