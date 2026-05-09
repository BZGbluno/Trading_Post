
python create_tables.py

echo "Created tables, starting server..."

uvicorn main:app --host 0.0.0.0 --port 8000 --reload