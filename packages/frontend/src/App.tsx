import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CourseProvider } from './context/CourseContext';
import { GlossaryProvider } from './context/GlossaryContext';
import AppShell from './components/layout/AppShell';
import CourseOverview from './pages/CourseOverview';
import LessonPage from './pages/LessonPage';
import KnowledgeCheckPage from './pages/KnowledgeCheckPage';
import GlossaryFullPage from './pages/GlossaryFullPage';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/courses/aomt-playbook" replace />} />
        <Route
          path="/courses/:slug"
          element={
            <CourseProvider>
              <GlossaryProvider>
                <AppShell />
              </GlossaryProvider>
            </CourseProvider>
          }
        >
          <Route index element={<CourseOverview />} />
          <Route
            path="modules/:moduleSlug/lessons/:lessonSlug"
            element={<LessonPage />}
          />
          <Route
            path="modules/:moduleSlug/knowledge-check"
            element={<KnowledgeCheckPage />}
          />
          <Route path="glossary" element={<GlossaryFullPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
