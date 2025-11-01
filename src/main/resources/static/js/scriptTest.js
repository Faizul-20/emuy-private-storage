// Simulasi loading
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan loading selama 3 detik
    setTimeout(function() {
        hideLoading();
    }, 3000);
});

function hideLoading() {
    const loadingContainer = document.getElementById('loadingContainer');
    const content = document.getElementById('content');

    // Animasi fade out untuk loading
    loadingContainer.style.opacity = '0';
    loadingContainer.style.transform = 'scale(0.8)';

    setTimeout(function() {
        loadingContainer.style.display = 'none';
        // Tampilkan konten dengan animasi
        content.style.display = 'block';
        setTimeout(function() {
            content.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 50);
    }, 500);
}

function showLoading() {
    const loadingContainer = document.getElementById('loadingContainer');
    const content = document.getElementById('content');

    // Sembunyikan konten
    content.style.opacity = '0';
    content.style.transform = 'scale(0.8)';

    setTimeout(function() {
        content.style.display = 'none';
        // Tampilkan loading dengan animasi
        loadingContainer.style.display = 'block';
        setTimeout(function() {
            loadingContainer.style.opacity = '1';
            loadingContainer.style.transform = 'scale(1)';
        }, 50);

        // Simulasi loading selama 2 detik
        setTimeout(function() {
            hideLoading();
        }, 2000);
    }, 500);
}

// Fungsi untuk mengganti jenis spinner
function changeSpinner(type) {
    const spinner = document.querySelector('.spinner');

    if (type === 'dots') {
        spinner.className = 'spinner-dots';
        spinner.innerHTML = '<div></div><div></div><div></div><div></div>';
    } else if (type === 'circle') {
        spinner.className = 'spinner';
        spinner.innerHTML = '';
    }
}