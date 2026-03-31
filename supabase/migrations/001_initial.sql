-- ============================================================
-- CollegeConnekt — Initial Schema
-- ============================================================

-- ---- Extensions ----
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
create table if not exists public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  email             text,
  first_name        text,
  last_name         text,
  graduation_year   int,
  gpa               numeric(3,2),
  test_type         text check (test_type in ('SAT','ACT')),
  test_score        int,
  intended_major    text,
  state             text,
  plan              text not null default 'free' check (plan in ('free','student','student_pro')),
  has_tutor         boolean not null default false,
  onboarding_step   int check (onboarding_step in (1,2,3)),  -- null = onboarding complete
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role can do anything (for edge functions)
create policy "Service role full access to profiles"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- ============================================================
-- TRIGGER: create profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, onboarding_step)
  values (new.id, new.email, 1)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- EXTRACURRICULARS
-- ============================================================
create table if not exists public.extracurriculars (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  category      text not null,
  title         text not null,
  years         int not null default 1,
  is_leadership boolean not null default false,
  deleted_at    timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists extracurriculars_user_id_idx on public.extracurriculars(user_id);

alter table public.extracurriculars enable row level security;

create policy "Users own their extracurriculars"
  on public.extracurriculars for all
  using (auth.uid() = user_id);

create policy "Service role full access to extracurriculars"
  on public.extracurriculars for all
  using (auth.role() = 'service_role');

-- ============================================================
-- SCHOOLS  (populated via seed / admin import)
-- ============================================================
create table if not exists public.schools (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  state           text,
  acceptance_rate numeric(5,2),
  gpa_lo          numeric(3,2),
  gpa_hi          numeric(3,2),
  sat_lo          int,
  sat_hi          int,
  act_lo          int,
  act_hi          int,
  majors          text[],           -- array of offered majors
  cds_data        jsonb,            -- raw Common Data Set fields
  avg_net_price   int,              -- annual cost after aid
  in_state_tuition int,
  out_state_tuition int,
  created_at      timestamptz not null default now()
);

create index if not exists schools_name_idx on public.schools using gin(to_tsvector('english', name));
create index if not exists schools_state_idx on public.schools(state);

alter table public.schools enable row level security;

-- Everyone can read schools
create policy "Public read schools"
  on public.schools for select
  using (true);

create policy "Service role full access to schools"
  on public.schools for all
  using (auth.role() = 'service_role');

-- ============================================================
-- SAVED_SCHOOLS
-- ============================================================
create table if not exists public.saved_schools (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  school_id   uuid not null references public.schools(id) on delete cascade,
  added_at    timestamptz not null default now(),
  unique(user_id, school_id)
);

create index if not exists saved_schools_user_id_idx on public.saved_schools(user_id);

alter table public.saved_schools enable row level security;

create policy "Users own their saved schools"
  on public.saved_schools for all
  using (auth.uid() = user_id);

create policy "Service role full access to saved_schools"
  on public.saved_schools for all
  using (auth.role() = 'service_role');

-- ============================================================
-- SCHOOL_DEADLINES
-- ============================================================
create table if not exists public.school_deadlines (
  id          uuid primary key default uuid_generate_v4(),
  school_id   uuid not null references public.schools(id) on delete cascade,
  label       text not null,        -- e.g. "Early Decision", "Regular Decision"
  due_date    date not null,
  created_at  timestamptz not null default now()
);

create index if not exists school_deadlines_school_id_idx on public.school_deadlines(school_id);

alter table public.school_deadlines enable row level security;

create policy "Public read deadlines"
  on public.school_deadlines for select
  using (true);

create policy "Service role full access to school_deadlines"
  on public.school_deadlines for all
  using (auth.role() = 'service_role');

-- ============================================================
-- FIT_SCORES
-- ============================================================
create table if not exists public.fit_scores (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  school_id           uuid not null references public.schools(id) on delete cascade,
  overall_score       int,
  academic_fit        int,
  major_availability  int,
  location_fit        int,
  financial_fit       int,
  profile_completeness int,
  generated_at        timestamptz not null default now(),
  unique(user_id, school_id)
);

create index if not exists fit_scores_user_id_idx on public.fit_scores(user_id);

alter table public.fit_scores enable row level security;

create policy "Users own their fit scores"
  on public.fit_scores for all
  using (auth.uid() = user_id);

create policy "Service role full access to fit_scores"
  on public.fit_scores for all
  using (auth.role() = 'service_role');

-- ============================================================
-- ACTION_PLAN
-- ============================================================
create table if not exists public.action_plan (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  school_id       uuid references public.schools(id) on delete set null,
  title           text not null,
  description     text,
  why_it_matters  text,
  priority        text not null default 'medium' check (priority in ('high','medium','low')),
  due_month       text,             -- e.g. "November 2025"
  status          text not null default 'pending' check (status in ('pending','completed')),
  completed_at    timestamptz,
  created_at      timestamptz not null default now()
);

create index if not exists action_plan_user_id_idx on public.action_plan(user_id);
create index if not exists action_plan_status_idx on public.action_plan(user_id, status);

alter table public.action_plan enable row level security;

create policy "Users own their action plan"
  on public.action_plan for all
  using (auth.uid() = user_id);

create policy "Service role full access to action_plan"
  on public.action_plan for all
  using (auth.role() = 'service_role');

-- ============================================================
-- ESSAY_REVIEWS
-- ============================================================
create table if not exists public.essay_reviews (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  school_id   uuid references public.schools(id) on delete set null,
  essay_text  text not null,
  feedback    jsonb not null default '{}',  -- {strengths[], improvements[], suggestions[]}
  created_at  timestamptz not null default now()
);

create index if not exists essay_reviews_user_id_idx on public.essay_reviews(user_id);

alter table public.essay_reviews enable row level security;

create policy "Users own their essay reviews"
  on public.essay_reviews for all
  using (auth.uid() = user_id);

create policy "Service role full access to essay_reviews"
  on public.essay_reviews for all
  using (auth.role() = 'service_role');

-- ============================================================
-- COMPARISONS  (cached AI comparison results)
-- ============================================================
create table if not exists public.comparisons (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  school_ids    uuid[] not null,
  result_text   text not null,
  generated_at  timestamptz not null default now()
);

create index if not exists comparisons_user_id_idx on public.comparisons(user_id);

alter table public.comparisons enable row level security;

create policy "Users own their comparisons"
  on public.comparisons for all
  using (auth.uid() = user_id);

create policy "Service role full access to comparisons"
  on public.comparisons for all
  using (auth.role() = 'service_role');

-- ============================================================
-- ACTIVITY_LOG
-- ============================================================
create table if not exists public.activity_log (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  event_type  text not null,    -- 'plan_upgraded', 'essay_reviewed', 'action_plan_generated', etc.
  metadata    jsonb default '{}',
  created_at  timestamptz not null default now()
);

create index if not exists activity_log_user_id_idx on public.activity_log(user_id);
create index if not exists activity_log_created_at_idx on public.activity_log(created_at desc);

alter table public.activity_log enable row level security;

create policy "Users can read their own activity"
  on public.activity_log for select
  using (auth.uid() = user_id);

create policy "Service role full access to activity_log"
  on public.activity_log for all
  using (auth.role() = 'service_role');

-- ============================================================
-- updated_at auto-update for profiles
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
