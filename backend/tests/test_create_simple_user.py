
def test_create_user(client):
    body = {"name": "jo", "email": "jo@example.com"}
    response = client.post("/user", json = body)

    assert response.status_code == 201

    print(response.json())