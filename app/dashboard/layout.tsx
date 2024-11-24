import { auth } from '@/lib/auth';
import Navbar from './navbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  const userName = session?.user?.name ?? ''

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userName={userName} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
