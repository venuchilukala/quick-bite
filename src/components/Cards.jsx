import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";

const Cards = (props) => {
  const { item } = props;
  const { _id, name, recipe, image, category, price } = item;

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart()

  const location = useLocation();
  const navigate = useNavigate();

  //Add to cart Button
  const handleAddtoCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      fetch("https://quick-bite-server-1.onrender.com/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.menuItemId) {
            Swal.fire({
              icon: "success",
              title: "Item Added to the Cart",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Item Already in the Cart!",
            });
          }
          refetch()
        });
    } else {
      Swal.fire({
        title: "Login Required?",
        text: "Without login you can't add items to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  //Add to Favourite button
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5"  >
      <div
        className={`rating gap-1 absolute p-4 right-2 top-2 heartStar bg-green z-10 ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <div >
        <figure>
          <img
            src={image}
            alt={name}
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </div>
      <div className="card-body">
        <div >
          <h2 className="card-title">{name}</h2>
        </div>
        <p>{recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold flex gap-2">
            <span className="text-sm text-red">₹</span>
            {price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
