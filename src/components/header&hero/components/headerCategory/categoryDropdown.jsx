import { useState, useEffect, useRef } from "react";
import "./categoryDropdown.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pageLocation = useLocation()

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false)
  } , [pageLocation])

  return (
    <div className="categoryContainer" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-decoration-none text-black headerCategoryBtn"
      >
        دسته بندی محصولات
        {isOpen ? <IoChevronUp className="ms-1 secColor" /> : <IoChevronDown className="ms-1 secColor" />}
      </button>

      <div className={`categoryDropdown ${isOpen ? 'categoryDropdownshow' : ''}`}>
        <div className="categories">
          <Link to='/products/laptops' className="text-decoration-none text-black">لبتاب</Link>
          <Link to='/products/phones' className="text-decoration-none text-black">موبایل</Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryDropdown;
