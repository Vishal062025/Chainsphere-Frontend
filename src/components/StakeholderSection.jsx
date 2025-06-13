import React from "react";
import { FaArrowRight } from "react-icons/fa"

const StakeholderSection = ({ icon: Icon, title, description, cta }) => (
    <div
        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between"
    >
        <div>
            <Icon className="text-4xl text-indigo-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-300 mb-4">{description}</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center justify-center cursor-pointer">
            {cta} <FaArrowRight className="inline ml-2" />
        </button>
    </div>
);
  
export default StakeholderSection;