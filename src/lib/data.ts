import {
  Vehicle,
  NavItemType,
  TourPackage,
  DashboardStat,
  ChartDataPoint,
  RecentBooking,
  Destination,
  HeroContent,
  EmailBroadcast,
  Customer,
} from "@/types";

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Avanza",
    type: "car",
    licensePlate: "AB 1234 CD",
    pricePerDay: 350000,
    status: "rented",
    imageUrl: null,
    category: "MPV",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 5678 EF",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    name: "Honda Scoopy",
    type: "motorcycle",
    licensePlate: "DK 9012 CC",
    pricePerDay: 80000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-02-10",
  },
  {
    id: 4,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 3456 IJ",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 7890 KL",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-03-05",
  },
  {
    id: 6,
    name: "Honda Beat 110",
    type: "motorcycle",
    licensePlate: "AB 2345 MN",
    pricePerDay: 75000,
    status: "available",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-03-05",
  },
  {
    id: 7,
    name: "Toyota Innova Reborn",
    type: "car",
    licensePlate: "AB 6789 OP",
    pricePerDay: 500000,
    status: "rented",
    imageUrl: null,
    category: "MPV",
    createdAt: "2024-04-01",
  },
  {
    id: 8,
    name: "Honda Vario 125",
    type: "motorcycle",
    licensePlate: "DK 1122 QR",
    pricePerDay: 85000,
    status: "service",
    imageUrl: null,
    category: "Matic",
    createdAt: "2024-04-10",
  },
];

export const sidebarNavItems: NavItemType[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "Pricelist",
    href: "/dashboard/pricelist",
    icon: "ClipboardList",
    hasSubmenu: true,
  },
  {
    label: "Landing Page",
    href: "/dashboard/landing-page",
    icon: "Globe",
  },
  {
    label: "Tour Packages",
    href: "/dashboard/tour-packages",
    icon: "Map",
  },
  {
    label: "About Us",
    href: "/dashboard/about-us",
    icon: "FileText",
  },
  {
    label: "Promo & Notif",
    href: "/dashboard/promo",
    icon: "Bell",
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Dashboard Stats
export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Web Click",
    value: "10.000",
    icon: "TrendingUp",
    iconBg: "bg-[#1B2A4A]",
    iconColor: "text-white",
  },
  {
    label: "Active Booking",
    value: "5",
    icon: "CalendarCheck",
    iconBg: "bg-[#22C55E]",
    iconColor: "text-white",
  },
  {
    label: "Available Units",
    value: "10",
    icon: "Car",
    iconBg: "bg-[#D4A843]",
    iconColor: "text-white",
  },
];

// Chart Data
export const weeklyChartData: ChartDataPoint[] = [
  { label: "Mon", webClicks: 1200, bookings: 800 },
  { label: "Tue", webClicks: 2800, bookings: 1200 },
  { label: "Wed", webClicks: 3200, bookings: 1800 },
  { label: "Thu", webClicks: 3800, bookings: 2000 },
  { label: "Fri", webClicks: 4800, bookings: 2200 },
  { label: "Sat", webClicks: 4600, bookings: 3200 },
  { label: "Sun", webClicks: 5200, bookings: 3800 },
];

export const monthlyChartData: ChartDataPoint[] = [
  { label: "Jan", webClicks: 8000, bookings: 3000 },
  { label: "Feb", webClicks: 12000, bookings: 5000 },
  { label: "Mar", webClicks: 15000, bookings: 7000 },
  { label: "Apr", webClicks: 18000, bookings: 8500 },
  { label: "May", webClicks: 22000, bookings: 10000 },
  { label: "Jun", webClicks: 25000, bookings: 12000 },
  { label: "Jul", webClicks: 28000, bookings: 14000 },
  { label: "Aug", webClicks: 32000, bookings: 16000 },
  { label: "Sep", webClicks: 30000, bookings: 15000 },
  { label: "Oct", webClicks: 35000, bookings: 18000 },
  { label: "Nov", webClicks: 38000, bookings: 20000 },
  { label: "Dec", webClicks: 42000, bookings: 22000 },
];

// Recent Bookings
export const recentBookings: RecentBooking[] = [
  {
    id: 1,
    vehicleName: "Honda Scoopy",
    licensePlate: "DK 9012 CC",
    vehicleType: "motorcycle",
    duration: "3 days",
    date: "2026-03-15",
    initial: "H",
  },
  {
    id: 2,
    vehicleName: "Honda Scoopy",
    licensePlate: "DK 9012 CC",
    vehicleType: "motorcycle",
    duration: "3 days",
    date: "2026-03-15",
    initial: "H",
  },
  {
    id: 3,
    vehicleName: "Toyota Avanza",
    licensePlate: "AB 1234 CD",
    vehicleType: "car",
    duration: "5 days",
    date: "2026-03-14",
    initial: "T",
  },
  {
    id: 4,
    vehicleName: "Honda Beat 110",
    licensePlate: "AB 5678 EF",
    vehicleType: "motorcycle",
    duration: "2 days",
    date: "2026-03-13",
    initial: "H",
  },
];

// Destinations
export const mockDestinations: Destination[] = [
  {
    id: "dest-001",
    title: "Pantai Losari Bali",
    titleEn: "Losari Beach Bali",
    description: "Nikmati keindahan pantai losari di bali yang menawarkan pemandangan matahari terbenam yang spektakuler.",
    descriptionEn: "Enjoy the beauty of Losari Beach in Bali offering spectacular sunset views.",
    imageUrl: "/images/destination-1.jpg",
  },
  {
    id: "dest-002",
    title: "Pantai Losari Bali",
    titleEn: "Losari Beach Bali",
    description: "Nikmati keindahan pantai losari di bali yang menawarkan pemandangan matahari terbenam yang spektakuler.",
    descriptionEn: "Enjoy the beauty of Losari Beach in Bali offering spectacular sunset views.",
    imageUrl: "/images/destination-2.jpg",
  },
  {
    id: "dest-003",
    title: "Pantai Losari Bali",
    titleEn: "Losari Beach Bali",
    description: "Nikmati keindahan pantai losari di bali yang menawarkan pemandangan matahari terbenam yang spektakuler.",
    descriptionEn: "Enjoy the beauty of Losari Beach in Bali offering spectacular sunset views.",
    imageUrl: "/images/destination-3.jpg",
  },
];

// Hero Content
export const mockHeroContent: HeroContent = {
  title: "Edit Holiday Destination!",
  titleEn: "Edit Holiday Destination!",
  subtitle: "Modifikasi dan atur konten yang tampil pada halaman depan untuk menarik lebih banyak pelanggan.",
  subtitleEn: "Modify and manage the content displayed on the front page to attract more customers.",
  featuredVehicle: "Honda Scoopy",
};

// Email Broadcasts
export const mockBroadcasts: EmailBroadcast[] = [
  {
    id: "em-001",
    subject: "Promo Akhir Tahun - Diskon 20%!",
    body: "Dapatkan diskon 20% untuk semua rental kendaraan selama periode 20-31 Desember 2026.",
    recipientCount: 150,
    sentAt: "2026-03-10T10:30:00",
    status: "sent",
  },
  {
    id: "em-002",
    subject: "Paket Tour Baru - Jogja Heritage",
    body: "Kami meluncurkan paket tur baru: Jogja Heritage & Candi Tour. Booking sekarang!",
    recipientCount: 120,
    sentAt: "2026-03-05T14:00:00",
    status: "sent",
  },
  {
    id: "em-003",
    subject: "Selamat Tahun Baru 2027!",
    body: "Terima kasih telah menjadi pelanggan setia kami. Semoga tahun baru membawa kebahagiaan!",
    recipientCount: 0,
    sentAt: "",
    status: "draft",
  },
];

// Customers
export const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "+62 812-3456-7890",
    totalBookings: 5,
    registeredAt: "2025-06-15",
  },
  {
    id: "cust-002",
    name: "Siti Rahayu",
    email: "siti.rahayu@email.com",
    phone: "+62 813-7890-1234",
    totalBookings: 3,
    registeredAt: "2025-08-22",
  },
  {
    id: "cust-003",
    name: "Ahmad Fauzi",
    email: "ahmad.f@email.com",
    phone: "+62 857-1234-5678",
    totalBookings: 8,
    registeredAt: "2025-04-10",
  },
  {
    id: "cust-004",
    name: "Dewi Lestari",
    email: "dewi.les@email.com",
    phone: "+62 878-5678-9012",
    totalBookings: 2,
    registeredAt: "2025-11-01",
  },
  {
    id: "cust-005",
    name: "Rizky Pratama",
    email: "rizky.p@email.com",
    phone: "+62 856-9012-3456",
    totalBookings: 6,
    registeredAt: "2025-03-28",
  },
];

export const mockPackages: TourPackage[] = [
  {
    id: "pkg-001",
    title: "Jogja Heritage & Candi Tour",
    titleEn: "Jogja Heritage & Temple Tour",
    description: "Nikmati perjalanan bersejarah menjelajahi keagungan budaya Yogyakarta dan Magelang, mulai dari keindahan Candi Borobudur hingga pesona Kraton Yogyakarta.",
    descriptionEn: "Enjoy a historical journey exploring the cultural grandeur of Yogyakarta and Magelang, from the beauty of Borobudur Temple to the charm of Kraton Yogyakarta.",
    imageUrl: "/images/destination-borobudur.png",
    estimatedPrice: 650000,
    duration: "Full Day",
    minPax: 2,
    maxPax: 15,
    startTime: "07:00 AM",
    endTime: "08:00 PM",
    includes: [
      "Kendaraan AC Premium",
      "Driver profesional & ramah",
      "BBM / Bahan Bakar",
      "Air mineral",
      "Penjemputan di Hotel/Stasiun"
    ],
    excludes: [
      "Tiket masuk wisata",
      "Biaya parkir & Tol",
      "Makan & Pengeluaran pribadi",
      "Tips driver (Seikhlasnya)",
      "Guide tambahan di destinasi wisata"
    ],
    vehicleOptions: [
      { id: "v1", name: "Avanza / Xenia", capacity: 6, pricePerDay: 650000 },
      { id: "v2", name: "Toyota Innova Reborn", capacity: 7, pricePerDay: 850000 },
      { id: "v3", name: "Toyota Hiace Commuter", capacity: 15, pricePerDay: 1300000 }
    ],
    category: "Heritage",
    destinationTags: ["Borobudur", "Kraton", "Malioboro"],
    status: "active",
  },
  {
    id: "pkg-002",
    title: "Jogja Complete Package",
    titleEn: "Jogja Complete Package",
    description: "Rasakan pengalaman tak terlupakan dari indahnya pegunungan hingga pesona pantai selatan yang eksotis dalam satu paket perjalanan seru.",
    descriptionEn: "Experience an unforgettable journey from beautiful mountains to the exotic southern coastline in one exciting travel package.",
    imageUrl: "/images/hero-bg.png",
    estimatedPrice: 600000,
    duration: "Full Day",
    minPax: 2,
    maxPax: 15,
    startTime: "06:00 AM",
    endTime: "07:30 PM",
    includes: [
      "Kendaraan AC Premium",
      "Driver profesional & ramah",
      "BBM / Bahan Bakar",
      "Air mineral",
      "Penjemputan di area Jogja"
    ],
    excludes: [
      "Tiket masuk objek wisata",
      "Biaya parkir & Retribusi",
      "Makan pribadi",
      "Tips driver",
      "Sewa jeep (jika diperlukan di lokasi wisata)"
    ],
    vehicleOptions: [
      { id: "v1", name: "Avanza / Xenia", capacity: 6, pricePerDay: 600000 },
      { id: "v2", name: "Toyota Innova Reborn", capacity: 7, pricePerDay: 800000 },
      { id: "v3", name: "Isuzu Elf Long", capacity: 19, pricePerDay: 1400000 }
    ],
    category: "Adventure",
    destinationTags: ["Pantai Parangtritis", "Gunung Merapi"],
    status: "active",
  },
  {
    id: "pkg-003",
    title: "City Tour Experience Jogja",
    titleEn: "City Tour Experience Jogja",
    description: "Jelajahi keasrian dan kearifan lokal kota Yogyakarta, nikmati jajanan khas dan pernak-pernik unik di setiap sudut kota.",
    descriptionEn: "Explore the beauty and local wisdom of Yogyakarta city, enjoy traditional snacks and unique souvenirs at every corner.",
    imageUrl: "/images/destinations.png",
    estimatedPrice: 500000,
    duration: "Half Day (10 Jam)",
    minPax: 2,
    maxPax: 6,
    startTime: "09:00 AM",
    endTime: "07:00 PM",
    includes: [
      "Kendaraan AC Premium",
      "Driver / Guide",
      "BBM",
      "Free Parkir di rute kota"
    ],
    excludes: [
      "Tiket masuk museum/wisata",
      "Makan & Minum",
      "Tips"
    ],
    vehicleOptions: [
      { id: "v1", name: "Avanza / Xenia", capacity: 6, pricePerDay: 500000 },
      { id: "v2", name: "Honda Brio", capacity: 4, pricePerDay: 400000 }
    ],
    category: "City Tour",
    destinationTags: ["Malioboro", "Taman Sari", "Alun-alun"],
    status: "draft",
  }
];
