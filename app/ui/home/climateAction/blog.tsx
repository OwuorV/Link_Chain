import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

type BlogPost = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  author: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How Farmers Are Using Tech to Improve Yields",
    description:
      "Explore how modern tools like IoT and AI are revolutionizing farming across rural Kenya.",
    imageUrl: "/maize.jpg",
    date: "July 1, 2025",
    author: "Tarus Otieno",
  },
  {
    id: 2,
    title: "Top 5 Tips for Starting a Small Poultry Business",
    description:
      "Learn how to kickstart your poultry journey with practical advice for beginners.",
    imageUrl: "/chicks.avif",
    date: "June 25, 2025",
    author: "Lilian Achieng",
  },
  {
    id: 3,
    title: "Sustainable Farming: What You Should Know",
    description:
      "Discover techniques and strategies to farm in a sustainable, eco-friendly way.",
    imageUrl: "/kales.jpg",
    date: "June 10, 2025",
    author: "Sam Kipkoech",
  },
];

export default function BlogSection() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#99b6d8]">
      <div className="topper flex flex-col">
        <h2 className="text-3xl font-bold text-center text-[#165D25] mb-6">
          Latest Blog Posts
        </h2>
        <h4 className="w-full text-center text-lg">
          Stories and Updates from national and local Markets and our Market
          place marketplace
        </h4>
        <div className=" flex items-center mt-5 border border-[#171821]/50 bg-transparent rounded-[30px] px-1 py-1 w-max">
          <MagnifyingGlassIcon className="mx-2 w-5 h-5 text-[#171821]" />
          <input
            type="text"
            placeholder="Search for a post"
            className="w-full  md:block ml-2 md:w-full bg-[#E8EDF2] text-[#171821] placeholder-gray-500 rounded-[30px] px-3 py-1.5 outline-none border-none"
          />
        </div>
        <div className=" my-5 border-b border-b-solid border-b-[1px] border-b-[#171821]/20"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="h-48 w-full relative rounded-t-xl overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[#171821]">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600">{post.description}</p>
              <div className="text-xs text-gray-400 mt-2">
                {post.date} • By {post.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
