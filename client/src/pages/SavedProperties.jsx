import React from "react";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";

const SavedProperties = () => {
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PropertyCard />
          </div>
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default SavedProperties;
