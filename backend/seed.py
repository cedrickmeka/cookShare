from app import create_app
from extensions import db
from models import User, Recipe
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    alice = User(username="alice", email="alice@example.com", password=generate_password_hash("password123"))
    bob = User(username="bob", email="bob@example.com", password=generate_password_hash("password123"))
    db.session.add_all([alice, bob])
    db.session.commit()

    r1 = Recipe(
        title="Classic Pancakes",
        ingredients="1 cup flour, 1 egg, 1 cup milk, 1 tbsp sugar, 1 tsp baking powder",
        instructions="Mix dry ingredients. Add wet ingredients. Cook on griddle until golden.",
        image_url="https://www.thedailymeal.com/img/gallery/classic-pancakes/pancakes-shutterstock.JPG",
        user_id=alice.id,
    )
    r2 = Recipe(
        title="Avocado Toast",
        ingredients="2 slices bread, 1 avocado, salt, pepper, lemon juice",
        instructions="Toast bread. Mash avocado with lemon, salt, pepper. Spread on toast.",
        image_url="https://www.rootsandradishes.com/wp-content/uploads/2017/08/avocado-toast-with-everything-bagel-seasoning-feat.jpg",
        user_id=bob.id,
    )
    r3 = Recipe(
        title="Spaghetti Aglio e Olio",
        ingredients="200g spaghetti, 4 garlic cloves, olive oil, chili flakes, parsley",
        instructions="Cook pasta. Sauté garlic in oil. Toss pasta with garlic oil and parsley.",
        image_url="https://cookingwithayeh.com/wp-content/uploads/2025/02/Spaghetti-Aglio-e-Olio-SQ.jpg",
        user_id=alice.id,
    )
    db.session.add_all([r1, r2, r3])
    db.session.commit()

    # Alice favorites bob's recipe
    alice.favorited.append(r2)
    db.session.commit()

    print("Seeded: 2 users, 3 recipes, 1 favorite")
