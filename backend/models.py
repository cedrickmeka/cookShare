from extensions import db

# Many-to-Many join table for favorites
favorites = db.Table(
    "favorites",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("recipe_id", db.Integer, db.ForeignKey("recipe.id"), primary_key=True),
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    # One-to-Many: one user authors many recipes
    recipes = db.relationship("Recipe", backref="author", lazy=True)

    # Many-to-Many: users can favorite many recipes
    favorited = db.relationship("Recipe", secondary=favorites, backref="favorited_by")

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email}


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(300), default="")
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "ingredients": self.ingredients,
            "instructions": self.instructions,
            "image_url": self.image_url,
            "user_id": self.user_id,
            "author": self.author.username,
        }
