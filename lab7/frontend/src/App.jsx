import Book from "./components/Book";

const b1 = {
  picUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9r8LCkI511HTcKPRyHxGLfr_8aVwurDWuenlnfqk-E2Rukgsc_ZjHyAs&s=10",
  bname: "React Design Pattern",
  price: 1199,
  quantity: 10,
  rating: 5.0,
};

const b2 = {
  picUrl:
    "https://dryuc24b85zbr.cloudfront.net/tes/resources/6441170/image?width=500&height=500&version=1474643904786",
  bname: "React Design Pattern",
  price: 1199,
  quantity: 10,
  rating: 5.0,
};

export default function App() {
  return (
    <>
      <h1 className="page-title">React Book Store</h1>

      <div className="container">
        <Book book={b1} />
        <Book book={b2} />
        <Book book={b1} />
        <Book book={b2} />
      </div>
    </>
  );
}