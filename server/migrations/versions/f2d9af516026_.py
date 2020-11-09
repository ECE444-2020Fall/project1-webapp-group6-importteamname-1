"""empty message

Revision ID: f2d9af516026
Revises: ec73a35dd4e0
Create Date: 2020-11-09 18:05:44.561992

"""
from alembic import op
import sqlalchemy as sa
import app
import sqlalchemy_utils
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f2d9af516026'
down_revision = 'ec73a35dd4e0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('recipe', 'calories',
               existing_type=mysql.FLOAT(),
               nullable=True)
    op.alter_column('recipe', 'carbs',
               existing_type=mysql.FLOAT(),
               nullable=True)
    op.alter_column('recipe', 'fat',
               existing_type=mysql.FLOAT(),
               nullable=True)
    op.alter_column('recipe', 'protein',
               existing_type=mysql.FLOAT(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('recipe', 'protein',
               existing_type=mysql.FLOAT(),
               nullable=False)
    op.alter_column('recipe', 'fat',
               existing_type=mysql.FLOAT(),
               nullable=False)
    op.alter_column('recipe', 'carbs',
               existing_type=mysql.FLOAT(),
               nullable=False)
    op.alter_column('recipe', 'calories',
               existing_type=mysql.FLOAT(),
               nullable=False)
    # ### end Alembic commands ###
