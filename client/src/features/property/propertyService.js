import axios from "axios";

const fetchProperties = async () => {
  const response = await axios.get("/api/property");
  return response.data;
};

const fetchProperty = async (id) => {
  const response = await axios.get("/api/property/" + id);
  return response.data;
};

const addProperty = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("/api/property", formData, options);
  return response.data;
};

const propertyService = {
  fetchProperties,
  fetchProperty,
  addProperty,
};

export default propertyService;
