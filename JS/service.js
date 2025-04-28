document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const clientActions = document.querySelectorAll('.client-actions');
  
    if (user && user.role === 'Client') {
      populateTrainers();
    } else {
      clientActions.forEach(action => action.style.display = 'none');
    }
  });
  
  function populateTrainers() {
    const trainers = [
      'Andrei Popescu',
      'Mihai Ionescu',
      'Elena Marinescu'
    ];
    const selects = document.querySelectorAll('.trainer-select');
  
    selects.forEach(select => {
      trainers.forEach(trainer => {
        const option = document.createElement('option');
        option.value = trainer;
        option.textContent = trainer;
        select.appendChild(option);
      });
    });
  }
  
  function sendRequest(service, selectId) {
    const selectedTrainer = document.getElementById(selectId).value;
    if (!selectedTrainer) {
      alert('Te rog selectează un antrenor!');
      return;
    }
    alert(`Cerere pentru ${service} trimisă către ${selectedTrainer} ✅`);
  }
  