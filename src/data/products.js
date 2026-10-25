/**
 * ReturnWise AI - Realistic Mock Product Catalog
 * Covers Laptops, Smartphones, and Audio/Headphones with structured technical specs.
 */

export const sampleProducts = [
  {
    id: "prod-lap-01",
    name: "AeroBook Pro 15 OLED",
    category: "Laptops",
    price: 1199,
    rating: 4.5,
    reviewsCount: 1420,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "Amazon Choice",
    description: "Ultra-slim productivity workhorse with a vibrant 2.8K OLED display, aluminum chassis, and efficient Intel Core i7 13th Gen processing.",
    specifications: {
      ram: 16, // in GB
      ramType: "LPDDR5 4800MHz",
      storage: 512, // in GB SSD
      storageType: "NVMe M.2 SSD",
      processor: "Intel Core i7-1360P (12 cores, up to 5.0 GHz)",
      gpu: "Integrated Intel Iris Xe",
      displaySize: "15.6 inch",
      displayType: "2.8K OLED 120Hz 500 nits HDR",
      batteryLifeHours: 9.5,
      weightKg: 1.58,
      os: "Windows 11 Home",
      ports: ["2x Thunderbolt 4", "1x USB-A 3.2", "HDMI 2.1", "3.5mm Audio"],
      webcam: "1080p FHD with privacy shutter"
    },
    pros: [
      "Gorgeous color-accurate OLED screen",
      "Lightweight and portable aluminum design",
      "Thunderbolt 4 support for external docks"
    ],
    cons: [
      "Integrated graphics (not suitable for heavy 3D gaming or local LLM/CUDA training)",
      "Soldered RAM (not user-upgradable)"
    ]
  },
  {
    id: "prod-lap-02",
    name: "TitanEdge RTX 4070 AI Gaming Studio",
    category: "Laptops",
    price: 1849,
    rating: 4.7,
    reviewsCount: 890,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    badge: "Top Rated for Creators",
    description: "High-performance creator & machine learning workstation featuring Nvidia GeForce RTX 4070 with 8GB VRAM and Ryzen 9 octacore muscle.",
    specifications: {
      ram: 32,
      ramType: "DDR5 5600MHz (Dual channel, upgradable to 64GB)",
      storage: 1024,
      storageType: "PCIe 4.0 NVMe SSD",
      processor: "AMD Ryzen 9 7940HS (8 cores, 16 threads)",
      gpu: "Dedicated NVIDIA GeForce RTX 4070 (8GB GDDR6 VRAM, 140W TGP)",
      displaySize: "16.0 inch",
      displayType: "QHD+ 240Hz 100% DCI-P3 IPS",
      batteryLifeHours: 5.5,
      weightKg: 2.35,
      os: "Windows 11 Pro",
      ports: ["2x USB-C USB4", "2x USB-A 3.2", "HDMI 2.1", "Full size SD card reader", "RJ-45 Ethernet"],
      webcam: "1080p IR Windows Hello"
    },
    pros: [
      "Hardware acceleration for CUDA, PyTorch, video rendering and AAA gaming",
      "Expandable memory up to 64GB DDR5",
      "High refresh rate QHD+ display"
    ],
    cons: [
      "Bulky charger and 2.35kg chassis",
      "Shorter battery life under sustained workloads"
    ]
  },
  {
    id: "prod-lap-03",
    name: "SwiftAir 13 Student Edition",
    category: "Laptops",
    price: 599,
    rating: 4.2,
    reviewsCount: 3105,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    badge: "Best Budget",
    description: "Budget-conscious companion for college, web browsing, Office work, and zoom lectures with marathon battery endurance.",
    specifications: {
      ram: 8,
      ramType: "LPDDR4X",
      storage: 256,
      storageType: "eMMC / NVMe combo",
      processor: "Intel Core i3-1215U (6 cores)",
      gpu: "Integrated Intel UHD",
      displaySize: "13.3 inch",
      displayType: "FHD IPS Anti-glare",
      batteryLifeHours: 11.0,
      weightKg: 1.25,
      os: "Windows 11 Home in S Mode",
      ports: ["1x USB-C", "2x USB-A", "3.5mm Audio"],
      webcam: "720p HD"
    },
    pros: [
      "Highly affordable under $600",
      "Over 11 hours of battery endurance",
      "Featherlight 1.25kg chassis"
    ],
    cons: [
      "8GB RAM limits heavy multitasking or developer tools",
      "Limited 256GB storage capacity"
    ]
  },
  {
    id: "prod-lap-04",
    name: "MacBook Neo Pro 14 M3",
    category: "Laptops",
    price: 1799,
    rating: 4.8,
    reviewsCount: 2200,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "Editors Choice",
    description: "Remarkable thermal efficiency, Liquid Retina XDR display with ProMotion 120Hz, and seamless Apple Silicon performance.",
    specifications: {
      ram: 18,
      ramType: "Unified Memory",
      storage: 512,
      storageType: "Apple Superfast SSD",
      processor: "Apple M3 Pro (11-core CPU, 14-core GPU)",
      gpu: "14-Core Apple Silicon GPU with Hardware Ray Tracing",
      displaySize: "14.2 inch",
      displayType: "Liquid Retina XDR (1600 nits peak, 120Hz)",
      batteryLifeHours: 17.0,
      weightKg: 1.61,
      os: "macOS Sonoma",
      ports: ["3x Thunderbolt 4", "HDMI", "SDXC slot", "MagSafe 3"],
      webcam: "1080p FaceTime HD"
    },
    pros: [
      "Unmatched 17+ hour battery life",
      "Industry-standard display accuracy and sound quality",
      "Silent cooling fans during normal use"
    ],
    cons: [
      "Non-Windows (some engineering software requires Windows emulation)",
      "Expensive proprietary storage upgrades"
    ]
  },
  {
    id: "prod-phone-01",
    name: "NovaFlagship Ultra 5G",
    category: "Smartphones",
    price: 1099,
    rating: 4.6,
    reviewsCount: 1980,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    badge: "Amazon Choice",
    description: "Premier flagship with quad camera 200MP sensor, 10x periscope optical zoom, and 120W HyperCharge.",
    specifications: {
      ram: 12,
      storage: 256,
      displaySize: "6.8 inch",
      displayType: "Dynamic AMOLED 2X 120Hz LTPO",
      batteryCapacity: 5000, // mAh
      batteryLifeHours: 14.0,
      camera: "200MP Primary + 12MP Ultra-wide + 50MP Periscope (5x) + 10MP (3x)",
      fastCharging: "120W Wired, 50W Wireless",
      waterResistance: "IP68 dust/water resistant",
      processor: "Snapdragon 8 Gen 3 (4nm)",
      os: "Android 14 with 5 Years OS Updates",
      esimSupport: true,
      nfc: true,
      headphoneJack: false
    },
    pros: [
      "Top-tier zoom photography and night videography",
      "Full charge in under 25 minutes",
      "Bright 2600-nit screen readable in direct sunlight"
    ],
    cons: [
      "No 3.5mm headphone jack or MicroSD expansion",
      "Heavy in hand (232 grams)"
    ]
  },
  {
    id: "prod-phone-02",
    name: "PixelCraft Zen 8a",
    category: "Smartphones",
    price: 499,
    rating: 4.5,
    reviewsCount: 3420,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    badge: "Best Value Camera",
    description: "The sweet spot of computational AI photography, clean stock software, and IP67 durability without breaking $500.",
    specifications: {
      ram: 8,
      storage: 128,
      displaySize: "6.1 inch",
      displayType: "OLED 90Hz HDR",
      batteryCapacity: 4492,
      batteryLifeHours: 12.5,
      camera: "64MP Main OIS + 13MP Ultrawide",
      fastCharging: "18W Wired, 7.5W Wireless",
      waterResistance: "IP67",
      processor: "Tensor G3 with Titan M2 security",
      os: "Clean Android with 7 Years Feature Drops",
      esimSupport: true,
      nfc: true,
      headphoneJack: false
    },
    pros: [
      "Astonishing photo processing for the price",
      "7 years of guaranteed OS and security patches",
      "Compact ergonomic one-handed form factor"
    ],
    cons: [
      "18W charging is noticeably slow compared to rivals",
      "No expandable storage (128GB baseline)"
    ]
  },
  {
    id: "prod-phone-03",
    name: "EnduroPower Tough 5G",
    category: "Smartphones",
    price: 349,
    rating: 4.1,
    reviewsCount: 750,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    badge: "Battery Champ",
    description: "Designed for outdoor workers, long travels, and delivery drivers with a massive 7000mAh battery and headphone jack.",
    specifications: {
      ram: 6,
      storage: 128,
      displaySize: "6.6 inch",
      displayType: "FHD+ 90Hz Gorilla Glass 5",
      batteryCapacity: 7000,
      batteryLifeHours: 24.0,
      camera: "50MP Dual Camera",
      fastCharging: "33W Wired",
      waterResistance: "IP68 / MIL-STD-810H shockproof",
      processor: "Dimensity 7050",
      os: "Android 13",
      esimSupport: false,
      nfc: true,
      headphoneJack: true
    },
    pros: [
      "Easily lasts 2 to 3 days on a single charge",
      "Has both 3.5mm jack and MicroSD expansion slot",
      "Rugged drop-resistant casing"
    ],
    cons: [
      "Mediocre low-light camera performance",
      "Chunky 12mm thickness"
    ]
  },
  {
    id: "prod-audio-01",
    name: "AcoustiQuiet Max 500 ANC",
    category: "Headphones",
    price: 349,
    rating: 4.7,
    reviewsCount: 5410,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Amazon Choice",
    description: "Industry-leading active noise cancellation with plush protein leather memory foam cups, multipoint Bluetooth, and 30-hour playback.",
    specifications: {
      type: "Over-Ear Wireless",
      anc: "Adaptive Hybrid ANC (4 microphones)",
      batteryLifeHours: 32.0,
      bluetoothVersion: "5.3 with Multipoint Dual Pairing",
      codecs: ["LDAC", "AAC", "SBC"],
      weightKg: 0.25,
      waterResistance: "IPX4 splash proof",
      microphone: "Beamforming AI voice isolation (4 mics)",
      chargingPort: "USB-C Quick Charge (3 min for 3 hrs)",
      wiredMode: "3.5mm aux cable included"
    },
    pros: [
      "Superior airplane and cafe cabin noise cancellation",
      "High-res LDAC audio streaming support",
      "Simultaneous dual-device pairing (Laptop + Phone)"
    ],
    cons: [
      "Ear cups can feel warm during intense gym workouts",
      "High price tag"
    ]
  },
  {
    id: "prod-audio-02",
    name: "PulseSport TrueWireless Earbuds",
    category: "Headphones",
    price: 119,
    rating: 4.4,
    reviewsCount: 2890,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    badge: "Best for Gym & Running",
    description: "Sweatproof secure-fit earbuds with silicone wingtips, punchy bass, ambient sound mode, and compact wireless charging case.",
    specifications: {
      type: "In-Ear Wireless Earbuds",
      anc: "Standard ANC with Transparency Mode",
      batteryLifeHours: 8.0, // 32 hrs with case
      bluetoothVersion: "5.2",
      codecs: ["AAC", "SBC"],
      weightKg: 0.05,
      waterResistance: "IPX7 waterproof (sweat & rain safe)",
      microphone: "Dual MEMS with noise reduction",
      chargingPort: "USB-C + Qi Wireless charging case",
      wiredMode: "No"
    },
    pros: [
      "IPX7 waterproof rating stands up to intense sweat and rain",
      "Ergonomic wingtips will never slip out while running",
      "Deep punchy bass tuning"
    ],
    cons: [
      "ANC is moderate, does not block deep aircraft rumble like over-ears",
      "No multipoint Bluetooth connection"
    ]
  },
  {
    id: "prod-audio-03",
    name: "StudioMaster Pro Open-Back 80",
    category: "Headphones",
    price: 199,
    rating: 4.6,
    reviewsCount: 1150,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    badge: "Audiophile Reference",
    description: "Open-back acoustic design delivering a wide, realistic soundstage for music mixing, podcasting, and audiophile listening.",
    specifications: {
      type: "Over-Ear Open-Back Studio",
      anc: "None (Open-Back acoustic chamber)",
      batteryLifeHours: 0, // Passive wired
      bluetoothVersion: "None (Audiophile 3.5mm / 6.35mm wired)",
      codecs: ["Lossless Analog Direct"],
      weightKg: 0.29,
      waterResistance: "None",
      microphone: "None (Dedicated audio monitoring)",
      chargingPort: "None",
      wiredMode: "Detachable 3m coiled cable + 6.35mm gold adapter"
    },
    pros: [
      "Extremely wide, natural soundstage and flat frequency response",
      "Breathable velour ear pads for zero heat buildup",
      "Zero latency and no batteries required"
    ],
    cons: [
      "Open back leaks sound out and lets ambient noise in (unusable on transit)",
      "Lacks Bluetooth and microphone for calls"
    ]
  }
];

export const productCategories = ["All", "Laptops", "Smartphones", "Headphones"];
