// Lahari's Restaurant - Table Reservation & Dineout System

class ReservationManager {
  constructor() {
    this.bookings = this.loadBookings();
  }

  loadBookings() {
    try {
      const saved = localStorage.getItem("lahari_bookings");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveBookings() {
    try {
      localStorage.setItem("lahari_bookings", JSON.stringify(this.bookings));
    } catch (e) {
      console.error("Booking save error:", e);
    }
  }

  createBooking(data) {
    const bookingId = "LAH-TBL-" + Math.floor(100000 + Math.random() * 900000);
    const selectedAreaObj = SEATING_AREAS.find(a => a.id === data.areaId) || SEATING_AREAS[0];

    const booking = {
      id: bookingId,
      name: data.name,
      phone: data.phone,
      email: data.email || "guest@lahari.com",
      guests: data.guests,
      date: data.date,
      time: data.time,
      area: selectedAreaObj.name,
      occasion: data.occasion || "Dining & Leisure",
      requests: data.requests || "None",
      tableNumber: "T-" + Math.floor(10 + Math.random() * 40),
      createdAt: new Date().toLocaleString(),
      status: "CONFIRMED"
    };

    this.bookings.unshift(booking);
    this.saveBookings();
    this.showConfirmationPass(booking);
    return booking;
  }

  showConfirmationPass(booking) {
    const modalContent = document.getElementById("reservation-ticket-modal-content");
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div class="dineout-pass">
        <div class="pass-header">
          <div class="pass-brand">
            <i class="fa-solid fa-crown brand-icon"></i>
            <div>
              <h3>Lahari's Gourmet Kitchen</h3>
              <p>Road 36, Jubilee Hills, Hyderabad</p>
            </div>
          </div>
          <div class="pass-badge">CONFIRMED</div>
        </div>

        <div class="pass-divider">
          <span class="notch left"></span>
          <span class="dashed-line"></span>
          <span class="notch right"></span>
        </div>

        <div class="pass-body">
          <div class="pass-grid">
            <div class="pass-cell">
              <label>BOOKING ID</label>
              <strong>${booking.id}</strong>
            </div>
            <div class="pass-cell">
              <label>TABLE NO</label>
              <strong class="highlight">${booking.tableNumber}</strong>
            </div>
            <div class="pass-cell">
              <label>GUEST NAME</label>
              <strong>${booking.name}</strong>
            </div>
            <div class="pass-cell">
              <label>NO. OF GUESTS</label>
              <strong>${booking.guests} Guests</strong>
            </div>
            <div class="pass-cell">
              <label>DATE</label>
              <strong>${booking.date}</strong>
            </div>
            <div class="pass-cell">
              <label>TIME SLOT</label>
              <strong>${booking.time}</strong>
            </div>
            <div class="pass-cell full-width">
              <label>SEATING AMBIANCE</label>
              <strong class="area-tag"><i class="fa-solid fa-chair"></i> ${booking.area}</strong>
            </div>
          </div>

          <div class="pass-perks">
            <div class="perk-item"><i class="fa-solid fa-circle-check"></i> 15% Flat Off on Food Bill (Zomato Dineout Gold perk)</div>
            <div class="perk-item"><i class="fa-solid fa-circle-check"></i> Priority Valet Parking Included</div>
          </div>

          <div class="pass-qr">
            <div class="qr-code-box">
              <i class="fa-solid fa-qrcode"></i>
            </div>
            <p>Show this pass at the restaurant reception desk upon arrival</p>
          </div>
        </div>

        <div class="pass-actions">
          <button class="btn btn-secondary" onclick="window.print()">
            <i class="fa-solid fa-print"></i> Print Pass
          </button>
          <button class="btn btn-primary" onclick="closeModal('reservation-success-modal')">
            Done & Continue
          </button>
        </div>
      </div>
    `;

    openModal("reservation-success-modal");
    showToast("🎉 Table successfully reserved! We look forward to hosting you.", "success");
  }
}

const reservationManager = new ReservationManager();
