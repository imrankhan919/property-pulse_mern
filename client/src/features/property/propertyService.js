import axios from "axios";

const fetchProperties = async () => {
  const response = await axios.get("/api/property");
  return response.data;
};

const fetchProperty = async (id) => {
  const response = await axios.get("/api/property/" + id);
  return response.data;
};

const propertyService = {
  fetchProperties,
  fetchProperty,
};

export default propertyService;
