-- ============================================================================
-- MORNING BREW COLLECTIVE - PostgreSQL Initialization
-- Singapore Compliance: DECIMAL precision for GST, PDPA tables
-- ============================================================================

-- Set Singapore locale and timezone
SET timezone = 'Asia/Singapore';
SET lc_monetary = 'en_SG.UTF-8';

-- Create extensions for Singapore compliance
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Enable statement tracking for Singapore audit compliance
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET pg_stat_statements.track = 'all';
ALTER SYSTEM SET pg_stat_statements.max = 10000;

-- Configure Singapore-specific database settings
ALTER DATABASE morning_brew SET timezone TO 'Asia/Singapore';
ALTER DATABASE morning_brew SET lc_monetary TO 'en_SG.UTF-8';
ALTER DATABASE morning_brew SET lc_numeric TO 'en_SG.UTF-8';

-- Create role for Singapore application access
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'kopitiam_app') THEN
        CREATE ROLE kopitiam_app WITH NOLOGIN;
    END IF;
END
$$;

-- Grant necessary permissions
GRANT CONNECT ON DATABASE morning_brew TO kopitiam;
GRANT ALL PRIVILEGES ON DATABASE morning_brew TO kopitiam;
GRANT kopitiam_app TO kopitiam;

-- Set search path
ALTER ROLE kopitiam SET search_path TO public;

-- Create schema for Singapore compliance data if needed
CREATE SCHEMA IF NOT EXISTS compliance;
GRANT USAGE ON SCHEMA compliance TO kopitiam_app;

-- Comment on database for Singapore compliance
COMMENT ON DATABASE morning_brew IS 'Morning Brew Collective - Singapore Kopitiam Digital Resurrection. GST: 9%, Currency: SGD, PDPA Compliant';
