// Lahari's Restaurant - Live Order Tracking & Simulation Engine

class OrderTracker {
  constructor() {
    this.activeOrder = this.loadActiveOrder();
    this.timerInterval = null;
    this.simInterval = null;
    this.etaSeconds = 1500; // 25 mins
  }

  loadActiveOrder() {
    try {
      const saved = localStorage.getItem("lahari_active_order");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  saveActiveOrder() {
    try {
      if (this.activeOrder) {
        localStorage.setItem("lahari_active_order", JSON.stringify(this.activeOrder));
      } else {
        localStorage.removeItem("lahari_active_order");
      }
    } catch (e) {
      console.error("Tracking save error:", e);
    }
  }

  createOrder(cartItems, billDetails, paymentMethod, address) {
    const orderId = "LAH-ORD-" + Math.floor(100000 + Math.random() * 900000);
    const otp = Math.floor(1000 + Math.random() * 9000);

    this.activeOrder = {
      id: orderId,
      otp: otp,
      items: [...cartItems],
      bill: billDetails,
      paymentMethod: paymentMethod,
      address: address || "Flat 402, Signature Towers, Road 36, Jubilee Hills, Hyderabad",
      stage: 1, // 1: Confirmed, 2: Preparing, 3: On The Way, 4: Delivered
      partner: {
        name: "Ramesh Kumar",
        rating: "4.9 ★",
        phone: "+91 94401 23891",
        vehicle: "Hero Splendor (TS 09 EB 7481)",
        photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
      },
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      etaMins: 28
    };

    this.etaSeconds = 28 * 60;
    this.saveActiveOrder();
    this.startSimulation();
    this.renderTrackingModal();
    return this.activeOrder;
  }

  startSimulation() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.simInterval) clearInterval(this.simInterval);

    // ETA Countdown timer
    this.timerInterval = setInterval(() => {
      if (this.etaSeconds > 60) {
        this.etaSeconds--;
        this.updateEtaDisplay();
      }
    }, 1000);

    // Progression simulation
    this.simInterval = setInterval(() => {
      if (!this.activeOrder) return;
      if (this.activeOrder.stage < 4) {
        this.activeOrder.stage++;
        this.saveActiveOrder();
        this.renderTrackingModal();

        if (this.activeOrder.stage === 2) {
          showToast("👨‍🍳 Lahari's Master Chef is preparing your delicacies!", "info");
        } else if (this.activeOrder.stage === 3) {
          showToast("🛵 Ramesh Kumar has picked up your order and is on the way!", "info");
        } else if (this.activeOrder.stage === 4) {
          showToast("🎉 Your order has been delivered! Enjoy your meal!", "success");
          clearInterval(this.simInterval);
          clearInterval(this.timerInterval);
        }
      }
    }, 14000); // Progress every 14 seconds for dynamic simulation
  }

  updateEtaDisplay() {
    const mins = Math.floor(this.etaSeconds / 60);
    const secs = this.etaSeconds % 60;
    const etaElement = document.getElementById("live-eta-countdown");
    if (etaElement) {
      etaElement.textContent = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
    }
  }

  renderTrackingModal() {
    const container = document.getElementById("tracking-modal-content");
    if (!container || !this.activeOrder) return;

    const order = this.activeOrder;
    const stages = [
      { num: 1, title: "Order Confirmed", desc: "Restaurant accepted your order", icon: "fa-receipt" },
      { num: 2, title: "Cooking with Passion", desc: "Chef is preparing fresh hot food", icon: "fa-fire-burner" },
      { num: 3, title: "On The Way", desc: "Valet Ramesh is heading to your address", icon: "fa-motorcycle" },
      { num: 4, title: "Delivered", desc: "Delivered at your door. Enjoy!", icon: "fa-circle-check" }
    ];

    container.innerHTML = `
      <div class="tracking-sheet">
        <!-- Live Status Bar -->
        <div class="tracking-top-status">
          <div class="status-badge-pulse">
            <span class="pulse-dot"></span>
            <span>LIVE ORDER TRACKING</span>
          </div>
          <div class="order-id-label">#${order.id}</div>
        </div>

        <!-- Dynamic ETA Card -->
        <div class="eta-hero-card">
          <div class="eta-left">
            <span class="eta-sub">ESTIMATED DELIVERY TIME</span>
            <h2 id="live-eta-countdown">${order.stage === 4 ? 'DELIVERED' : `${order.etaMins} mins`}</h2>
            <p class="eta-status-tag">
              ${order.stage === 1 ? 'Order placed with kitchen' : ''}
              ${order.stage === 2 ? 'Food is on the sizzle & packing' : ''}
              ${order.stage === 3 ? 'Delivery partner nearby (1.2 km away)' : ''}
              ${order.stage === 4 ? 'Enjoy your delicious feast!' : ''}
            </p>
          </div>
          <div class="eta-otp-badge">
            <span class="otp-sub">DELIVERY OTP</span>
            <span class="otp-num">${order.otp}</span>
          </div>
        </div>

        <!-- Simulated Interactive Map & Route -->
        <div class="tracking-map-wrapper">
          <div class="map-backdrop">
            <!-- Stylized Map Grid & Roads -->
            <svg class="map-route-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
              <path d="M 40 160 Q 150 140 220 80 T 440 40" fill="none" stroke="#E2E8F0" stroke-width="8" stroke-linecap="round"/>
              <path class="route-active-line" d="M 40 160 Q 150 140 220 80 T 440 40" fill="none" stroke="#E23744" stroke-width="5" stroke-dasharray="8 4" stroke-linecap="round"/>
            </svg>

            <!-- Restaurant Pin -->
            <div class="map-pin restaurant-pin" style="left: 8%; bottom: 15%;">
              <div class="pin-icon"><i class="fa-solid fa-hotel"></i></div>
              <span class="pin-popup">Lahari's Kitchen</span>
            </div>

            <!-- Delivery Bike Pin with dynamic position based on stage -->
            <div class="map-pin delivery-bike-pin stage-${order.stage}">
              <div class="bike-bubble"><i class="fa-solid fa-person-biking"></i></div>
              <span class="pin-popup">Ramesh (Partner)</span>
            </div>

            <!-- Customer Destination Pin -->
            <div class="map-pin customer-pin" style="right: 8%; top: 15%;">
              <div class="pin-icon"><i class="fa-solid fa-location-dot"></i></div>
              <span class="pin-popup">Your Location</span>
            </div>
          </div>
        </div>

        <!-- Stepper Timeline -->
        <div class="tracking-timeline">
          ${stages.map(st => `
            <div class="timeline-step ${order.stage >= st.num ? 'completed' : ''} ${order.stage === st.num ? 'active' : ''}">
              <div class="step-icon-wrap">
                <i class="fa-solid ${st.icon}"></i>
              </div>
              <div class="step-text">
                <strong>${st.title}</strong>
                <p>${st.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Valet Partner Profile Card -->
        <div class="valet-partner-card">
          <img src="${order.partner.photo}" alt="${order.partner.name}" class="partner-avatar" />
          <div class="partner-details">
            <div class="partner-name-row">
              <strong>${order.partner.name}</strong>
              <span class="partner-rating"><i class="fa-solid fa-star"></i> ${order.partner.rating}</span>
            </div>
            <span class="partner-vehicle"><i class="fa-solid fa-motorcycle"></i> ${order.partner.vehicle}</span>
            <span class="safety-badge"><i class="fa-solid fa-shield-halved"></i> Triple Vaccinated & Sanitized</span>
          </div>
          <a href="tel:${order.partner.phone}" class="call-partner-btn" title="Call Partner">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>

        <!-- Order Items Summary Accordion -->
        <div class="tracking-order-summary">
          <div class="summary-header">
            <h4><i class="fa-solid fa-receipt"></i> Items in this Order (${order.items.length})</h4>
            <span>Paid via ${order.paymentMethod.toUpperCase()} (₹${order.bill.grandTotal})</span>
          </div>
          <div class="summary-items-list">
            ${order.items.map(it => `
              <div class="tracking-item-mini">
                <span class="diet-dot ${it.isVeg ? 'veg' : 'non-veg'}"></span>
                <span class="name">${it.name} × ${it.quantity}</span>
                <span class="price">₹${it.unitPrice * it.quantity}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="tracking-modal-actions">
          <button class="btn btn-secondary" onclick="closeModal('live-tracking-modal')">
            Back to Restaurant
          </button>
          ${order.stage === 4 ? `
            <button class="btn btn-primary" onclick="orderTracker.clearOrder(); closeModal('live-tracking-modal'); openModal('review-modal');">
              Rate Your Meal ⭐
            </button>
          ` : `
            <button class="btn btn-primary" onclick="showToast('Customer support chat connected!', 'info')">
              <i class="fa-solid fa-headset"></i> Need Help?
            </button>
          `}
        </div>
      </div>
    `;
  }

  clearOrder() {
    this.activeOrder = null;
    this.saveActiveOrder();
    if (this.simInterval) clearInterval(this.simInterval);
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
}

const orderTracker = new OrderTracker();
