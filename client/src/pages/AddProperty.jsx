import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { toast } from "react-toastify";
import { createProperty } from "../features/property/propertySlice";

const AddProperty = () => {
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const { edit } = useSelector((state) => state.property);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    propertyType: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    beds: 0,
    baths: 0,
    square_feet: 0,
    amenities: [],
    rates: {
      weekly: "",
      monthly: "",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (name.includes(".")) {
        // Handle nested objects
        const keys = name.split(".");
        let updated = { ...prev };
        let ref = updated;

        for (let i = 0; i < keys.length - 1; i++) {
          ref = ref[keys[i]];
        }
        ref[keys[keys.length - 1]] = type === "checkbox" ? checked : value;
        return updated;
      } else {
        // Handle top-level fields
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProperty(formData));
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError && message) {
      toast.error(message, { position: "bottom-center", theme: "colored" });
    }

    setFormData(edit.property);
  }, [user, isError, message, edit]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Property
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Property Type
              </label>
              <select
                id="type"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              >
                <option value="#">Please Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Cabin Or Cottage">Cabin or Cottage</option>
                <option value="Room">Room</option>
                <option value="Studio">Studio</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Listing Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add an optional description of your property"
              ></textarea>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="street"
                name="location.street"
                value={formData.location?.street}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Street"
              />
              <input
                type="text"
                id="city"
                name="location.city"
                value={formData.location?.city}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="City"
                required
              />
              <input
                type="text"
                id="state"
                value={formData.location?.state}
                name="location.state"
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="State"
                required
              />
              <input
                type="text"
                id="zipcode"
                value={formData.location?.zipcode}
                name="location.zipcode"
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Zipcode"
              />
            </div>

            <div className="mb-4 flex flex-wrap">
              <div className="w-full sm:w-1/3 pr-2">
                <label
                  htmlFor="beds"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Beds
                </label>
                <input
                  type="number"
                  id="beds"
                  value={formData.beds}
                  name="beds"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="w-full sm:w-1/3 px-2">
                <label
                  htmlFor="baths"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Baths
                </label>
                <input
                  type="number"
                  id="baths"
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="w-full sm:w-1/3 pl-2">
                <label
                  htmlFor="square_feet"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Square Feet
                </label>
                <input
                  type="number"
                  id="square_feet"
                  name="square_feet"
                  value={formData.square_feet}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div>
                  <input
                    type="checkbox"
                    id="amenity_wifi"
                    name="amenities"
                    onChange={handleChange}
                    value="Wifi"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_wifi">Wifi</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_kitchen"
                    name="amenities"
                    onChange={handleChange}
                    value="Full Kitchen"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_kitchen">Full kitchen</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_washer_dryer"
                    name="amenities"
                    onChange={handleChange}
                    value="Washer & Dryer"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_free_parking"
                    name="amenities"
                    onChange={handleChange}
                    value="Free Parking"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_free_parking">Free Parking</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_pool"
                    name="amenities"
                    onChange={handleChange}
                    value="Swimming Pool"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_pool">Swimming Pool</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_hot_tub"
                    name="amenities"
                    onChange={handleChange}
                    value="Hot Tub"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_hot_tub">Hot Tub</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_24_7_security"
                    name="amenities"
                    onChange={handleChange}
                    value="24/7 Security"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_24_7_security">24/7 Security</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_wheelchair_accessible"
                    name="amenities"
                    onChange={handleChange}
                    value="Wheelchair Accessible"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_wheelchair_accessible">
                    Wheelchair Accessible
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_elevator_access"
                    name="amenities"
                    onChange={handleChange}
                    value="Elevator Access"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_elevator_access">
                    Elevator Access
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_dishwasher"
                    name="amenities"
                    onChange={handleChange}
                    value="Dishwasher"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_dishwasher">Dishwasher</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_gym_fitness_center"
                    name="amenities"
                    onChange={handleChange}
                    value="Gym/Fitness Center"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_gym_fitness_center">
                    Gym/Fitness Center
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_air_conditioning"
                    name="amenities"
                    onChange={handleChange}
                    value="Air Conditioning"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_air_conditioning">
                    Air Conditioning
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_balcony_patio"
                    name="amenities"
                    onChange={handleChange}
                    value="Balcony/Patio"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_smart_tv"
                    name="amenities"
                    onChange={handleChange}
                    value="Smart TV"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_smart_tv">Smart TV</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_coffee_maker"
                    name="amenities"
                    onChange={handleChange}
                    value="Coffee Maker"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
                </div>
              </div>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
              <label className="block text-gray-700 font-bold mb-2">
                Rates (Leave blank if not applicable)
              </label>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <label htmlFor="weekly_rate" className="mr-2">
                    Weekly
                  </label>
                  <input
                    type="number"
                    id="weekly_rate"
                    name="rates.weekly"
                    value={formData.rates?.weekly}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="monthly_rate" className="mr-2">
                    Monthly
                  </label>
                  <input
                    type="number"
                    id="monthly_rate"
                    value={formData.rates?.monthly}
                    name="rates.monthly"
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="nightly_rate" className="mr-2">
                    Nightly
                  </label>
                  <input
                    type="number"
                    id="nightly_rate"
                    value={formData.rates?.nightly}
                    name="rates.nightly"
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="seller_name"
                className="block text-gray-700 font-bold mb-2"
              >
                Seller Name
              </label>
              <input
                type="text"
                id="seller_name"
                name="seller_info.name"
                value={formData.seller_info?.name}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="seller_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Seller Email
              </label>
              <input
                type="email"
                id="seller_email"
                name="seller_info.email"
                value={formData.seller_info?.email}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Email address"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="seller_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Seller Phone
              </label>
              <input
                type="tel"
                id="seller_phone"
                name="seller_info.phone"
                value={formData.seller_info?.phone}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Phone"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 font-bold mb-2"
              >
                Images (Select 1 image only*)
              </label>
              <input
                type="text"
                id="images"
                value={formData.imageUrl}
                name="imageUrl"
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Enter Image URL"
              />
            </div>

            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProperty;
