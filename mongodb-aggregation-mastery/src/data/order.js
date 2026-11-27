
const orders = [
  {
    customer: "Vimal",
    status: "delivered",
    amount: 2500,
    city: "Delhi",
    items: [
      { name: "Laptop", price: 2000, quantity: 1 },
      { name: "Mouse", price: 500, quantity: 1 }
    ],
    createdAt: new Date("2026-11-20")
  },
  {
    customer: "Rahul",
    status: "pending",
    amount: 1500,
    city: "Noida",
    items: [
      { name: "Keyboard", price: 1500, quantity: 1 }
    ],
    createdAt: new Date("2026-11-21")
  },
  {
    customer: "Amit",
    status: "delivered",
    amount: 4000,
    city: "Delhi",
    items: [
      { name: "Monitor", price: 4000, quantity: 1 }
    ],
    createdAt: new Date("2026-11-22")
  },
  {
    customer: "Priya",
    status: "cancelled",
    amount: 800,
    city: "Gurugram",
    items: [
      { name: "Headphones", price: 800, quantity: 1 }
    ],
    createdAt: new Date("2026-11-23")
  },
  {
    customer: "Vimal",
    status: "pending",
    amount: 3500,
    city: "Delhi",
    items: [
      { name: "Phone", price: 3500, quantity: 1 }
    ],
    createdAt: new Date("2026-11-24")
  },
  {
    customer: "Rohit",
    status: "delivered",
    amount: 1200,
    city: "Noida",
    items: [
      { name: "Smart Watch", price: 1200, quantity: 1 }
    ],
    createdAt: new Date("2026-11-25")
  }
];

export default orders;
