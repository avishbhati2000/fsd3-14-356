function Series(props) {
  return (
    <>
      <h2>{props.name}</h2>
      <img
        src={props.image}
        alt={props.name}
        style={{ height: "150px", width: "100px" }}
      />
      <h3>Rating: {props.rating}</h3>
      <p>Genre: {props.genre}</p>
      <p>Created by: {props.creator}</p>
    </>
  );
}

export default Series;
