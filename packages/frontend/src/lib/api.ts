const BASE_URL = '/api';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: { message: res.statusText } }));
    throw new Error(error.error?.message || 'API request failed');
  }
  const json = await res.json();
  return json.data;
}

export const api = {
  getTheme: () => fetchApi<import('@playbook/shared').ThemeConfig>('/themes/active'),
  getCourses: () => fetchApi<import('@playbook/shared').CourseConfig[]>('/courses'),
  getCourse: (slug: string) =>
    fetchApi<{ course: import('@playbook/shared').CourseConfig; navTree: import('@playbook/shared').CourseNavTree }>(
      `/courses/${slug}`
    ),
  getLesson: (courseSlug: string, moduleSlug: string, lessonSlug: string) =>
    fetchApi<import('@playbook/shared').LessonContent>(
      `/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}`
    ),
  getGlossary: (courseSlug: string) =>
    fetchApi<import('@playbook/shared').GlossaryEntry[]>(`/courses/${courseSlug}/glossary`),
  getKnowledgeCheck: (courseSlug: string, moduleSlug: string) =>
    fetchApi<import('@playbook/shared').KnowledgeCheckConfig>(
      `/courses/${courseSlug}/modules/${moduleSlug}/knowledge-check`
    ),
};
