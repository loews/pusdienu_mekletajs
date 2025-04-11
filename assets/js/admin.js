document.getElementById('restaurant-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('restaurant-name').value;
    const address = document.getElementById('restaurant-address').value;
    const lat = parseFloat(document.getElementById('restaurant-lat').value);
    const lon = parseFloat(document.getElementById('restaurant-lon').value);
    const offer = document.getElementById('restaurant-offer').value;
    const price = document.getElementById('restaurant-price').value;

    const restaurantData = {
        name,
        address,
        coords: [lat, lon],
        offer,
        price,
    };


    let restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    const existingIndex = restaurants.findIndex(r => r.name === name);

    if (existingIndex !== -1) {
        restaurants[existingIndex] = restaurantData;
    } else {
        restaurants.push(restaurantData);
    }

    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    alert('Restorāns pievienots veiksmīgi!');
    this.reset();
});