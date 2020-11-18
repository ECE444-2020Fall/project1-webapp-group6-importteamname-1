"""create all tables

Revision ID: f8f1179bfdea
Revises: dfed6d5ebd5b
Create Date: 2020-11-11 15:04:41.224289

"""
from alembic import op
import sqlalchemy as sa
import app
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = 'f8f1179bfdea'
down_revision = 'dfed6d5ebd5b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipe',
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('recipe_name', sa.String(length=100), nullable=False),
    sa.Column('image_url', sa.String(length=100), nullable=False),
    sa.Column('cuisine', sa.String(length=50), nullable=False),
    sa.Column('instructions', sa.String(length=5000000), nullable=False),
    sa.Column('time_to_cook_in_minutes', sa.Integer(), nullable=False),
    sa.Column('servings', sa.Integer(), nullable=False),
    sa.Column('calories', sa.Float(), nullable=False),
    sa.Column('protein', sa.Float(), nullable=False),
    sa.Column('carbs', sa.Float(), nullable=False),
    sa.Column('fat', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('recipe_id')
    )
    op.create_table('user',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('user_id')
    )
    op.create_table('pantry_list',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('ingredient_name', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'ingredient_name')
    )
    op.create_table('recipe_cart',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recipe_id')
    )
    op.create_table('recipe_ingredient',
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('ingredient_name', sa.String(length=100), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('unit_of_measurement', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.PrimaryKeyConstraint('recipe_id', 'ingredient_name')
    )
    op.create_table('shopping_list',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('item_name', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'item_name')
    )
    op.create_table('user_favourites',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recipe_id')
    )
    op.create_table('user_notes',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('user_notes', sa.String(length=5000000), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recipe_id')
    )
    op.create_table('user_rating',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('user_rating', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recipe_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_rating')
    op.drop_table('user_notes')
    op.drop_table('user_favourites')
    op.drop_table('shopping_list')
    op.drop_table('recipe_ingredient')
    op.drop_table('recipe_cart')
    op.drop_table('pantry_list')
    op.drop_table('user')
    op.drop_table('recipe')
    # ### end Alembic commands ###
