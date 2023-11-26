import { FC, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Components
 */
import { Sidebar, Navbar } from '@/components';
import { Footer } from '@/components/footer';

type Props = Record<string, any>;

export const AdminLayout: FC<Props> = ({ ...props }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar onOpenSidenav={() => setOpen(true)} {...props} />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Outlet />
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
