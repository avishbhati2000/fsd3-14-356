const b1={
  picUrl: "https://imgs.search.brave.com/48J4YveDPnEPuYkeKoBtCjADHsGGqKA0zomviVEKB-o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/aXMtaXMtZ3VuYWhv/bi1rYS1kZXZ0YS1p/cy1vdmVycmF0ZWQt/aS1hbS1hbG1vc3Qt/YXQtdjAta2RoYnhm/NTlnYWdkMS5qcGVn/P3dpZHRoPTY0MCZj/cm9wPXNtYXJ0JmF1/dG89d2VicCZzPWNk/ZjliMWZjNGUxNzBh/NTA0ZTA3ZjM5Mjc1/ODIwZjk0NmJmNDlj/ZTM",
  bname:"React Design Pattern",
  price: 1199,
  quantity:10,
  rating:5.0,
}
const b2={
  picUrl: "https://imgs.search.brave.com/ZHEfhXAnnLxgvAX-FR7ozf8zpVsQ_ICtT0g23MSPKG8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFkd3F6MUJVM0wu/anBn",
  bname:"React Design Pattern",
  price: 1199,
  quantity:10,
  rating:5.0,
}


function Book(props) {
  const{ rating, quantity, price, bname, picUrl } = props.book;
  return (
    <div>
      <img
      src={picUrl}
      alt={bname}
      />
    <h1>{bname}</h1>
    <h2>Price: {price}</h2>
    <h3>Quantity: {quantity}</h3>
    <h4>Rating: {rating}</h4>
    </div>
  )
}

export default function App(){
  return (
  <>
  <Book book={b1} />
  <h1>Hello React</h1>
  <Book book={b2} />
  <Book book={b1} />
  <Book book={b2} />
  </>
  )
}