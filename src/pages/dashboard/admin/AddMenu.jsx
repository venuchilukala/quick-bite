import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  //image hosting
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseInt(data.price),
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
      };
      const postMenuItem = axiosSecure.post('/menu', menuItem)
      if(postMenuItem){
        reset()
        Swal.fire({
          icon: 'success',
          title: 'Item added to menu successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload a New <span className="text-green ">Menu Item</span>
      </h2>

      {/* Form  */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st row */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe name"
              className="input input-bordered w-full "
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
              >
                <option disabled defaultValue="default">
                  Select a category
                </option>
                <option value="main course">Main course</option>
                <option value="biryanis">Biryani</option>
                <option value="veg meals">Veg meal</option>
                <option value="non veg meals">Non-veg meal</option>
                <option value="starters">Starter</option>
                <option value="salads">Salad</option>
                <option value="pizzas">Pizza</option>
                <option value="soups">Soup</option>
                <option value="desserts">Dessert</option>
                <option value="beverages">Beverage</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Describe your recipe"
              {...register("recipe", { required: true })}
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
              required
            />
          </div>
          <button className="btn bg-green text-white px-6">
            {" "}
            Add Item
            <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
