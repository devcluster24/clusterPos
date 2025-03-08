# Stock Management Client

This is the frontend of the **Stock Management System**, built with **Vite, React, TypeScript, ShadCN, and Tailwind CSS**. This application provides an intuitive and responsive user interface for managing stock, tracking sales, and monitoring inventory.

## 🚀 Features

- 📊 **Dashboard Overview** - Visualize stock statistics and sales trends.
- 📦 **Inventory Management** - View, add, update, and delete stock items.
- 🛒 **Sales Tracking** - Manage orders and track sales data.
- 🔍 **Advanced Search & Filtering** - Find stock items quickly.
- 🎨 **Modern UI with ShadCN & Tailwind CSS** - Clean and responsive design.
- ⚡ **Fast & Scalable** - Built with Vite for lightning-fast development.

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI Framework:** ShadCN, Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router
- **API Calls:** Fetch API / Axios

---

## 📦 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/md-mobassher/stock-management-client
cd stock-management-client
```

### 2️⃣ Install Dependencies

```sh
yarn install  # or npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add:

```sh
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 4️⃣ Run the Development Server

```sh
yarn dev  # or npm run dev
```

---

## 🏗 Project Structure

```
📂 src
 ├── 📂 components      # Reusable UI components
 ├── 📂 pages           # Page components (Dashboard, Inventory, etc.)
 ├── 📂 hooks           # Custom hooks
 ├── 📂 services        # API call functions
 ├── 📂 context         # Global state management (if needed)
 ├── 📂 utils           # Helper functions
 ├── 📂 styles          # Global styles
 ├── 📂 types           # TypeScript types/interfaces
```

---

## 🔧 Build & Deploy

### Build for Production

```sh
yarn build  # or npm run build
```

### Deploy (Vercel / Netlify Recommended)

```sh
vercel deploy  # or netlify deploy
```

---

## 📌 To-Do List

- [ ] Implement Authentication & Authorization
- [ ] Improve Dashboard with Charts (Recharts / ApexCharts)
- [ ] Add Role-Based Access Control (RBAC)

---

## 👨‍💻 Author

**Md Mobassher Hossain**  
Full-Stack Developer | [LinkedIn](https://www.linkedin.com/in/md-mobassher-hossain)  
📧 Email: mdmobassherhossain1@gmail.com

---

## 📜 License

This project is licensed under the **MIT License**.
