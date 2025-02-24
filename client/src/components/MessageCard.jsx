import React from "react";

const MessageCard = ({ message }) => {
  return (
    <div className="space-y-4 my-4">
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry : </span>
          {message.propertyName}
        </h2>
        <p className="text-gray-700">{message.propertyDescription}</p>

        <ul className="mt-4">
          <li>
            <strong>Name:</strong> {message.name}
          </li>

          <li>
            <strong>Reply Email:</strong>
            <a href={`mailto:${message.mail}`} className="text-blue-500">
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone:</strong>
            <a href={`tel:${message.phone}`} className="text-blue-500">
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received:</strong>
            {message.createdAt}
          </li>
        </ul>
        <button
          disabled={message.isSeen}
          className={
            message.isSeen
              ? "mt-4 mr-3 bg-gray-500 text-white py-1 px-3 rounded-md"
              : "mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
          }
        >
          {message.isSeen ? "Seen" : "Mark As Read"}
        </button>
        <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
