import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GiConfirmed } from "react-icons/gi";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'

const ManageBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  //Handle Admin role
  const handleOrderConfirm = (booking) => {
    axiosSecure.patch(`/bookings/${booking._id}`).then((res) => {
      alert(`${booking.transactionId}'s order is confirmed`);
      refetch();
    });
  };

  //Handle delete item
  const handleDeleteBooking = (booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/bookings/${booking._id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage all <span className="text-green ">Menu Items</span>
      </h2>

      {/* menu items table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>User Email</th>
                <th>Transaction Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{booking.email}</td>
                  <td>{booking.transactionId}</td>
                  <td>{booking.price}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === "Order pending" ? (
                      <div className="text-center">
                        <button
                          onClick={() => handleOrderConfirm(booking)}
                          className="btn bg-green btn-xs text-white"
                        >
                          <GiConfirmed />
                        </button>
                      </div>
                    ) : (
                      "Confirmed"
                    )}
                  </td>
                  <td>
                    <button onClick={()=>handleDeleteBooking(booking)} className="btn btn-ghost btn-xs text-rose-600">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
