import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-tickets");
      return res.data;
    },
  });
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return [
      createdAtDate.toLocaleDateString(),
      "  ",
      createdAtDate.toLocaleTimeString(),
    ];
  };

  //Update status of ticket
  const handleUpdateStatus = (ticket) => {
    axiosSecure.patch(`/all-tickets/${ticket._id}`).then((res) => {
      alert(`${ticket._id}'s status updated!`);
      refetch();
    });
  };

  //Delete Query 
  const handleDeleteQuery = (ticket) => {
    axiosSecure.delete(`/all-tickets/${ticket._id}`).then(res => {
      alert(`${ticket._id}'s query is deleted`)
      refetch()
    })
  }

  return (
    <div className="section-container pt-5 md:pt-5">
      <h2 className="text-2xl font-semibold my-4">
        Manage all <span className="text-green ">Tickets</span>
      </h2>
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="card bg-base-100  shadow-xl md:3/4 mx-auto my-5"
        >
          <div className="card-body">
              <h2 className="card-title">Id : <span className="text-indigo-800">{ticket._id}</span> </h2>
            <div className="flex justify-between ">
              <h2 ><span className="font-semibold">Email :</span><span className="text-rose-600">{ticket.email}</span></h2>
              <div className="flex gap-4">
                {ticket.isSolved ? (
                  <button
                    onClick={() => handleUpdateStatus(ticket)}
                    className="btn btn-xs bg-green text-white"
                  >
                    Solved
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(ticket)}
                    className="btn btn-xs bg-orange-400 text-white"
                  >
                    Solve
                  </button>
                )}
                <button
                  onClick={() => handleDeleteQuery(ticket)}
                  className="btn btn-xs bg-red text-white"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <p><span className="font-semibold">Issue : </span>{ticket.queryText}</p>
            <div className="card-actions justify-between items-center md:gap-80">
              <h5 className=" text-gray-500">
                Raised at {formatDate(ticket.createdAt)}
              </h5>
              {/* <button className="btn btn-primary">Buy Now</button> */}
              {ticket.isSolved ? (
                <button className="btn disabled font-semibold">
                  Status : <span className="text-green">Solved</span>
                </button>
              ) : (
                <button className="btn disabled font-semibold">
                  Status : <span className="text-orange-500">In progress</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTickets;
