"""Backend tests for Rampura Temple API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://cauvery-heritage.preview.emergentagent.com").rstrip("/")


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Health ----------------
class TestHealth:
    def test_health_ok(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/health", timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d.get("status") == "ok"


# ---------------- Events Registration ----------------
class TestEventRegistration:
    def test_register_valid(self, api_client):
        payload = {
            "name": "TEST_Ravi Kumar",
            "phone": "+91 9876543210",
            "attendees": 2,
            "event_id": "praana-pratishtha-2026",
            "event_title": "Vidya Hayagreeva Praana Pratishtha",
            "email": "test_ravi@example.com",
            "message": "Sankalpa for family"
        }
        r = api_client.post(f"{BASE_URL}/api/events/register", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["attendees"] == 2
        assert data["event_id"] == payload["event_id"]

        # GET persistence verification
        g = api_client.get(f"{BASE_URL}/api/events/registrations", params={"event_id": payload["event_id"]}, timeout=15)
        assert g.status_code == 200
        items = g.json()
        assert isinstance(items, list)
        assert any(it["id"] == data["id"] for it in items)

    def test_register_missing_required(self, api_client):
        # missing name, event_id, event_title
        r = api_client.post(f"{BASE_URL}/api/events/register", json={"phone": "9876543210"}, timeout=15)
        assert r.status_code == 422

    def test_register_invalid_phone_letters(self, api_client):
        payload = {
            "name": "TEST_Bad Phone",
            "phone": "abcdefg",
            "attendees": 1,
            "event_id": "ev-test",
            "event_title": "Test"
        }
        r = api_client.post(f"{BASE_URL}/api/events/register", json=payload, timeout=15)
        assert r.status_code == 422, r.text

    def test_list_registrations(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/events/registrations", timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_list_registrations_filter(self, api_client):
        # Create a unique event registration then filter
        eid = "TEST_filter_event_abc"
        payload = {
            "name": "TEST_Filter User",
            "phone": "9876543210",
            "attendees": 1,
            "event_id": eid,
            "event_title": "Filter test"
        }
        api_client.post(f"{BASE_URL}/api/events/register", json=payload, timeout=15)
        r = api_client.get(f"{BASE_URL}/api/events/registrations", params={"event_id": eid}, timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert all(it["event_id"] == eid for it in items)
        assert len(items) >= 1


# ---------------- Contact ----------------
class TestContact:
    def test_contact_valid(self, api_client):
        payload = {
            "name": "TEST_Sita",
            "email": "test_sita@example.com",
            "subject": "Sankalpa enquiry",
            "message": "Please share annadana details."
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["email"] == payload["email"]
        assert d["name"] == payload["name"]
        assert "id" in d

    def test_contact_invalid_email(self, api_client):
        payload = {
            "name": "TEST_Bad Email",
            "email": "not-an-email",
            "message": "hello there"
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=15)
        assert r.status_code == 422
