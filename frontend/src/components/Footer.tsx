import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mx:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/**Left Section */}
        <div>
          <img
          className="mb-5 w-40"
           src={assets.logo} alt="Prescripto Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            At Prescripto, we bring doctors and patients together in one place.
            From booking appointments to managing consultations, we make your
            healthcare journey smoother and more reliable.
          </p>
        </div>
        {/**middle Section */}
        <div className="">
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        {/**Right Section */}
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li>+1-212-456-7890</li>
                <li>madhalfrwat@gmail.com</li>
            </ul>
        </div>
      </div>
      <footer>
        <hr />
        <p className="text-center py-5 text-sm ">Copyright © 2025 Prescripto. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
