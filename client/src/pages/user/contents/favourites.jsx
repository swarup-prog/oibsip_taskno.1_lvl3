import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetRequest } from "../../../services/httpRequest";
import { FavouriteCard } from "../../../components";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const userId = useSelector((state) => state.userData.data._id);

  const fetchFavourites = async () => {
    const favouriteData = await GetRequest(
      `/favourite/getFavourites/${userId}`
    );
    setFavourites(favouriteData.data);
    console.log("favourites: ", await favouriteData.data);
  };

  useEffect(() => {
    if (userId) {
      fetchFavourites();
    }
  }, [userId]);

  const [selected, setSelected] = useState({});
  const handleClick = (name) => {
    setSelected(name);
  };

  console.log(selected);

  return (
    <div className="w-full">
      <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
        Favourites
      </h1>

      <div className="flex gap-20">
        {favourites.map((favourite) => {
          return (
            <FavouriteCard
              key={favourite._id}
              data={favourite}
              isSelected={selected === favourite.pizzaName}
              onClick={() => handleClick(favourite.pizzaName)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favourites;
