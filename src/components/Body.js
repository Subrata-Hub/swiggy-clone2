import { useState, useEffect } from "react";

import ResturantCard, { withOfferLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";

const filterData = (searchText, restaurants) => {
  const filterData = restaurants.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
};

const BodyComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const ResturantCardForOffer = withOfferLabel(ResturantCard);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.572646&lng=88.36389500000001&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json?.data?.cards[5]);

    setAllRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }

  // async function getRestaurants() {
  //   try {
  //     const data = await fetch(
  //       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.723616&lng=88.350805&page_type=DESKTOP_WEB_LISTING",
  //       {
  //         method: "GET",
  //         headers: {
  //           // set Accept header to application/json
  //           Accept: "application/json",
  //         },
  //       }
  //     );

  //     if (!data.ok) {
  //       throw new Error(`HTTP error! Status: ${data.status}`);
  //     }

  //     const json = await data.json();
  //     console.log(json);

  //     setAllRestaurants(
  //       json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants
  //     );
  //     setFilteredRestaurants(
  //       json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants
  //     );
  //   } catch (error) {
  //     console.error("Error fetching restaurant data:", error);
  //   }
  // }

  const isOnline = useOnline();

  if (!isOnline) {
    return <h1>🔴 Offline please check your internet conection</h1>;
  }

  if (!allRestaurants) return null;

  return (
    <div className="px-16 ml-28">
      <div className="p-3 m-3">
        <input
          type="text"
          className="border border-solid border-black h-7"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="px-4 py-1 bg-green-200 m-4 rounded-md"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="">
        {allRestaurants.length === 0 ? (
          <Shimmer />
        ) : (
          <div className="flex flex-wrap">
            {filteredRestaurants.length === 0 ? (
              <h2>No Resturant found for your query</h2>
            ) : (
              filteredRestaurants.map((restaurant) => {
                return (
                  <Link
                    to={`/restaurant/${restaurant.info.id}`}
                    key={restaurant.info.id}
                  >
                    {restaurant.info.aggregatedDiscountInfoV3 ? (
                      <ResturantCardForOffer {...restaurant.info} />
                    ) : (
                      <ResturantCard {...restaurant.info} />
                    )}
                  </Link>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyComponent;
