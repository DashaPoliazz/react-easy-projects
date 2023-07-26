import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Collection } from "./components/Collection";
import "./styles/index.scss";
import { fakeResponse } from "./api/data";
import { ICategory, ICollection, IResponse } from "./types/Data";

const itemsPerPage = 6;

function App() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fakeResponse<IResponse>(2000)
      .then((data) => {
        setCategories(data.categories);
        setCollections(data.collections);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  const handleClickCategory = (idx: number) => {
    setActiveCategory(idx);
    setCurrentPage(1); // Reset to the first page when changing categories
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  // Use useMemo to filter collections only when categories, filter, or activeCategory changes
  const filteredCollections = useMemo(() => {
    return collections
      .filter((collection) =>
        collection.name.toUpperCase().includes(filter.toUpperCase())
      )
      .filter((collection) => {
        if (activeCategory === 0) {
          return collection;
        }
        return collection.category === activeCategory;
      });
  }, [collections, filter, activeCategory]);

  // Calculate the total number of pages based on the number of filtered elements
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);

  // Get the elements for the current page
  const currentItems = filteredCollections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        {isLoading ? (
          "Loading..."
        ) : (
          <ul className="tags">
            {categories.map((category, idx) => (
              <li
                onClick={() => handleClickCategory(idx)}
                key={category.name}
                className={activeCategory === idx ? "active" : ""}
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
        <input
          value={filter}
          onChange={handleFilterChange}
          className="search-input"
          placeholder="Search by name..."
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            {currentItems.map(({ category, name, photos }) => (
              <Collection key={name} images={photos} name={name} />
            ))}
          </>
        )}
      </div>
      <ul className="pagination">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <li
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? "active" : ""}
            key={idx}
          >
            {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
