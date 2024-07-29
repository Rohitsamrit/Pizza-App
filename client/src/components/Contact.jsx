import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { ImMobile } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-800 sm:text-5xl md:text-6xl">
            VJTI YT Pizza Shop
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-indigo-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Serving the best pizzas in town since 2010
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition duration-500">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                  About Us
                </h2>
                <p className="text-gray-600 mb-6">
                  Welcome to Techinfo YT Pizza Shop, where passion meets flavor!
                  We've been crafting delicious pizzas for over a decade, using
                  only the freshest ingredients and time-honored recipes. Our
                  commitment to quality and customer satisfaction has made us a
                  beloved part of the community.
                </p>
                <p className="text-gray-600">
                  Whether you're craving a classic Margherita or feeling
                  adventurous with our specialty pies, we've got something for
                  everyone. Come taste the difference that dedication and
                  expertise make in every slice!
                </p>
              </div>
            </div>

            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="https://t3.ftcdn.net/jpg/05/45/08/54/360_F_545085474_EQ43KtVM72jWIkRS6EXWieM2sowo6dhw.jpg"
                alt="Pizza Shop Interior"
                className="w-full h-48 object-cover object-center"
              />
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                  Contact Us
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: FiPhoneCall, label: "Phone", value: "0123-456789" },
                    { icon: ImMobile, label: "Call", value: "1234567890" },
                    {
                      icon: AiOutlineMail,
                      label: "Email",
                      value: "help@urdomain.com",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 text-gray-600"
                    >
                      <item.icon className="text-2xl text-indigo-600" />
                      <span className="font-semibold">{item.label}:</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Visit Us
            </h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1839721583537!2d-73.98682532302169!3d40.75797283484862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1685021705670!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
