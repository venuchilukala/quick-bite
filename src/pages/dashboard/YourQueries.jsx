import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const YourQueries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: queries = [], refetch } = useQuery({
    queryKey: ["queries"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?email=${user.email}`);
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

  return (
    <div className="section-container pt-20 md:pt-24">
      <div className="flex justify-around">
      <h2 className="text-2xl font-semibold mb-4">Your Queries </h2>
      <Link to='/contact'><button className="btn bg-rose-400 text-white">Raise new tickets</button></Link>
      </div>
      {queries.map((query, index) => (
        <div
          key={index}
          className="card bg-base-100 md:w-3/4 shadow-xl w-full mx-auto my-5"
        >
          <div className="card-body">
          <h2 className="card-title">Id : <span className="text-indigo-800">{query._id}</span> </h2>
          <h2 ><span className="font-semibold">Email :</span><span className="text-rose-600">{query.email}</span></h2>
          <p><span className="font-semibold">Issue : </span>{query.queryText}</p>
            <div className="card-actions justify-between items-center">
              <h5 className="text-gray-500">
                Raised at {formatDate(query.createdAt)}
              </h5>
              {/* <button className="btn btn-primary">Buy Now</button> */}
              {query.isSolved ? (
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

export default YourQueries;
