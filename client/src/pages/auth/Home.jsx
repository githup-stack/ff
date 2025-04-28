import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../components/Footer.js";
import sampleFoods from "../../data/sampleFoods.js";
import "../../full.css";

const Home = () => {
  const navigate = useNavigate();
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [featuredDrinks, setFeaturedDrinks] = useState([]);
  const [featuredDesserts, setFeaturedDesserts] = useState([]);

  useEffect(() => {
    // Lấy 4 món ăn ngẫu nhiên từ mỗi danh mục để hiển thị
    const foods = sampleFoods
      .filter((item) => item.category === "food")
      .slice(0, 4);
    const drinks = sampleFoods
      .filter((item) => item.category === "drink")
      .slice(0, 4);
    const desserts = sampleFoods
      .filter((item) => item.category === "dessert")
      .slice(0, 4);

    setFeaturedFoods(foods);
    setFeaturedDrinks(drinks);
    setFeaturedDesserts(desserts);
  }, []);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(
      (cartItem) =>
        cartItem.name === item.name && cartItem.category === item.category
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        name: item.name,
        price: item.price,
        quantity: 1,
        image: "/default-food.jpg",
        category: item.category,
        origin: item.origin,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-800/90 to-amber-600/90"></div>
        <img
          src="/hero-food.jpg"
          alt="Delicious Food"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Khám phá thế giới ẩm thực tuyệt vời
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90 font-light max-w-xl leading-relaxed">
              Những món ăn, đồ uống và tráng miệng ngon lành đang chờ bạn khám
              phá với nguyên liệu tươi ngon và hương vị đặc trưng
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/foods")}
                className="px-8 py-4 bg-white text-amber-700 rounded-full font-semibold shadow-lg hover:bg-amber-50 transition duration-300 border border-white/20"
              >
                Xem thực đơn
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold hover:bg-white/20 transition duration-300"
              >
                Giỏ hàng
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="luxury-header text-3xl sm:text-4xl">
                Món ăn{" "}
                <span className="luxury-header-accent-orange">đặc sắc</span>
              </h2>
              <p className="luxury-subtitle">
                Những món ăn được ưa chuộng nhất từ đầu bếp hàng đầu của chúng
                tôi
              </p>
            </div>

            <button
              onClick={() => navigate("/foods")}
              className="text-amber-600 font-semibold hover:text-amber-800 flex items-center group"
            >
              Xem tất cả
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredFoods.map((food, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="luxury-card"
                onClick={() => {
                  const realIdx = sampleFoods.findIndex(
                    (item) =>
                      item.name === food.name && item.category === "food"
                  );
                  navigate(`/foods/${realIdx}`);
                }}
              >
                <div className="luxury-image-container">
                  <img
                    src="/default-food.jpg"
                    alt={food.name}
                    className="luxury-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80";
                    }}
                  />
                  <div className="luxury-image-overlay"></div>
                  <div className="luxury-tag-orange">{food.origin}</div>
                </div>
                <div className="luxury-card-content">
                  <h3 className="luxury-product-name">{food.name}</h3>
                  <p className="luxury-product-desc">{food.description}</p>
                  <div className="luxury-card-footer">
                    <p className="luxury-price-orange">
                      {food.price.toLocaleString()} VNĐ
                    </p>
                    <button
                      className="luxury-button-orange"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(food);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Drinks Section */}
      <section className="py-20 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="luxury-header text-3xl sm:text-4xl">
                Đồ uống{" "}
                <span className="luxury-header-accent-blue">giải khát</span>
              </h2>
              <p className="luxury-subtitle">Thức uống tươi mát cho mỗi ngày</p>
            </div>

            <button
              onClick={() => navigate("/drinks")}
              className="text-blue-600 font-semibold hover:text-blue-800 flex items-center group"
            >
              Xem tất cả
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDrinks.map((drink, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="luxury-card"
                onClick={() => {
                  const realIdx = sampleFoods.findIndex(
                    (item) =>
                      item.name === drink.name && item.category === "drink"
                  );
                  navigate(`/foods/${realIdx}`);
                }}
              >
                <div className="luxury-image-container">
                  <img
                    src="/default-food.jpg"
                    alt={drink.name}
                    className="luxury-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
                    }}
                  />
                  <div className="luxury-image-overlay"></div>
                  <div className="luxury-tag-blue">{drink.origin}</div>
                </div>
                <div className="luxury-card-content">
                  <h3 className="luxury-product-name">{drink.name}</h3>
                  <p className="luxury-product-desc">{drink.description}</p>
                  <div className="luxury-card-footer">
                    <p className="luxury-price-blue">
                      {drink.price.toLocaleString()} VNĐ
                    </p>
                    <button
                      className="luxury-button-blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(drink);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Desserts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="luxury-header text-3xl sm:text-4xl">
                Tráng miệng{" "}
                <span className="luxury-header-accent-pink">ngọt ngào</span>
              </h2>
              <p className="luxury-subtitle">
                Kết thúc bữa ăn với hương vị tuyệt hảo
              </p>
            </div>

            <button
              onClick={() => navigate("/desserts")}
              className="text-pink-600 font-semibold hover:text-pink-800 flex items-center group"
            >
              Xem tất cả
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDesserts.map((dessert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="luxury-card"
                onClick={() => {
                  const realIdx = sampleFoods.findIndex(
                    (item) =>
                      item.name === dessert.name && item.category === "dessert"
                  );
                  navigate(`/foods/${realIdx}`);
                }}
              >
                <div className="luxury-image-container">
                  <img
                    src="/default-food.jpg"
                    alt={dessert.name}
                    className="luxury-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";
                    }}
                  />
                  <div className="luxury-image-overlay"></div>
                  <div className="luxury-tag-pink">{dessert.origin}</div>
                </div>
                <div className="luxury-card-content">
                  <h3 className="luxury-product-name">{dessert.name}</h3>
                  <p className="luxury-product-desc">{dessert.description}</p>
                  <div className="luxury-card-footer">
                    <p className="luxury-price-pink">
                      {dessert.price.toLocaleString()} VNĐ
                    </p>
                    <button
                      className="luxury-button-pink"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(dessert);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Đặt hàng ngay hôm nay!
              </h2>
              <p className="text-white/90 text-lg">
                Thưởng thức ẩm thực tuyệt vời với các món ăn đặc biệt được chế
                biến bởi đầu bếp hàng đầu
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/foods")}
                className="px-8 py-4 bg-white text-amber-700 rounded-full font-semibold shadow-lg hover:bg-amber-50 transition duration-300 border border-amber-300/20"
              >
                Xem thực đơn
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold hover:bg-white/30 transition duration-300"
              >
                Giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
