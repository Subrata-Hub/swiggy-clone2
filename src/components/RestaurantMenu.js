import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import useRestaurant from "../utils/useRestaurant";
import Shimmer from "./Shimmer";
import ResMenuCategory from "./ResMenuCategory";

const RestaurantMenu = () => {
  const params = useParams();
  const { resId } = params;

  // const { restaurant, restaurantMenu } = useRestaurant(resId);

  const restaurantInfo = useRestaurant(resId);

  // const [showIndex, setShowIndex] = useState(0);

  if (restaurantInfo === null) return <Shimmer />;

  const {
    name,
    cloudinaryImageId,
    cuisines,
    areaName,
    costForTwoMessage,
    avgRating,
    sla,
    totalRatingsString,
    feeDetails,
  } = restaurantInfo?.data?.cards[0]?.card?.card?.info;

  const catagories =
    restaurantInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (e) =>
        e.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="mx-[350px] p-4 mt-6 bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl">{name}</h2>
          {/* <img src={IMG_CDN_URL + cloudinaryImageId} className="imgResize" /> */}
          <p className="text-sm mt-2 ">{cuisines?.join(",  ")}</p>
          <p className="text-sm">
            {areaName}, {sla.lastMileTravelString}
          </p>
        </div>
        <div className="flex-row-reverse  border-slate-200">
          <div className="p-3 m-1 bg-gray-50 text-green-600 font-bold">
            🔯 {avgRating}
          </div>
          <div className="p-3 m-1 text-xs bg-gray-50">{totalRatingsString}</div>
        </div>
      </div>
      <p className="text-sm mt-2 ">{feeDetails.message}</p>

      <div className="border-t-2 border-dotted border-gray-300 mt-6"></div>

      <div className="pt-3 font-bold text-base">
        <span className="mr-8">⌚ {sla.slaString}</span>
        <span>💰 {costForTwoMessage}</span>
      </div>

      {catagories.map((category, index) => (
        <ResMenuCategory
          data={category?.card.card}
          key={category?.card.card.title}
          // showItems={index === showIndex && true}
          // setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
