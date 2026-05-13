import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative">
        <Outlet /> {/* This is where Admin.jsx or AdminProjects.jsx will show up */}
      </main>
    </div>
  );
};

export default AdminLayout;