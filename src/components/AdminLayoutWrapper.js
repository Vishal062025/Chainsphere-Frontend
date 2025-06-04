'use client';

import AdminSidebar from './AdminSidebar';

export default function AdminLayoutWrapper({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-gray-950 text-white px-10 py-4 min-h-screen">
        {children}
      </main>
    </div>
  );
}
