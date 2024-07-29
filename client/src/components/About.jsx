import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-12">
          Who We Are
        </h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-12">
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to our culinary haven! We are passionate food enthusiasts
            dedicated to bringing you the most delectable and innovative dining
            experiences. Our journey began with a simple love for great food and
            has blossomed into a commitment to culinary excellence that defines
            every dish we create.
          </p>
          <p className="text-gray-700 leading-relaxed">
            At the heart of our philosophy is the belief that food is more than
            just sustenance—it's an art form, a cultural bridge, and a source of
            joy. We strive to infuse every meal with creativity, quality
            ingredients, and a touch of magic that will tantalize your taste
            buds and leave you craving more.
          </p>
        </div>

        <h2 className="text-3xl font-semibold text-center text-indigo-800 mb-8">
          Our Speciality
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Fusion Cuisine
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We pride ourselves on our unique fusion cuisine that blends
                flavors from around the world. Our chefs expertly combine
                traditional techniques with modern twists, creating dishes that
                are both familiar and excitingly new. From Asian-inspired tacos
                to Mediterranean-infused sushi, our menu is a testament to
                culinary creativity.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Farm-to-Table Fresh
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Quality is at the core of everything we do. We source our
                ingredients from local farms and suppliers, ensuring that every
                dish is made with the freshest, most flavorful components. Our
                commitment to sustainability means you can enjoy your meal
                knowing it's not only delicious but also environmentally
                conscious.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-center text-indigo-800 mb-8">
          Meet Our Chefs
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((chef) => (
            <div
              key={chef}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <img
                src={`https://www.shutterstock.com/image-photo/food-concept-preparing-traditional-italian-600nw-617005067.jpg`}
                alt={`Chef ${chef}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  Chef {chef}
                </h3>
                <p className="text-gray-700 text-sm">
                  With years of culinary expertise, our talented chefs bring
                  passion and innovation to every dish they create. Their unique
                  backgrounds and specialties contribute to our diverse and
                  exciting menu.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
