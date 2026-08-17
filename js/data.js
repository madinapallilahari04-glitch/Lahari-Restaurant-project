// Lahari's Restaurant - Data Catalog & Configuration

const RESTAURANT_DATA = {
  name: "Lahari's Restaurant & Gourmet Kitchen",
  shortName: "Lahari's",
  tagline: "Authentic Hyderabadi Flavors, Tandoori Delights & Royal Feast",
  rating: 4.8,
  reviewCount: "2.8k+ ratings",
  deliveryTime: "25-35 mins",
  costForTwo: "₹500 for two",
  location: "Jubilee Hills, Hyderabad",
  fssaiLicense: "13622014000492",
  phone: "+91 98765 43210",
  isOpen: true,
  freeDeliveryThreshold: 299,
  deliveryFee: 40,
  platformFee: 7,
  gstRate: 0.05 // 5% GST
};

const CATEGORIES = [
  { id: "all", name: "All Menu", icon: "fa-utensils" },
  { id: "biryani", name: "Dum Biryani", icon: "fa-bowl-rice", image: "assets/images/biryani.jpg" },
  { id: "starters", name: "Tandoor & Starters", icon: "fa-fire-flame-curved", image: "assets/images/paneer-tikka.jpg" },
  { id: "curries", name: "Royal Curries & Breads", icon: "fa-bowl-food", image: "assets/images/butter-chicken.jpg" },
  { id: "kebabs", name: "Sizzling Kebabs", icon: "fa-drumstick-bite", image: "assets/images/tandoori-kebab.jpg" },
  { id: "south-indian", name: "South Indian Special", icon: "fa-plate-wheat", image: "assets/images/dosa.jpg" },
  { id: "asian", name: "Wok & Pan Asian", icon: "fa-bowl-chopsticks", image: "assets/images/noodles.jpg" },
  { id: "desserts", name: "Royal Desserts", icon: "fa-ice-cream", image: "assets/images/dessert.jpg" },
  { id: "beverages", name: "Beverages & Mocktails", icon: "fa-martini-glass-citrus", image: "assets/images/mocktail.jpg" }
];

const MENU_ITEMS = [
  {
    id: "dish-1",
    name: "Lahari's Special Hyderabadi Mutton Dum Biryani",
    category: "biryani",
    price: 389,
    originalPrice: 459,
    rating: 4.9,
    ratingCount: 1420,
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    spiceLevel: 3,
    prepTime: "25 mins",
    image: "assets/images/biryani.jpg",
    description: "Long-grain Daawat Basmati rice slow-cooked on 'Dum' with tender, spiced mutton cuts, rich saffron essence, ghee, and golden fried onions. Served with Mirchi ka Salan & creamy Mint Raita.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Regular (Serves 1-2)", price: 0 },
        { name: "Jumbo Family Pack (Serves 3-4)", price: 290 }
      ],
      addons: [
        { name: "Extra Mutton Piece (2 pcs)", price: 120 },
        { name: "Extra Mirchi ka Salan & Raita", price: 35 },
        { name: "Boiled Egg (2 pcs)", price: 30 },
        { name: "Gulab Jamun (2 pcs)", price: 50 }
      ],
      spiceLevels: ["Medium Spicy", "Authentic Spicy 🌶️", "Extra Hot & Spicy 🔥"]
    }
  },
  {
    id: "dish-2",
    name: "Royal Hyderabadi Chicken Dum Biryani",
    category: "biryani",
    price: 299,
    originalPrice: 359,
    rating: 4.8,
    ratingCount: 2150,
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTime: "20 mins",
    image: "assets/images/biryani.jpg",
    description: "Tender chicken marinated overnight in traditional Nizami spices, layered with aromatic basmati rice, mint leaves, and desi ghee. Accompanied with rich salan and raita.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Single Portion", price: 0 },
        { name: "Family Pack (Serves 3-4)", price: 240 }
      ],
      addons: [
        { name: "Extra Chicken Piece", price: 70 },
        { name: "Double Salan & Raita", price: 30 },
        { name: "Boiled Egg (1 pc)", price: 15 }
      ],
      spiceLevels: ["Mild", "Medium Spicy", "Spicy"]
    }
  },
  {
    id: "dish-3",
    name: "Shahi Paneer Tikka Dum Biryani (Pure Veg)",
    category: "biryani",
    price: 269,
    originalPrice: 319,
    rating: 4.7,
    ratingCount: 890,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTime: "20 mins",
    image: "assets/images/biryani.jpg",
    description: "Smoky tandoori paneer cubes gently cooked with fragrant basmati rice, caramelised onions, aromatic potli spices, and fresh coriander. Served with burani raita.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Regular (Serves 1-2)", price: 0 },
        { name: "Family Pack (Serves 3)", price: 200 }
      ],
      addons: [
        { name: "Extra Paneer Tikka (4 pcs)", price: 65 },
        { name: "Roasted Papad (2 pcs)", price: 20 }
      ],
      spiceLevels: ["Mild", "Medium Spicy"]
    }
  },
  {
    id: "dish-4",
    name: "Amritsari Sizzling Paneer Tikka",
    category: "starters",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    ratingCount: 940,
    isVeg: true,
    isBestseller: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTime: "15 mins",
    image: "assets/images/paneer-tikka.jpg",
    description: "Fresh cottage cheese chunks infused with mustard oil, hung curd, and roasted carom seeds (ajwain), charred to perfection in clay oven. Served with spicy mint chutney.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "6 Pieces", price: 0 },
        { name: "10 Pieces (Platter)", price: 110 }
      ],
      addons: [
        { name: "Extra Mint Chutney & Onion Salad", price: 25 },
        { name: "Cheese Burst Glaze", price: 40 }
      ],
      spiceLevels: ["Mild", "Medium", "Spicy"]
    }
  },
  {
    id: "dish-5",
    name: "Tandoori Murgh (Full / Half)",
    category: "starters",
    price: 349,
    originalPrice: 410,
    rating: 4.9,
    ratingCount: 1680,
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    spiceLevel: 3,
    prepTime: "25 mins",
    image: "assets/images/tandoori-kebab.jpg",
    description: "Classic Indian king of tandoor: whole spring chicken marinated in Kashmiri deghi mirch, ginger-garlic paste, and traditional spices, roasted over red hot charcoal.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Half Bird (4 pcs)", price: 0 },
        { name: "Full Bird (8 pcs)", price: 250 }
      ],
      addons: [
        { name: "Butter Garlic Naan (1 pc)", price: 55 },
        { name: "Chutney & Lachha Onion", price: 25 }
      ],
      spiceLevels: ["Medium Spicy", "Extra Fiery 🔥"]
    }
  },
  {
    id: "dish-6",
    name: "Lucknowi Galouti Seekh Kebab Platter",
    category: "kebabs",
    price: 379,
    originalPrice: 440,
    rating: 4.9,
    ratingCount: 1120,
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTime: "20 mins",
    image: "assets/images/tandoori-kebab.jpg",
    description: "Melt-in-mouth smoked minced meat infused with 32 royal spices, rose water, and raw papaya paste, grilled on hot skewers. Served with Mughlai paratha.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Standard (6 Skewers)", price: 0 },
        { name: "Grand Platter (10 Skewers)", price: 180 }
      ],
      addons: [
        { name: "Extra Mughlai Paratha (2 pcs)", price: 60 },
        { name: "Spicy Walnut Dip", price: 40 }
      ],
      spiceLevels: ["Royal Mild", "Spicy"]
    }
  },
  {
    id: "dish-7",
    name: "Classic Delhi Butter Chicken (Murgh Makhani)",
    category: "curries",
    price: 329,
    originalPrice: 389,
    rating: 4.9,
    ratingCount: 2310,
    isVeg: false,
    isBestseller: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTime: "20 mins",
    image: "assets/images/butter-chicken.jpg",
    description: "Succulent charcoal-grilled boneless chicken morsels simmered in velvety, satin-smooth tomato-butter-cashew gravy scented with dried fenugreek leaves (kasoori methi).",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Regular (500ml)", price: 0 },
        { name: "Large (800ml)", price: 140 }
      ],
      addons: [
        { name: "Butter Garlic Naan (2 pcs)", price: 90 },
        { name: "Steamed Jeera Rice", price: 75 },
        { name: "Extra Makhani Cream Swirl", price: 30 }
      ],
      spiceLevels: ["Authentic Mild Sweet", "Medium Spiced"]
    }
  },
  {
    id: "dish-8",
    name: "Paneer Butter Masala & Garlic Naan Combo",
    category: "curries",
    price: 289,
    originalPrice: 339,
    rating: 4.8,
    ratingCount: 1750,
    isVeg: true,
    isBestseller: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTime: "15 mins",
    image: "assets/images/butter-chicken.jpg",
    description: "Soft Malai paneer simmered in rich creamy tomato and butter gravy, delivered with 2 crispy hot Butter Garlic Naans and pickle.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Combo (Gravy + 2 Naans)", price: 0 },
        { name: "Family Pack (Gravy + 4 Naans + Jeera Rice)", price: 160 }
      ],
      addons: [
        { name: "Extra Butter Naan", price: 45 },
        { name: "Gulab Jamun (1 pc)", price: 25 }
      ],
      spiceLevels: ["Mild", "Medium Spicy"]
    }
  },
  {
    id: "dish-9",
    name: "Dal Makhani 24-Hour Slow Cooked",
    category: "curries",
    price: 239,
    originalPrice: 279,
    rating: 4.8,
    ratingCount: 1200,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTime: "15 mins",
    image: "assets/images/butter-chicken.jpg",
    description: "Whole black lentils (urad dal) and kidney beans simmered overnight on slow charcoal fire with pure white butter, fresh cream, and organic spices.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Portion (500ml)", price: 0 }
      ],
      addons: [
        { name: "Tandoori Roti (3 pcs)", price: 50 },
        { name: "Laccha Paratha (2 pcs)", price: 60 }
      ],
      spiceLevels: ["Classic Rich"]
    }
  },
  {
    id: "dish-10",
    name: "Royal Mysore Masala Dosa Platter",
    category: "south-indian",
    price: 179,
    originalPrice: 219,
    rating: 4.8,
    ratingCount: 1540,
    isVeg: true,
    isBestseller: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTime: "15 mins",
    image: "assets/images/dosa.jpg",
    description: "Crispy golden crepe smeared with spicy red garlic-chutney paste, stuffed with spiced potato masala. Served with drumstick sambar, fresh coconut chutney, and crunchy medu vada.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Single Platter (1 Dosa + 1 Vada)", price: 0 },
        { name: "Duo Feast (2 Dosas + 2 Vadas)", price: 110 }
      ],
      addons: [
        { name: "Extra Desi Ghee Roast", price: 25 },
        { name: "Extra Crispy Medu Vada (1 pc)", price: 35 },
        { name: "Filter Coffee (Madras Style)", price: 40 }
      ],
      spiceLevels: ["Standard", "Extra Red Chutney 🔥"]
    }
  },
  {
    id: "dish-11",
    name: "Ghee Podi Idli (12 Coin Idlis)",
    category: "south-indian",
    price: 149,
    originalPrice: 179,
    rating: 4.7,
    ratingCount: 780,
    isVeg: true,
    isBestseller: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTime: "10 mins",
    image: "assets/images/dosa.jpg",
    description: "Piping hot mini button idlis tossed generously in pure aromatic cow ghee and spicy gun powder (Karam Podi). Accompanied with coconut & tomato chutney.",
    customizable: false
  },
  {
    id: "dish-12",
    name: "Sizzling Street-Style Hakka Noodles",
    category: "asian",
    price: 199,
    originalPrice: 239,
    rating: 4.7,
    ratingCount: 960,
    isVeg: true,
    isBestseller: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTime: "15 mins",
    image: "assets/images/noodles.jpg",
    description: "Fresh wok-tossed noodles with shredded cabbage, bell peppers, carrots, spring onions, garlic and dark soy glaze. Smoked to perfection in cast iron wok.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Veg Hakka Noodles", price: 0 },
        { name: "Egg & Chicken Hakka Noodles", price: 60 }
      ],
      addons: [
        { name: "Chilli Paneer Dry (4 pcs)", price: 70 },
        { name: "Schezwan Sauce Dip", price: 20 }
      ],
      spiceLevels: ["Mild Garlic", "Medium Spicy", "Fiery Schezwan 🌶️"]
    }
  },
  {
    id: "dish-13",
    name: "Chilli Chicken Dry / Gravy",
    category: "asian",
    price: 259,
    originalPrice: 299,
    rating: 4.8,
    ratingCount: 1340,
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    spiceLevel: 3,
    prepTime: "15 mins",
    image: "assets/images/noodles.jpg",
    description: "Crispy fried chicken chunks tossed in spicy soya sauce, fresh green chillies, ginger, garlic, and diced bell peppers.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Dry (Appetizer)", price: 0 },
        { name: "Semi-Gravy (Goes with Fried Rice)", price: 20 }
      ],
      addons: [
        { name: "Egg Fried Rice (Side)", price: 80 }
      ],
      spiceLevels: ["Medium Spicy", "Extra Spicy 🔥"]
    }
  },
  {
    id: "dish-14",
    name: "Shahi Gulab Jamun with Creamy Rabdi",
    category: "desserts",
    price: 149,
    originalPrice: 189,
    rating: 4.9,
    ratingCount: 1890,
    isVeg: true,
    isBestseller: true,
    isSpicy: false,
    spiceLevel: 0,
    prepTime: "10 mins",
    image: "assets/images/dessert.jpg",
    description: "Warm, melt-in-mouth khoya gulab jamuns served atop chilled slow-reduced saffron rabdi, crowned with silver foil (vark) and roasted pistachio slivers.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "2 Pieces with Rabdi", price: 0 },
        { name: "4 Pieces Family Bowl", price: 90 }
      ],
      addons: [
        { name: "Extra Rabdi Scoop", price: 40 }
      ],
      spiceLevels: ["N/A"]
    }
  },
  {
    id: "dish-15",
    name: "Kesari Rasmalai (2 Pcs)",
    category: "desserts",
    price: 139,
    originalPrice: 169,
    rating: 4.8,
    ratingCount: 1220,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
    spiceLevel: 0,
    prepTime: "5 mins",
    image: "assets/images/dessert.jpg",
    description: "Delicate cottage cheese patties soaked in thick cardamom and saffron infused condensed milk, chilled to refreshing perfection.",
    customizable: false
  },
  {
    id: "dish-16",
    name: "Tropical Passion Fruit & Mint Mojito",
    category: "beverages",
    price: 129,
    originalPrice: 159,
    rating: 4.9,
    ratingCount: 890,
    isVeg: true,
    isBestseller: true,
    isSpicy: false,
    spiceLevel: 0,
    prepTime: "5 mins",
    image: "assets/images/mocktail.jpg",
    description: "Handcrafted refreshing cooler with freshly crushed Brazilian passion fruit pulp, garden mint leaves, lime wedge, sparkling soda, and crushed ice.",
    customizable: true,
    customOptions: {
      portions: [
        { name: "Regular Glass (350ml)", price: 0 },
        { name: "Jumbo Mason Jar (500ml)", price: 40 }
      ],
      addons: [
        { name: "Chia Seeds boost", price: 15 },
        { name: "Extra Mint Burst", price: 10 }
      ],
      spiceLevels: ["N/A"]
    }
  },
  {
    id: "dish-17",
    name: "Royal Kesari Lassi with Malai & Dry Fruits",
    category: "beverages",
    price: 119,
    originalPrice: 149,
    rating: 4.8,
    ratingCount: 1040,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
    spiceLevel: 0,
    prepTime: "5 mins",
    image: "assets/images/mocktail.jpg",
    description: "Thick, creamy churned Punjabi curd blended with Kashmiri saffron, topped with thick clotted malai layer and crushed cashews & almonds.",
    customizable: false
  }
];

const COUPONS = [
  {
    code: "LAHARI50",
    discountPercent: 50,
    maxDiscount: 100,
    minOrder: 199,
    description: "50% OFF up to ₹100 on orders above ₹199",
    tag: "MOST POPULAR"
  },
  {
    code: "FEAST100",
    discountFlat: 100,
    minOrder: 499,
    description: "Flat ₹100 OFF on orders above ₹499",
    tag: "GRAND FEAST"
  },
  {
    code: "FREEDEL",
    freeDelivery: true,
    minOrder: 199,
    description: "FREE Delivery on all orders above ₹199",
    tag: "ZERO DELIVERY"
  },
  {
    code: "WELCOME20",
    discountPercent: 20,
    maxDiscount: 75,
    minOrder: 149,
    description: "20% OFF on your order up to ₹75",
    tag: "SPECIAL"
  }
];

const CUSTOMER_REVIEWS = [
  {
    id: "rev-1",
    author: "Sneha Reddy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Yesterday",
    title: "Best Mutton Biryani in Hyderabad! 🌟",
    content: "The aroma when opening the package was out of this world. Super tender meat pieces, authentic ghee flavor, and the delivery reached in under 25 minutes hot and fresh!",
    tags: ["Mutton Biryani", "Fast Delivery", "Great Packaging"],
    verified: true
  },
  {
    id: "rev-2",
    author: "Aditya Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "3 days ago",
    title: "Incredible Butter Chicken & Garlic Naan",
    content: "Lahari's has become our family weekend ritual. The Butter Chicken is rich, creamy, and doesn't feel heavy. Also their table booking service for dine-in was super smooth!",
    tags: ["Butter Chicken", "Dineout", "Family Friendly"],
    verified: true
  },
  {
    id: "rev-3",
    author: "Pooja Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "1 week ago",
    title: "Pure Veg heaven - Paneer Tikka & Dosa",
    content: "Separate veg packaging and very fresh ingredients. The Paneer Tikka had that smoky charcoal flavor you rarely get in home delivery. 10/10 recommended.",
    tags: ["Pure Veg", "Paneer Tikka", "Hygiene"],
    verified: true
  }
];

const SEATING_AREAS = [
  { id: "rooftop", name: "Rooftop Sky Lounge", desc: "Open sky city views with ambient fairy lights & live acoustic music", surcharge: 0 },
  { id: "indoor_ac", name: "Royal AC Dining Hall", desc: "Plush royal seating, temperature controlled, family friendly", surcharge: 0 },
  { id: "candlelight", name: "Candlelight Romance Corner", desc: "Intimate corner table decorated with fresh roses & candlelight", surcharge: 150 },
  { id: "vip_lounge", name: "VIP Family Suite (6-12 Guests)", desc: "Private dining room with dedicated butler service", surcharge: 300 }
];
