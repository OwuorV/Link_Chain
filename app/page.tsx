import Image from "next/image";
import styles from "@/app/ui/scrollbarHide.module.css";
import NavBar from "./ui/home/navbar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digital Value Chain Accelerator",
  description: "Accelerating digital transformation in the value chain",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};
export default function Home() {
  return (
    <div className={`w-full relative ${styles.scrollbarhidden}`}>
      {/* <NavBar /> */}
      <section
        id="home"
        className="bg-[url('/hand.jpg')] bg-cover bg-center h-screen flex items-center justify-center"
      >
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Growing a Sustainable Agricultural Future
          </h2>
          <p className="text-lg md:text-xl text-white mb-6 drop-shadow-md">
            Connecting farmers, Service providers and the Buyers in one market
            place, tuned with climate action and Blog spot, so you dont miss an
            Agricultural update
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
              Join Today
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 h-[350px] rounded-lg shadow-lg hover:shadow-xl ">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                How its Works
              </h4>
              <p className="text-gray-600">getting started with us </p>
            </div>
            <div className="bg-gray-100 p-6 h-[350px] rounded-lg shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                log in
              </h4>
              <p className="text-gray-600">Log in or register to access</p>
            </div>
            <div className="bg-gray-100 h-[350px] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Explore Market Place
              </h4>
              <p className="text-gray-600">
                Explore our market place, view products from our farmers
              </p>
            </div>
            <div className="bg-gray-100 p-6 h-[350px] rounded-lg shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                create your online shop with us
              </h4>
              <p className="text-gray-600">
                Create your online shop with us, and start selling your farm
                products and services
              </p>
            </div>
            <div className="bg-gray-100 h-[350px] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
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

      {/* Services Section */}
      <section
        id="services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Our Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img
              src="/omena.jpg"
              alt="Organic Farming"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
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
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img
              src="/carrots.jpg"
              alt="Farm-to-Table"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h4 className="text-xl font-semibold text-green-600 mb-2">
              Farm to table, service to farmer{" "}
            </h4>
            <p className="text-gray-600">
              Enjoy direct delivery of fresh produce, ensuring quality and
              supporting local farmers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <img
              src="/cows.jpg"
              alt="Community Support"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
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
              src="/hand.jpg"
              alt="About AgriConnect"
              className="w-full h-96 object-cover rounded-lg shadow-md"
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

      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Get in Touch
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
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
            <p className="text-gray-600">Email: info@dvchainaccelerator.com</p>
            <p className="text-gray-600">Phone: +254110517567</p>
            <p className="text-gray-600">Address: 859 Siaya</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-8">
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
      </footer>
    </div>
  );
}
