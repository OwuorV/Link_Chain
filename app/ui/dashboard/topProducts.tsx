const products = [
  {
    id: 1,
    name: "Layers Mash",
    popularity: 46,
    color: "bg-orange-400",
    badge: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    name: "chick Vaccines",
    popularity: 17,
    color: "bg-teal-300",
    badge: "bg-gray-200 text-gray-600",
  },
  {
    id: 3,
    name: "feeders",
    popularity: 19,
    color: "bg-blue-400",
    badge: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    name: "Seeds",
    popularity: 29,
    color: "bg-black",
    badge: "bg-gray-300 text-black",
  },
];

export default function TopProducts() {
  return (
    <div className="bg-[#A9DFD8]/20 p-[10px] rounded-[12px] w-full md:w-[495px] shadow-sm">
      <h2 className="font-semibold text-lg mb-4">Top Products</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="w-[5%]">#</th>
            <th className="w-[35%]">Name</th>
            <th className="w-[40%]">Popularity</th>
            <th className="w-[20%]">Sales</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.id} className="h-11 align-middle">
              <td className="text-blue-500 font-semibold">0{index + 1}</td>
              <td className="text-gray-700">{item.name}</td>
              <td>
                <div className="w-full bg-black h-1.5 relative rounded">
                  <div
                    className={`absolute left-0 h-1.5 rounded ${item.color}`}
                    style={{ width: `${item.popularity}%` }}
                  ></div>
                </div>
              </td>
              <td>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${item.badge}`}
                >
                  {item.popularity}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
