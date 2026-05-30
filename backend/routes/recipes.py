from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Recipe, User

recipes_bp = Blueprint("recipes", __name__)


# GET all recipes (public)
@recipes_bp.route("/", methods=["GET"])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([r.to_dict() for r in recipes]), 200


# GET single recipe (public)
@recipes_bp.route("/<int:recipe_id>", methods=["GET"])
def get_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    return jsonify(recipe.to_dict()), 200


# GET current user's recipes (private)
@recipes_bp.route("/mine", methods=["GET"])
@jwt_required()
def my_recipes():
    user_id = int(get_jwt_identity())
    recipes = Recipe.query.filter_by(user_id=user_id).all()
    return jsonify([r.to_dict() for r in recipes]), 200


# CREATE recipe (private)
@recipes_bp.route("/", methods=["POST"])
@jwt_required()
def create_recipe():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    recipe = Recipe(
        title=data["title"],
        ingredients=data["ingredients"],
        instructions=data["instructions"],
        image_url=data.get("image_url", ""),
        user_id=user_id,
    )
    db.session.add(recipe)
    db.session.commit()
    return jsonify(recipe.to_dict()), 201


# UPDATE recipe (private, owner only)
@recipes_bp.route("/<int:recipe_id>", methods=["PUT"])
@jwt_required()
def update_recipe(recipe_id):
    user_id = int(get_jwt_identity())
    recipe = Recipe.query.get_or_404(recipe_id)
    if recipe.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    recipe.title = data.get("title", recipe.title)
    recipe.ingredients = data.get("ingredients", recipe.ingredients)
    recipe.instructions = data.get("instructions", recipe.instructions)
    recipe.image_url = data.get("image_url", recipe.image_url)
    db.session.commit()
    return jsonify(recipe.to_dict()), 200


# DELETE recipe (private, owner only)
@recipes_bp.route("/<int:recipe_id>", methods=["DELETE"])
@jwt_required()
def delete_recipe(recipe_id):
    user_id = int(get_jwt_identity())
    recipe = Recipe.query.get_or_404(recipe_id)
    if recipe.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(recipe)
    db.session.commit()
    return jsonify({"message": "Recipe deleted"}), 200


# FAVORITE a recipe (private)
@recipes_bp.route("/<int:recipe_id>/favorite", methods=["POST"])
@jwt_required()
def favorite_recipe(recipe_id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    recipe = Recipe.query.get_or_404(recipe_id)

    if recipe in user.favorited:
        user.favorited.remove(recipe)
        db.session.commit()
        return jsonify({"favorited": False}), 200

    user.favorited.append(recipe)
    db.session.commit()
    return jsonify({"favorited": True}), 200


# GET current user's favorites (private)
@recipes_bp.route("/favorites", methods=["GET"])
@jwt_required()
def get_favorites():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    return jsonify([r.to_dict() for r in user.favorited]), 200
