import React, { useEffect } from "react";
import MessageCard from "../components/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import { getMessages } from "../features/message/messageSlice";
import { toast } from "react-toastify";

const Messages = () => {
  const { inbox, isLoading, isError, isSuccess, errorMessage, isSeen } =
    useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());

    if (isError && errorMessage) {
      toast.error(errorMessage, {
        position: "bottom-center",
        theme: "colored",
      });
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <section className="bg-blue-50">
        <div className="container m-auto py-24 max-w-6xl">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            {inbox.length === 0 ? (
              <>
                <h1 className="text-3xl font-bold mb-4">No Messages</h1>
              </>
            ) : (
              <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
            )}

            {inbox.map((message) => (
              <MessageCard key={message._id} message={message} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Messages;
