import React from "react";
import { Link } from "react-router-dom";

const restaurants = [
  {
    id: 1,
    name: "Gusto Italiano",
    cuisine: "Итальянская",
    rating: 4.8,
    image: "/images/italian.jpg", // Файл public/images ішінде болуы тиіс
    location: "ул. Солнечная, 12",
  },
  {
    id: 2,
    name: "Sushi Master",
    cuisine: "Японская",
    rating: 4.6,
    image: "/images/sushi.jpg",
    location: "пр-т Мира, 45",
  },
  {
    id: 3,
    name: "Борщ и Шашлык",
    cuisine: "Русская/Грузинская",
    rating: 4.7,
    image: "/images/borsh.jpg",
    location: "ул. Победы, 33",
  },
];

export default function Home() {
  return (
    <div className="page-container">
      {/* Header Section */}
      <header className="header">
        <h1 className="title">Найди лучший ресторан рядом</h1>
        <p className="subtitle">Читайте отзывы, просматривайте меню и бронируйте столики</p>
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <div className="search-input">
          <svg className="search-icon" viewBox="0 0 24 24">
            <path
              fill="gray"
              d="M10,2A8,8 0 0,1 18,10C18,12.21 17.21,14.21 15.83,15.67L21.71,21.59L20.29,23L14.41,17.12C12.95,18.5 10.95,19.29 8.75,19.29A8,8 0 1,1 10,2Z"
            />
          </svg>
          <input type="text" placeholder="Введите название ресторана или кухню..." />
        </div>
      </div>

      {/* Restaurant Cards */}
      <section className="restaurant-list container">
        <h2 className="section-title">Популярные рестораны</h2>
        <div className="card-grid">
          {restaurants.map((res) => (
            <div className="card" key={res.id}>
              <img src={res.image} alt={res.name} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{res.name}</h3>
                <p className="card-sub">
                  {res.cuisine} • {res.location}
                </p>
                <p className="card-rating">⭐ {res.rating}</p>
                <div className="card-links">
                  <Link to={`/menu/${res.id}`} className="card-link">Меню</Link>
                  <Link to={`/reviews/${res.id}`} className="card-link">Отзывы</Link>
                  <Link to={`/book/${res.id}`} className="card-link">Забронировать</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Restaurant Review. Все права защищены.</p>
      </footer>
    </div>
  );
}
// import React from "react";
// import { Link } from "react-router-dom";

// const restaurants = [
//   {
//     id: 1,
//     name: "Gusto Italiano",
//     cuisine: "Итальянская",
//     rating: 4.8,
//     image: "/images/italian.jpg",
//     location: "ул. Солнечная, 12",
//   },
//   {
//     id: 2,
//     name: "Sushi Master",
//     cuisine: "Японская",
//     rating: 4.6,
//     image: "/images/sushi.jpg",
//     location: "пр-т Мира, 45",
//   },
//   {
//     id: 3,
//     name: "Борщ и Шашлык",
//     cuisine: "Русская/Грузинская",
//     rating: 4.7,
//     image: "/images/borsh.jpg",
//     location: "ул. Победы, 33",
//   },
// ];

// export default function Home() {
//   return (
//     <div className="page-container">
//       {/* Header Section */}
//       <header className="header">
//         <h1 className="title">Найди лучший ресторан рядом</h1>
//         <p className="subtitle">Читайте отзывы, просматривайте меню и бронируйте столики</p>
//       </header>

//       {/* Search Bar */}
//       <div className="search-bar">
//         <div className="search-input">
//           <svg className="search-icon" viewBox="0 0 24 24">
//             <path
//               fill="gray"
//               d="M10,2A8,8 0 0,1 18,10C18,12.21 17.21,14.21 15.83,15.67L21.71,21.59L20.29,23L14.41,17.12C12.95,18.5 10.95,19.29 8.75,19.29A8,8 0 1,1 10,2Z"
//             />
//           </svg>
//           <input type="text" placeholder="Введите название ресторана или кухню..." />
//         </div>
//       </div>

//       {/* Restaurant Cards */}
//       <section className="restaurant-list">
//         <h2 className="section-title">Популярные рестораны</h2>
//         <div className="card-grid">
//           {restaurants.map((res) => (
//             <div className="card" key={res.id}>
//               <img src={res.image} alt={res.name} className="card-img" />
//               <div className="card-content">
//                 <h3 className="card-title">{res.name}</h3>
//                 <p className="card-sub">{res.cuisine} • {res.location}</p>
//                 <p className="card-rating">⭐ {res.rating}</p>
//                 <div className="card-links">
//                   <Link to={`/menu/${res.id}`} className="card-link">Меню</Link>
//                   <Link to={`/reviews/${res.id}`} className="card-link">Отзывы</Link>
//                   <Link to={`/book/${res.id}`} className="card-link">Забронировать</Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         © {new Date().getFullYear()} Restaurant Review. Все права защищены.
//       </footer>
//     </div>
//   );
// }
