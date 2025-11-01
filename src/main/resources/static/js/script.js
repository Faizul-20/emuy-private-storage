// =================== GLOBAL VARIABLES ===================
let currentFiles = [];
let activeFilter = 'all'; // filter aktif
let isListView = false;   // layout: grid=false, list=true
let selectedFiles = null;

// =================== PARTICLE SYSTEM ===================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// =================== FETCH FILES ===================
async function loadFilesFromServer() {
    try {
        const response = await fetch('/load_files');
        if (!response.ok) throw new Error('Failed to fetch files');
        currentFiles = await response.json();
        renderFiles(getFilteredFiles());
    } catch (err) {
        console.error('Error loading files:', err);
        customAlert('Gagal memuat file!\n' + err.message, '❌');
    }
}

// =================== FILTER FILES ===================
function getFilteredFiles() {
    switch (activeFilter) {
        case 'recent': {
            const twoHoursAgo = new Date();
            twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
            return currentFiles.filter(f => new Date(f.fileCreatedAt) >= twoHoursAgo);
        }

        case 'starred':
            return currentFiles.filter(f => f.starred);
        case 'trash':
            return currentFiles.filter(f => f.inTrash);
        case 'shared':
            return currentFiles.filter(f => f.shared);
        case 'documents':
            return currentFiles.filter(f =>
                f.fileType && !f.fileType.startsWith('image') && !f.fileType.startsWith('video')
            );
        case 'images':
            return currentFiles.filter(f => f.fileType && f.fileType.startsWith('image'));
        case 'videos':
            return currentFiles.filter(f => f.fileType && f.fileType.startsWith('video'));
        default:
            return currentFiles.filter(f => !f.inTrash); // all excluding trash
    }
}

// =================== RENDER FILES ===================
function renderFiles(files) {
    const grid = document.getElementById('fileGrid');
    if (!grid) return;

    grid.innerHTML = '';
    grid.classList.toggle('file-list', isListView);

    if (files.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div class="empty-icon">📁</div>
            <p class="empty-text">No files found</p>
            <p class="empty-subtext">Try changing your filter or upload new files</p>
        `;
        grid.appendChild(emptyState);
        return;
    }

    files.forEach(file => {
        const card = document.createElement('div');
        card.className = 'file-card';
        card.setAttribute('data-file-id', file.id);

        const iconEl = document.createElement('div');
        iconEl.className = 'file-icon';
        iconEl.textContent = file.fileIcon || getFileIcon(file.fileType);

        const nameEl = document.createElement('div');
        nameEl.className = 'file-name';
        nameEl.textContent = file.fileName;

        const metaEl = document.createElement('div');
        metaEl.className = 'file-meta';
        metaEl.textContent = `${formatFileSize(file.fileSize)} • ${new Date(file.fileCreatedAt).toLocaleDateString()}`;

        if (isListView) {
            const infoEl = document.createElement('div');
            infoEl.className = 'file-info';
            infoEl.appendChild(nameEl);
            infoEl.appendChild(metaEl);
            card.appendChild(iconEl);
            card.appendChild(infoEl);
        } else {
            card.appendChild(iconEl);
            card.appendChild(nameEl);
            card.appendChild(metaEl);
        }

        // Add click event for file actions
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.file-action')) {
                handleFileClick(file);
            }
        });

        grid.appendChild(card);
    });
}

// =================== FILE CLICK HANDLER ===================
function handleFileClick(file) {
    // Implement file click logic here
    console.log('File clicked:', file);
    // You can open file preview, download, etc.
}

// =================== HELPERS ===================
function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}

function getFileIcon(fileType) {
    if (!fileType) return '📁';
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('text')) return '📃';
    if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return '🗜️';
    if (type.includes('video')) return '🎬';
    if (type.includes('audio')) return '🎵';
    if (type.includes('word') || type.includes('doc')) return '📝';
    if (type.includes('excel') || type.includes('xls')) return '📊';
    if (type.includes('powerpoint') || type.includes('ppt')) return '📑';
    return '📁';
}

// =================== NAVIGATION FILTER ===================
function initializeNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            renderFiles(getFilteredFiles());
        });
    });
}

// =================== LIST/GRID TOGGLE ===================
function initializeViewToggle() {
    const btnGrid = document.getElementById('btn-grid');
    const btnList = document.getElementById('btn-list');

    function toggleView(listView) {
        isListView = listView;
        renderFiles(getFilteredFiles());
        if (btnGrid && btnList) {
            btnGrid.classList.toggle('active', !listView);
            btnList.classList.toggle('active', listView);
        }
    }

    if (btnGrid && btnList) {
        btnGrid.addEventListener('click', () => toggleView(false));
        btnList.addEventListener('click', () => toggleView(true));
    }
}

// =================== UPLOAD MODAL ===================
function openUploadModal() {
    document.getElementById('uploadModal').classList.add('active');
    // Reset upload area
    resetUploadArea();
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
    // Reset form
    document.getElementById('uploadForm').reset();
    resetUploadArea();
}

function resetUploadArea() {
    const uploadArea = document.querySelector('.upload-area');
    const uploadIcon = uploadArea.querySelector('.upload-icon');
    const uploadText1 = uploadArea.querySelector('.upload-text-primary');
    const uploadText2 = uploadArea.querySelector('.upload-text-secondary');
    const progressCircle = document.getElementById('progressCircle');

    uploadArea.style.borderColor = 'rgba(255, 215, 130, 0.4)';
    uploadArea.style.background = 'rgba(255, 255, 255, 0.02)';
    uploadIcon.innerHTML = '⬆';
    uploadText1.textContent = 'Click to select files';
    uploadText1.style.display = 'block';
    uploadText2.style.display = 'block';

    if (progressCircle) {
        progressCircle.style.display = 'none';
    }

    selectedFiles = null;
}

// =================== UPLOAD ===================
async function submitUploadForm(event) {
    event.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
        customAlert('Please select a file to upload!', '⚠️');
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]); // Pastikan nama "files" sesuai dengan backend
    }

    const uploadArea = document.querySelector('.upload-area');
    const uploadIcon = uploadArea.querySelector('.upload-icon');
    const uploadText1 = uploadArea.querySelector('.upload-text-primary');
    const uploadText2 = uploadArea.querySelector('.upload-text-secondary');

    // Show uploading state
    uploadIcon.innerHTML = "⏳";
    uploadText1.textContent = "Uploading...";
    uploadText1.style.display = "block";
    uploadText2.style.display = "none";
    uploadArea.style.borderColor = "#ffd782";
    uploadArea.style.background = "rgba(255, 215, 130, 0.1)";

    try {
        console.log('Starting upload...', selectedFiles);

        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        console.log('Upload response status:', response.status);

        const responseText = await response.text();
        console.log('Upload response:', responseText);

        if (response.ok) {
            uploadIcon.innerHTML = "✅";
            uploadText1.textContent = "Upload successful!";
            uploadArea.style.borderColor = "#2ecc71";
            uploadArea.style.background = "rgba(46, 204, 113, 0.1)";

            // Reload files after successful upload
            setTimeout(() => {
                loadFilesFromServer();
                closeUploadModal();
            }, 1500);
        } else {
            throw new Error(responseText || `Upload failed with status: ${response.status}`);
        }
    } catch (err) {
        console.error('Upload error:', err);
        uploadIcon.innerHTML = "❌";
        uploadText1.textContent = "Upload failed!";
        uploadArea.style.borderColor = "#e74c3c";
        uploadArea.style.background = "rgba(231, 76, 60, 0.1)";
        customAlert('Upload failed!\n' + err.message, '❌');
    }
}
// =================== DRAG & DROP ===================
function initializeDragAndDrop() {
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
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
            if (files.length > 0) {
                // Create a fake event object to reuse saveSelectedFiles function
                saveSelectedFiles({ target: { files: files } });
            }
        });
    }
}

// =================== SEARCH FUNCTIONALITY ===================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                if (searchTerm === '') {
                    renderFiles(getFilteredFiles());
                } else {
                    const filtered = getFilteredFiles().filter(file =>
                        file.fileName.toLowerCase().includes(searchTerm) ||
                        (file.fileType && file.fileType.toLowerCase().includes(searchTerm))
                    );
                    renderFiles(filtered);
                }
            }, 300);
        });
    }
}

// =================== CUSTOM ALERT ===================
function customAlert(message, icon = "") {
    const old = document.getElementById("custom-Alert");
    if (old) old.remove();

    const alertBox = document.createElement("div");
    alertBox.id = "custom-Alert";
    alertBox.className = "custom-alert";
    alertBox.innerHTML = `
        <div class="custom-alert-content">
            <div class="genshin-icon">${icon}</div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(alertBox);

    setTimeout(() => alertBox.classList.add("show"), 10);
    setTimeout(() => {
        alertBox.classList.remove("show");
        setTimeout(() => alertBox.remove(), 400);
    }, 3000);
}

// =================== RESPONSIVE BEHAVIOR ===================
function initializeResponsiveBehavior() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Re-render files on resize to adjust layout
            if (currentFiles && currentFiles.length > 0) {
                renderFiles(getFilteredFiles());
            }
            // Recreate particles for responsive adjustments
            createParticles();
        }, 250);
    });

    // Touch device detection
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }

    // Handle very small screens
    function checkScreenSize() {
        const isVerySmall = window.innerWidth <= 360;
        document.body.classList.toggle('very-small-screen', isVerySmall);
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// =================== MODAL CLOSE HANDLERS ===================
function initializeModalHandlers() {
    // Close modal when clicking outside
    document.getElementById('uploadModal').addEventListener('click', (e) => {
        if (e.target.id === 'uploadModal') {
            closeUploadModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeUploadModal();
        }
    });
}

// =================== INITIALIZE EVERYTHING ===================
function initializeApp() {
    createParticles();
    initializeNavigation();
    initializeViewToggle();
    initializeDragAndDrop();
    initializeSearch();
    initializeResponsiveBehavior();
    initializeModalHandlers();
    loadFilesFromServer();
}

// =================== START THE APP ===================
document.addEventListener('DOMContentLoaded', initializeApp);

// Make functions globally available for HTML onclick handlers
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.saveSelectedFiles = saveSelectedFiles;
window.submitUploadForm = submitUploadForm;