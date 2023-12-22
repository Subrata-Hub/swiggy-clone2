import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/userContext";
import { useSelector } from "react-redux";

// const logedInUser = () => {
//   return true;
// };

const Title = () => (
  <div className="ml-16">
    <a href="/">
      <img
        className="w-24"
        alt="logo"
        src="https://obs.line-scdn.net/0m0339dd5b72513e8a8d6127b836e5ecf1e128f1da5cb7?0"
      />
    </a>
  </div>
);

export const HeaderComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isOnline = useOnline();

  const data = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  console.log(cartItems);

  return (
    <div className="flex justify-between bg-gray-200 shadow-lg">
      <Title />
      <div className="flex items-center mx-10">
        <ul className="flex px-4 mx-4 gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className="font-bold">
            <Link to="/cart">Cart({cartItems.length})</Link>
          </li>
          <li>
            <Link to="/instamart">Instamart</Link>
          </li>
          <h2>{isOnline ? "✅" : "🔴"}</h2>
          {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)}>logout</button>
          ) : (
            <button onClick={() => setIsLoggedIn(true)}>login</button>
          )}
          <li>{data.loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
