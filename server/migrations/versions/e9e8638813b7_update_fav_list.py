"""update fav list

Revision ID: e9e8638813b7
Revises: fc2d1a3487b0
Create Date: 2020-11-10 20:11:38.520747

"""
from alembic import op
import sqlalchemy as sa
import app
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = 'e9e8638813b7'
down_revision = 'fc2d1a3487b0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('favourites_list', sa.Column('temp', sa.String(length=50), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('favourites_list', 'temp')
    # ### end Alembic commands ###
