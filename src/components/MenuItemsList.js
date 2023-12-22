import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { IMG_CDN_URL } from "../config";

const MenuItemsList = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div className="flex justify-between items-center border-gray-200 border-b-2">
          <div key={item.card.info.id} className="pb-14 pt-4 w-10/12">
            <div className="flex-row-reverse py-2">
              <div className="text-base font-semibold">
                {item.card.info.name}
              </div>
              <div className="text-sm font-normal">
                ₹{" "}
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </div>
            </div>
            <p className="text-sm font-sans">{item.card.info.description}</p>
          </div>
          <div className="">
            <div className="absolute">
              <button
                className="px-4 py-1 rounded-lg bg-white shadow-lg mt-16 ml-6 text-green-600 font-semibold"
                onClick={() => handleAddItem(item)}
              >
                Add+
              </button>
            </div>
            <img
              src={IMG_CDN_URL + item.card.info.imageId}
              className="w-28 h-24 rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItemsList;
