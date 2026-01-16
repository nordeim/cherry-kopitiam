-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
DO $$ BEGIN
    CREATE TYPE order_status AS ENUM (
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'completed',
        'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create enum type for categories
DO $$ BEGIN
    CREATE TYPE product_category AS ENUM (
        'coffee',
        'tea',
        'food',
        'beverage'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create enum type for consent types
DO $$ BEGIN
    CREATE TYPE pdpa_consent_type AS ENUM (
        'order_processing',
        'marketing',
        'analytics'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
