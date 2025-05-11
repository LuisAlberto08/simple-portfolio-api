document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('project-list');
    const form = document.getElementById('project-form');
    const message = document.getElementById('message');
    const nameInput = document.getElementById('name');
    const techInput = document.getElementById('tech');
  
    let editingId = null; // Tracks whether we're editing or creating
  
    // 🔁 Load all projects from API and display them
    function loadProjects() {
      fetch('/projects')
        .then(res => res.json())
        .then(data => {
          projectList.innerHTML = '';
          data.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.name} (${p.tech})`;
  
            // 📝 Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.style.marginLeft = '0.5rem';
            editBtn.onclick = () => {
              nameInput.value = p.name;
              techInput.value = p.tech;
              editingId = p.id;
            };
  
            // 🗑 Delete button
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.style.marginLeft = '0.5rem';
            delBtn.onclick = () => deleteProject(p.id);
  
            li.appendChild(editBtn);
            li.appendChild(delBtn);
            projectList.appendChild(li);
          });
        })
        .catch(err => {
          console.error('Error loading projects:', err);
          message.textContent = 'Failed to load projects.';
        });
    }
  
    // 🧾 Submit form: create or update project
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const tech = techInput.value.trim();
      if (!name || !tech) return;
  
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/projects/${editingId}` : '/projects';
      const payload = { name, tech };
  
      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(data => {
          message.textContent = data.message || 'Saved successfully.';
          form.reset();
          editingId = null;
          loadProjects();
        })
        .catch(err => {
          console.error('Error saving project:', err);
          message.textContent = 'Failed to save project.';
        });
    });
  
    // ❌ Delete a project
    function deleteProject(id) {
      fetch(`/projects/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          message.textContent = data.message;
          loadProjects();
        })
        .catch(err => {
          console.error('Error deleting project:', err);
          message.textContent = 'Failed to delete project.';
        });
    }
  
    // 🚀 Initial load
    loadProjects();
  });
  