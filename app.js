// Simple in-memory store for demo
let content = [
  // Example content
  {
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Sample Video',
    tags: ['fun', 'music']
  },
  {
    type: 'image',
    url: 'https://drive.google.com/uc?export=view&id=1yQzq2cK8x6Zy5JwJ6v9F1v3xg8y4L2gK',
    title: 'Sample Image',
    tags: ['nature']
  }
];

let isAdmin = false;

// Authentication simulation
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userRole = document.getElementById('user-role');
const adminPanel = document.getElementById('admin-panel');

loginBtn.onclick = () => {
  isAdmin = true;
  updateAuthUI();
};
logoutBtn.onclick = () => {
  isAdmin = false;
  updateAuthUI();
};

function updateAuthUI() {
  if (isAdmin) {
    adminPanel.style.display = '';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = '';
    userRole.textContent = '(Admin)';
  } else {
    adminPanel.style.display = 'none';
    loginBtn.style.display = '';
    logoutBtn.style.display = 'none';
    userRole.textContent = '(Student)';
  }
}
updateAuthUI();

// Handle adding video
document.getElementById('add-video-form').onsubmit = function(e) {
  e.preventDefault();
  const url = document.getElementById('video-url').value.trim();
  const title = document.getElementById('video-title').value.trim();
  const tags = document.getElementById('video-tags').value.split(',').map(t => t.trim()).filter(Boolean);
  content.push({ type: 'video', url, title, tags });
  this.reset();
  renderGallery();
};

// Handle adding image
document.getElementById('add-image-form').onsubmit = function(e) {
  e.preventDefault();
  const url = document.getElementById('image-url').value.trim();
  const title = document.getElementById('image-title').value.trim();
  const tags = document.getElementById('image-tags').value.split(',').map(t => t.trim()).filter(Boolean);
  content.push({ type: 'image', url, title, tags });
  this.reset();
  renderGallery();
};

// Render gallery
function renderGallery(filterTag = '') {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  let filtered = content;
  if (filterTag) {
    filtered = content.filter(item => item.tags.includes(filterTag));
  }
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    if (item.type === 'video') {
      // Extract YouTube ID
      const match = item.url.match(/(?:v=|be\/)([a-zA-Z0-9_-]{11})/);
      const videoId = match ? match[1] : '';
      card.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        <div><strong>${item.title}</strong></div>
        <div class="tags">${item.tags.map(t => `#${t}`).join(' ')}</div>
      `;
    } else if (item.type === 'image') {
      card.innerHTML = `
        <img src="${item.url}" alt="${item.title}">
        <div><strong>${item.title}</strong></div>
        <div class="tags">${item.tags.map(t => `#${t}`).join(' ')}</div>
      `;
    }
    gallery.appendChild(card);
  });
}
renderGallery();

// Search functionality
document.getElementById('search').oninput = function() {
  const tag = this.value.trim();
  renderGallery(tag);
};
