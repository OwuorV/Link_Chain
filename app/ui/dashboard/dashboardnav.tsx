export default function Dashboardnav() {
  return (
    <>
      <div>
        <div className="top">
          <div className="logo"></div>
          <div className="divtitle">
            <h3>Shamba Link</h3>
            <h3>LTD</h3>
          </div>
        </div>
        <div className="platformdiv">
          <h4>platform</h4>
          <div className="dashboardelements">
            <div className="Orders">
              <h4>Orders</h4>
              <div className="ordertypes">
                <ul>
                  <li>pending</li>
                  <li>processing</li>
                  <li>completed</li>
                  <li>cancelled</li>
                </ul>
              </div>
            </div>
            <div className="Products">
              <h4>Products</h4>
              <div className="productsType">
                <li>Instock</li>
                <li>Out of Stock</li>
              </div>
            </div>
            <div className="Customers">
              <h4>Customers</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
