import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/tickets", data);
      alert("Query submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="section-container pt-20 md:pt-28">
      <div className="w-full max-w-lg mx-auto my-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">Contact us</h2>
          <Link to="/queries">
            <button className="btn btn-info text-white">View Tickets</button>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user.displayName}
              {...register("example")}
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              {...register("email")}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Feedback Field */}
          <div className="form-control">
            <label className="label" htmlFor="feedback">
              <span className="label-text">Your Query Here</span>
            </label>
            <textarea
              name="queryText"
              {...register("queryText")}
              placeholder="Enter your feedback"
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
