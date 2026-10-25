# Amazon One — AI-Powered Unified Amazon Ecosystem Super App

**Amazon One** is an independent hackathon prototype that consolidates multiple Amazon services into one convenient, personalized, and AI-assisted super app.

Instead of navigating disconnected websites and applications, users can discover services, manage smart devices, explore Prime entertainment, read Kindle books, interact with AWS Cloud and Bedrock AI, track orders, and shop or sell products through a single interface.

---

## 🌟 Key Architecture & Features

### 1. Centralized Dashboard (`/`)
- **Ecosystem Pillars**: Quick jump tiles for Shopping, Amazon Pay, Prime Entertainment, and AWS Cloud.
- **Search Amazon Services**: Instant search across 18 Amazon services and tools.
- **Personalized Recommendations**: Dynamic service ranking tailored to user-selected interests (*Shopping, Entertainment, Cloud, Devices, Reading, Payments, Business*).
- **Interactive Telemetry & Analytics**: Simulated weekly usage chart built with Recharts, recently visited services, and Prime savings counter.

### 2. Complete 18-Service Directory (`/services` & `/services/:serviceId`)
Comprehensive coverage across the 7 major Amazon pillars:
1. **Shopping & Commerce**: Amazon Shopping, Amazon Fresh, Amazon Business, Amazon Renewed.
2. **Payments**: Amazon Pay (1-click checkout, buyer protections, zero fraud liability).
3. **Entertainment**: Prime Video (4K HDR originals), Amazon Music (Ultra HD lossless), Audible (audiobooks).
4. **Reading**: Kindle (e-books, Whispersync), Goodreads (reading challenge and book reviews).
5. **Smart Devices**: Alexa & Echo devices, Fire TV 4K Max, Amazon Photos cloud backup.
6. **Cloud & AI**: Amazon Web Services (AWS), Amazon Bedrock (generative AI foundation models), EC2, S3.
7. **Business & Creators**: Amazon Seller Central (FBA), Kindle Direct Publishing (KDP), Twitch Interactive.

### 3. Dedicated Functional Service Modules
- **Shopping (`/shopping`)**: Search, filter by category/price, compare specifications, add to cart, and customer selling.
- **Selling & Marketplace (`/sell`)**: Customers can list their own products with full technical specifications (RAM, GPU, storage, battery, condition).
- **Payments (`/payments`)**: Simulated wallet status, merchant transaction history, spending distribution pie chart, and an interactive FAQ assistant.
- **Entertainment (`/entertainment`)**: Unified media catalogue across Prime Video, Amazon Music, and Audible with simulated streaming playback preview.
- **Reading (`/reading`)**: Kindle digital bookshelf, Goodreads reading challenge tracker, progress increments, and add-book form.
- **Smart Devices (`/devices`)**: Interactive smart-home dashboard with live power toggles, simulated Alexa voice command assistant, and Echo Show photo gallery sync.
- **Cloud & AI (`/cloud`)**: AWS service overviews, interactive **Amazon Bedrock AI playground** to test foundation models (*Claude 3.5 Sonnet, Llama 3, Titan*), and compute telemetry charts.
- **Business & Creators (`/business`)**: Seller Central sales velocity charts, FBA shipment tracking, and KDP/Twitch portals.
- **Cart (`/cart`)**: Complete demo shopping cart with tax calculation, Prime free shipping guarantee, and checkout flow.
- **Favorites (`/favorites`)**: Bookmarked services with 1-click access.
- **Personalization Settings (`/settings`)**: Customizable user interests dynamically influencing dashboard recommendations.

### 4. AI-Powered Service Discovery Concierge (`/assistant`)
- Natural language conversational assistant answering queries such as:
  - *"Which Amazon service can help me buy groceries?"* -> Recommends Amazon Fresh
  - *"Where can I listen to audiobooks?"* -> Recommends Audible
  - *"Which service is useful for hosting my website?"* -> Recommends AWS
  - *"How can I publish my own book?"* -> Recommends KDP
  - *"I want to listen to Kannada songs."* -> Recommends Amazon Music
- Pre-populated quick inquiries, typing indicator, and direct in-app navigation buttons.

### 5. Backend Architecture (Python FastAPI)
Located in `backend/`:
- `GET /api/services` — directory with search and category filtering.
- `GET /api/services/{id}` — individual service metadata.
- `POST /api/assistant` — natural language service discovery endpoint.
- `POST /api/recommendations` — interest-based service ranking.
- `GET /api/dashboard` — ecosystem metrics and simulated activities.
- Automatic fallback: The React frontend operates offline with sample data if the backend is not running.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, JavaScript (ES Modules), Vite 8, React Router DOM v7, Lucide React, Recharts.
- **Backend**: Python 3.14 / 3.11+, FastAPI, Uvicorn, Pydantic.
- **Storage**: Browser LocalStorage for demo cart, favorites, and interest settings.

---

## 🚀 Installation & Running Guide

### Step 1: Run the Frontend

```powershell
# Navigate to the project root
cd "c:\Users\Ganesh\OneDrive\Desktop\Amazon hack"

# Dependencies are already installed!
# Start the Vite development server:
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### Step 2: (Optional) Run the FastAPI Backend

```powershell
# In a separate terminal:
cd "c:\Users\Ganesh\OneDrive\Desktop\Amazon hack\backend"

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```
API Documentation will be live at: **`http://localhost:8000/docs`**

---

## 📁 Project Directory Structure

```
Amazon hack/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI application with REST endpoints
│   │   └── services_data.py      # Structured directory of 18 Amazon services
│   ├── requirements.txt          # Python dependencies
│   └── .env.example              # Environment variables template
├── public/
├── src/
│   ├── components/
│   │   ├── OneNavbar.jsx         # Header with global search, notifications, cart & favorites
│   │   ├── OneSidebar.jsx        # Collapsible navigation across all 7 pillars
│   │   ├── ServiceCard.jsx       # Card with favorite toggle, specs, and external links
│   │   ├── Footer.jsx            # Project footer & hackathon disclaimers
│   │   └── ...                   # Reusable components
│   ├── context/
│   │   ├── OneContext.jsx        # Cart, favorites, interests, recents & toast state
│   │   └── ProductContext.jsx    # Multi-product catalog and customer selling storage
│   ├── pages/
│   │   ├── OneDashboard.jsx      # Central hub, charts, recommendations, search
│   │   ├── OneAllServices.jsx    # Complete 18-service directory
│   │   ├── ServiceDetails.jsx    # Individual service detail breakdown
│   │   ├── OneShopping.jsx       # Retail & groceries catalog with demo cart
│   │   ├── OnePayments.jsx       # Amazon Pay digital wallet & spending charts
│   │   ├── OneEntertainment.jsx  # Prime Video, Music & Audible with audio preview
│   │   ├── OneReading.jsx        # Kindle bookshelf & reading tracker
│   │   ├── OneDevices.jsx        # Smart home toggles & Alexa voice simulator
│   │   ├── OneCloud.jsx          # AWS & Amazon Bedrock foundation model playground
│   │   ├── OneBusiness.jsx       # Seller Central sales charts & KDP/Twitch portals
│   │   ├── OneAssistant.jsx      # Conversational AI service discovery concierge
│   │   ├── OneCart.jsx           # Demo shopping cart with Prime checkout
│   │   ├── OneFavorites.jsx      # Saved bookmarks
│   │   ├── OneSettings.jsx       # User interest preferences
│   │   └── SellProduct.jsx       # Community customer product listing form
│   ├── data/
│   │   ├── services.js           # 18 services metadata
│   │   └── products.js           # Sample product catalog
│   ├── App.jsx                   # Layout, router configuration & 404 fallback
│   ├── main.jsx                  # Root entry with React context providers
│   └── index.css                 # Navy & amber design tokens, responsive styles
├── package.json
└── README.md
```
---

# 🏠 AccessAble — Accessible Smart-Home Agent

> An AI-powered, accessible smart-home backend for people with limited mobility.
> Control simulated devices using natural-language commands — no real hardware required.

---

## ⚠️ Simulation Notice

**All device operations in this project are SIMULATED.**
No physical hardware is connected or controlled.
Device state changes update a SQLite database record only.

---

## 📁 Project Structure

```
AccessAble/
├── app/
│   ├── __init__.py
│   ├── main.py              ← FastAPI app, startup seeder, CORS
│   ├── database.py          ← SQLAlchemy engine + session factory
│   ├── models.py            ← ORM table definitions (7 tables)
│   ├── schemas.py           ← Pydantic request/response models
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py        ← Settings loaded from .env
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── devices.py       ← GET /devices, GET /devices/{id}, PATCH state
│   │   ├── commands.py      ← POST /commands (NL processing)
│   │   ├── routines.py      ← GET/POST /routines, POST /execute, cancel
│   │   ├── actions.py       ← POST /confirm, POST /cancel, GET /actions/{id}
│   │   ├── preferences.py   ← GET/PUT /preferences
│   │   └── history.py       ← GET /history
│   └── services/
│       ├── __init__.py
│       ├── planner.py       ← Rule-based NLP intent + entity extractor
│       ├── device_service.py← Device CRUD + simulated state changes
│       ├── routine_service.py← Execution lifecycle, partial success handling
│       └── safety_service.py← Confirmation gate, duplicate/expiry guards
├── tests/
│   ├── __init__.py
│   ├── conftest.py          ← In-memory SQLite fixtures, TestClient setup
│   ├── test_devices.py
│   ├── test_commands.py
│   ├── test_routines.py
│   ├── test_actions.py
│   └── test_accessibility.py
├── .env                     ← Local settings (copy from .env.example)
├── .env.example
├── requirements.txt
└── README.md
```

---

## 🚀 Windows Installation Guide

### Step 1 — Open PowerShell in the project folder

```powershell
cd "C:\Users\srini\OneDrive\Desktop\Accessible Smart-Home Agent"
```

### Step 2 — Create a virtual environment

```powershell
python -m venv venv
```

### Step 3 — Activate the virtual environment

```powershell
.\venv\Scripts\Activate.ps1
```

> If you see an error about script execution, run:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

### Step 4 — Install dependencies

```powershell
pip install -r requirements.txt
```

### Step 5 — Copy environment file

```powershell
Copy-Item .env.example .env
```

(The `.env` file is already created for you, so this step is optional.)

### Step 6 — Start the server

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

You should see:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
AccessAble backend started. Visit http://127.0.0.1:8000/docs
```

The database (`accessable.db`) is created automatically on first run.

---

## 🧪 Running Tests

```powershell
# From the project root with venv active:
pytest tests/ -v
```

### Verified Test Run

The complete project test suite was run locally with Python 3.12:

```text
68 passed
```

The tests use an in-memory SQLite database and do not modify the local
`accessable.db` file.

---

## 🌐 API Reference

All endpoints are explorable at **http://127.0.0.1:8000/docs** (Swagger UI).

### Root

| Method | Path      | Description              |
|--------|-----------|--------------------------|
| GET    | `/`       | Welcome + links          |
| GET    | `/health` | Backend health check     |

### Devices

| Method | Path                     | Description                    |
|--------|--------------------------|--------------------------------|
| GET    | `/devices`               | List all 5 simulated devices   |
| GET    | `/devices/{id}`          | Get a single device by ID      |
| PATCH  | `/devices/{id}/state`    | Directly update device state   |

### Commands (Natural Language)

| Method | Path        | Description                              |
|--------|-------------|------------------------------------------|
| POST   | `/commands` | Process a natural-language command       |

**Request body:**
```json
{
  "text": "Turn on the bedroom light",
  "user_id": 1
}
```

Sensitive actions are never auto-confirmed. For example, a door-lock command
returns an action in `awaiting_confirmation`; send a separate request to
`POST /actions/{action_id}/confirm` before it runs.

**Response:**
```json
{
  "intent": "TURN_ON",
  "explanation": "I'll turn on your bedroom light.",
  "planned_actions": [
    {
      "order": 0,
      "device_name": "bedroom_light",
      "action": "turn_on",
      "description": "Turn on bedroom light",
      "requires_confirmation": false
    }
  ],
  "execution_id": 1,
  "requires_confirmation": false,
  "confirmation_note": null,
  "success": true,
  "warning": null
}
```

### Routines

| Method | Path                              | Description                       |
|--------|-----------------------------------|-----------------------------------|
| GET    | `/routines`                       | List all routines                 |
| POST   | `/routines`                       | Create a custom routine           |
| GET    | `/routines/{id}`                  | Get routine details               |
| POST   | `/routines/{id}/execute`          | Trigger a routine                 |
| GET    | `/routines/executions/{id}`       | Get execution details             |
| POST   | `/routines/executions/{id}/cancel`| Cancel in-progress execution      |

### Actions (Confirmation Gate)

| Method | Path                      | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | `/actions/{id}`           | Get action details                   |
| POST   | `/actions/{id}/confirm`   | Confirm & execute a pending action   |
| POST   | `/actions/{id}/cancel`    | Cancel a pending action              |

**Confirm request body:**
```json
{ "user_id": 1 }
```

**Confirm response:**
```json
{
  "action_id": 5,
  "status": "completed",
  "message": "Action 'lock' on 'Front Door Lock' completed successfully (SIMULATED).",
  "device_updated": true,
  "new_device_state": { "locked": true, "status": "locked" }
}
```

### History & Preferences

| Method | Path           | Description                           |
|--------|----------------|---------------------------------------|
| GET    | `/history`     | Activity audit log (filterable)       |
| GET    | `/preferences` | Get accessibility preferences         |
| PUT    | `/preferences` | Update accessibility preferences      |

---

## 🗣️ Supported Commands

| You say...                     | Intent detected        |
|--------------------------------|------------------------|
| Turn on the bedroom light      | TURN_ON                |
| Switch off the fan             | TURN_OFF               |
| Lock the door                  | LOCK (with confirm)    |
| Unlock the door                | UNLOCK (with confirm)  |
| I'm going to bed / Bedtime     | BEDTIME_ROUTINE        |
| Good morning / Wake up         | WAKEUP_ROUTINE         |
| I'm leaving / Goodbye          | LEAVING_ROUTINE        |
| Make it comfortable / Relax    | COMFORT_ROUTINE        |
| Turn off all the lights        | TURN_OFF (multi-device)|
| Open / close the window        | OPEN_WINDOW / CLOSE_WINDOW |

---

## 🏠 Simulated Devices

| ID | Name               | Type   | Location     | Initial State              |
|----|--------------------|--------|--------------|----------------------------|
| 1  | bedroom_light      | light  | bedroom      | power: off, brightness: 80 |
| 2  | living_room_light  | light  | living_room  | power: off, brightness: 100|
| 3  | fan                | fan    | bedroom      | power: off, speed: medium  |
| 4  | door_lock          | lock   | entrance     | locked: true               |
| 5  | smart_window       | window | bedroom      | position: closed           |

---

## 🔒 Safety System

The safety system enforces these rules:

1. **Confirmation required** — locking/unlocking doors and any action on the `door_lock` device requires user confirmation via `POST /actions/{id}/confirm`.
2. **Duplicate confirmation blocked** — confirming an already-confirmed action returns `409 Conflict`.
3. **Expiry** — confirmation tokens expire after 5 minutes (configurable in `.env`).
4. **Cancel gate** — cancelled actions cannot be confirmed or re-executed.
5. **No pre-execution** — actions in `awaiting_confirmation` status are never executed automatically.
6. **No direct lock bypass** — the device state endpoint cannot modify a door lock; use a command and confirmation.
7. **Partial success** — if some actions in a routine succeed and others fail, the execution is marked `partial_success` (not falsely reported as complete).

---

## ♿ Accessibility Features

Configure via `PUT /preferences`:

| Setting           | Default  | Description                            |
|-------------------|----------|----------------------------------------|
| `simple_language` | true     | Use plain, clear language              |
| `short_responses` | false    | Use shorter, more concise responses    |
| `voice_friendly`  | false    | Structure responses for TTS reading    |
| `preferred_room`  | bedroom  | Default room for ambiguous commands    |
| `theme`           | light    | light / dark / high_contrast           |
| `font_size`       | medium   | small / medium / large / xlarge        |
| `frequent_routines`| []      | List of often-used routine names       |

---

## 🔧 Architecture

```
HTTP Request
     │
     ▼
FastAPI Router   ← validates with Pydantic schemas
     │
     ▼
Service Layer    ← business logic (planner / device / routine / safety)
     │
     ▼
SQLAlchemy ORM   ← database operations
     │
     ▼
SQLite Database  ← accessable.db (local file)
```

**Key design principles:**
- **Separation of concerns** — routes only call services, services handle all logic.
- **No AI required** — rule-based planner works fully offline.
- **AI-ready** — replace `plan_command()` in `planner.py` to plug in an LLM.
- **Simulation-first** — no real hardware; safe for development/demo.
- **Accessibility-first** — structured responses designed for voice & screen readers.

---

## 🔄 Typical Workflow

1. User says: *"I'm going to bed"*
2. `POST /commands` → planner detects `BEDTIME_ROUTINE`
3. Five actions are created; four execute immediately (lights off, fan on, window close)
4. One action (lock door) is left in `awaiting_confirmation`
5. Response includes `execution_id` and lists the action ID to confirm
6. User calls `POST /actions/{id}/confirm`
7. Door lock action executes (simulated), `device_updated: true`
8. All events are logged in `/history`

---

## 📦 Dependencies

| Package           | Version | Purpose                    |
|-------------------|---------|----------------------------|
| fastapi           | 0.111   | Web framework              |
| uvicorn           | 0.29    | ASGI server                |
| sqlalchemy        | 2.0     | ORM + database abstraction |
| pydantic          | 2.7     | Data validation            |
| pydantic-settings | 2.2     | Settings from .env         |
| python-dotenv     | 1.0     | .env file loading          |
| httpx             | 0.27    | Async HTTP (test client)   |
| pytest            | 8.2     | Testing framework          |
| aiosqlite         | 0.20    | Async SQLite support       |
