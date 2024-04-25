import Nav from '@/app/ui/susaf/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen"> {/* Set height to fill screen */}
      <Nav />
      <div className="flex-grow p-6 overflow-y-auto"> {/* Add overflow-y-auto to enable scrolling if content exceeds */}
        {children}
      </div>
    </div>
  );
}