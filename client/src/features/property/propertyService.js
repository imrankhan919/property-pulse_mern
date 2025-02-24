import axios from "axios";

const fetchProperties = async () => {
  const response = await axios.get("/api/properties");
  return response.data;
};

const propertyService = {
  fetchProperties,
};

export default propertyService;
