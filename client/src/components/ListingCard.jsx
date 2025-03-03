import { useDispatch } from "react-redux";
import ListImage from "../assets/properties/a1.jpg";
import { edit, removeProperty } from "../features/property/propertySlice";
import { Link } from "react-router-dom";

const ListingCard = ({ property }) => {
  const dispatch = useDispatch();

  const handleRemoveProperty = (id) => {
    dispatch(removeProperty(id));
  };

  const handleEditProperty = (property) => {
    dispatch(edit(property));
  };

  return (
    <div className="mb-10">
      <a href="/property.html">
        <img
          className="h-32 w-full rounded-md object-cover"
          src={property.imageUrl}
          alt="Property 1"
        />
      </a>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">Address: {property.location.city}</p>
      </div>
      <div className="mt-2">
        <Link
          onClick={() => handleEditProperty(property)}
          to="/add-property"
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={() => handleRemoveProperty(property._id)}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
