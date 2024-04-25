import Nav from '@/app/ui/susaf/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
        <Nav />
      <div className="grow p-6">{children}</div>
    </div>
  );
}