import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link to="/dashboard/linkedin-post-generator">
          <Button className="w-full h-32 flex flex-col justify-center items-center gap-2">
            <span className="text-xl">LinkedIn Post Generator</span>
            <span className="text-sm text-gray-600">Generate professional LinkedIn posts</span>
          </Button>
        </Link>
        {/* Add more dashboard items here */}
      </div>

      <Outlet />
    </div>
  );
}
