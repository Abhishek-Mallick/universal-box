import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For now, we'll just display a success message
    setSuccessMessage('Thank you for contacting us!');
    setErrorMessage('');
  };

  return (
    <div className='flex justify-center min-h-56 p-[11px]'>
      <div className="relative z-20 w-full max-w-md bg-[#040b18] bg-opacity-90 px-8 py-10 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-center text-3xl font-bold text-white mb-4  ">Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-4 border border-[#C5C6C7] rounded-lg text-[#0B0C10] focus:ring-2 focus:ring-[#45A29E]"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 border border-[#C5C6C7] rounded-lg text-[#0B0C10] focus:ring-2 focus:ring-[#45A29E]"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-4 border border-[#C5C6C7] rounded-lg text-[#0B0C10] focus:ring-2 focus:ring-[#45A29E]"
              rows="5"
              required
            ></textarea>
          </div>

          <Button
            name="Send Message"
            type="submit"
            className="w-full bg-[#eeeeee] hover:bg-[#3B82F6] hover:shadow-sm hover:shadow-gray-400 font-semibold p-4 rounded-lg hover:text-white transition duration-400"
          />

          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;