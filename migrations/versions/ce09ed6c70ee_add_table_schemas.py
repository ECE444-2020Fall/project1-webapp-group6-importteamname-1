"""add table schemas

Revision ID: ce09ed6c70ee
Revises: 0d57cdde0bc8
Create Date: 2020-10-23 00:59:00.359675

"""
from alembic import op
import sqlalchemy as sa
import app
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = 'ce09ed6c70ee'
down_revision = '0d57cdde0bc8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipe_cart',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recipe_id')
    )
    op.create_table('recipe_ingredient',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('ingredient_name', sa.String(length=100), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('unit_of_measurement', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'ingredient_name')
    )
    op.create_table('user_notes',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('user_nodes', sa.String(length=500), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recipe_id')
    )
    op.create_table('user_rating',
    sa.Column('user_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False),
    sa.Column('user_nodes', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recipe_id')
    )
    op.add_column('favourites_list', sa.Column('recipe_id', sqlalchemy_utils.types.uuid.UUIDType(), nullable=False))
    op.drop_constraint('favourites_list_ibfk_1', 'favourites_list', type_='foreignkey')
    op.create_foreign_key(None, 'favourites_list', 'user', ['user_id'], ['user_id'])
    op.create_foreign_key(None, 'favourites_list', 'recipe', ['recipe_id'], ['recipe_id'])
    op.drop_index('recipe_id', table_name='recipe')
    op.drop_index('user_id', table_name='user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index('user_id', 'user', ['user_id'], unique=True)
    op.create_index('recipe_id', 'recipe', ['recipe_id'], unique=True)
    op.drop_constraint(None, 'favourites_list', type_='foreignkey')
    op.drop_constraint(None, 'favourites_list', type_='foreignkey')
    op.create_foreign_key('favourites_list_ibfk_1', 'favourites_list', 'recipe', ['user_id'], ['recipe_id'])
    op.drop_column('favourites_list', 'recipe_id')
    op.drop_table('user_rating')
    op.drop_table('user_notes')
    op.drop_table('recipe_ingredient')
    op.drop_table('recipe_cart')
    # ### end Alembic commands ###
