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
            

            await conn.execute(usersTable)


            await conn.close()

            print("Created All Tables!")
            break

        except Exception as e:
            print(
                f"Attempt {attempt+1}/{max_retries}: Database not ready, retrying in {retry_delay}s..."
            )
            await asyncio.sleep(retry_delay)


asyncio.run(init_db())