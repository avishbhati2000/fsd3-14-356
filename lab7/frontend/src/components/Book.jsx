export default function Book(props) {
  const { rating, quantity, price, bname, picUrl } = props.book;

 const qtystyle = {
  display: "inline-block",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#a78bfa",
  background: "rgba(167, 139, 250, 0.1)",
  padding: "7px 14px",
  marginTop: "10px",
  borderRadius: "999px",
  border: "1px solid rgba(167, 139, 250, 0.25)",
  letterSpacing: "0.4px",
};

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
