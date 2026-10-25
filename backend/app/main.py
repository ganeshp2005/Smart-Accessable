"""
Amazon One - FastAPI Application Server
Provides REST API endpoints with SQLite database persistence for:
- AI assistant chat history
- User favorites and bookmarks
- Shopping cart items
- Marketplace product listings
- Smart home device states
- Agent action plan records
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import datetime

from app.services_data import SERVICES_DATA, SERVICE_CATEGORIES
from app.database import (
    init_db,
    save_chat_message,
    get_chat_history,
    clear_chat_history,
    save_favorite,
    get_favorites,
    remove_favorite,
    save_cart_item,
    get_cart_items,
    remove_cart_item,
    clear_cart,
    save_product,
    get_products,
    delete_product,
    get_all_device_states,
    update_device_state,
    save_action_plan_record,
    get_action_plans_history,
    DB_PATH,
)

# Initialize database tables on startup
init_db()

app = FastAPI(
    title="Amazon One Unified Ecosystem API",
    description="Independent hackathon prototype backend with SQLite persistence for discovery across Amazon services.",
    version="1.1.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request / Response Schemas
class AssistantRequest(BaseModel):
    message: str
    context: Optional[dict] = None
    sessionId: Optional[str] = "default"


class RecommendationRequest(BaseModel):
    interests: List[str]


class FavoriteRequest(BaseModel):
    serviceId: str
    userId: Optional[str] = "guest"


class CartItemRequest(BaseModel):
    id: str
    name: str
    price: float
    quantity: Optional[int] = 1
    category: Optional[str] = ""
    image: Optional[str] = ""
    userId: Optional[str] = "guest"


class ProductRequest(BaseModel):
    id: Optional[str] = None
    title: str
    category: str
    price: float
    condition: Optional[str] = "Brand New"
    specs: Optional[Dict[str, Any]] = None
    image: Optional[str] = ""
    userId: Optional[str] = "guest"


class DeviceStateRequest(BaseModel):
    state: str


# 1. Services Endpoints
@app.get("/api/services")
def get_services(category: Optional[str] = None, q: Optional[str] = None):
    results = SERVICES_DATA
    if category and category != "All":
        results = [s for s in results if s["category"].lower() == category.lower()]
    if q:
        query = q.lower()
        results = [
            s for s in results
            if query in s["name"].lower()
            or query in s["description"].lower()
            or query in s["tagline"].lower()
            or query in s["category"].lower()
        ]
    return {
        "services": results,
        "count": len(results),
        "categories": SERVICE_CATEGORIES
    }


@app.get("/api/services/{service_id}")
def get_service_by_id(service_id: str):
    found = next((s for s in SERVICES_DATA if s["id"] == service_id), None)
    if not found:
        raise HTTPException(status_code=404, detail=f"Service with id '{service_id}' was not found.")
    return found


# 2. AI Service Discovery Assistant Endpoint with SQLite Persistence
@app.post("/api/assistant")
def ask_assistant(req: AssistantRequest):
    query = req.message.lower().strip()
    session_id = req.sessionId or "default"
    reply = ""
    matched_services = []

    # Natural language discovery logic
    if any(k in query for k in ["grocer", "vegetable", "fruit", "food", "milk", "fresh"]):
        matched_services = [s for s in SERVICES_DATA if s["id"] == "amazon-fresh"]
        reply = "For ordering groceries, fresh organic produce, and pantry staples with same-day 2-hour delivery, Amazon Fresh is your dedicated service."

    elif any(k in query for k in ["audiobook", "listen to book", "narrat", "audible", "podcast"]):
        matched_services = [s for s in SERVICES_DATA if s["id"] in ["audible", "amazon-music"]]
        reply = "For audiobooks, bestselling narration, and exclusive spoken-word audio, Audible is Amazon's flagship platform. For podcasts and streaming songs, you can also explore Amazon Music."

    elif any(k in query for k in ["song", "music", "kannada", "hindi", "playlist", "album", "artist"]):
        matched_services = [s for s in SERVICES_DATA if s["id"] == "amazon-music"]
        reply = "Amazon Music provides over 100 million songs in lossless Ultra HD and spatial audio, with curated regional Indian playlists including Kannada, Hindi, and global hits."

    elif any(k in query for k in ["host", "website", "cloud", "server", "compute", "ec2", "s3", "storage", "devops"]):
        matched_services = [s for s in SERVICES_DATA if s["id"] == "aws"]
        reply = "For hosting websites, managing virtual compute instances (EC2), and object storage (S3), Amazon Web Services (AWS) is the world's most comprehensive cloud infrastructure."

    elif any(k in query for k in ["publish", "author", "write", "paperback", "royalt", "kdp"]):
        matched_services = [s for s in SERVICES_DATA if s["id"] == "kdp"]
        reply = "You can self-publish digital e-books and physical print-on-demand paperbacks for free using Kindle Direct Publishing (KDP), earning up to 70% royalties globally."

    elif any(k in query for k in ["smart", "device", "echo", "alexa", "home", "light", "speaker"]):
        matched_services = [s for s in SERVICES_DATA if s["id"] in ["alexa-echo", "fire-tv"]]
        reply = "Alexa & Echo devices allow you to control smart-home lights, thermostats, and routines hands-free using conversational voice commands."

    elif any(k in query for k in ["pay", "wallet", "checkout", "card", "transaction", "upi"]):
        matched_services = [s for s in SERVICES_DATA if s["id"] == "amazon-pay"]
        reply = "Amazon Pay provides safe, 1-click checkout across partner merchants online using your stored Amazon billing methods and A-to-z buyer guarantees."

    elif any(k in query for k in ["movie", "show", "series", "video", "cinema", "prime video"]):
        matched_services = [s for s in SERVICES_DATA if s["id"] == "prime-video"]
        reply = "Prime Video offers award-winning original shows, 4K blockbuster movies, and live sports included with your Prime membership."

    else:
        # Generic match based on keywords
        scored = []
        for s in SERVICES_DATA:
            score = 0
            for word in query.split():
                if len(word) > 2 and word in (s["name"] + " " + s["description"] + " " + s["tagline"]).lower():
                    score += 1
            if score > 0:
                scored.append((score, s))
        scored.sort(key=lambda x: x[0], reverse=True)

        if scored:
            matched_services = [item[1] for item in scored[:2]]
            reply = f"Based on your inquiry, {matched_services[0]['name']} is a strong fit. Here is how it can assist your goal:"
        else:
            matched_services = [s for s in SERVICES_DATA if s["isFeatured"]][:3]
            reply = "I am your Amazon One AI concierge. I can guide you to the exact service across Shopping, Payments, Cloud, Smart Devices, or Entertainment for any task. Try asking: 'Where can I listen to audiobooks?' or 'Which service hosts websites?'"

    # Persist user inquiry and assistant reply to SQLite
    user_msg_id = save_chat_message("user", req.message, session_id=session_id)
    asst_msg_id = save_chat_message("assistant", reply, matched_services=matched_services, session_id=session_id)

    return {
        "reply": reply,
        "matchedServices": matched_services,
        "timestamp": datetime.datetime.now().strftime("%I:%M %p"),
        "source": "Amazon One AI Engine (SQLite Persisted)",
        "messageId": asst_msg_id,
        "userMessageId": user_msg_id,
        "suggestedQueries": [
            "Which Amazon service can help me buy groceries?",
            "Where can I listen to audiobooks?",
            "Which service is useful for hosting my website?",
            "How can I publish my own book?",
            "Which Amazon service can help me manage smart-home devices?"
        ]
    }


@app.get("/api/assistant/history")
def get_assistant_history(sessionId: str = "default", limit: int = 50):
    """Retrieve persistent conversation history from SQLite."""
    history = get_chat_history(session_id=sessionId, limit=limit)
    return {"history": history, "count": len(history), "sessionId": sessionId}


@app.delete("/api/assistant/history")
def clear_assistant_history(sessionId: str = "default"):
    """Clear chat conversation from SQLite."""
    clear_chat_history(session_id=sessionId)
    return {"status": "cleared", "sessionId": sessionId}


# 3. User Favorites Endpoints (SQLite Persisted)
@app.get("/api/favorites")
def get_user_favorites(userId: str = "guest"):
    return {"favorites": get_favorites(user_id=userId)}


@app.post("/api/favorites")
def add_favorite(req: FavoriteRequest):
    save_favorite(service_id=req.serviceId, user_id=req.userId or "guest")
    return {"status": "saved", "serviceId": req.serviceId}


@app.delete("/api/favorites/{service_id}")
def delete_favorite(service_id: str, userId: str = "guest"):
    remove_favorite(service_id=service_id, user_id=userId)
    return {"status": "removed", "serviceId": service_id}


# 4. Shopping Cart Endpoints (SQLite Persisted)
@app.get("/api/cart")
def get_cart(userId: str = "guest"):
    items = get_cart_items(user_id=userId)
    total = sum(item["price"] * item["quantity"] for item in items)
    return {"items": items, "count": len(items), "total": round(total, 2)}


@app.post("/api/cart")
def add_or_update_cart(req: CartItemRequest):
    result = save_cart_item(req.model_dump(), user_id=req.userId or "guest")
    return result


@app.delete("/api/cart/{item_id}")
def delete_cart_item(item_id: str, userId: str = "guest"):
    remove_cart_item(item_id=item_id, user_id=userId)
    return {"status": "removed", "itemId": item_id}


@app.delete("/api/cart")
def empty_cart(userId: str = "guest"):
    clear_cart(user_id=userId)
    return {"status": "cleared"}


# 5. Marketplace Products Endpoints (SQLite Persisted)
@app.get("/api/products")
def list_products(userId: Optional[str] = None):
    return {"products": get_products(user_id=userId)}


@app.post("/api/products")
def create_product(req: ProductRequest):
    result = save_product(req.model_dump(), user_id=req.userId or "guest")
    return result


@app.delete("/api/products/{product_id}")
def remove_product(product_id: str):
    delete_product(product_id=product_id)
    return {"status": "deleted", "id": product_id}


# 6. Smart Home Devices Endpoints (SQLite Persisted)
@app.get("/api/devices")
def get_devices():
    return {"deviceStates": get_all_device_states()}


@app.post("/api/devices/{device_id}")
def set_device_state(device_id: str, req: DeviceStateRequest):
    updated = update_device_state(device_id=device_id, state=req.state)
    return {"deviceId": device_id, "state": updated}


# 7. Agent Action Plans History (SQLite Persisted)
@app.get("/api/plans")
def get_plans_history(limit: int = 20):
    return {"plans": get_action_plans_history(limit=limit)}


# 8. Personalized Recommendations
@app.post("/api/recommendations")
def get_recommendations(req: RecommendationRequest):
    user_interests = [i.lower() for i in req.interests]
    recommended = []

    for service in SERVICES_DATA:
        if service["category"].lower() in user_interests:
            recommended.append(service)

    if not recommended:
        recommended = [s for s in SERVICES_DATA if s["isFeatured"]]

    return {
        "recommendations": recommended,
        "selectedInterests": req.interests
    }


# 9. Dashboard Summary Metrics
@app.get("/api/dashboard")
def get_dashboard_summary():
    return {
        "appName": "Amazon One",
        "totalServices": len(SERVICES_DATA),
        "categoriesCount": len(SERVICE_CATEGORIES) - 1,
        "activeServices": 7,
        "simulatedSavings": "$124.50",
        "database": {
            "type": "SQLite 3",
            "path": DB_PATH,
            "status": "connected"
        },
        "mockRecentActivity": [
            {"service": "Prime Video", "action": "Watched Fallout S1:E4", "time": "2 hours ago"},
            {"service": "Amazon Shopping", "action": "Order #403-912 Delivered", "time": "Yesterday"},
            {"service": "Kindle", "action": "Read 24 pages of Atomic Habits", "time": "2 days ago"},
            {"service": "Amazon Music", "action": "Streamed Discovery Weekly", "time": "3 days ago"}
        ]
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "Amazon One Backend",
        "version": "1.1.0",
        "database": "SQLite (Connected)",
        "dbPath": DB_PATH
    }
