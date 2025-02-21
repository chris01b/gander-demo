from datetime import datetime
from flask import Blueprint, request, jsonify
from app import db
from app.models import PartRequest
from app.models import PartRequest, part_request_schema, part_requests_schema

warehouse_bp = Blueprint('warehouse', __name__, url_prefix='/api/warehouse')


@warehouse_bp.route('/requests', methods=['GET'])
def get_open_requests():
    requests = PartRequest.query.filter(
        PartRequest.status.in_(['open', 'in-progress'])
    ).all()
    return jsonify(part_requests_schema.dump(requests))  # Correct schema usage


@warehouse_bp.route('/requests/<int:id>/status', methods=['PATCH'])
def update_status(id):
    part_request = PartRequest.query.get_or_404(id)
    new_status = request.json.get('status')  # Use Flask's request object

    if new_status not in ['open', 'in-progress', 'closed']:
        return jsonify({'error': 'Invalid status'}), 400

    if new_status == 'closed':
        part_request.closed_at = datetime.utcnow()
    else:
        part_request.closed_at = None  # Reset if status is not 'closed'

    part_request.status = new_status
    db.session.commit()
    return part_request_schema.jsonify(part_request)
