import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../assets/profile.png";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserProperty } from "../features/property/propertySlice";
import LoadingScreen from "../components/LoadingScreen";
import { toast } from "react-toastify";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { properties, propertyLoading, propertyError, propertyErrorMessage } =
    useSelector((state) => state.property);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (propertyError && propertyErrorMessage) {
      toast.error(propertyErrorMessage);
    }

    dispatch(getUserProperty());
  }, [user]);

  if (!user || propertyLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  <img
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    src={ProfileImage}
                    alt="User"
                  />
                </div>
                <h2 className="text-2xl mb-4">
                  <span className="font-bold block">Name: </span> {user.name}
                </h2>
                <h2 className="text-2xl">
                  <span className="font-bold block">Email: </span> {user.email}
                </h2>
              </div>

              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

                {properties.map((property) => (
                  <ListingCard key={property._id} property={property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
