from datetime import datetime
from flask import Blueprint, request, jsonify
from app import db
from app.models import PartRequest
from app.schemas import part_request_schema, part_requests_schema

warehouse_bp = Blueprint('warehouse', __name__, url_prefix='/api/warehouse')


@warehouse_bp.route('/requests', methods=['GET'])
def get_open_requests():
    requests = PartRequest.query.filter(
        PartRequest.status.in_(['open', 'in-progress'])
    ).order_by(
        PartRequest.urgency.desc(),
        PartRequest.created_at.asc()
    ).all()
    return jsonify(part_requests_schema.dump(requests))


@warehouse_bp.route('/requests/<int:id>/status', methods=['PATCH'])
def update_status(id):
    request = PartRequest.query.get_or_404(id)
    new_status = request.json.get('status')

    if new_status == 'closed':
        request.closed_at = datetime.utcnow()

    request.status = new_status
    db.session.commit()
    return part_request_schema.jsonify(request)
