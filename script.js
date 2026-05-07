const reservations = [
  {
    booking: "RNT-43821",
    source: "Mobile app",
    customer: "Maya Henderson",
    loyalty: "Gold",
    className: "Premium SUV",
    vehicle: "Lexus RX 350",
    time: "4:30 PM",
    status: "confirmed",
    total: "$812.40"
  },
  {
    booking: "RNT-43822",
    source: "Counter",
    customer: "Elliot Tran",
    loyalty: "New",
    className: "Compact",
    vehicle: "Toyota Corolla",
    time: "4:45 PM",
    status: "pending",
    total: "$288.10"
  },
  {
    booking: "RNT-43823",
    source: "Corporate",
    customer: "Northline Labs",
    loyalty: "Net 30",
    className: "Cargo Van",
    vehicle: "Ford Transit",
    time: "5:05 PM",
    status: "ready",
    total: "$1,124.00"
  },
  {
    booking: "RNT-43824",
    source: "OTA",
    customer: "Sofia Alvarez",
    loyalty: "Silver",
    className: "Luxury Sedan",
    vehicle: "BMW 5 Series",
    time: "5:20 PM",
    status: "flagged",
    total: "$936.75"
  },
  {
    booking: "RNT-43825",
    source: "Mobile app",
    customer: "Marcus Reed",
    loyalty: "Gold",
    className: "Midsize SUV",
    vehicle: "Mazda CX-50",
    time: "5:40 PM",
    status: "cleaning",
    total: "$534.90"
  }
];

const fleet = [
  { plate: "NYK-4187", model: "Lexus RX 350", bay: "Ready lane A3", status: "ready", fuel: 82, miles: "18,422 mi" },
  { plate: "JRM-2740", model: "Toyota Corolla", bay: "Wash bay 2", status: "cleaning", fuel: 61, miles: "29,104 mi" },
  { plate: "HVD-9033", model: "Ford Transit", bay: "Ready lane C1", status: "ready", fuel: 94, miles: "14,032 mi" },
  { plate: "BXM-5529", model: "BMW 530i", bay: "Service hold", status: "service", fuel: 48, miles: "21,880 mi" },
  { plate: "KTE-7441", model: "Mazda CX-50", bay: "Detail queue", status: "cleaning", fuel: 76, miles: "11,764 mi" },
  { plate: "QPA-6618", model: "Hyundai Sonata", bay: "Ready lane B4", status: "ready", fuel: 88, miles: "31,402 mi" }
];

const alerts = [
  { title: "BMW 530i tire pressure", meta: "Plate BXM-5529 · before reassignment", icon: "gauge" },
  { title: "Honda Pilot overdue inspection", meta: "Return closed 46 minutes ago", icon: "clipboard-check" },
  { title: "Tesla Model 3 charging delay", meta: "ETA moved to 6:15 PM", icon: "battery-charging" },
  { title: "Damage review pending", meta: "Booking RNT-43792 · rear bumper", icon: "shield-alert" }
];

const statusLabels = {
  confirmed: "Confirmed",
  pending: "Pending ID",
  ready: "Ready",
  flagged: "Review",
  cleaning: "Cleaning",
  service: "Service"
};

const reservationRows = document.querySelector("#reservationRows");
const fleetBoard = document.querySelector("#fleetBoard");
const alertList = document.querySelector("#alertList");

reservationRows.innerHTML = reservations.map((item) => `
  <tr>
    <td>
      <span class="cell-strong">${item.booking}</span>
      <span class="cell-muted">${item.source}</span>
    </td>
    <td>
      <span class="cell-strong">${item.customer}</span>
      <span class="cell-muted">${item.loyalty}</span>
    </td>
    <td>
      <span class="cell-strong">${item.className}</span>
      <span class="cell-muted">${item.vehicle}</span>
    </td>
    <td>${item.time}</td>
    <td><span class="status-pill ${item.status}">${statusLabels[item.status]}</span></td>
    <td><strong>${item.total}</strong></td>
    <td>
      <button class="row-action" type="button" aria-label="Open ${item.booking}" title="Open booking">
        <span data-icon="arrow-up-right"></span>
      </button>
    </td>
  </tr>
`).join("");

fleetBoard.innerHTML = fleet.map((vehicle) => `
  <article class="vehicle-card">
    <header>
      <div>
        <strong>${vehicle.plate}</strong>
        <small>${vehicle.model}</small>
      </div>
      <span class="status-pill ${vehicle.status}">${statusLabels[vehicle.status]}</span>
    </header>
    <div class="fuel-track" aria-label="Fuel ${vehicle.fuel}%">
      <span style="width: ${vehicle.fuel}%"></span>
    </div>
    <div class="vehicle-meta">
      <span>${vehicle.bay}</span>
      <span>${vehicle.miles}</span>
    </div>
  </article>
`).join("");

alertList.innerHTML = alerts.map((alert) => `
  <article class="alert-item">
    <span class="alert-icon" data-icon="${alert.icon}"></span>
    <div>
      <strong>${alert.title}</strong>
      <small>${alert.meta}</small>
    </div>
    <button type="button" aria-label="Open ${alert.title}" title="Open alert">
      <span data-icon="arrow-up-right"></span>
    </button>
  </article>
`).join("");

document.querySelectorAll(".segmented-control button").forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll("[data-icon]").forEach((icon) => {
  icon.setAttribute("data-lucide", icon.dataset.icon);
});

if (window.lucide) {
  window.lucide.createIcons();
}
