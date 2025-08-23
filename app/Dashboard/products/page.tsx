import { TbBusinessplan } from "react-icons/tb";

export default function MainLayout() {
  return (
    <>
      <div>Welcome to your Dashborad</div>
      <div className="card1">
        <div className="heading">
          <p>Products</p>
        </div>
        <div>
          <div className="flex">
            <div>💹</div>
            <p>Total Products</p>
            <p>{}</p>
          </div>
        </div>
      </div>
    </>
  );
}
