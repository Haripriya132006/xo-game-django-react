🎮 Django Tic-Tac-Toe API + React Frontend
=
A full-stack Tic-Tac-Toe game built with Django + Django REST Framework on the backend and React on the frontend. Play in real-time, switch turns, and get automatic winner detection.

🚀 Features
=
🎲 Start a new game

✏️ Make a move by clicking on a cell

🧠 Backend determines winner or invalid moves

🔄 Real-time UI updates with React

💾 Stores game state in the database

🛠️ Tech Stack
=
Frontend:

React (with hooks & functional components)

Axios (for API calls)

Tailwind CSS or basic CSS (as per your styling)

Backend:
=
Python

Django

Django REST Framework

SQLite (default)

📦 Installation
=
1. Backend (Django + DRF)
bash
Copy
Edit


# Migrate and run server
```
python manage.py migrate
python manage.py runserver
```
# Frontend (React)
   
```
cd frontend/  
npm install
npm start
```

⚙️ Game Logic
=
The board is represented as a 9-character string.

Indices 0–8 represent the 3×3 grid.

Winning patterns are checked after each move.

"X" always starts the game.

🧩 React UI
=
🟩 Restart triggers a fresh game (via the create_game API)

🟦 Clickable grid for making moves

🧠 Shows current turn or winner

⚠️ Displays errors (invalid moves, game over, etc.)

📂 Sample Django Model
```
class Game(models.Model):
    board = models.CharField(max_length=9, default=" " * 9)
    current_turn = models.CharField(max_length=1, default="X")
    winner = models.CharField(max_length=1, null=True, blank=True)
```
