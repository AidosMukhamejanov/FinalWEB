window.register = function () {
  fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("msg").innerText = data.message || "Registered!";
  })
  .catch(err => {
    document.getElementById("msg").innerText = "Registration failed";
    console.error(err);
  });
};

window.login = function () {
  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("msg").innerText = data.message || "Login failed";
    }
  })
  .catch(err => {
    document.getElementById("msg").innerText = "Login failed";
    console.error(err);
  });
};

window.loadEvents = function () {
  fetch("/api/events", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
  .then(res => res.json())
  .then(events => {
    document.getElementById("events").innerHTML = events.map(e =>
      `<li>
         <div class="event-header">
           <span class="event-title"><strong>${e.title}</strong></span>
           ${e.flag ? `<img src="${e.flag}" class="flag" alt="flag">` : ''}
         </div>
         <div class="event-details">
           <p>Track: ${e.track}</p>
           <p>Location: ${e.trackLocation}</p>
           <p>Car: ${e.car}</p>
           <p>Date: ${new Date(e.date).toLocaleDateString()}</p>
         </div>
         <div class="event-actions">
           <button onclick="getWeather('${e._id}', this)">Weather</button>
           <button onclick="deleteEvent('${e._id}')">Delete</button>
         </div>
         <div class="weather-info"></div>
       </li>`
    ).join("");
  });
};

window.getWeather = function (id, btn) {
  fetch(`/api/events/${id}/weather`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
  .then(res => res.json())
  .then(w => {
    const card = btn.closest('li');
    const div = card.querySelector('.weather-info');
    div.innerHTML = `
      <strong>Weather Details:</strong><br>
      Temperature: ${w.temperature}°C<br>
      Condition: ${w.condition}<br>
      Wind: ${w.wind} m/s<br>
      Humidity: ${w.humidity}%`;
  });
};

window.createRaceEvent = function () {
  fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      title: document.getElementById("title").value,
      track: document.getElementById("track").value,
      trackLocation: document.getElementById("location").value,
      car: document.getElementById("car").value,
      date: document.getElementById("date").value,
      flag: document.getElementById("flag").value
    })
  })
  .then(res => res.json())
  .then(() => window.loadEvents());
};

window.deleteEvent = function (id) {
  fetch(`/api/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
  .then(() => window.loadEvents());
};

if (window.location.pathname.includes("dashboard")) {
  window.loadEvents();
}

