export interface DashboardStats {
  totalDeliveries: number;
  activeDrivers: number;
  pendingOrders: number;
  revenue: number;
  deliveryTrend: number;
  driverTrend: number;
  orderTrend: number;
  revenueTrend: number;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  location: string;
  deliveriesCompleted: number;
  rating: number;
  vehicle: string;
  licenseNumber: string;
  joinedDate: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  clientName: string;
  clientId: string;
  driverId?: string;
  driverName?: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: 'pending' | 'assigned' | 'in-transit' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  amount: number;
  items: OrderItem[];
  priority: 'low' | 'medium' | 'high';
}

export interface OrderItem {
  name: string;
  quantity: number;
  weight: number;
}

export interface Delivery {
  id: string;
  orderId: string;
  driverId: string;
  driverName: string;
  clientName: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'failed';
  startTime: string;
  endTime?: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  route: {
    pickup: string;
    delivery: string;
  };
  estimatedArrival?: string;
  actualArrival?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface PaymentReport {
  id: string;
  orderId: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'failed';
  paymentDate: string;
  dueDate: string;
  paymentMethod: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}