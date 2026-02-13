-- Practitioners Playbook - Initial Schema
-- Creates all tables for user management, progress tracking, and platform settings.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users authenticated via OAuth
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    oauth_provider VARCHAR(50) NOT NULL,
    oauth_subject_id VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'learner' CHECK (role IN ('learner', 'admin')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_active_at TIMESTAMP,
    UNIQUE(oauth_provider, oauth_subject_id)
);

-- Pre-enrolled users (email list uploaded by admin before users log in)
CREATE TABLE pre_enrolled_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    enrolled_at TIMESTAMP NOT NULL DEFAULT NOW(),
    enrolled_by UUID REFERENCES users(id)
);

-- Course-level progress per user
CREATE TABLE course_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_slug VARCHAR(100) NOT NULL,
    current_module_slug VARCHAR(100),
    current_lesson_slug VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    total_time_seconds INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_id, course_slug)
);

-- Lesson-level progress per user
CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_slug VARCHAR(100) NOT NULL,
    module_slug VARCHAR(100) NOT NULL,
    lesson_slug VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    first_viewed_at TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, course_slug, module_slug, lesson_slug)
);

-- Knowledge check results
CREATE TABLE knowledge_check_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_slug VARCHAR(100) NOT NULL,
    module_slug VARCHAR(100) NOT NULL,
    question_id VARCHAR(100) NOT NULL,
    selected_answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Content feedback from admin reviewers
CREATE TABLE content_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_slug VARCHAR(100) NOT NULL,
    module_slug VARCHAR(100),
    lesson_slug VARCHAR(100),
    feedback_text TEXT NOT NULL,
    is_resolved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Platform settings (key-value store for AI config, theme, etc.)
CREATE TABLE platform_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_course_progress_user ON course_progress(user_id);
CREATE INDEX idx_course_progress_status ON course_progress(status);
CREATE INDEX idx_lesson_progress_user_course ON lesson_progress(user_id, course_slug);
CREATE INDEX idx_knowledge_check_user ON knowledge_check_results(user_id, course_slug);
CREATE INDEX idx_content_feedback_course ON content_feedback(course_slug);
CREATE INDEX idx_users_email ON users(email);
