function toggle() {
// Get the elements
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

// Add click event listener to toggle the navbar
menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});
      
}