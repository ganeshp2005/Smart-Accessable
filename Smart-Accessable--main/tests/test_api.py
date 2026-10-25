from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "Amazon One Backend"

def test_dashboard():
    response = client.get("/api/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert data["appName"] == "Amazon One"
    assert data["totalServices"] > 0
    assert "mockRecentActivity" in data

def test_get_services():
    response = client.get("/api/services")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] > 0
    assert len(data["services"]) == data["count"]
    assert "categories" in data

def test_get_services_filter_category():
    response = client.get("/api/services?category=Shopping")
    assert response.status_code == 200
    data = response.json()
    for s in data["services"]:
        assert s["category"].lower() == "shopping"

def test_get_service_by_id_found():
    response = client.get("/api/services/amazon-shopping")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "amazon-shopping"

def test_get_service_by_id_not_found():
    response = client.get("/api/services/nonexistent-xyz")
    assert response.status_code == 404

def test_assistant_query():
    payload = {"message": "Where can I buy fresh vegetables and groceries?"}
    response = client.post("/api/assistant", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert any(s["id"] == "amazon-fresh" for s in data["matchedServices"])

def test_recommendations():
    payload = {"interests": ["Entertainment", "Shopping"]}
    response = client.post("/api/recommendations", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "recommendations" in data
