import { FaSearch, FaTimes } from "react-icons/fa";
import "./search.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import dbHttpAddress from "../../dbHttpAddress";
import { Link, useLocation } from "react-router-dom";

function Search() {
  const [result, setResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const pageLocation = useLocation();

  const searchBoxRef = useRef();

  const searchInputRef = useRef();

  useEffect(() => {
    axios.get(`${dbHttpAddress}/products`).then((res) => setProducts(res.data));
  }, [searchInput]);

  useEffect(() => {
    if (searchInput.trim().length == 0) {
      setResult([]);
      setIsOpen(false);
      return;
    }

    setIsOpen(true);

    const filtered = products.filter((item) =>
      item.card_description.toLowerCase().includes(searchInput.toLowerCase()),
    );

    setResult(filtered);
  }, [searchInput, products]);

  useEffect(() => {
    if (!isOpen) {
      setResult([]);
    }
  }, [isOpen]);

  const closSearchResHandler = () => {
    setIsOpen(false);
    setSearchInput("");
    inputSearch.current.value = "";
    setResult([]);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setIsOpen(false);
        setResult([]);
        searchInputRef.current.value = "";
        setSearchInput("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setResult([]);
    searchInputRef.current.value = "";
    setSearchInput("");
  }, [pageLocation]);


  return (
    <>
      <div
        className="searchContainer d-flex justify-content-center"
        ref={searchBoxRef}
      >
        <div className="searchDiv">
          <input
            className="headerInput"
            placeholder="محصول مورد نظرتان را جستجو کنید"
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            ref={searchInputRef}
          />

          {isOpen ? (
            <div className="searchResDiv text-center showSearchResDiv pt-2">
              <div className="closeSearchResbtn" onClick={closSearchResHandler}>
                <FaTimes />
              </div>

              {result.length > 0 ? (
                result.map((item) => (
                  <div
                    key={item._id.$oid}
                    className="mb-2 border-bottom border-1 pt-2 border-black pb-5 pb-sm-2"
                  >
                    <div className="w-100 d-flex justify-content-center align-items-center row-cols-2">
                      <Link
                        to={`/products/${item.id.includes("P") ? "phones" : item.id.includes("lap") ? "laptops" : ""}/${item.id}`}
                        className="w-25 px-1"
                      >
                        <img
                          className="w-100 bg-white rounded"
                          src={item.thumbnail}
                          alt=""
                        />
                      </Link>
                      <div className="w-75 mx-2 text-start position-relative">
                        <Link
                          to={`/products/${item.id.includes("P") ? "phones" : item.id.includes("lap") ? "laptops" : ""}/${item.id}`}
                          className="text-decoration-none descriptionPar text-black"
                        >
                          <p>{item.card_description}</p>
                        </Link>
                        <p className="pricePar position-absolute cursorDefault">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="notFoundSearch d-flex justify-content-center align-items-center fs-4">
                  موردی یافت نشد!
                </p>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
