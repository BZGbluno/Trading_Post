import os
import asyncpg
import asyncio

# docker exec -it studyguider_db psql -U bruno -d mydb

max_retries = 10
retry_delay = 2

async def init_db():
    """
    Initializes and sets up the PostgreSQL database schema, including required tables and extensions.

    This function will attempt to connect to the database up to `max_retries` times,
    with a delay of `retry_delay` seconds between attempts. Once a connection is successfully
    established, it does the following:

    Table Schemas:
    ---------------

    """
    print(
        os.getenv("DATABASE_HOST"),
        os.getenv("DATABASE_NAME"),
        os.getenv("DATABASE_USER")
    )
    for attempt in range(max_retries):
        try:
            conn = await asyncpg.connect(
                host=os.getenv("DATABASE_HOST"),
                database=os.getenv("DATABASE_NAME"),
                user=os.getenv("DATABASE_USER"),
                password=os.getenv("DATABASE_PASSWORD"),
            )

            # attach pgvector onto our app
            # await conn.execute("CREATE EXTENSION IF NOT EXISTS vector;")


            usersTable = """
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    age INT,
                    created_at TIMESTAMP DEFAULT NOW(),
                    gender VARCHAR(50),
                    pant_size VARCHAR(50),
                    shoe_size VARCHAR(50),
                    shirt_size VARCHAR(50),
                    bio TEXT,
                    ISO TEXT,
                    followers INT default 0,
                    following INT default 0
                );
            """

            messagesTable = """
                CREATE TABLE IF NOT EXISTS messages (
                    id SERIAL PRIMARY KEY,
                    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    receiver_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    body TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW(),
                    delivered_at TIMESTAMP,
                    read_at TIMESTAMP
                );
            """

            messagesMigration = """
                ALTER TABLE messages
                    ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP,
                    ADD COLUMN IF NOT EXISTS read_at TIMESTAMP;
            """

            messagesIndex = """
                CREATE INDEX IF NOT EXISTS idx_messages_direct_thread
                ON messages (
                    LEAST(sender_id, receiver_id),
                    GREATEST(sender_id, receiver_id),
                    created_at DESC
                );
            """

            pushTokensTable = """
                CREATE TABLE IF NOT EXISTS push_tokens (
                    id SERIAL PRIMARY KEY,
                    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    token TEXT UNIQUE NOT NULL,
                    platform VARCHAR(20) NOT NULL,
                    provider VARCHAR(20) NOT NULL DEFAULT 'expo',
                    device_id TEXT,
                    is_active BOOLEAN NOT NULL DEFAULT TRUE,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    last_used_at TIMESTAMP
                );
            """

            pushTokensIndex = """
                CREATE INDEX IF NOT EXISTS idx_push_tokens_active_user
                ON push_tokens (user_id)
                WHERE is_active = TRUE;
            """

            pushNotificationJobsTable = """
                CREATE TABLE IF NOT EXISTS push_notification_jobs (
                    id SERIAL PRIMARY KEY,
                    message_id INT UNIQUE NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
                    recipient_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    status VARCHAR(20) NOT NULL DEFAULT 'pending',
                    attempts INT NOT NULL DEFAULT 0,
                    available_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    locked_at TIMESTAMP,
                    processed_at TIMESTAMP,
                    last_error TEXT,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    CONSTRAINT push_notification_jobs_status_check
                        CHECK (status IN ('pending', 'processing', 'sent', 'failed'))
                );
            """

            pushNotificationJobsIndex = """
                CREATE INDEX IF NOT EXISTS idx_push_notification_jobs_pending
                ON push_notification_jobs (available_at, id)
                WHERE status = 'pending';
            """
            

            await conn.execute(usersTable)
            await conn.execute(messagesTable)
            await conn.execute(messagesMigration)
            await conn.execute(messagesIndex)
            await conn.execute(pushTokensTable)
            await conn.execute(pushTokensIndex)
            await conn.execute(pushNotificationJobsTable)
            await conn.execute(pushNotificationJobsIndex)


            await conn.close()

            print("Created All Tables!")
            break

        except Exception as e:
            print(
                f"Attempt {attempt+1}/{max_retries}: {e}"
            )
            await asyncio.sleep(retry_delay)


asyncio.run(init_db())
