import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Layout } from './components/layout/Layout';
import { AllTasksPage } from './pages/AllTasksPage';
import { CompletedTasksPage } from './pages/CompletedTasksPage';

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<AllTasksPage />} />
            <Route path="/completed" element={<CompletedTasksPage />} />
          </Routes>
        </Layout>
      </TaskProvider>
    </BrowserRouter>
  );
}
