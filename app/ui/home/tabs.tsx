export default function Tabs() {
  return (
    <>
      <div className="flex w-full h-auto md:w-full md:h-[60px]  p-[16px] items-center justify-center">
        <div className="buttons gap-3 flex ">
          <button className="bg-[#00DC30] hover:bg-[#165D25] rounded-[12px] px-5 py-2 gap-5 self-center flex items-center justify-center md:w-[143px] md:h-[28px] w-[80] h-[28px]  text-[14px] text-white font-bold text-14px">
            Farms
          </button>
          <button className="bg-[#6C7A6F]  rounded-[12px] px-5 py-2 gap-5 self-center flex items-center justify-center w-[80] h-[28px]  text-[14px] text-white md:w-[143px] md:h-[28px]  font-bold">
            Services
          </button>
          <button className="bg-[#6C7A6F] rounded-[12px] px-5 py-2 gap-5 self-center flex items-center justify-center w-[80] h-[28px]  text-[14px] md:w-[143px] md:h-[28px]  text-white font-bold text-14">
            Vets
          </button>
        </div>
      </div>
    </>
  );
}
