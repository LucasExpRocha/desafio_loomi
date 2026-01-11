import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-dvh bg-background"
    >
      <Header />
      <Sidebar />
      <main className="margin-left-layout">
        {children}
      </main>
    </div>
  );
}
