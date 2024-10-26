import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  // Loading data
  useEffect(() => {
    //Fetchind data from backend
    const fetchedData = async () => {
      try {
        const response = await fetch("https://quick-bite-server-38rl.onrender.com/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    // calling function
    fetchedData();
  }, []);

  // Filtering Items based on category and search query
  useEffect(() => {
    const filteredByCategory =
      selectedCategory === "all"
        ? menu
        : menu.filter((item) => item.category === selectedCategory);

    const filteredBySearch = filteredByCategory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredItems(filteredBySearch);
    setCurrentPage(1); // Reset to the first page
  }, [selectedCategory, searchQuery, menu]);

  //Handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering Items based on category
  const filterItems = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  //   Show all items
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  //   sorting bases on dropdown value
  const handleSort = (Option) => {
    setSortOption(Option);
    const sortedItems = [...filteredItems];

    //logic
    switch (Option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col">
      {/* Menu Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className=" md:py-20 flex flex-col  justify-center items-center gap-8">
          {/* Search bar */}
          <label className="input input-bordered flex items-center gap-2 rounded-full">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {/* text */}
          <div className="text-center space-y-8 px-2 ">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Dive into Delights Of Delectable{" "}
              <span className="text-green">Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] w-4/5 mx-auto">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            <Link to="/cart-page">
              <button className="btn rounded-full bg-green text-white  font-semibold my-4 px-8">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="section-container">
        {/* Filtering and Sorting */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center space-y-3 mb-8">
          {/* All category buttons */}
          <div className="flex justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("biryanis")}
              className={selectedCategory === "biryanis" ? "active" : ""}
            >
              Biryanis
            </button>
            <button
              onClick={() => filterItems("veg meals")}
              className={selectedCategory === "veg meals" ? "active" : ""}
            >
              Veg Meals
            </button>
            <button
              onClick={() => filterItems("non veg meals")}
              className={selectedCategory === "non veg meals" ? "active" : ""}
            >
              Non Veg Meals
            </button>
            <button
              onClick={() => filterItems("starters")}
              className={selectedCategory === "starters" ? "active" : ""}
            >
              Starters
            </button>
            <button
              onClick={() => filterItems("salads")}
              className={selectedCategory === "salads" ? "active" : ""}
            >
              Salads
            </button>
            <button
              onClick={() => filterItems("pizzas")}
              className={selectedCategory === "pizzas" ? "active" : ""}
            >
              Pizzas
            </button>
            <button
              onClick={() => filterItems("soups")}
              className={selectedCategory === "soups" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("desserts")}
              className={selectedCategory === "desserts" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("beverages")}
              className={selectedCategory === "beverages" ? "active" : ""}
            >
              Beverages
            </button>
          </div>

          {/* Sorting */}
          <div className="flex">
            <div className="p-2 bg-black text-white">
              <FaFilter />
            </div>

            <select
              name="sort"
              id="sort"
              onChange={(event) => handleSort(event.target.value)}
              value={sortOption}
              className="px-2 py-1 rounded-sm bg-black text-white"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-high">Low-to-High</option>
              <option value="high-low">High-to-Low</option>
            </select>
          </div>
        </div>

        {/* item Cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-3 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
