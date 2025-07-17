export interface MenuItemResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  isActive: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    description: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemRequest {
  menuItemId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItemRequest[];
  totalAmount: number;
}

export interface OrderResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    menuItem: {
      id: string;
      name: string;
      description: string | null;
      price: number;
      image: string | null;
    };
  }>;
}

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:3000';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  async getMenuItems(): Promise<MenuItemResponse[]> {
    return this.request<MenuItemResponse[]>('/api/menu');
  }

  async createOrder(order: CreateOrderRequest): Promise<OrderResponse> {
    return this.request<OrderResponse>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async getOrders(): Promise<OrderResponse[]> {
    return this.request<OrderResponse[]>('/api/orders');
  }

  async getOrder(id: string): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/api/orders/${id}`);
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/api/health');
  }
}

export const apiService = new ApiService();