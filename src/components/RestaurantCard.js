import { IMG_CDN_URL } from "../config";

const ResturantCard = ({
  name,
  cloudinaryImageId,
  cuisines,
  avgRatingString,
  sla,
  areaName,
}) => {
  return (
    <div className="m-4 pb-2 w-[260px] bg-gray-50 rounded-lg">
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        className="w-full h-44 rounded-2xl"
      />
      <h2 className="font-bold pt-3 text-lg px-2 line-clamp-1">{name}</h2>
      <h5 className="px-2 font-bold">
        🔯 {avgRatingString} • {sla.slaString}
      </h5>
      <h4 className="px-2 mt-2 line-clamp-1">{cuisines.join(", ")}</h4>
      <h4 className="px-2">{areaName}</h4>
    </div>
  );
};

// Higher Order Component

export const withOfferLabel = (ResturantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute text-white mt-36 ml-5 mr-1 font-bold text-xl px-6 w-fit bg-zinc-800 shadow-2xl rounded-md">
          {props.aggregatedDiscountInfoV3.header +
            " " +
            props.aggregatedDiscountInfoV3.subHeader}
        </label>
        <ResturantCard {...props} />
      </div>
    );
  };
};

export default ResturantCard;

// bg-stone-800
