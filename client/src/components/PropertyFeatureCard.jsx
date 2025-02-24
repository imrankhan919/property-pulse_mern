import React from "react";
import { Link } from "react-router-dom";

const PropertyFeatureCard = ({ heading, subHeading, buttonText, role }) => {
  return (
    <div
      className={
        role === "renter"
          ? "bg-gray-100 p-6 rounded-lg shadow-md"
          : "bg-blue-100 p-6 rounded-lg shadow-md"
      }
    >
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">{subHeading}</p>
      <Link
        to={role === "renter" ? "/properties" : "add-property"}
        className={
          role === "renter"
            ? "inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            : "inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        }
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default PropertyFeatureCard;
