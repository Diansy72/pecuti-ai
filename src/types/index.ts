export type VehicleStatus = "available" | "rented" | "service";
export type VehicleType = "car" | "motorcycle";
export type TransactionStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type BookingStatus = "active" | "completed" | "pending" | "cancelled";

export interface Vehicle {
  id: number;
  name: string;
  type: VehicleType;
  licensePlate: string;
  pricePerDay: number;
  status: VehicleStatus;
  imageUrl: string | null;
  category: string;
  createdAt: string;
}

export interface Transaction {
  id: number;
  vehicleId: number;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: TransactionStatus;
  createdAt: string;
}

export interface NavItemType {
  label: string;
  href: string;
  icon: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  children?: NavItemType[];
}

export interface PackageVehicleOption {
  id: string;
  name: string;
  capacity: number;
  pricePerDay: number;
}

export interface TourPackage {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl: string;
  estimatedPrice: number;
  duration: string;
  minPax: number;
  maxPax: number;
  startTime: string;
  endTime: string;
  includes: string[];
  excludes: string[];
  vehicleOptions: PackageVehicleOption[];
  category?: string;
  destinationTags?: string[];
  status?: "active" | "draft";
}

// Dashboard
export interface DashboardStat {
  label: string;
  value: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface ChartDataPoint {
  label: string;
  webClicks: number;
  bookings: number;
}

export interface RecentBooking {
  id: number;
  vehicleName: string;
  licensePlate: string;
  vehicleType: VehicleType;
  duration: string;
  date: string;
  initial: string;
}

// Landing Page
export interface Destination {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl: string;
}

export interface HeroContent {
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  featuredVehicle: string;
}

// Email Broadcasting
export interface EmailBroadcast {
  id: string;
  subject: string;
  body: string;
  recipientCount: number;
  sentAt: string;
  status: "sent" | "draft" | "failed";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  registeredAt: string;
}
