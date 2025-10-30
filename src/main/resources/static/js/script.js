

// TODO: Particle system ini hanya tampilan saja
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// TODO: Sample file data ini dummy, nanti diganti Thymeleaf
/*const sampleFiles = [
    { name: 'Mondstadt Map.pdf', type: 'document', size: '2.4 MB', date: '2 days ago', icon: '📄' },
    { name: 'Liyue Harbor.jpg', type: 'image', size: '5.1 MB', date: '5 days ago', icon: '🖼' },
    { name: 'Adventure Log.docx', type: 'document', size: '856 KB', date: '1 week ago', icon: '📝' },
    { name: 'Boss Fight.mp4', type: 'video', size: '125 MB', date: '3 days ago', icon: '🎬' },
    { name: 'Character Builds.xlsx', type: 'document', size: '1.2 MB', date: '4 days ago', icon: '📊' },
    { name: 'Inazuma Wallpaper.png', type: 'image', size: '8.3 MB', date: '1 week ago', icon: '🖼' },
    { name: 'Recipe Collection.pdf', type: 'document', size: '3.7 MB', date: '2 weeks ago', icon: '📄' },
    { name: 'Sumeru Showcase.mp4', type: 'video', size: '89 MB', date: '6 days ago', icon: '🎬' }
];*/

// TODO: Fungsi loadFiles ini menampilkan data, nanti diganti dengan Thymeleaf / backend
function loadFiles(files = sampleFiles) {
    const grid = document.getElementById('fileGrid');
    grid.innerHTML = '';

    const isListView = grid.classList.contains('file-list');

    files.forEach(file => {
        const card = document.createElement('div');
        card.className = 'file-card';

        if (isListView) {
            card.innerHTML = `
                <div class="file-icon">${file.icon}</div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">
                        <span>${file.size}</span>
                        <span>•</span>
                        <span>${file.date}</span>
                    </div>
                </div>`;
        } else {
            card.innerHTML = `
                <div class="file-icon">${file.icon}</div>
                <div class="file-name">${file.name}</div>
                <div class="file-meta">
                    <span>${file.size}</span>
                    <span>•</span>
                    <span>${file.date}</span>
                </div>`;
        }
        grid.appendChild(card);
    });
}

// TODO: Navigation ini tampilan/filter lokal JS
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        if (filter === 'all') loadFiles(sampleFiles); // TODO: Ganti sampleFiles dengan data Thymeleaf
        else if (filter === 'documents') loadFiles(sampleFiles.filter(f => f.type === 'document'));
        else if (filter === 'images') loadFiles(sampleFiles.filter(f => f.type === 'image'));
        else if (filter === 'videos') loadFiles(sampleFiles.filter(f => f.type === 'video'));
        else loadFiles(sampleFiles);
    });
});

// TODO: Search ini tampilan/filter lokal JS, nanti Ganti server-side search
document.getElementById('searchInput').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const filtered = sampleFiles.filter(f => f.name.toLowerCase().includes(query)); // TODO: Replace dengan server-side search
    loadFiles(filtered);
});

// TODO: Modal ini hanya tampilan
function openUploadModal() {
    document.getElementById('uploadModal').classList.add('active');
}
function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
}

// TODO: Upload ini masih UI alert saja, nanti diganti backend upload
function handleFileUpload(event) {
    const files = event.target.files;
    alert(`Selected ${files.length} file(s) for upload!`); // TODO: Replace dengan real upload ke backend
    closeUploadModal();
}

// TODO: Drag & Drop ini tampilan
const uploadArea = document.querySelector('.upload-area');
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#ffd782';
    uploadArea.style.background = 'rgba(255, 215, 130, 0.1)';
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'rgba(255, 215, 130, 0.4)';
    uploadArea.style.background = 'rgba(255, 255, 255, 0.02)';
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload({target: {files}}); // TODO: Replace dengan real upload ke backend
});

// TODO: View Toggle ini tampilan saja
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const grid = document.getElementById('fileGrid');
        const isGrid = this.textContent.includes('Grid');

        grid.classList.toggle('file-list', !isGrid);
        grid.classList.toggle('file-grid', isGrid);

        // TODO: Filter + search di JS, ganti Thymeleaf jika pakai backend
        const activeNav = document.querySelector('.nav-item.active');
        const filter = activeNav.getAttribute('data-filter');
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();

        let filesToShow = sampleFiles; // TODO: Replace sampleFiles dengan data backend
        if (searchQuery) filesToShow = sampleFiles.filter(f => f.name.toLowerCase().includes(searchQuery));
        else if (filter === 'documents') filesToShow = sampleFiles.filter(f => f.type === 'document');
        else if (filter === 'images') filesToShow = sampleFiles.filter(f => f.type === 'image');
        else if (filter === 'videos') filesToShow = sampleFiles.filter(f => f.type === 'video');

        loadFiles(filesToShow);
    });
});

// TODO: Initialize hanya tampilan, loadFiles nanti diganti Thymeleaf
createParticles();
loadFiles(); // TODO: Replace dengan data Thymeleaf dari backend
