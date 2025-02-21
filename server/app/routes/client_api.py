from flask import Blueprint, request, jsonify
from app import db
from app.models import PartRequest, part_request_schema, part_requests_schema

client_bp = Blueprint('client', __name__, url_prefix='/api/client')


@client_bp.route('/requests', methods=['POST'])
def create_request():
    data = request.json
    errors = part_request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    new_request = PartRequest(
        part_number=data['part_number'],
        description=data.get('description'),
        quantity=data.get('quantity', 1),
        aircraft_type=data.get('aircraft_type'),
        urgency=data.get('urgency', 'routine')
    )

    db.session.add(new_request)
    db.session.commit()
    return part_request_schema.jsonify(new_request), 201


@client_bp.route('/requests', methods=['GET'])
def get_requests():
    requests = PartRequest.query.order_by(PartRequest.created_at.desc()).all()
    return jsonify(part_requests_schema.dump(requests))
