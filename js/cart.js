// Lahari's Restaurant - Cart Management Engine

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.appliedCoupon = null;
    this.tipAmount = 0;
    this.deliveryInstructions = [];
    this.deliveryAddress = "Flat 402, Signature Towers, Road 36, Jubilee Hills, Hyderabad";
  }

  loadCart() {
    try {
      const saved = localStorage.getItem("lahari_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem("lahari_cart", JSON.stringify(this.items));
    } catch (e) {
      console.error("Cart save error:", e);
    }
    this.render();
  }

  addItem(dish, customizations = null) {
    // Generate unique key based on dishId and selected customization choices
    const portionName = customizations?.portion?.name || "Standard";
    const portionPrice = customizations?.portion?.price || 0;
    const addonsList = customizations?.addons || [];
    const addonsKey = addonsList.map(a => a.name).sort().join("|");
    const spiceLevel = customizations?.spiceLevel || "";
    const note = customizations?.note || "";

    const cartKey = `${dish.id}_${portionName}_${addonsKey}_${spiceLevel}`;
    const existingIndex = this.items.findIndex(item => item.cartKey === cartKey);

    const basePrice = dish.price + portionPrice;
    const addonsTotal = addonsList.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = basePrice + addonsTotal;

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({
        cartKey,
        dishId: dish.id,
        name: dish.name,
        isVeg: dish.isVeg,
        image: dish.image,
        unitPrice: unitPrice,
        basePrice: dish.price,
        portion: customizations?.portion || null,
        addons: addonsList,
        spiceLevel: spiceLevel,
        note: note,
        quantity: 1
      });
    }

    this.saveCart();
    showToast(`Added "${dish.name}" to cart! 🛒`, "success");
  }

  updateQuantity(cartKey, delta) {
    const itemIndex = this.items.findIndex(i => i.cartKey === cartKey);
    if (itemIndex === -1) return;

    this.items[itemIndex].quantity += delta;

    if (this.items[itemIndex].quantity <= 0) {
      const removedName = this.items[itemIndex].name;
      this.items.splice(itemIndex, 1);
      showToast(`Removed "${removedName}" from cart`, "info");
    }

    this.saveCart();
  }

  getItemQuantity(dishId) {
    return this.items
      .filter(i => i.dishId === dishId)
      .reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.appliedCoupon = null;
    this.tipAmount = 0;
    this.saveCart();
  }

  applyCoupon(code) {
    const found = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast("Invalid promo code! Try LAHARI50 or FEAST100", "error");
      return false;
    }

    const subtotal = this.getSubtotal();
    if (subtotal < found.minOrder) {
      showToast(`Minimum order of ₹${found.minOrder} required for ${found.code}`, "warning");
      return false;
    }

    this.appliedCoupon = found;
    showToast(`Promo "${found.code}" applied successfully! 🎉`, "success");
    this.render();
    return true;
  }

  removeCoupon() {
    if (this.appliedCoupon) {
      showToast(`Coupon "${this.appliedCoupon.code}" removed`, "info");
      this.appliedCoupon = null;
      this.render();
    }
  }

  setTip(amount) {
    this.tipAmount = amount;
    this.render();
  }

  toggleDeliveryInstruction(instruction) {
    const idx = this.deliveryInstructions.indexOf(instruction);
    if (idx > -1) {
      this.deliveryInstructions.splice(idx, 1);
    } else {
      this.deliveryInstructions.push(instruction);
    }
    this.render();
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  calculateBill() {
    const subtotal = this.getSubtotal();
    let discount = 0;
    let deliveryFee = subtotal >= RESTAURANT_DATA.freeDeliveryThreshold ? 0 : RESTAURANT_DATA.deliveryFee;

    if (this.appliedCoupon) {
      if (this.appliedCoupon.discountPercent) {
        discount = Math.min((subtotal * this.appliedCoupon.discountPercent) / 100, this.appliedCoupon.maxDiscount);
      } else if (this.appliedCoupon.discountFlat) {
        discount = Math.min(this.appliedCoupon.discountFlat, subtotal);
      } else if (this.appliedCoupon.freeDelivery) {
        deliveryFee = 0;
      }
    }

    const platformFee = subtotal > 0 ? RESTAURANT_DATA.platformFee : 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    const gst = subtotal > 0 ? Math.round(taxableAmount * RESTAURANT_DATA.gstRate) : 0;
    const tip = this.tipAmount || 0;
    const grandTotal = Math.max(0, taxableAmount + deliveryFee + platformFee + gst + tip);

    const amountNeededForFreeDelivery = Math.max(0, RESTAURANT_DATA.freeDeliveryThreshold - subtotal);
    const freeDeliveryProgress = Math.min(100, Math.round((subtotal / RESTAURANT_DATA.freeDeliveryThreshold) * 100));

    return {
      subtotal,
      discount: Math.round(discount),
      deliveryFee,
      platformFee,
      gst,
      tip,
      grandTotal: Math.round(grandTotal),
      amountNeededForFreeDelivery,
      freeDeliveryProgress,
      isFreeDelivery: deliveryFee === 0 && subtotal > 0
    };
  }

  render() {
    const bill = this.calculateBill();
    const count = this.getTotalCount();

    // 1. Update Header / Floating Cart badges
    const badgeElements = document.querySelectorAll(".cart-count-badge");
    badgeElements.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? "inline-flex" : "none";
    });

    const floatingCart = document.getElementById("floating-cart-bar");
    if (floatingCart) {
      if (count > 0) {
        floatingCart.classList.add("visible");
        const countText = document.getElementById("floating-cart-count");
        const totalText = document.getElementById("floating-cart-total");
        if (countText) countText.textContent = `${count} ${count === 1 ? 'ITEM' : 'ITEMS'}`;
        if (totalText) totalText.textContent = `₹${bill.grandTotal}`;
      } else {
        floatingCart.classList.remove("visible");
      }
    }

    // 2. Render Drawer Cart Items
    const drawerContainer = document.getElementById("cart-drawer-items");
    const drawerEmptyState = document.getElementById("cart-empty-state");
    const drawerContent = document.getElementById("cart-drawer-content");

    if (drawerContainer && drawerEmptyState && drawerContent) {
      if (this.items.length === 0) {
        drawerEmptyState.style.display = "flex";
        drawerContent.style.display = "none";
      } else {
        drawerEmptyState.style.display = "none";
        drawerContent.style.display = "block";

        drawerContainer.innerHTML = this.items.map(item => `
          <div class="cart-item-row" data-cart-key="${item.cartKey}">
            <div class="cart-item-info">
              <div class="cart-item-title-row">
                <span class="diet-dot ${item.isVeg ? 'veg' : 'non-veg'}"></span>
                <span class="cart-item-name">${item.name}</span>
              </div>
              ${item.portion || item.addons.length > 0 || item.spiceLevel ? `
                <div class="cart-item-customs">
                  ${item.portion ? `<span>${item.portion.name}</span>` : ''}
                  ${item.spiceLevel ? `<span>• ${item.spiceLevel}</span>` : ''}
                  ${item.addons.map(a => `<span>+ ${a.name} (₹${a.price})</span>`).join(' ')}
                </div>
              ` : ''}
              <div class="cart-item-price">₹${item.unitPrice * item.quantity}</div>
            </div>
            <div class="cart-qty-control">
              <button class="qty-btn minus" onclick="cart.updateQuantity('${item.cartKey}', -1)" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn plus" onclick="cart.updateQuantity('${item.cartKey}', 1)" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    // 3. Render Free Delivery Progress
    const freeDeliveryBanner = document.getElementById("free-delivery-meter");
    if (freeDeliveryBanner) {
      if (bill.isFreeDelivery) {
        freeDeliveryBanner.innerHTML = `
          <div class="free-del-msg success">
            <i class="fa-solid fa-circle-check"></i> You've unlocked <strong>FREE Delivery!</strong>
          </div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 100%"></div></div>
        `;
      } else {
        freeDeliveryBanner.innerHTML = `
          <div class="free-del-msg">
            <i class="fa-solid fa-motorcycle"></i> Add <strong>₹${bill.amountNeededForFreeDelivery}</strong> more to unlock <strong>FREE Delivery</strong>
          </div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${bill.freeDeliveryProgress}%"></div></div>
        `;
      }
    }

    // 4. Render Bill Breakdown in Drawer & Checkout
    const billBreakdownContainers = document.querySelectorAll(".bill-breakdown-box");
    billBreakdownContainers.forEach(container => {
      container.innerHTML = `
        <div class="bill-line">
          <span>Item Total</span>
          <span>₹${bill.subtotal}</span>
        </div>
        ${bill.discount > 0 ? `
          <div class="bill-line discount-line">
            <span>Coupon Discount (${this.appliedCoupon?.code})</span>
            <span class="text-success">- ₹${bill.discount}</span>
          </div>
        ` : ''}
        <div class="bill-line">
          <span>Delivery Partner Fee</span>
          <span>${bill.deliveryFee === 0 ? '<span class="badge-free">FREE</span>' : `₹${bill.deliveryFee}`}</span>
        </div>
        <div class="bill-line">
          <span>Platform Fee</span>
          <span>₹${bill.platformFee}</span>
        </div>
        <div class="bill-line">
          <span>GST & Restaurant Taxes (5%)</span>
          <span>₹${bill.gst}</span>
        </div>
        ${bill.tip > 0 ? `
          <div class="bill-line tip-line">
            <span>Delivery Tip</span>
            <span>₹${bill.tip}</span>
          </div>
        ` : ''}
        <div class="bill-divider"></div>
        <div class="bill-line total-line">
          <span>TO PAY</span>
          <span class="grand-price">₹${bill.grandTotal}</span>
        </div>
        ${bill.discount > 0 ? `
          <div class="savings-pill">
            <i class="fa-solid fa-tags"></i> You saved ₹${bill.discount} on this order!
          </div>
        ` : ''}
      `;
    });

    // 5. Update Applied Coupon UI
    const appliedCouponCard = document.getElementById("applied-coupon-display");
    if (appliedCouponCard) {
      if (this.appliedCoupon) {
        appliedCouponCard.style.display = "flex";
        appliedCouponCard.innerHTML = `
          <div class="coupon-tag-content">
            <i class="fa-solid fa-badge-percent"></i>
            <div>
              <strong>'${this.appliedCoupon.code}' applied</strong>
              <p class="coupon-hint">${this.appliedCoupon.description}</p>
            </div>
          </div>
          <button class="remove-coupon-btn" onclick="cart.removeCoupon()">Remove</button>
        `;
      } else {
        appliedCouponCard.style.display = "none";
      }
    }

    // Refresh Menu Card Quantity Controls
    if (typeof updateMenuCardCounters === "function") {
      updateMenuCardCounters();
    }
  }
}

const cart = new CartManager();
