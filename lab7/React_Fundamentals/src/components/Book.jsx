function Book(props) {
  return (
    <>
      <h2>{props.name}</h2>
      <img
        src={props.image}
        alt={props.name}
        style={{ height: "100px", width: "75px" }}
      />
      <h3>Price: {props.price}</h3>
      <p>Author: {props.author}</p>
      <p>Rating: {props.rating}</p>
    </>
  );
}

export default Book;
