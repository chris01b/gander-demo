from flask import Blueprint, request, jsonify
from app import db
from app.models import PartRequest, part_request_schema, part_requests_schema
from datetime import datetime

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


@client_bp.route('/requests/<int:id>/status', methods=['PATCH'])
def update_client_request_status(id):
    part_request = PartRequest.query.get_or_404(id)
    new_status = request.json.get('status')

    # Only allow modifying open requests
    if part_request.status != 'open':
        return jsonify({'error': 'Can only update status of open requests'}), 400

    # Only allow closing
    if new_status != 'closed':
        return jsonify({'error': 'Invalid status for client update'}), 400

    part_request.status = new_status
    part_request.closed_at = datetime.utcnow()
    db.session.commit()
    return part_request_schema.jsonify(part_request)
