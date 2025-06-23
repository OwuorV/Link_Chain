import Image from "next/image";
import styles from "@/app/ui/scrollbarHide.module.css";
export default function SliderNav() {
  const data = [
    {
      id: 1,
      image: "/feed.svg",
      title: "Feed",
    },
    {
      id: 2,
      image: "/egg.svg",
      title: "Eggs",
    },
    {
      id: 3,
      image: "/Chick1.svg",
      title: "Chicks",
    },
    {
      id: 4,
      image: "/Hen1.svg",
      title: "Poultry",
    },
    {
      id: 5,
      image: "/Vet.svg",
      title: "Veterinary",
    },
  ];
  return (
    <>
      <div
        className={` flex w-full gap-10 justify-between overflow-y-hidden overflow-scroll ${styles.scrollbarhidden}`}
      >
        {/* <div className="px-4 pointer-events-none absolute left-0  h-full w-40 bg-gradient-to-r from-white via-white/60 to-transparent" />
        <div className="px-4 pointer-events-none absolute right-0 h-full w-40 bg-gradient-to-l from-white/60 via-white/60 to-transparent" /> */}

        <div className="all flex w-max bg-green-500 rounded-[50px] px-5 items-center gap-1 ">
          <span className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
            >
              <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
            </svg>
          </span>
          <p className="flex w-max p-2 text-[14px]">All Cartegories</p>
        </div>
        {data.map(({ id, image, title }) => (
          <span
            className="flex gap-2 text-black items-center hidden md:flex"
            key={id}
          >
            <div className="icon w-[24px] h-[24px]">
              <Image
                src={image}
                alt={title}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="title text-[14px] ">{title}</div>
          </span>
        ))}
      </div>
    </>
  );
}
