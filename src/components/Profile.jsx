import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './style.css';
import ProfilePic from '../assets/images/avatar.png';

const Profile = () => {


    const cashbackHistory = [
        {
          date: '2025-01-12',
          amount: 50,
          bookingDetails: 'Transaction ID: B001',
        },
        {
          date: '2025-01-08',
          amount: 30,
          bookingDetails: 'Transaction ID: B002',
        },
        {
          date: '2025-01-01',
          amount: 100,
          bookingDetails: 'Transaction ID: B003',
        },
      ];
    
      const navigate = useNavigate();

      const handleLogOut = () => {
        // Navigate to the RewardsPage
        navigate('/');
      };


  return (
    <div
      className="design-root relative flex min-h-screen flex-col bg-white justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>
       {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gray-100 rounded-b-2xl shadow-neumorphic">
        <div className="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </div>
        <h2 className="font-bold text-lg text-gray-700">Guaranta | Profile</h2>
      </div>

      {/* Profile Section */}
      <div className="p-4 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full shadow-neumorphic">
          <img
            src={ProfilePic}
            alt="Profile Picture"
            className="rounded-full w-full h-full"
          />
        </div>
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold">Hi, Miss. Baraka</h1>
          <p className="text-sm text-gray-600">
            Total Amount: ₦120,000 <br />
            Total Deposits: ₦250,000 <br />
            Total Withdrawal: ₦130,000 <br />
            Score: 75
          </p>
        </div>
        <button className="mt-4 py-2 px-6 rounded-full shadow-neumorphic-inset bg-gray-200 text-gray-700 font-bold hover:bg-blue-500 hover:text-white">
          Invite Friends
        </button>
      </div>


        {/* Deposit */}
        <h2 className="text-black text-[22px] font-bold px-4 pb-3 pt-5">
          Deposits
        </h2>

        <div className="p-4 animate-fadeIn">
        {[
          { title: "₦40 from bank app", date: "17/01/25", amount: "+₦40" },
          { title: "₦50 from bank app", date: "10/01/25", amount: "+₦50" },
          { title: "₦100 from bank", date: "03/01/25", amount: "+₦100" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-gray-100 px-4 min-h-[72px] py-2 justify-between mb-2 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-500 dark:hover:bg-blue-700"
          >
            <div className="flex flex-col">
              <p className="text-black text-base font-medium">{item.title}</p>
              <p className="text-gray-600 text-sm">{`Deposited on ${item.date}`}</p>
            </div>
            <p className="text-black text-base font-normal">{item.amount}</p>
          </div>
        ))}
        </div>




            <div>
            {/* Section Title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-black px-4">Withdrawals</h2>

            {/* Cashback History Section */}
            <div className="p-4 animate-fadeIn">
                {cashbackHistory.map((transaction, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 p-3 mb-2 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-500 dark:hover:bg-blue-700"
                >
                    <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                    <p className="text-gray-900 dark:text-white">{transaction.bookingDetails}</p>
                    </div>
                    <p className="text-green-600 dark:text-green-400 font-bold">+₦{transaction.amount}</p>
                </div>
                ))}
            </div>
            </div>






        {/* Redeem Rewards */}
        <h2 className="text-black text-[22px] font-bold px-4 pb-3 pt-5">
          Transactions
        </h2>
        {["Deposit", "Withdraw"].map((text, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-gray-100 px-4 min-h-14 justify-between mb-2"
          >
            <p className="text-black text-base font-normal flex-1 truncate">
              {text}
            </p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
        <div className="">
        {/* Button Section */}
        <div className="flex px-4 py-3 footer">
                <button className="flex items-center justify-center rounded-full h-12 px-5 flex-1 bg-blue-500 text-white text-base font-bold cashout-button" onClick={handleLogOut}>
                Log Out
                </button>
            
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-around items-center h-16 shadow-2xl bg-gray-200">
            {/* HOME Icon */}
            <Link to="/">
                <button className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 3l9 9-1.5 1.5-6.5-6.5V21H9v-7H7v7H3V12l-1.5-1.5z" />
                </svg>
                <span className="text-xs">HOME</span>
                </button>
            </Link>

            {/* SETTINGS Icon */}
            <button className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 24 24"
            >
                <path d="M19.14 12.94l1.43 1.43-2.12 2.12-1.43-1.43a7.02 7.02 0 01-8.02 0l-1.43 1.43-2.12-2.12 1.43-1.43a7.02 7.02 0 010-8.02l-1.43-1.43L4.8 4.8l1.43 1.43a7.02 7.02 0 018.02 0l1.43-1.43 2.12 2.12-1.43 1.43a7.02 7.02 0 010 8.02z" />
            </svg>
            <span className="text-xs">SETTINGS</span>
            </button>

            {/* PROFILE Icon (Active) */}
            <button className="flex flex-col items-center text-blue-500">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 24 24"
            >
                <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 2a8 8 0 018 8c0 1.6-.472 3.086-1.273 4.326a5.02 5.02 0 00-1.055-.476 7.015 7.015 0 00-3.672-6.35 7.015 7.015 0 00-6.35-3.672c-.151-.015-.301-.015-.452-.015-3.732 0-6.806 2.894-6.993 6.526C2 10.475 2 10.237 2 10a8 8 0 018-8z" />
            </svg>
            <span className="text-xs">PROFILE</span>
            </button>
        </div>
        </div>






    </div>
  );
};

export default Profile;
