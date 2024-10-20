import React from 'react';


const Input= ({ type, placeholder, onChange }) => {
    return (
        <div className='relative rounded-lg  bg-white p-1 shadow-md transition-all duration-300 ease-in-out border-2 border-gray-700 hover:shadow-lg focus-within:ring-1 focus-within:ring-black '>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full px-4 py-2 bg-transparent text-black placeholder-gray-700 border-none focus:outline-none focus:ring-0"
            />
        </div>
    );
}

export default Input;