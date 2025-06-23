import Dashboardnav from "../ui/dashboard/dashboardnav";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Dashboardnav />
      <main className="flex-1 p-4 w-full">{children}</main>
    </>
  );
}
