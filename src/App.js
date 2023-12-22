import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { IMG_CDN_URL } from "../mocks/data";
import { HeaderComponent } from "./components/Header";
import BodyComponent from "./components/Body";
import FooterComponent from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Profile from "./components/Profile";
import Shimmer from "./components/Shimmer";
import UserContext from "./utils/userContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import ResturantCard from "./components/RestaurantCard";
import Cart from "./components/Cart";
// import Instamart from "./components/Instamart";

const Instamart = lazy(() => import("./components/Instamart"));

// Parcel is a Beast

// HMR ---- HOT MODULING Replacement
// File Watcher algorithim - c++
// BUNDLING
// MINIFY
// Cleaning our Code
// Manage Build and production Build
// Image Optimization
// Caching while devolopment
// Compression
// Compatable Older Virson of Browser
// HTTPS On Dev
// Consistent Hasing Algorithm
// Tree Shaking - Removing un-wanted code

///////////////////////////////////////////////////////////////////
// const heading1 = React.createElement(
//   "h1",
//   { id: "title", key: "h1" },
//   "Heading 1"
// );

// const heading2 = React.createElement(
//   "h2",
//   { id: "title", key: "h2" },
//   "Heading 2"
// );

// const container = React.createElement("div", { id: "container" }, [
//   heading1,
//   heading2,
// ]);

/////////////////////////////////////////////////////////////////////////////////////

// JSX => React.createElement => Object => HTML(DOM)
// Babel => React.createElement

// This is React Element or JSX  And This is Normal Javascripts Variable which is return a object
const heading = (
  <h1 id="title" key="h">
    Food Vila
  </h1>
);

// React Component
// Functional Component is a javascripts function that return yours some pices of JSX or React Element or Composition of react
// Element or Component it self

// This is React Functional Component And This is Normal Javascripts Function
// if i Refering React Element inside a functional Component use   {heading}
// If i use React Component inside a Functional component use   <Title/> OR {Title()}
// Any pice off javascrips code work inside of JSX . Jast use {} Like { console.log }
//        What is Composing Comopnentss or Component Composition
// If I use Component Inside Component that is Component Composition

// Header
//    -Logo
//    -Nav Item
//    -Cart
// Body
//   - Search Bar
//   - ResturantList
//        - ResturantCard
//             - Image
//             - Name
//             - Rating
//             - Cusigns

// Footer
//   - Links
//   - Copyrights

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "Suriya Roy",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName }}>
        <div className="">
          <HeaderComponent />
          <Outlet />
          <FooterComponent />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <BodyComponent />,
      },
      {
        path: "/about",
        element: <About />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Instamart />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// When you Render React element use root.render(heading);
// When you render React Functional Component use root.render(<HeaderComponent/>)
root.render(<RouterProvider router={appRouter} />);
