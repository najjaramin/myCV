const bouton = document.querySelector('#theme');

bouton.addEventListener('click', () => {
  const sombre = document.body.classList.toggle('sombre');
  bouton.textContent = sombre ? 'Thème clair' : 'Thème sombre';
});
