import pytest
from main import app
from fastapi.testclient import TestClient

# PYTHONPATH=. pytest

@pytest.fixture
def client():
    return TestClient(app)