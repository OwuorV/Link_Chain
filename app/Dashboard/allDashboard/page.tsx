import Card from "@/app/ui/dashboard/idashboardIcons/icon";
import { TbBusinessplan } from "react-icons/tb";

export default function MainLayout() {
  return (
    <>
      <div>Welcome to your Dashborad</div>
      <div className="card1">
        <Card
          icon={<TbBusinessplan />}
          title="Total Sales"
          description="+10% from Last Month"
          amount={5000}
        />
      </div>
    </>
  );
}
