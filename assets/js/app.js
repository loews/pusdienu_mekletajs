
//mobile-menu//

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar-menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});



//Lokācijas noteikšana//

document.getElementById('get-location').addEventListener('click', function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        map.setView([lat, lon], 14);

      }, function (error) {
        alert("Neizdevās noteikt atrašanās vietu: " + error.message);
      });
    } else {
      alert("Tava pārlūkprogramma neatbalsta atrašanās vietas noteikšanu.");
    }
  });


  document.querySelector('.input-location').addEventListener('click', () => {
    const inputDiv = document.getElementById('manual-location');
    inputDiv.style.display = 'flex';
  });
  
  document.getElementById('search-location').addEventListener('click', () => {
    const query = document.getElementById('location-input').value;
    if (!query) return alert('Lūdzu, ievadi lokāciju!');
  
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          alert('Atrašanās vieta nav atrasta.');
          return;
        }
  
        const lat = data[0].lat;
        const lon = data[0].lon;
  
        map.setView([lat, lon], 14);
  

        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });

      })
      .catch((err) => {
        alert('Radās kļūda, mēģini vēlreiz.');
        console.error(err);
      });
  });

  const map = L.map("map").setView([56.9496, 24.1052], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  

  //markeri//

  const restaurantMarkers = [
    {
      name: "Lulu pica",
      coords: [56.935334, 24.072107],
      popup: "<b>Lulu pica<br><br>Mazā Nometņu iela 27, Zemgales priekšpilsēta, Rīga, LV-1002</b><br>Šodien piedāvājumā - <br> Sierīgais komplekts - Divas siera picas un divi dzērieni <br><br> 15,00€",
    },
    {
      name: "Lido",
      coords: [56.959844, 24.187253],
      popup: "<b>Lido<br><br>Stirnu iela 32, Vidzemes priekšpilsēta, Rīga, LV-1084</b><br>Šodien piedāvājumā - <br> Tītara kotlete burkānu tomātu mērcē, vārīti griķi un burkānu seleriju salāti <br><br> 4,20€",
    },
    {
      name: "Bibliotēka No1",
      coords: [56.952215, 24.116428],
      popup: "<b>Bibliotēka Nr. 1<br><br>Tērbatas iela 2, Centra rajons, Rīga, LV-1050</b><br>Šodien piedāvājumā - <br>Flank steiks ar kartupeļu pavē un sulu<br><br> 23,00€",
    },
    {
      name: "Vairāk Saules",
      coords: [56.920421, 24.096431],
      popup: "<b>Vairāk Saules<br><br>Mūkusalas iela 71, Rīga</b><br>Šodien piedāvājumā - <br> Grilēta vistas fileja ar dārzeņu sautējumu <br><br> 8,50€",
    },
    {
      name: "Hesburger",
      coords: [56.948889, 24.118056],
      popup: "<b>Hesburger<br><br>Brīvības iela 40, Rīga</b><br>Šodien piedāvājumā - <br> Hesburger komplekts: burgers, frī kartupeļi un dzēriens <br><br> 6,00€",
    },
    {
      name: "Čili Pica",
      coords: [56.951111, 24.113333],
      popup: "<b>Čili Pica<br><br>Elizabetes iela 55, Rīga</b><br>Šodien piedāvājumā - <br> Lielā pica ar četrām garšām <br><br> 12,00€",
    },
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    restaurantMarkers.forEach((restaurant) => {
      const marker = L.marker(restaurant.coords).addTo(map);
      marker.bindPopup(restaurant.popup);
      restaurant.marker = marker;
    });
  });
  
  const restaurantItems = document.querySelectorAll(".restaurant-item");

  restaurantItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const restaurant = restaurantMarkers[index];
  
      document.getElementById("map-container").scrollIntoView({ behavior: "smooth" });
  
      map.setView(restaurant.coords, 14);
      restaurant.marker.openPopup();
    });
  });