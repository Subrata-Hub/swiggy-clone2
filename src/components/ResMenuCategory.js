import { useState } from "react";
import MenuItemsList from "./MenuItemsList";

const ResMenuCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(true);

  const handelClick = () => {
    setShowItems(!showItems);
    // setShowIndex();
  };

  return (
    <div>
      <div className="my-2 py-4 ">
        <div
          className="flex justify-between cursor-pointer "
          onClick={handelClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>🔽</span>
        </div>

        {showItems && <MenuItemsList items={data?.itemCards} />}
      </div>
    </div>
  );
};

export default ResMenuCategory;
