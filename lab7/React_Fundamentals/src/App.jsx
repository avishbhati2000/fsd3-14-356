// function must return sinigle element
// <> </> are used to wrap jsx data into single element
// component - any js function returns html directly
// component can be called as html tag
// the tag must be closed
// component first character must be capital.

function Hello(args){
  return(
    <>
    <h1>{args.name}</h1>
     <img src = {args.imageURL} alt= {args.name} style = {{height: "100px",width:"75px"}}/>
      <h2>{args.price}</h2>
      <h3>{args.author}</h3>
      </>
  )
}



export default function App (){
  const books = [
    

[
  {
    "name": "Atomic Habits",
    "author": "James Clear",
    "price": 499,
    "rating": 4.8,
    "image": "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
  },
  {
    "name": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 299,
    "rating": 4.6,
    "image": "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg"
  },
  {
    "name": "Rich Dad Poor Dad",
    "author": "Robert T. Kiyosaki",
    "price": 350,
    "rating": 4.5,
    "image": "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg"
  },
  {
    "name": "The Psychology of Money",
    "author": "Morgan Housel",
    "price": 399,
    "rating": 4.7,
    "image": "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg"
  },
  {
    "name": "Ikigai",
    "author": "Hector Garcia and Francesc Miralles",
    "price": 299,
    "rating": 4.4,
    "image": "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg"
  },
  {
    "name": "Think and Grow Rich",
    "author": "Napoleon Hill",
    "price": 250,
    "rating": 4.3,
    "image": "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg"
  },
  {
    "name": "The 48 Laws of Power",
    "author": "Robert Greene",
    "price": 599,
    "rating": 4.6,
    "image": "https://covers.openlibrary.org/b/isbn/9780140280197-L.jpg"
  },
  {
    "name": "Sapiens",
    "author": "Yuval Noah Harari",
    "price": 550,
    "rating": 4.7,
    "image": "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg"
  },
  {
    "name": "Deep Work",
    "author": "Cal Newport",
    "price": 399,
    "rating": 4.5,
    "image": "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg"
  },
  {
    "name": "Can't Hurt Me",
    "author": "David Goggins",
    "price": 450,
    "rating": 4.8,
    "image": "https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg"
  }
]

    
  ]
  return (
  <>
  <h1>Hello React</h1>
  <Hello name = "Let us C" price = "355" author = "Yashwant Kanitkar"/>
  <Hello name = "Jesus in Hell" price = "567" author = "JJ Edison"/>
  <Hello {...books[0]}/>
  {
  books.map((item)=><Hello{...item}/>)
  }
  </>
  );
}

