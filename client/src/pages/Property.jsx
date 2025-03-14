import { useEffect, useState } from "react";
import PropertyImage from "../assets/properties/a1.jpg";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/message/messageSlice";
import {
  bookMarkProperty,
  getProperty,
} from "../features/property/propertySlice";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const Property = () => {
  const {
    property: singleProperty,
    propertyLoading,
    propertySuccess,
    propertyError,
    propertyErrorMessage,
  } = useSelector((state) => state.property);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { name, email, phone, message } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage(formData));
  };

  const handleBookmarkProperty = (property) => {
    dispatch(bookMarkProperty(property));
  };

  useEffect(() => {
    dispatch(getProperty(id));
  }, []);

  if (propertyLoading || !singleProperty.amenities) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Search />
      {/* // <!-- Property Header Image --> */}
      <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <img
              src={singleProperty.imageUrl}
              alt=""
              className="object-cover h-[400px] w-full"
              width="1800"
            />
          </div>
        </div>
      </section>

      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <a
            href="/properties.html"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Properties
          </a>
        </div>
      </section>

      {/* // <!-- Property Info --> */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{singleProperty.type}</div>
                <h1 className="text-3xl font-bold mb-4">
                  {singleProperty.name}
                </h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                  <p className="text-orange-700">
                    {singleProperty?.location?.street}{" "}
                    {singleProperty?.location?.city}{" "}
                    {singleProperty?.location?.state}{" "}
                    {singleProperty?.location?.zipcode}
                  </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                  Rates & Options
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                    {!singleProperty?.rates?.nighlty ? (
                      <>
                        <div className="text-gray-500 mr-2 font-bold">
                          Nightly
                        </div>
                        <div className="text-2xl font-bold">
                          <i className="fa fa-xmark text-red-700"></i>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-500 mr-2 font-bold">
                          Nightly
                        </div>
                        <div className="text-2xl font-bold text-blue-500">
                          ${singleProperty?.rates?.nightly}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                    {!singleProperty?.rates?.weekly ? (
                      <>
                        <div className="text-gray-500 mr-2 font-bold">
                          Weekly
                        </div>
                        <div className="text-2xl font-bold">
                          <i className="fa fa-xmark text-red-700"></i>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-500 mr-2 font-bold">
                          Weekly
                        </div>
                        <div className="text-2xl font-bold text-blue-500">
                          ${singleProperty?.rates?.weekly}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                    {!singleProperty?.rates?.monthly ? (
                      <>
                        <div className="text-gray-500 mr-2 font-bold">
                          Monthly
                        </div>
                        <div className="text-2xl font-bold">
                          <i className="fa fa-xmark text-red-700"></i>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-500 mr-2 font-bold">
                          Monthly
                        </div>
                        <div className="text-2xl font-bold text-blue-500">
                          ${singleProperty?.rates?.monthly}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">
                  Description & Details
                </h3>
                <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                  <p>
                    <i className="fa-solid fa-bed"></i> {singleProperty.beds}
                    <span className="hidden sm:inline">Beds</span>
                  </p>
                  <p>
                    <i className="fa-solid fa-bath"></i> {singleProperty.baths}
                    <span className="hidden sm:inline">Baths</span>
                  </p>
                  <p>
                    <i className="fa-solid fa-ruler-combined"></i>
                    {singleProperty.square_feet}{" "}
                    <span className="hidden sm:inline">sqft</span>
                  </p>
                </div>

                <p className="text-gray-500 mb-4">
                  {singleProperty.description}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
                  {singleProperty?.amenities.map((amenity, index) => {
                    return (
                      <li key={index}>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>{" "}
                        {amenity}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside className="space-y-4">
              <button
                onClick={() => handleBookmarkProperty(singleProperty)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
              >
                <i className="fas fa-bookmark mr-2"></i> Bookmark Property
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                <i className="fas fa-share mr-2"></i> Share Property
              </button>

              {/* <!-- Contact Form --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">
                  Contact Property Manager
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Message:
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                      id="message"
                      name="message"
                      value={message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                      type="submit"
                    >
                      <i className="fas fa-paper-plane mr-2"></i> Send Message
                    </button>
                  </div>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Property;
