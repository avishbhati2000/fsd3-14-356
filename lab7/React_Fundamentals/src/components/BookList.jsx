import { books } from "../data.js";
import Book from "./Book.jsx";

function BookList() {
  return (
    <>
      <h1>Book list: {books.length} found</h1>
      {books.map((item) => (
        <Book
          key={item.name}
          name={item.name}
          image={item.image}
          price={item.price}
          author={item.author}
          rating={item.rating}
        />
      ))}
    </>
  );
}

export default BookList;