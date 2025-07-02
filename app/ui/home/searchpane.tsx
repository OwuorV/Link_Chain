import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  return (
    <div className=" flex items-center border border-solid border-[#171821]/30 bg-transparent rounded-[30px] px-1 py-1 w-max">
      <MagnifyingGlassIcon className="mx-2 w-5 h-5 text-[#171821]" />
      <input
        type="text"
        placeholder="Search for Services"
        className="max-w-[600px] min-w-[400px] hidden md:block ml-2 md:w-full bg-[#E8EDF2] text-[#171821] placeholder-gray-500 rounded-[30px] px-3 py-1.5 outline-none border-none"
      />
    </div>
  );
}
