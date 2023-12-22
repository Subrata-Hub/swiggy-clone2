import { useState, useEffect } from "react";

const useRestaurant = (resId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getRestaurantInfo = async () => {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.572646&lng=88.36389500000001&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const json = await data.json();
      console.log(json);

      setRestaurantInfo(json);
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  };
  return restaurantInfo;
};

export default useRestaurant;
