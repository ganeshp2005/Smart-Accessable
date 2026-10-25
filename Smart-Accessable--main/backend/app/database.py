"""
SQLite Database Layer for AccessAble / Amazon One.
Stores assistant conversations, user favorites, cart items, marketplace products,
smart-home device states, and agent action plans.
"""

import sqlite3
import json
import os
from pathlib import Path
from typing import List, Dict, Any, Optional
from datetime import datetime


def get_db_path() -> str:
    """Finds or creates accessable.db in the workspace root."""
    if "SQLITE_DB_PATH" in os.environ:
        return os.environ["SQLITE_DB_PATH"]

    curr = Path(__file__).resolve().parent
    for _ in range(4):
        if (curr / "package.json").exists() or (curr / ".git").exists():
            return str(curr / "accessable.db")
        curr = curr.parent
    return str(Path.cwd() / "accessable.db")


DB_PATH = get_db_path()


def get_connection() -> sqlite3.Connection:
    """Creates a connection with Row factory enabled."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Initializes tables in the SQLite database if they do not exist."""
    conn = get_connection()
    with conn:
        cursor = conn.cursor()

        # 1. AI Assistant Chat History
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS assistant_conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT DEFAULT 'default',
                role TEXT NOT NULL,
                message TEXT NOT NULL,
                matched_services TEXT,
                timestamp TEXT NOT NULL
            )
        """)

        # 2. User Favorites (Bookmarked services)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT DEFAULT 'guest',
                service_id TEXT NOT NULL,
                created_at TEXT NOT NULL,
                UNIQUE(user_id, service_id)
            )
        """)

        # 3. User Shopping Cart
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_cart (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT DEFAULT 'guest',
                item_id TEXT NOT NULL,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER DEFAULT 1,
                category TEXT,
                image TEXT,
                updated_at TEXT NOT NULL,
                UNIQUE(user_id, item_id)
            )
        """)

        # 4. User Listed Marketplace Products
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_products (
                id TEXT PRIMARY KEY,
                user_id TEXT DEFAULT 'guest',
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                price REAL NOT NULL,
                condition TEXT DEFAULT 'Brand New',
                specs TEXT,
                image TEXT,
                created_at TEXT NOT NULL
            )
        """)

        # 5. Smart Home Device States
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS device_states (
                device_id TEXT PRIMARY KEY,
                state TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)

        # 6. Agent Action Plans History
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS agent_action_plans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_request TEXT NOT NULL,
                plan_json TEXT NOT NULL,
                status TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
        """)

        # Seed initial smart home device states if empty
        cursor.execute("SELECT COUNT(*) FROM device_states")
        if cursor.fetchone()[0] == 0:
            initial_devices = [
                ("living_room_light", "off"),
                ("bedroom_fan", "off"),
                ("living_room_curtains", "closed"),
                ("front_door_lock", "locked"),
            ]
            now = datetime.now().isoformat()
            cursor.executemany(
                "INSERT INTO device_states (device_id, state, updated_at) VALUES (?, ?, ?)",
                [(d[0], d[1], now) for d in initial_devices]
            )

    conn.close()


# ---------------- Assistant Conversations ----------------
def save_chat_message(role: str, message: str, matched_services: Optional[List[Dict[str, Any]]] = None, session_id: str = "default") -> int:
    conn = get_connection()
    now_str = datetime.now().strftime("%I:%M %p")
    services_json = json.dumps(matched_services or [])
    with conn:
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO assistant_conversations (session_id, role, message, matched_services, timestamp)
               VALUES (?, ?, ?, ?, ?)""",
            (session_id, role, message, services_json, now_str)
        )
        msg_id = cursor.lastrowid
    conn.close()
    return msg_id


def get_chat_history(session_id: str = "default", limit: int = 50) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """SELECT id, session_id, role, message, matched_services, timestamp
           FROM assistant_conversations
           WHERE session_id = ?
           ORDER BY id ASC LIMIT ?""",
        (session_id, limit)
    )
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        results.append({
            "id": r["id"],
            "session_id": r["session_id"],
            "role": r["role"],
            "message": r["message"],
            "matched_services": json.loads(r["matched_services"]) if r["matched_services"] else [],
            "timestamp": r["timestamp"]
        })
    return results


def clear_chat_history(session_id: str = "default") -> None:
    conn = get_connection()
    with conn:
        conn.execute("DELETE FROM assistant_conversations WHERE session_id = ?", (session_id,))
    conn.close()


# ---------------- User Favorites ----------------
def save_favorite(service_id: str, user_id: str = "guest") -> bool:
    conn = get_connection()
    now_str = datetime.now().isoformat()
    try:
        with conn:
            conn.execute(
                """INSERT OR IGNORE INTO user_favorites (user_id, service_id, created_at)
                   VALUES (?, ?, ?)""",
                (user_id, service_id, now_str)
            )
        return True
    finally:
        conn.close()


def remove_favorite(service_id: str, user_id: str = "guest") -> bool:
    conn = get_connection()
    with conn:
        conn.execute(
            "DELETE FROM user_favorites WHERE user_id = ? AND service_id = ?",
            (user_id, service_id)
        )
    conn.close()
    return True


def get_favorites(user_id: str = "guest") -> List[str]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT service_id FROM user_favorites WHERE user_id = ? ORDER BY id DESC",
        (user_id,)
    )
    rows = cursor.fetchall()
    conn.close()
    return [r["service_id"] for r in rows]


# ---------------- User Shopping Cart ----------------
def save_cart_item(item: Dict[str, Any], user_id: str = "guest") -> Dict[str, Any]:
    conn = get_connection()
    now_str = datetime.now().isoformat()
    item_id = str(item.get("id") or item.get("item_id"))
    with conn:
        conn.execute(
            """INSERT INTO user_cart (user_id, item_id, name, price, quantity, category, image, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)
               ON CONFLICT(user_id, item_id) DO UPDATE SET
                   quantity = excluded.quantity,
                   updated_at = excluded.updated_at""",
            (
                user_id,
                item_id,
                item.get("name", "Product"),
                float(item.get("price", 0.0)),
                int(item.get("quantity", 1)),
                item.get("category", ""),
                item.get("image", ""),
                now_str
            )
        )
    conn.close()
    return {"status": "success", "item_id": item_id}


def get_cart_items(user_id: str = "guest") -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT item_id, name, price, quantity, category, image, updated_at FROM user_cart WHERE user_id = ?",
        (user_id,)
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def remove_cart_item(item_id: str, user_id: str = "guest") -> bool:
    conn = get_connection()
    with conn:
        conn.execute("DELETE FROM user_cart WHERE user_id = ? AND item_id = ?", (user_id, item_id))
    conn.close()
    return True


def clear_cart(user_id: str = "guest") -> bool:
    conn = get_connection()
    with conn:
        conn.execute("DELETE FROM user_cart WHERE user_id = ?", (user_id,))
    conn.close()
    return True


# ---------------- User Marketplace Products ----------------
def save_product(product: Dict[str, Any], user_id: str = "guest") -> Dict[str, Any]:
    conn = get_connection()
    now_str = datetime.now().isoformat()
    p_id = str(product.get("id") or f"prod-{int(datetime.now().timestamp()*1000)}")
    specs_json = json.dumps(product.get("specs", {}))
    with conn:
        conn.execute(
            """INSERT OR REPLACE INTO user_products (id, user_id, title, category, price, condition, specs, image, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                p_id,
                user_id,
                product.get("title", "Untitled Product"),
                product.get("category", "General"),
                float(product.get("price", 0.0)),
                product.get("condition", "Brand New"),
                specs_json,
                product.get("image", ""),
                now_str
            )
        )
    conn.close()
    return {"status": "success", "id": p_id}


def get_products(user_id: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    if user_id:
        cursor.execute("SELECT * FROM user_products WHERE user_id = ? ORDER BY created_at DESC", (user_id,))
    else:
        cursor.execute("SELECT * FROM user_products ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()

    products = []
    for r in rows:
        p = dict(r)
        p["specs"] = json.loads(p["specs"]) if p["specs"] else {}
        products.append(p)
    return products


def delete_product(product_id: str) -> bool:
    conn = get_connection()
    with conn:
        conn.execute("DELETE FROM user_products WHERE id = ?", (product_id,))
    conn.close()
    return True


# ---------------- Smart Home Device States ----------------
def get_all_device_states() -> Dict[str, str]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT device_id, state FROM device_states")
    rows = cursor.fetchall()
    conn.close()
    return {r["device_id"]: r["state"] for r in rows}


def update_device_state(device_id: str, state: str) -> str:
    conn = get_connection()
    now_str = datetime.now().isoformat()
    with conn:
        conn.execute(
            """INSERT INTO device_states (device_id, state, updated_at)
               VALUES (?, ?, ?)
               ON CONFLICT(device_id) DO UPDATE SET
                   state = excluded.state,
                   updated_at = excluded.updated_at""",
            (device_id, state, now_str)
        )
    conn.close()
    return state


# ---------------- Agent Action Plans History ----------------
def save_action_plan_record(user_request: str, plan_json: str, status: str = "generated") -> int:
    conn = get_connection()
    now_str = datetime.now().isoformat()
    with conn:
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO agent_action_plans (user_request, plan_json, status, timestamp)
               VALUES (?, ?, ?, ?)""",
            (user_request, plan_json, status, now_str)
        )
        plan_id = cursor.lastrowid
    conn.close()
    return plan_id


def get_action_plans_history(limit: int = 20) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, user_request, plan_json, status, timestamp FROM agent_action_plans ORDER BY id DESC LIMIT ?",
        (limit,)
    )
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        results.append({
            "id": r["id"],
            "request": r["user_request"],
            "plan": json.loads(r["plan_json"]) if r["plan_json"] else {},
            "status": r["status"],
            "timestamp": r["timestamp"]
        })
    return results
