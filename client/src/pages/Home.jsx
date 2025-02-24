import React, { useEffect } from "react";
import PropertyFeatureCard from "../components/PropertyFeatureCard";
import HeroSection from "../components/HeroSection";
import FeaturedCard from "../components/FeaturedCard";
import PropertyCard from "../components/PropertyCard";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";
import { getProperties } from "../features/property/propertySlice";

const Home = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    properties,
    propertyLoading,
    propertySuccess,
    propertyError,
    propertyErrorMessage,
  } = useSelector((state) => state.property);

  const featuredProperties = properties.filter(
    (property) => property.is_featured
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if ((isError && message) || (propertyError && propertyErrorMessage)) {
      toast.error(message || propertyErrorMessage, {
        position: "bottom-center",
        theme: "colored",
      });
    }

    // Fetch Propertuies
    dispatch(getProperties());
  }, [user, isError, message]);

  if (isLoading || propertyLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      {/* Rental And Owners */}

      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <PropertyFeatureCard
              role={"renter"}
              heading={"For Renters"}
              subHeading={
                "Find your dream rental property. Bookmark properties and contact owners."
              }
              buttonText={"Browse Properties"}
            />
            <PropertyFeatureCard
              role={"owners"}
              heading={"For Property Owners"}
              subHeading={
                "List your properties and reach potential tenants. Rent as an airbnb or long term."
              }
              buttonText={"Add Property"}
            />
          </div>
        </div>
      </section>

      {/* Featured Properties */}

      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProperties.map((property, index) => (
              <FeaturedCard key={index} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Properties */}

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* View All */}
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          to="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default Home;
