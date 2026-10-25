/**
 * Amazon One - Core Services Directory
 * 18 verified services across Shopping, Payments, Entertainment, Reading, Devices, Cloud, and Business.
 */

export const amazonServices = [
  // 1. Shopping & Commerce
  {
    id: "amazon-shopping",
    name: "Amazon Shopping",
    category: "Shopping",
    badge: "Core Service",
    iconName: "ShoppingBag",
    officialUrl: "https://www.amazon.com",
    tagline: "Earth's biggest selection of consumer goods, fast delivery & deals.",
    description: "Browse millions of products across electronics, apparel, home essentials, and everyday goods with Prime 1-day delivery and verified customer reviews.",
    features: [
      "Seamless search with category filters",
      "Prime 1-2 day delivery options",
      "Customer reviews and spec comparisons",
      "Return and refund tracking"
    ],
    demoRoute: "/shopping",
    popularity: 99,
    isFeatured: true
  },
  {
    id: "amazon-fresh",
    name: "Amazon Fresh",
    category: "Shopping",
    badge: "Groceries",
    iconName: "Apple",
    officialUrl: "https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo",
    tagline: "Fresh produce, pantry staples, and same-day grocery delivery.",
    description: "Order fresh organic groceries, meats, household supplies, and bakery items with flexible 2-hour delivery windows.",
    features: [
      "Same-day 2-hour grocery delivery slots",
      "Direct temperature-controlled handling",
      "Weekly digital coupons & Prime savings",
      "In-store smart Dash Cart integration"
    ],
    demoRoute: "/shopping?cat=Groceries",
    popularity: 88,
    isFeatured: true
  },
  {
    id: "amazon-business",
    name: "Amazon Business",
    category: "Shopping",
    badge: "B2B Solutions",
    iconName: "Briefcase",
    officialUrl: "https://business.amazon.com",
    tagline: "Wholesale purchasing, multi-user accounts & business analytics.",
    description: "Procurement solutions built specifically for startups, enterprises, and educational institutions with quantity discounts and tax exemptions.",
    features: [
      "Multi-user purchasing approvals workflow",
      "Wholesale bulk tier pricing",
      "Tax exemption management system",
      "Spend visibility and analytics reports"
    ],
    demoRoute: "/business?tab=procurement",
    popularity: 82,
    isFeatured: false
  },
  {
    id: "amazon-renewed",
    name: "Amazon Renewed",
    category: "Shopping",
    badge: "Certified Refurbished",
    iconName: "RefreshCw",
    officialUrl: "https://www.amazon.com/b?node=12653393011",
    tagline: "Pre-owned, certified, and refurbished electronics backed by guarantee.",
    description: "High quality smartphones, laptops, and audio gear professionally inspected, tested, and cleaned to look and work like new.",
    features: [
      "90-day Amazon Renewed guarantee",
      "Rigorous multi-point hardware inspection",
      "Eco-friendly electronic waste reduction",
      "Significant savings off standard MSRP"
    ],
    demoRoute: "/shopping?cat=Renewed",
    popularity: 85,
    isFeatured: true
  },

  // 2. Payments
  {
    id: "amazon-pay",
    name: "Amazon Pay",
    category: "Payments",
    badge: "Fast Checkout",
    iconName: "CreditCard",
    officialUrl: "https://pay.amazon.com",
    tagline: "Secure one-click digital wallet and checkout across tens of thousands of websites.",
    description: "Use your stored Amazon payment methods, shipping addresses, and buyer protections anywhere Amazon Pay is accepted online without re-entering card details.",
    features: [
      "Frictionless 1-click checkout on partner merchants",
      "Amazon A-to-z buyer protection guarantee",
      "Unified digital statement and purchase tracking",
      "Zero fraud liability protection"
    ],
    demoRoute: "/payments",
    popularity: 92,
    isFeatured: true
  },

  // 3. Entertainment
  {
    id: "prime-video",
    name: "Prime Video",
    category: "Entertainment",
    badge: "Movies & Series",
    iconName: "Tv",
    officialUrl: "https://www.primevideo.com",
    tagline: "Stream Amazon Originals, blockbuster movies, live sports & trending series.",
    description: "Unlimited streaming of critically acclaimed series like The Boys, Fallout, and Reacher with 4K HDR playback, offline mobile downloads, and X-Ray trivia.",
    features: [
      "Amazon Originals & live Thursday Night Football",
      "X-Ray powered by IMDb for actor and soundtrack info",
      "4K Ultra HD, Dolby Vision, and spatial audio",
      "Offline mobile video downloads for travel"
    ],
    demoRoute: "/entertainment?tab=video",
    popularity: 97,
    isFeatured: true
  },
  {
    id: "amazon-music",
    name: "Amazon Music",
    category: "Entertainment",
    badge: "Hi-Res Audio",
    iconName: "Music",
    officialUrl: "https://music.amazon.com",
    tagline: "100+ million songs in HD and top ad-free podcasts.",
    description: "Lossless Ultra HD streaming with spatial audio support, personalized playlists, and seamless voice control through Alexa smart speakers.",
    features: [
      "100M+ songs with lossless Ultra HD audio",
      "Dolby Atmos & 360 Reality Audio mixing",
      "Ad-free podcast library access",
      "Hands-free voice queuing with Alexa"
    ],
    demoRoute: "/entertainment?tab=music",
    popularity: 90,
    isFeatured: true
  },
  {
    id: "audible",
    name: "Audible",
    category: "Entertainment",
    badge: "Audiobooks",
    iconName: "Headphones",
    officialUrl: "https://www.audible.com",
    tagline: "The world's largest selection of spoken-word audiobooks and original audio.",
    description: "Immerse yourself in bestselling fiction, memoirs, and educational lectures narrated by world-class voice actors and celebrities.",
    features: [
      "Audible Originals & exclusive audio performances",
      "Whispersync for Voice with Kindle book sync",
      "Custom playback speeds from 0.5x to 3.5x",
      "Offline listening with car mode support"
    ],
    demoRoute: "/entertainment?tab=audible",
    popularity: 91,
    isFeatured: true
  },

  // 4. Reading
  {
    id: "kindle",
    name: "Kindle & E-Books",
    category: "Reading",
    badge: "Digital Books",
    iconName: "BookOpen",
    officialUrl: "https://www.amazon.com/kindle-dbs/fd/kcp",
    tagline: "Millions of titles at your fingertips on e-readers, tablets, and phones.",
    description: "Read anytime, anywhere with glare-free e-ink screens or mobile apps, synchronized bookmarks, built-in dictionary lookup, and Kindle Unlimited.",
    features: [
      "Instant download of over 10 million digital titles",
      "Whispersync across iOS, Android, and Kindle devices",
      "Custom fonts, margin adjustments, and Dark Mode",
      "Kindle Unlimited subscription access"
    ],
    demoRoute: "/reading?tab=kindle",
    popularity: 93,
    isFeatured: true
  },
  {
    id: "goodreads",
    name: "Goodreads",
    category: "Reading",
    badge: "Book Community",
    iconName: "Bookmark",
    officialUrl: "https://www.goodreads.com",
    tagline: "Track your reading challenge, discover new titles, and read member reviews.",
    description: "The world's largest social reading network where readers share book reviews, track annual goals, and get recommendations from literary peers.",
    features: [
      "Personalized annual reading challenge tracking",
      "Community ratings, reviews, and quotes",
      "Personal bookshelves: Want to Read, Currently Reading, Read",
      "Author Q&As and literary giveaways"
    ],
    demoRoute: "/reading?tab=goodreads",
    popularity: 86,
    isFeatured: false
  },

  // 5. Smart Devices
  {
    id: "alexa-echo",
    name: "Alexa & Echo Devices",
    category: "Devices",
    badge: "Smart Home",
    iconName: "Mic",
    officialUrl: "https://www.amazon.com/echo",
    tagline: "Voice AI smart speakers, smart displays, and connected home automation.",
    description: "Manage schedules, play music, control lights, and ask questions hands-free through Amazon Alexa and the Echo ecosystem.",
    features: [
      "Voice-controlled smart home automation routines",
      "Multi-room music sync across Echo devices",
      "Smart display video calling with Echo Show",
      "Thousands of Alexa third-party skills"
    ],
    demoRoute: "/devices?tab=echo",
    popularity: 95,
    isFeatured: true
  },
  {
    id: "fire-tv",
    name: "Fire TV",
    category: "Devices",
    badge: "Streaming Player",
    iconName: "Tv2",
    officialUrl: "https://www.amazon.com/firetv",
    tagline: "4K streaming media sticks, soundbars, and smart televisions.",
    description: "Access over 1.5 million movies and TV episodes across Netflix, YouTube, Prime Video, Disney+, and HBO Max with Alexa Voice Remote.",
    features: [
      "Wi-Fi 6E streaming with 4K Max support",
      "Alexa Voice Remote with TV volume & power control",
      "Live TV integration with channel guide",
      "Xbox Game Pass cloud gaming without console"
    ],
    demoRoute: "/devices?tab=firetv",
    popularity: 89,
    isFeatured: false
  },
  {
    id: "amazon-photos",
    name: "Amazon Photos",
    category: "Devices",
    badge: "Cloud Storage",
    iconName: "Image",
    officialUrl: "https://www.amazon.com/photos",
    tagline: "Unlimited full-resolution photo storage for Amazon Prime members.",
    description: "Securely backup your family memories with automatic smartphone camera roll sync and display them on Echo Show smart screens.",
    features: [
      "Unlimited full-resolution photo storage for Prime",
      "5GB free video cloud storage",
      "Echo Show & Fire TV screensaver slideshows",
      "AI facial recognition and location auto-tagging"
    ],
    demoRoute: "/devices?tab=photos",
    popularity: 83,
    isFeatured: false
  },

  // 6. Cloud & AI
  {
    id: "aws",
    name: "Amazon Web Services (AWS)",
    category: "Cloud",
    badge: "Cloud Computing",
    iconName: "Cloud",
    officialUrl: "https://aws.amazon.com",
    tagline: "The world's most comprehensive and broadly adopted cloud platform.",
    description: "Over 200 fully featured services from data centers globally, offering compute, storage, databases, machine learning, and DevOps tools.",
    features: [
      "Elastic compute with Amazon EC2",
      "Virtually unlimited object storage with Amazon S3",
      "Managed serverless execution with AWS Lambda",
      "Industry-leading 99.999% cloud reliability and security"
    ],
    demoRoute: "/cloud?service=aws",
    popularity: 96,
    isFeatured: true
  },
  {
    id: "amazon-bedrock",
    name: "Amazon Bedrock",
    category: "Cloud",
    badge: "Generative AI",
    iconName: "Sparkles",
    officialUrl: "https://aws.amazon.com/bedrock",
    tagline: "Build generative AI applications with industry-leading Foundation Models.",
    description: "A fully managed service offering choice of high-performing foundation models from AI21 Labs, Anthropic, Cohere, Meta, and Amazon via a unified API.",
    features: [
      "Unified serverless API for multiple LLMs",
      "Private model customization with your enterprise data",
      "Built-in RAG and AI agent orchestration",
      "Enterprise-grade data privacy and guardrails"
    ],
    demoRoute: "/cloud?service=bedrock",
    popularity: 94,
    isFeatured: true
  },

  // 7. Business & Creators
  {
    id: "amazon-seller-central",
    name: "Amazon Seller Central",
    category: "Business",
    badge: "E-Commerce Merchants",
    iconName: "Store",
    officialUrl: "https://sell.amazon.com",
    tagline: "Sell to hundreds of millions of worldwide customers and scale your brand.",
    description: "Merchant dashboard offering inventory management, automated pricing, global advertising tools, and Fulfillment by Amazon (FBA) logistics.",
    features: [
      "Fulfillment by Amazon (FBA) logistics support",
      "Sponsored Products and brand advertising suite",
      "Automated currency conversion and global exports",
      "Detailed sales analytics and inventory forecasting"
    ],
    demoRoute: "/business?tab=seller",
    popularity: 91,
    isFeatured: true
  },
  {
    id: "kdp",
    name: "Kindle Direct Publishing (KDP)",
    category: "Business",
    badge: "Self-Publishing",
    iconName: "PenTool",
    officialUrl: "https://kdp.amazon.com",
    tagline: "Self-publish e-books and paperbacks for free and reach millions.",
    description: "Publish your book within minutes and earn up to 70% royalty on sales to customers in the US, Europe, Japan, and worldwide.",
    features: [
      "Free digital and print-on-demand publishing",
      "Up to 70% royalties on eligible e-books",
      "Fast 24-48 hour global distribution",
      "Full author copyright retention"
    ],
    demoRoute: "/business?tab=kdp",
    popularity: 84,
    isFeatured: false
  },
  {
    id: "twitch",
    name: "Twitch Interactive",
    category: "Business",
    badge: "Live Streaming",
    iconName: "Video",
    officialUrl: "https://www.twitch.tv",
    tagline: "The premier global live streaming platform for gaming, esports, and creators.",
    description: "Connect with millions of fans in real-time, broadcast gameplay, host podcast talk shows, and earn revenue through subs, bits, and sponsorships.",
    features: [
      "Real-time interactive chat with custom emotes",
      "Prime Gaming monthly free channel subscriptions",
      "Monetization through subs, bits, and sponsorships",
      "Creator Camp tutorials and production tooling"
    ],
    demoRoute: "/business?tab=twitch",
    popularity: 93,
    isFeatured: true
  }
];

export const serviceCategories = [
  "All",
  "Shopping",
  "Payments",
  "Entertainment",
  "Reading",
  "Devices",
  "Cloud",
  "Business"
];
