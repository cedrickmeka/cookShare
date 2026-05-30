# CookShare 🍳

A full-stack recipe sharing platform built with React + Flask.

## Project Structure
```
cookShare/
├── backend/      # Flask API
└── frontend/     # React app
```

## Running the Backend

```bash
cd backend
python3 -m venv venv          # only needed once
source venv/bin/activate
pip install -r requirements.txt  # only needed once
python seed.py                # optional: load demo data
python app.py                 # starts on http://localhost:5000
```

## Running the Frontend

```bash
cd frontend
npm install    # only needed once
npm start      # starts on http://localhost:3000
```

## Demo Accounts (after seeding)
- Email: `alice@example.com` / Password: `password123`
- Email: `bob@example.com` / Password: `password123`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/recipes/ | No | All recipes |
| GET | /api/recipes/:id | No | Single recipe |
| POST | /api/recipes/ | Yes | Create recipe |
| PUT | /api/recipes/:id | Yes | Update recipe |
| DELETE | /api/recipes/:id | Yes | Delete recipe |
| GET | /api/recipes/mine | Yes | My recipes |
| POST | /api/recipes/:id/favorite | Yes | Toggle favorite |
| GET | /api/recipes/favorites | Yes | My favorites |
