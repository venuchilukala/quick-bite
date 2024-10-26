import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  //Calculate Price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  //Handle Increase button
  const handleIncrease = (item) => {
    fetch(`https://quick-bite-server-38rl.onrender.com/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (item._id === cartItem._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });

        setCartItems(updatedCart);
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
    // Refetch the updated cart data
    refetch();
  };

  //Handle decrease button
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`https://quick-bite-server-38rl.onrender.com/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (item._id === cartItem._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });

          setCartItems(updatedCart);
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
        });
      // Refetch the updated cart data
      refetch();
    } else {
      alert("Item can't be less than zero");
    }
  };

  //Handle delete item button
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://quick-bite-server-38rl.onrender.com/carts/${item._id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success",
              });
            }
            refetch();
          });
      }
    });
  };

  const orderSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  return (
    <div className="section-container">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="md:py-28 flex flex-col justify-between items-center gap-8">
          {/* text */}
          <div className="space-y-8 px-2">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added To The <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* cart item table */}
      {cart.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-green text-white font-md">
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {/* row items */}
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </td>
                    <th>{item.name}</th>
                    <td>
                      <div>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-8 mx-2 text-center overflow-hidden appearance-none"
                          onChange={() => console.log(null)}
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>&#8377;{calculatePrice(item)}</td>
                    <td>
                      <button
                        className="btn btn-ghost text-rose-600 btn-xs"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer details and Shop details */}
          <div className="my-12 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-semibold">Customer Details</h3>
              <p>Name : {user.displayName}</p>
              <p>Email : {user.email}</p>
              <p> user_id : {user.uid}</p>
            </div>
            {/* Cart Details */}
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-semibold">Cart Details</h3>
              <p>Total Items : {cart.length}</p>
              <p>Total Price : &#8377;{orderSubTotal.toFixed(2)}</p>
              <Link to="/process-checkout">
                <button className="btn bg-green text-white">
                  Proceed Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
