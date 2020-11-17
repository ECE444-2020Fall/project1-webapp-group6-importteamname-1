"""move table schemas to folder

Revision ID: 0f31a634899d
Revises: ce09ed6c70ee
Create Date: 2020-10-23 01:28:44.823984

"""
from alembic import op
import sqlalchemy as sa
import app
import sqlalchemy_utils
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '0f31a634899d'
down_revision = 'ce09ed6c70ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_notes', sa.Column('user_notes', sa.String(length=500), nullable=False))
    op.drop_column('user_notes', 'user_nodes')
    op.add_column('user_rating', sa.Column('user_rating', sa.Float(), nullable=False))
    op.drop_column('user_rating', 'user_nodes')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_rating', sa.Column('user_nodes', mysql.FLOAT(), nullable=False))
    op.drop_column('user_rating', 'user_rating')
    op.add_column('user_notes', sa.Column('user_nodes', mysql.VARCHAR(length=500), nullable=False))
    op.drop_column('user_notes', 'user_notes')
    # ### end Alembic commands ###
