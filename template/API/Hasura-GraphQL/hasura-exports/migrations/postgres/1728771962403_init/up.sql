SET check_function_bodies = false;
CREATE SCHEMA IF NOT EXISTS hdb_catalog;
COMMENT ON SCHEMA public IS '';
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

CREATE OR REPLACE FUNCTION hdb_catalog.gen_hasura_uuid() RETURNS uuid AS
$$SELECT gen_random_uuid()$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger AS
$$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.set_is_author() RETURNS trigger AS
$$
BEGIN
  IF (SELECT taxonomy_type FROM public.taxonomy WHERE id = NEW.taxonomy_id) = 'author' THEN
    NEW.is_author = TRUE;
  ELSE
    NEW.is_author = FALSE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS hdb_catalog.hdb_action_log (
    id uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    action_name text,
    input_payload jsonb NOT NULL,
    request_headers jsonb NOT NULL,
    session_variables jsonb NOT NULL,
    response_payload jsonb,
    errors jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    response_received_at timestamp with time zone,
    status text NOT NULL,
    CONSTRAINT hdb_action_log_status_check CHECK ((status = ANY (ARRAY['created'::text, 'processing'::text, 'completed'::text, 'error'::text])))
);

CREATE TABLE IF NOT EXISTS hdb_catalog.hdb_cron_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hdb_catalog.hdb_cron_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    trigger_name text NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);

CREATE TABLE IF NOT EXISTS hdb_catalog.hdb_metadata (
    id integer NOT NULL,
    metadata json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL
);

CREATE TABLE IF NOT EXISTS hdb_catalog.hdb_scheduled_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hdb_catalog.hdb_scheduled_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    webhook_conf json NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    retry_conf json,
    payload json,
    header_conf json,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    comment text,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);

CREATE TABLE IF NOT EXISTS hdb_catalog.hdb_schema_notifications (
    id integer NOT NULL,
    notification json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL,
    instance_id uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT hdb_schema_notifications_id_check CHECK ((id = 1))
);

CREATE TABLE IF NOT EXISTS hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    ee_client_id text,
    ee_client_secret text
);

CREATE TABLE public.authors (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    born integer,
    died integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.book_genres (
    book_id uuid NOT NULL,
    genre_id uuid NOT NULL
);
CREATE TABLE public.book_tags (
    book_id uuid NOT NULL,
    tag_id uuid NOT NULL
);
CREATE TABLE public.books (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    published_year integer,
    pages integer,
    isbn character varying(13),
    language character varying(10),
    series_name text,
    series_volume integer,
    user_id uuid NOT NULL,
    author_id uuid NOT NULL
);
CREATE TABLE public.genres (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.tags (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true,
    role text DEFAULT 'user'::text
);

-- 
CREATE OR REPLACE FUNCTION create_constraint_if_not_exists(
    schema_name TEXT,
    table_name TEXT,
    constraint_name TEXT,
    constraint_definition TEXT
) RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = constraint_name) THEN
        EXECUTE format('ALTER TABLE ONLY %I.%I ADD CONSTRAINT %I %s',
                       schema_name, table_name, constraint_name, constraint_definition);
    END IF;
END;
$$ LANGUAGE plpgsql;


DO $$
BEGIN
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_action_log', 'hdb_action_log_pkey', 'PRIMARY KEY (id)');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_cron_event_invocation_logs', 'hdb_cron_event_invocation_logs_pkey', 'PRIMARY KEY (id)');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_cron_events', 'hdb_cron_events_pkey', 'PRIMARY KEY (id)');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_metadata', 'hdb_metadata_pkey', 'PRIMARY KEY (id)');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_metadata', 'hdb_metadata_resource_version_key', 'UNIQUE (resource_version)');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_scheduled_event_invocation_logs', 'hdb_scheduled_event_invocation_logs_pkey', 'PRIMARY KEY (id)');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_scheduled_events', 'hdb_scheduled_events_pkey', 'PRIMARY KEY (id)');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_schema_notifications', 'hdb_schema_notifications_pkey', 'PRIMARY KEY (id)');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_version', 'hdb_version_pkey', 'PRIMARY KEY (hasura_uuid)');
END $$;


ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_name_key UNIQUE (name);
ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT book_genres_pkey PRIMARY KEY (book_id, genre_id);
ALTER TABLE ONLY public.book_tags
    ADD CONSTRAINT book_tags_pkey PRIMARY KEY (book_id, tag_id);
ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_title_author_id_key UNIQUE (title, author_id);
ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);
ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);
ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


CREATE INDEX IF NOT EXISTS hdb_cron_event_invocation_event_id ON hdb_catalog.hdb_cron_event_invocation_logs USING btree (event_id);
CREATE INDEX IF NOT EXISTS hdb_cron_event_status ON hdb_catalog.hdb_cron_events USING btree (status);
CREATE UNIQUE INDEX IF NOT EXISTS hdb_cron_events_unique_scheduled ON hdb_catalog.hdb_cron_events USING btree (trigger_name, scheduled_time) WHERE (status = 'scheduled'::text);
CREATE INDEX IF NOT EXISTS hdb_scheduled_event_status ON hdb_catalog.hdb_scheduled_events USING btree (status);
CREATE UNIQUE INDEX IF NOT EXISTS hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


CREATE TRIGGER set_public_authors_updated_at BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_books_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_genres_updated_at BEFORE UPDATE ON public.genres FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


DO $$
BEGIN
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_cron_event_invocation_logs', 'hdb_cron_event_invocation_logs_event_id_fkey', 
        'FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_cron_events(id) ON UPDATE CASCADE ON DELETE CASCADE');
    PERFORM create_constraint_if_not_exists('hdb_catalog', 'hdb_scheduled_event_invocation_logs', 'hdb_scheduled_event_invocation_logs_event_id_fkey', 
        'FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_scheduled_events(id) ON UPDATE CASCADE ON DELETE CASCADE');
END $$;


ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT book_genres_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT book_genres_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.book_tags
    ADD CONSTRAINT book_tags_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.book_tags
    ADD CONSTRAINT book_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE RESTRICT;
ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE RESTRICT;