import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Layout } from './components/layout/Layout';
import { PageLoader } from './components/common/PageLoader';

const AllTasksPage = lazy(() =>
  import('./pages/AllTasksPage').then((m) => ({ default: m.AllTasksPage }))
);
const CompletedTasksPage = lazy(() =>
  import('./pages/CompletedTasksPage').then((m) => ({ default: m.CompletedTasksPage }))
);

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<AllTasksPage />} />
              <Route path="/completed" element={<CompletedTasksPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </TaskProvider>
    </BrowserRouter>
  );
}
