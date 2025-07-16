import Image from "next/image";
import styles from "@/app/ui/scrollbarHide.module.css";
import NavBar from "./ui/home/navbar";
import { Metadata } from "next";
import ReactPlayer from "react-player";
import Link from "next/link";
import Accordion from "@/app/ui/home/accordion";
import FeedbackCarousel from "@/app/ui/home/feedback";
import "bootstrap/dist/css/bootstrap.min.css";
export const metadata: Metadata = {
  title: "Digital Value Chain Accelerator",
  description: "Accelerating digital transformation in the value chain",
  icons: {
    icon: "/logo2.jpg",
    apple: "/logo2.jpg",
  },
};
export default function Home() {
  const whatWeDoItems = [
    {
      title: "Availability of opportunities",
      description:
        "Opportunities for every young person to engage in driving the county to Agricultural prosperity",
      number: "01",
    },
    {
      title: "Farner Inclusion",
      description:
        "We create a platform where every farmer and Buyer has a Place, no economic devide , Access aour services at absolutely no cost",
      number: "02",
    },

    {
      title: "County Tenders and Development Programs",
      description:
        "Tenders from the county government and development programs are posted on our platform, allowing farmers to apply and participate in local projects.",
      number: "03",
    },
    {
      title: "Talk to Your Extension Officer",
      description:
        "We have provided a forum within the Platform where farmers have an opportunity for a solution based  engagement with Extension Officers to educate farmers.....",
      number: "04",
    },
    {
      title: "Social Inclusion",
      description:
        "We have accessibilty Features for the disabled and marginalized groups, ensuring everyone can participate in the Devolve Agricultural Development Programs",
      number: "05",
    },
  ];
  return (
    <div className={`w-full relative ${styles.scrollbarhidden}`}>
      {/* <NavBar /> */}
      <section
        id="home"
        className="bg-[url('/hand.jpg')] bg-cover bg-center h-screen flex items-center justify-center"
      >
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Building a Sustainable Digital Agricultural Ecosystem
          </h2>
          <p className="text-lg md:text-xl text-white mb-6 drop-shadow-md">
            Connecting the Value Chain Drivers and Sector Players in one
            Ecosystem linked to Real time Meteorological data Service Center and
            Climate Action BlogSpot for enhanced relevant Agricultural
            Information Dissemination
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-3  space-x-4">
            <a
              href="/seller/signup"
              className="flex bg-green-600 gap-2 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                </svg>
              </span>{" "}
              Join us Today
            </a>
            <a
              href="/farms"
              className="flex gap-2 bg-green-600 justify-center items-center text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition"
            >
              Explore Market Place
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/*Explore SEction*/}
      <section id="explore" className="bg-white py-16">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 h-max min-h-[350px] border-t  border-t-[1px] border-t-gray-200 hover:shadow-xl transition">
              <Image
                src="/howitworks.jpg"
                alt="how it works"
                width={200}
                height={200}
                className="w-full rounded-[100px] max-w-[200px] h-48 object-cover  mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                How its Works
              </h4>
              <p className="text-gray-600">getting started with us </p>
            </div>
            <div className="p-6 h-max min-h-[350px] border border-[1px] border-gray-200 hover:shadow-xl transition">
              <Image
                src="/market-place.png"
                alt="market place"
                width={200}
                height={200}
                className="w-full max-w-[200px] h-48 object-cover rounded-t-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Explore Market Place
              </h4>
              <p className="text-gray-600">
                Explore our market place, view products from our farmers
              </p>
            </div>
            <div className=" p-6 h-max min-h-[350px] border border-[1px] border-gray-200 hover:shadow-xl transition">
              <Image
                src="/loginvector.png"
                alt="login vector"
                width={200}
                height={200}
                className="w-full max-w-[200px] h-48 object-cover rounded-t-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                log in
              </h4>
              <p className="text-gray-600">
                Log in or register to Manage your Sales and Purchases
              </p>
            </div>

            <div className="p-6 h-max min-h-[350px] border border-[1px] border-gray-200 hover:shadow-xl transition">
              <Image
                src="/online-s.png"
                alt="online shop"
                width={200}
                height={200}
                className="w-full max-w-[200px] h-48 object-cover rounded-t-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                create your online shop with us
              </h4>
              <p className="text-gray-600">
                Create your online shop with us, and start selling your farm
                products and services
              </p>
            </div>
            <div className="p-6 h-max min-h-[350px] border border-[1px] border-gray-200 hover:shadow-xl transition">
              <Image
                src="/analytics.png"
                alt="analytics"
                width={200}
                height={200}
                className="w-full max-w-[200px] h-48 object-cover rounded-t-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                View Analytics
              </h4>
              <p className="text-gray-600">
                See how your shop is doing and customer insights
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* What we do */}
      <section id="whatwedo" className="bg-wheat-100 py-16">
        <div className="max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center grid-rows-1">
            <div className=" w-full px-4 sm:px-6 flex flex-col lg:px-8">
              <h2 className="text-3xl italic md:text-4xl font-bold text-gray-800 text-start">
                What We Do in Supporting Farmers and Value Chain Players
              </h2>
              <p className="text-gray-400 text-start text-[14px] mb-8">
                We are committed to supporting farmers and enhancing the
                agricultural value chain through innovative solutions and
                services.
              </p>
              <p className="text-red-600 slf-end hover:bg-white hover:border-black hover:cursor-pointer text-center flex justify-center items-center rounded-[50px] h-22 w-22 border border-green-500 p-5 mb-8">
                Join Now
              </p>
            </div>
            <div className="flex justify-center">
              <ReactPlayer
                src="/reactplayer.mp4"
                width="100%"
                height="auto"
                playing={true}
                loop={true}
                muted={true}
                className="w-[50%]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {whatWeDoItems.map(({ title, description, number }) => (
              <div
                key={number}
                className="one flex h-max min-h-[250px] justify-between md:flex-row border border-[1px] border-gray-300 bg-wheat-600 p-6 hover:shadow-xl transition"
              >
                <div className="flex flex-col gap-4 w-[80%] justify-center">
                  <p className="text-2xl italic font-semibold">{title}</p>
                  <p className="text-gray-500 text-[16px]">{description}</p>
                </div>
                <div className="flex justify-between flex-col items-center w-[20%]">
                  <p className="text-green-600 font-bold text-5xl">{number}</p>
                  <Link href={`/services/${number}`}>
                    <button className="flex justify-center cursor-pointer items-center bg-gray-300 hover:bg-green-700 text-white rounded-full p-2 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#000"
                        className="hover:fill-white transition"
                      >
                        <path d="m243-240-51-51 405-405H384v-72h336v336h-72v-213L243-240Z" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section
        id="services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Our Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 border border-[0.5px] border-black-300 hover:shadow-xl transition">
            <img
              src="/mbuta.jpg"
              alt="Organic Farming"
              className="w-full h-48 object-cover  mb-4"
            />
            <h4 className="text-xl font-semibold text-green-600 mb-2">
              Linking Chain
            </h4>
            <p className="text-gray-600">
              We connect users, farmers and service providers delivering and
              leveraging weather forecasts, Blog, to enhance productivity and
              sustainability.
            </p>
          </div>
          <div className="bg-white p-6 border border-[0.5px] border-black-300 hover:shadow-xl transition">
            <img
              src="/carrots.jpg"
              alt="Farm-to-Table"
              className="w-full h-48 object-cover  mb-4"
            />
            <h4 className="text-xl font-semibold text-green-600 mb-2">
              Farm to table, service to farmer{" "}
            </h4>
            <p className="text-gray-600">
              Enjoy direct delivery of fresh produce, ensuring quality and
              supporting local farmers.
            </p>
          </div>
          <div className="bg-white p-6 border border-[0.5px] border-black-300 hover:shadow-xl transition">
            <img
              src="/banana.png"
              alt="Community Support"
              className="w-full h-48 object-cover  mb-4"
            />
            <h4 className="text-xl font-semibold text-green-600 mb-2">
              Community Support
            </h4>
            <p className="text-gray-600">
              Empowering local farmers with resources, training, and tools for
              sustainable growth.
            </p>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="bg-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src="/fisherman.jpg"
              alt="About AgriConnect"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              About Value Chain Accelerator
            </h3>
            <p className="text-gray-600 mb-4">
              At Value Chain Accelerator, we bridge the gap between farmers and
              consumers, promoting sustainable agriculture and community growth.
              Our mission is to provide fresh, organic produce while supporting
              local farmers with fair practices and modern tools.
            </p>
            <p className="text-gray-600">
              We’re committed to eco-friendly farming and delivering quality to
              your doorstep.
            </p>
          </div>
        </div>
      </section>
      {/* feedback */}
      <section
        id="feedback"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 justify-center  md:grid-cols-2 md:grid-rows-2">
          <div className="firstdiv relative  w-full cols-span-2 h-full md:row-span-2 flex items-center justify-center">
            <Image
              src="/realfeedback.jpg"
              alt="Feedback Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="div items-center p-8 w-full h-full flex justify-center">
            <div className="text-4xl flex leading-[40px] md:leading-[50px] flex-col gap-4 p-4 font-bold">
              Real Feedback from :
              <p className="text-green-600 font-bold italic">
                {" "}
                Our Farmers and Service Providers
              </p>
              <div className="border-b border-b-[#000]/30 border-b-[1px] w-full "></div>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <FeedbackCarousel />
          </div>
        </div>
      </section>
      {/* Most asked questions */}
      <section
        id="faq"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center  justify-center">
          <div className="">
            <Accordion />
          </div>
          <div className="relative w-full h-full sm:w-full sm:h-full mb-4  ">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
              Frequently Asked Questions
            </h3>
            <svg width="0" height="0">
              <defs>
                <mask
                  id="shape-mask"
                  x="0"
                  y={0}
                  width="100%"
                  height="100%"
                  className=""
                >
                  <rect width="100%" height="100%" fill="black" />

                  <rect
                    x="370"
                    y="180"
                    rx="16"
                    ry={16}
                    width="230"
                    height="150"
                    fill="white"
                  />
                  <rect
                    x="10"
                    y="490"
                    rx="16"
                    ry={16}
                    width="200"
                    height="240"
                    fill="white"
                  />
                  <path
                    d="M350,350
                   
                    H580
                    Q600,350, 600,380
                    V700
                     Q600,730,580,730
                    H250
                    Q230,730,230,700
                    V500
                    Q230,470,200,470
                    H30
                    Q10,470,10,440
                    V200
                    Q10,180,30,180
                    H320
                    Q350,180,350,210
                    V320
                    Q350,350,380,350
                   
                  "
                    fill="white"
                  />
                </mask>
              </defs>
            </svg>
            <svg width="0" height={0}>
              <defs>
                <mask id="shape-mask1" x="0" y={0} width="100%" height="100%">
                  <rect width="100%" height="100%" fill="black" />

                  <rect
                    x="10"
                    y="10"
                    rx="12"
                    ry="12"
                    width="260"
                    height="60"
                    fill="white"
                  />
                  <rect
                    x="275"
                    y={10}
                    rx="15"
                    ry={15}
                    width="60"
                    height="60"
                    fill="white"
                  />
                  <rect
                    x="205"
                    y="80"
                    rx="13"
                    ry={13}
                    width="135"
                    height="115"
                    fill="white"
                  />
                  <rect
                    x="10"
                    y="285"
                    rx="13"
                    ry={13}
                    width="115"
                    height="135"
                    fill="white"
                  />
                  <path
                    d="M200,200
                   
                    H320
                    Q340,200, 340,220
                    V400
                     Q340,420,320,420
                    H150
                    Q130,420,130,400
                    V300
                    Q130,280,110,280
                    H30
                    Q10,280,10,260
                    V100
                    Q10,80,30,80
                    H180
                    Q200,80,200,100
                    V180
                    Q200,200,220,200
                   
                  "
                    fill="white"
                  />
                </mask>
              </defs>
            </svg>
            <div className="hidden sm:block">
              {" "}
              <img
                src={"/avocado.jpg"}
                alt={"overlay"}
                style={{
                  maskSize: "100% 100%",
                  mask: `url(#shape-mask)`,
                  maskRepeat: `no-repeat`,
                  WebkitMask: `url(#shape-mask)`,
                }}
                className="w-full  object-cover"
              />
            </div>
            <div className=" sm:hidden">
              <img
                src={"/avocado.jpg"}
                alt={"overlay"}
                style={{
                  maskSize: "100% 100%",
                  mask: `url(#shape-mask1)`,
                  maskRepeat: `no-repeat`,
                  WebkitMask: `url(#shape-mask1)`,
                }}
                className="w-full  object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-white p-8 shadow-lg">
            <h4 className="text-xl font-semibold text-green-600 mb-4">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-gray-700">Message</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={5}
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
                Send Message
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <h4 className="text-xl font-semibold text-green-600 mb-4">
              Reach Out
            </h4>
            <p className="text-gray-600 mb-4">
              Have questions or want to collaborate? Contact us today!
            </p>
            <p className="text-gray-600">Postal Address: 823-40600 Siaya</p>
            <p className="text-gray-600">Email: info@greenheroescbo.com</p>
            <p className="text-gray-600">Telephone: +254722475651</p>
            <p className="text-gray-600">Website: www.greenheroescbo.com</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-green-600 text-white py-8 flex md:flex-row flex-col items-center justify-between">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-2">
            © 2025 Digital Value Chain Accelerator . All rights reserved.
          </p>
          <div className="space-x-4">
            <a href="#" className="hover:text-green-200 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-200 transition">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="div w-[300px] h-[300px] rounded-[200px] md:w-[400px] overflow-hidden md:h-[400px] mx-auto relative mt-4">
          <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
        </div>
      </footer>
    </div>
  );
}
