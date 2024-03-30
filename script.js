document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-manga-form');
  const booksContainer = document.querySelector('.books');
  const burgerIcon = document.querySelector('.burger-icon');
  const iconsMenu = document.querySelector('.icons-menu');
  const showFormIcon = document.getElementById('show-form');
  let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const newManga = {
        name: document.getElementById('name').value,
        author: document.getElementById('author').value,
        volume: document.getElementById('volume').value,
        genre: document.getElementById('genre').value,
        imageUrl: document.getElementById('image-url').value,
        inStock: document.getElementById('in-stock').checked 
    };
    inventory.push(newManga);
    updateInventory();
    form.reset();
});

  showFormIcon.addEventListener('click', () => {
    // Toggle form visibility
    if (form.classList.contains('form-hidden')) {
        form.classList.remove('form-hidden');
        form.classList.add('form-visible');
    } else {
        form.classList.remove('form-visible');
        form.classList.add('form-hidden');
    }
});

  burgerIcon.addEventListener('click', () => {
    if (iconsMenu.style.display === "none" || !iconsMenu.style.display) {
        iconsMenu.style.display = "block";
    } else {
        iconsMenu.style.display = "none";
    }
});
  function updateInventory() {
      localStorage.setItem('inventory', JSON.stringify(inventory));
      renderInventory();
  }

  function renderInventory() {
    booksContainer.innerHTML = inventory.map((manga, index) => `
        <div class="book ${manga.inStock ? '' : 'out-of-stock'}">
            <img src="${manga.imageUrl}" alt="${manga.name}" onError="this.onerror=null;this.src='default-placeholder.png';">
            <div class="details">
                <p class="title">${manga.name} - Volume ${manga.volume}</p>
                <p class="author">${manga.author}</p>
                <p class="genre">${manga.genre || 'N/A'}</p> 
                <label class="stock-label"><input type="checkbox" ${manga.inStock ? 'checked' : ''} onclick="toggleStock(${index})"> In Stock</label>
                <button onclick="removeManga(${index})" class="remove">Remove</button>
            </div>
        </div>
    `).join('');
}


window.toggleStock = function(index) {
  inventory[index].inStock = !inventory[index].inStock;
  updateInventory();
};


  window.removeManga = function(index) {
      inventory.splice(index, 1);
      updateInventory();
  };

  renderInventory();
});

