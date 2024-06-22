document.getElementById('toggle-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('expanded');
  });
  
  function toggleMode() {
    const body = document.body;
    const button = document.querySelector('.toggle-button');
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  

    if (body.classList.contains('dark-mode')) {
        button.textContent = '';
        button.innerHTML += ' <span class="icon">&#9788;</span>';
    } else {
        button.textContent = '';
        button.innerHTML += ' <span class="icon">&#9789;</span>';
    }
}