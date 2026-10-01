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

// function Book(props) {
//   const { rating, quantity, price, bname, picUrl } = props.book;

//  const qtystyle = {
//   display: "inline-block",
//   fontSize: "0.85rem",
//   fontWeight: "600",
//   color: "#a78bfa",
//   background: "rgba(167, 139, 250, 0.1)",
//   padding: "7px 14px",
//   marginTop: "10px",
//   borderRadius: "999px",
//   border: "1px solid rgba(167, 139, 250, 0.25)",
//   letterSpacing: "0.4px",
// };

  return (
    <div>
      <img src={picUrl} alt={bname} />

      <h1>{bname}</h1>

      <h2>Price: ₹{price}</h2>

      <h3 style = {qtystyle} >Quantity: {quantity}</h3>

      <h4 style = {{color : "red", textAlign:"center"}}>⭐ {rating}</h4>

      <button className="buy-btn">Buy Now</button>
    </div>
  );
}

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