from flask import Blueprint, jsonify, request
from app import db
from app.models import Task
from app.schemas import task_schema, tasks_schema

task_bp = Blueprint('task', __name__, url_prefix='/api/tasks')


@task_bp.route('/', methods=['POST'])
def create_task():
    data = request.json
    errors = task_schema.validate(data)
    if errors:
        return jsonify(errors), 400  # Fix typo here

    task = Task(title=data['title'])
    db.session.add(task)
    db.session.commit()
    return task_schema.jsonify(task), 201


@task_bp.route('/', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify(tasks_schema.dump(tasks))
