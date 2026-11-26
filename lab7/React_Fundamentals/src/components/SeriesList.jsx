import { series } from "../data.js";
import Series from "./Series.jsx";

function SeriesList() {
  return (
    <>
      <h1>Top Ten Web Series</h1>
      {series.map((item) => (
        <Series
          key={item.name}
          name={item.name}
          image={item.image}
          rating={item.rating}
          genre={item.genre}
          creator={item.creator}
        />
      ))}
    </>
  );
}

export default SeriesList;
