const year = new Date().getFullYear();
const copyright = document.getElementById('copyright');
if (copyright) {
  copyright.innerHTML = `&copy; ${year} Dravius Gym. Toate drepturile rezervate.`;
}
