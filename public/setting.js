document.addEventListener('DOMContentLoaded', () => {
    const appearanceLink = document.getElementById('appearance-link');
    const appearanceModal = document.getElementById('appearance-modal');
    const closeModal = document.querySelector('.close');
    const lightModeBtn = document.getElementById('light-mode-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');

    appearanceLink.addEventListener('click', (event) => {
        event.preventDefault();
        appearanceModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        appearanceModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == appearanceModal) {
            appearanceModal.style.display = 'none';
        }
    });

    lightModeBtn.addEventListener('click', () => {
        document.body.classList.remove('dark-mode');
    });

    darkModeBtn.addEventListener('click', () => {
        document.body.classList.add('dark-mode');
    });
});
