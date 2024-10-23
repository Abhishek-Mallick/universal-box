import React from 'react';

const Card = ({ item }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Feature {item}</h3>
      <p className="text-gray-600">
        Your features details
      </p>
    </div>
  );
};

export default Card;