import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="container-fluid bg-primary">
        <div className="container text-white text-center p-5">
          <h3>MONEY MIND</h3>
          <p style={{ textAlign: 'center' }}>
            Money Mind is your smart online finance management platform designed to simplify budgeting, expense tracking, and savings. From personal finance to business expense planning, we help you stay in control of your money effortlessly. Whether you’re managing daily spending or planning long-term goals, Money Mind makes financial management simple, secure, and stress-free.
          </p>
        </div>

        <div className="container">
          <ul className='d-flex justify-content-center' style={{ listStyle: 'none', padding: 0 }}>
            <li className="p-4">
              {/* Add the size prop here */}
              <FaFacebook size={40} />
            </li>
            <li className="p-4">
              {/* You can use different sizes for each icon if you want */}
              <FaInstagramSquare size={40} />
            </li>
            <li className="p-4">
              {/* Using a string for relative units is also possible, e.g., size="3em" */}
              <FaTwitter size={40} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;