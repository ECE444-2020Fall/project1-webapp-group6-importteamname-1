"""update fav list

Revision ID: dfd3983ff605
Revises: 33d490ad9a9a
Create Date: 2020-11-11 01:35:08.043714

"""
from alembic import op
import sqlalchemy as sa
import app
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = 'dfd3983ff605'
down_revision = '33d490ad9a9a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('user_rating_ibfk_1', 'user_rating', type_='foreignkey')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key('user_rating_ibfk_1', 'user_rating', 'recipe', ['recipe_id'], ['recipe_id'])
    # ### end Alembic commands ###