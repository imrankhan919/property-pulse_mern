import React from "react";
import Search from "../components/Search";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

const Properties = () => {
  const {
    properties,
    propertyLoading,
    propertySuccess,
    propertyError,
    propertyErrorMessage,
  } = useSelector((state) => state.property);

  return (
    <>
      <Search />
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
        <Pagination />
      </section>
    </>
  );
};

export default Properties;
