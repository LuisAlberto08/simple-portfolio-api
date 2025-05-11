const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /projects - fetch all projects (optionally filtered by tech)
router.get('/', (req, res) => {
  const { tech } = req.query;

  let stmt;
  let projects;

  if (tech) {
    stmt = db.prepare('SELECT * FROM projects WHERE LOWER(tech) LIKE ?');
    projects = stmt.all(`%${tech.toLowerCase()}%`);
  } else {
    stmt = db.prepare('SELECT * FROM projects');
    projects = stmt.all();
  }

  res.json(projects);
});

// GET /projects/:id - fetch a single project by its ID
router.get('/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
  const project = stmt.get(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// POST /projects - create a new project
router.post('/', (req, res) => {
  const { name, tech } = req.body;

  if (!name || !tech) {
    return res.status(400).json({ error: 'Project name and tech are required' });
  }

  const stmt = db.prepare('INSERT INTO projects (name, tech) VALUES (?, ?)');
  const info = stmt.run(name, tech);

  const newProject = {
    id: info.lastInsertRowid,
    name,
    tech
  };

  res.status(201).json({ message: 'Project created', project: newProject });
});

// PUT /projects/:id - update an existing project
router.put('/:id', (req, res) => {
  const { name, tech } = req.body;
  const { id } = req.params;

  if (!name || !tech) {
    return res.status(400).json({ error: 'Both name and tech are required' });
  }

  const stmt = db.prepare('UPDATE projects SET name = ?, tech = ? WHERE id = ?');
  const result = stmt.run(name, tech, id);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json({ message: 'Project updated', project: { id: Number(id), name, tech } });
});

// DELETE /projects/:id - delete a project
router.delete('/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
  const result = stmt.run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json({ message: 'Project deleted' });
});

module.exports = router;
