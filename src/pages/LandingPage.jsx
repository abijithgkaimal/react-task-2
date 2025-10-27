import { blue } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="container-fluid bg-light text-dark p-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Welcome to <span style={{ color: "blue" }}>MONEY MIND</span>
          </h1><p className="lead my-3">
            Your personal finance companion to track expenses, manage budgets, and achieve your financial goals with ease.
          </p>
          <button className="btn btn-primary btn-lg" onClick={handleLoginClick}>
            Get Started
          </button>
        </div>
      </div>

      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 className="display-6">Simplify Your Financial Life</h2>
            <p className="lead">
              MoneyMind is your smart online finance management platform designed to simplify budgeting, expense tracking, and savings. From personal finance to business expense planning, we help you stay in control of your money effortlessly. Whether you’re managing daily spending or planning long-term goals, Money Mind makes financial management simple, secure, and stress-free.
            </p>
          </div>
          <div className="col-lg-6 text-center">

            <img style={{height:"330px",width:"650px"}}
              src="https://oasys-image.s3.amazonaws.com/public/images/statics-for-blog---financial-tips-blog-image-1733124606011-883503527.webp"
              alt="Financial Dashboard"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-lg-6">
            <h2 className="display-6">Track, Budget, and Save</h2>
            <p className="lead">
              With our intuitive tools, you can easily monitor your spending habits, create custom budgets that work for you, and watch your savings grow. Get insights into where your money is going and make smarter financial decisions for a brighter future.
            </p>
          </div>
          <div className="col-lg-6 text-center">

            <img style={{height:"330px",width:"650px"}}
              src="https://img.freepik.com/premium-vector/steps-coins-growth-growing-savings-increase-investment-age-indian-rupee-dollar-coin-growth-financial-graph-target-money-tree-stairs-up-save-business-wealth-vector-illustration_81894-11192.jpg"
              alt="Savings Growth Chart"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
