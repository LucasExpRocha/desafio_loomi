import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
      <div className="margin-left-layout pt-22">
        <div className="max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1370px] mx-auto xl:pt-4 2xl:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
