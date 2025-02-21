from app import db
from datetime import datetime
from flask_marshmallow import Marshmallow

ma = Marshmallow()


class PartRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    part_number = db.Column(db.String(64), nullable=False)
    description = db.Column(db.Text)
    quantity = db.Column(db.Integer, default=1)
    aircraft_type = db.Column(db.String(64))  # e.g., Boeing 737-800
    # routine/expedited/emergency
    urgency = db.Column(db.String(20), default='routine')
    # open/in-progress/closed
    status = db.Column(db.String(20), default='open')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    closed_at = db.Column(db.DateTime)
    notes = db.Column(db.Text)


class PartRequestSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PartRequest
        include_fk = True
        load_instance = True


# Initialize schemas
part_request_schema = PartRequestSchema()
part_requests_schema = PartRequestSchema(many=True)
