// Lahari's Restaurant - Core Application Controller

// State Management
let currentCategory = "all";
let currentDietFilter = "all"; // 'all', 'veg', 'non-veg'
let currentSearchQuery = "";
let currentSort = "popular"; // 'popular', 'rating', 'price-low', 'price-high'
let onlyBestsellers = false;
let currentCustomizingDish = null;
let selectedCustomizations = {
  portion: null,
  addons: [],
  spiceLevel: null,
  note: ""
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderCategories();
  renderMenu();
  renderCoupons();
  renderReviews();
  initEventListeners();
  cart.render();

  // If there is an active tracking order, resume simulation
  if (orderTracker.activeOrder) {
    orderTracker.startSimulation();
  }
});

// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem("lahari_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("lahari_theme", next);
  updateThemeIcon(next);
  showToast(`Switched to ${next} mode`, "info");
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

// Toast Notifications
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;
  
  let iconClass = "fa-circle-info";
  if (type === "success") iconClass = "fa-circle-check";
  if (type === "warning") iconClass = "fa-triangle-exclamation";
  if (type === "error") iconClass = "fa-circle-xmark";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Render Categories Bar & Quick Navigator
function renderCategories() {
  const categoryScroll = document.getElementById("category-chips-list");
  if (!categoryScroll) return;

  categoryScroll.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-pill ${cat.id === currentCategory ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
      <i class="fa-solid ${cat.icon}"></i>
      <span>${cat.name}</span>
    </button>
  `).join('');
}

function selectCategory(catId) {
  currentCategory = catId;
  renderCategories();
  renderMenu();

  const menuSection = document.getElementById("menu-catalog-section");
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Render Menu Cards
function renderMenu() {
  const container = document.getElementById("menu-grid-container");
  const countDisplay = document.getElementById("menu-results-count");
  if (!container) return;

  let items = [...MENU_ITEMS];

  // Category filter
  if (currentCategory !== "all") {
    items = items.filter(item => item.category === currentCategory);
  }

  // Diet filter (Veg / Non-Veg)
  if (currentDietFilter === "veg") {
    items = items.filter(item => item.isVeg === true);
  } else if (currentDietFilter === "non-veg") {
    items = items.filter(item => item.isVeg === false);
  }

  // Bestsellers chip
  if (onlyBestsellers) {
    items = items.filter(item => item.isBestseller === true);
  }

  // Search query filter
  if (currentSearchQuery.trim() !== "") {
    const q = currentSearchQuery.toLowerCase();
    items = items.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }

  // Sort
  if (currentSort === "rating") {
    items.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === "price-low") {
    items.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    items.sort((a, b) => b.price - a.price);
  }

  if (countDisplay) {
    countDisplay.textContent = `Showing ${items.length} delicious ${items.length === 1 ? 'dish' : 'dishes'}`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="menu-empty-state">
        <i class="fa-solid fa-magnifying-glass fa-3x"></i>
        <h3>No dishes matched your selection</h3>
        <p>Try clearing filters or searching for something else like 'Biryani' or 'Paneer'</p>
        <button class="btn btn-secondary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(dish => {
    const qtyInCart = cart.getItemQuantity(dish.id);
    const discount = dish.originalPrice ? Math.round(((dish.originalPrice - dish.price) / dish.originalPrice) * 100) : 0;

    return `
      <article class="dish-card" id="dish-card-${dish.id}">
        <div class="dish-image-wrapper">
          <img src="${dish.image}" alt="${dish.name}" loading="lazy" class="dish-img" />
          ${dish.isBestseller ? '<span class="dish-badge-bestseller"><i class="fa-solid fa-award"></i> BESTSELLER</span>' : ''}
          ${discount > 0 ? `<span class="dish-badge-discount">${discount}% OFF</span>` : ''}
          <div class="dish-time-badge"><i class="fa-regular fa-clock"></i> ${dish.prepTime}</div>
        </div>

        <div class="dish-content">
          <div class="dish-header-row">
            <div class="diet-symbol ${dish.isVeg ? 'veg' : 'non-veg'}" title="${dish.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}">
              <span class="dot"></span>
            </div>
            <div class="dish-rating-chip">
              <i class="fa-solid fa-star"></i>
              <span>${dish.rating}</span>
              <small>(${dish.ratingCount})</small>
            </div>
          </div>

          <h3 class="dish-title">${dish.name}</h3>
          
          <p class="dish-desc">${dish.description}</p>

          <div class="dish-footer-row">
            <div class="dish-pricing">
              <span class="price-current">₹${dish.price}</span>
              ${dish.originalPrice ? `<span class="price-original">₹${dish.originalPrice}</span>` : ''}
            </div>

            <div class="dish-action-area" id="dish-action-${dish.id}">
              ${qtyInCart > 0 ? `
                <div class="card-qty-stepper">
                  <button class="stepper-btn" onclick="handleCardQtyChange('${dish.id}', -1)" aria-label="Decrease"><i class="fa-solid fa-minus"></i></button>
                  <span class="stepper-count">${qtyInCart}</span>
                  <button class="stepper-btn" onclick="handleCardQtyChange('${dish.id}', 1)" aria-label="Increase"><i class="fa-solid fa-plus"></i></button>
                </div>
              ` : `
                <button class="dish-add-btn" onclick="handleDishAddClick('${dish.id}')">
                  <span>ADD</span>
                  <i class="fa-solid fa-plus"></i>
                  ${dish.customizable ? '<span class="custom-hint">Customisable</span>' : ''}
                </button>
              `}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function updateMenuCardCounters() {
  MENU_ITEMS.forEach(dish => {
    const actionArea = document.getElementById(`dish-action-${dish.id}`);
    if (!actionArea) return;
    const qty = cart.getItemQuantity(dish.id);

    if (qty > 0) {
      actionArea.innerHTML = `
        <div class="card-qty-stepper">
          <button class="stepper-btn" onclick="handleCardQtyChange('${dish.id}', -1)" aria-label="Decrease"><i class="fa-solid fa-minus"></i></button>
          <span class="stepper-count">${qty}</span>
          <button class="stepper-btn" onclick="handleCardQtyChange('${dish.id}', 1)" aria-label="Increase"><i class="fa-solid fa-plus"></i></button>
        </div>
      `;
    } else {
      actionArea.innerHTML = `
        <button class="dish-add-btn" onclick="handleDishAddClick('${dish.id}')">
          <span>ADD</span>
          <i class="fa-solid fa-plus"></i>
          ${dish.customizable ? '<span class="custom-hint">Customisable</span>' : ''}
        </button>
      `;
    }
  });
}

function handleDishAddClick(dishId) {
  const dish = MENU_ITEMS.find(d => d.id === dishId);
  if (!dish) return;

  if (dish.customizable && dish.customOptions) {
    openCustomizationModal(dish);
  } else {
    cart.addItem(dish);
  }
}

function handleCardQtyChange(dishId, delta) {
  const matchingCartItems = cart.items.filter(i => i.dishId === dishId);
  if (matchingCartItems.length > 0) {
    // Modify the latest added customized or standard item
    const targetItem = matchingCartItems[matchingCartItems.length - 1];
    cart.updateQuantity(targetItem.cartKey, delta);
  }
}

// Customization Modal Logic
function openCustomizationModal(dish) {
  currentCustomizingDish = dish;
  selectedCustomizations = {
    portion: dish.customOptions?.portions ? dish.customOptions.portions[0] : null,
    addons: [],
    spiceLevel: dish.customOptions?.spiceLevels ? dish.customOptions.spiceLevels[0] : null,
    note: ""
  };

  const modalBody = document.getElementById("customization-modal-content");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="custom-modal-header">
      <div class="custom-dish-preview">
        <img src="${dish.image}" alt="${dish.name}" />
        <div>
          <div class="diet-symbol ${dish.isVeg ? 'veg' : 'non-veg'}"><span class="dot"></span></div>
          <h3>${dish.name}</h3>
          <p class="custom-base-price">Base Price: ₹${dish.price}</p>
        </div>
      </div>
    </div>

    <div class="custom-modal-body">
      ${dish.customOptions?.portions ? `
        <div class="custom-group">
          <h4>Choose Portion Size <span class="required-badge">Required</span></h4>
          <div class="custom-options-list">
            ${dish.customOptions.portions.map((p, idx) => `
              <label class="custom-radio-row">
                <input type="radio" name="portion-option" value="${idx}" ${idx === 0 ? 'checked' : ''} onchange="onPortionSelect(${idx})">
                <span class="custom-radio-label">${p.name}</span>
                <span class="custom-radio-price">${p.price > 0 ? `+ ₹${p.price}` : 'Free'}</span>
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${dish.customOptions?.spiceLevels ? `
        <div class="custom-group">
          <h4>Spice Level</h4>
          <div class="custom-options-list">
            ${dish.customOptions.spiceLevels.map((sp, idx) => `
              <label class="custom-radio-row">
                <input type="radio" name="spice-option" value="${sp}" ${idx === 0 ? 'checked' : ''} onchange="onSpiceSelect('${sp}')">
                <span class="custom-radio-label">${sp}</span>
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${dish.customOptions?.addons && dish.customOptions.addons.length > 0 ? `
        <div class="custom-group">
          <h4>Add Extras & Accompaniments</h4>
          <div class="custom-options-list">
            ${dish.customOptions.addons.map((addon, idx) => `
              <label class="custom-checkbox-row">
                <input type="checkbox" name="addon-option" value="${idx}" onchange="onAddonToggle(${idx}, this.checked)">
                <span class="custom-checkbox-label">${addon.name}</span>
                <span class="custom-checkbox-price">+ ₹${addon.price}</span>
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="custom-group">
        <h4>Special Cooking Instructions</h4>
        <input type="text" id="custom-cooking-note" class="form-input" placeholder="e.g., Less oil, extra onions, packing in separate boxes..." />
      </div>
    </div>

    <div class="custom-modal-footer">
      <div class="custom-total-preview">
        <span>Item Total</span>
        <strong id="custom-live-total">₹${calculateCustomizedTotal()}</strong>
      </div>
      <button class="btn btn-primary" onclick="confirmCustomizationAndAdd()">
        Add Item to Cart
      </button>
    </div>
  `;

  openModal("customization-modal");
}

function onPortionSelect(index) {
  if (currentCustomizingDish?.customOptions?.portions) {
    selectedCustomizations.portion = currentCustomizingDish.customOptions.portions[index];
    updateCustomTotalDisplay();
  }
}

function onSpiceSelect(spice) {
  selectedCustomizations.spiceLevel = spice;
}

function onAddonToggle(index, isChecked) {
  const addon = currentCustomizingDish.customOptions.addons[index];
  if (isChecked) {
    selectedCustomizations.addons.push(addon);
  } else {
    selectedCustomizations.addons = selectedCustomizations.addons.filter(a => a.name !== addon.name);
  }
  updateCustomTotalDisplay();
}

function calculateCustomizedTotal() {
  if (!currentCustomizingDish) return 0;
  let total = currentCustomizingDish.price;
  if (selectedCustomizations.portion) {
    total += selectedCustomizations.portion.price;
  }
  selectedCustomizations.addons.forEach(a => {
    total += a.price;
  });
  return total;
}

function updateCustomTotalDisplay() {
  const totalEl = document.getElementById("custom-live-total");
  if (totalEl) {
    totalEl.textContent = `₹${calculateCustomizedTotal()}`;
  }
}

function confirmCustomizationAndAdd() {
  const noteInput = document.getElementById("custom-cooking-note");
  if (noteInput) {
    selectedCustomizations.note = noteInput.value.trim();
  }

  cart.addItem(currentCustomizingDish, selectedCustomizations);
  closeModal("customization-modal");
}

// Render Promo Coupons
function renderCoupons() {
  const container = document.getElementById("coupons-carousel-container");
  if (!container) return;

  container.innerHTML = COUPONS.map(c => `
    <div class="coupon-banner-card" onclick="applyCouponDirect('${c.code}')">
      <div class="coupon-tag">${c.tag}</div>
      <div class="coupon-code-row">
        <span class="code-text">${c.code}</span>
        <button class="apply-chip">APPLY</button>
      </div>
      <p class="coupon-desc">${c.description}</p>
    </div>
  `).join('');
}

function applyCouponDirect(code) {
  const success = cart.applyCoupon(code);
  if (success) {
    openCartDrawer();
  }
}

// Render Verified Customer Reviews
function renderReviews() {
  const container = document.getElementById("reviews-grid");
  if (!container) return;

  container.innerHTML = CUSTOMER_REVIEWS.map(rev => `
    <div class="review-card">
      <div class="review-top">
        <img src="${rev.avatar}" alt="${rev.author}" class="reviewer-avatar" />
        <div class="reviewer-meta">
          <h4>${rev.author} ${rev.verified ? '<i class="fa-solid fa-circle-check text-success" title="Verified Diner"></i>' : ''}</h4>
          <div class="review-stars">
            ${Array.from({ length: rev.rating }).map(() => '<i class="fa-solid fa-star"></i>').join('')}
            <span class="review-date">• ${rev.date}</span>
          </div>
        </div>
      </div>
      <h5 class="review-title">${rev.title}</h5>
      <p class="review-text">"${rev.content}"</p>
      <div class="review-tags">
        ${rev.tags.map(t => `<span class="rev-tag">#${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Modal Controllers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Slide-out Cart Drawer
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("drawer-backdrop");
  if (drawer && overlay) {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    cart.render();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("drawer-backdrop");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Checkout and Order Placement
function proceedToCheckout() {
  if (cart.items.length === 0) {
    showToast("Your cart is empty! Add dishes to proceed.", "warning");
    return;
  }
  closeCartDrawer();
  cart.render();
  openModal("checkout-modal");
}

function handlePlaceOrder() {
  const selectedPayment = document.querySelector('input[name="payment-method"]:checked')?.value || "upi";
  const address = document.getElementById("checkout-delivery-address")?.innerText || "Jubilee Hills, Hyderabad";
  const bill = cart.calculateBill();

  // Create order in tracking system
  const order = orderTracker.createOrder(cart.items, bill, selectedPayment, address);
  
  // Clear the active cart
  cart.clear();

  // Close checkout modal & open live order tracking modal
  closeModal("checkout-modal");
  openModal("live-tracking-modal");
  showToast("🎉 Order placed successfully! Live tracking initiated.", "success");
}

// Filters & Controls Setup
function initEventListeners() {
  // Search Input
  const searchInput = document.getElementById("header-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      renderMenu();
    });
  }

  // Veg / Non-Veg Toggle Filter
  const vegOnlySwitch = document.getElementById("veg-only-switch");
  if (vegOnlySwitch) {
    vegOnlySwitch.addEventListener("change", (e) => {
      currentDietFilter = e.target.checked ? "veg" : "all";
      renderMenu();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderMenu();
    });
  }

  // Bestseller Chip Toggle
  const bestsellerChip = document.getElementById("bestseller-chip");
  if (bestsellerChip) {
    bestsellerChip.addEventListener("click", () => {
      onlyBestsellers = !onlyBestsellers;
      bestsellerChip.classList.toggle("active", onlyBestsellers);
      renderMenu();
    });
  }

  // Table Booking Form Handler
  const bookingForm = document.getElementById("table-booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById("book-name").value,
        phone: document.getElementById("book-phone").value,
        email: document.getElementById("book-email").value,
        guests: document.getElementById("book-guests").value,
        date: document.getElementById("book-date").value,
        time: document.getElementById("book-time").value,
        areaId: document.getElementById("book-area").value,
        occasion: document.getElementById("book-occasion").value,
        requests: document.getElementById("book-requests").value
      };

      closeModal("book-table-modal");
      reservationManager.createBooking(formData);
      bookingForm.reset();
    });
  }

  // Review Form Handler
  const reviewForm = document.getElementById("user-review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("review-name").value;
      const title = document.getElementById("review-title").value;
      const content = document.getElementById("review-content").value;
      const rating = parseInt(document.getElementById("review-rating-val").value || "5");

      CUSTOMER_REVIEWS.unshift({
        id: "rev-" + (CUSTOMER_REVIEWS.length + 1),
        author: name,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        rating: rating,
        date: "Just now",
        title: title,
        content: content,
        tags: ["Verified Diner", "Recent Experience"],
        verified: true
      });

      renderReviews();
      closeModal("review-modal");
      reviewForm.reset();
      showToast("Thank you for your valuable review! ❤️", "success");
    });
  }

  // Close modals on clicking overlay backdrop
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
}

function resetFilters() {
  currentCategory = "all";
  currentDietFilter = "all";
  currentSearchQuery = "";
  currentSort = "popular";
  onlyBestsellers = false;

  const searchInput = document.getElementById("header-search-input");
  if (searchInput) searchInput.value = "";
  
  const vegOnlySwitch = document.getElementById("veg-only-switch");
  if (vegOnlySwitch) vegOnlySwitch.checked = false;

  const bestsellerChip = document.getElementById("bestseller-chip");
  if (bestsellerChip) bestsellerChip.classList.remove("active");

  renderCategories();
  renderMenu();
}

function openAddressPicker() {
  const addresses = [
    "Signature Towers, Road 36, Jubilee Hills, Hyderabad",
    "Inorbit Mall Area, Hitec City, Hyderabad",
    "Banjara Hills, Road No. 12, Hyderabad",
    "Financial District, Gachibowli, Hyderabad",
    "Kondapur Main Road, Near Botanical Garden, Hyderabad"
  ];
  const choice = prompt("Select Delivery Address:\n1. Jubilee Hills\n2. Hitec City\n3. Banjara Hills\n4. Gachibowli\n5. Kondapur\n\nType 1-5:", "1");
  if (choice && addresses[parseInt(choice) - 1]) {
    const selected = addresses[parseInt(choice) - 1];
    const headerLoc = document.getElementById("user-current-location");
    const checkoutLoc = document.getElementById("checkout-delivery-address");
    if (headerLoc) headerLoc.textContent = selected.split(',')[0];
    if (checkoutLoc) checkoutLoc.textContent = selected;
    showToast(`Delivery location set to ${selected.split(',')[0]}! 📍`, "success");
  }
}
