CREATE TABLE IF NOT EXISTS superhero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    superpower TEXT NOT NULL,
    humility_score INT CHECK (humility_score BETWEEN 1 AND 10) NOT NULL
);