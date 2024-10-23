import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-[14px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 pt-[40px]">
            <p>&copy; 2024 Your Website Name. All rights reserved.</p>
          </div>
          <nav className="flex space-x-4 items-center ">
            <Link to="/privacy" className="text-white hover:scale-105 no-underline transition duration-200">Privacy Policy</Link>
            <Link to="/terms" className="text-white hover:scale-105 no-underline transition duration-200">Terms of Service</Link>
            <Link to="/contactus" className="text-white hover:scale-105 no-underline transition duration-200">Contact Us</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;