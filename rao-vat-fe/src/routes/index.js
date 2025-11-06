import { createBrowserRouter } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';

const routes = [
    ...HomeRoutes,
];

const router = createBrowserRouter(routes);

export default router;