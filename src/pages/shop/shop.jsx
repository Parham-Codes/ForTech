import "./shop.css";
import { Accordion, Col, Row } from "react-bootstrap";
import FilterRange from "../../components/shopFilterRange/range";
import { useEffect, useState } from "react";
import axios from "axios";
import DbHttpAddress from "../../dbHttpAddress";
import ProductCard from "../../components/productCard/productCard";
import SkeletonLoading from "../../components/skeletonLoading/skeletonLoading";
import Pagination from "../../components/pagination/paginationComponent";
import { useLocation } from "react-router-dom";

function Shop() {
  const pageLocation = useLocation().pathname;

  // -----------------------------------------
  // Local dummy loading counters for skeletons
  // -----------------------------------------
  const loadCount = [1, 2, 3, 4, 5, 6, 7, 8];

  // -----------------------------------------
  // Main states for products, loading, brands , and stocks
  // -----------------------------------------
  let [products, setProducts] = useState([]);
  let [isLoaded, setIsLoaded] = useState(false);
  let [brands, setBrands] = useState([]);
  let [inStockOnly, setInStockOnly] = useState(false);
  let [selectedBrands, setSelectedBrands] = useState([]);
  let [currentCategory, setCurrentCategory] = useState([]);
  let [isFilterOpen, setIsFilterOpen] = useState(false);

  // -----------------------------------------
  // Fetch products from backend API
  // -----------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${DbHttpAddress}/products`);

        setProducts(response.data);

        const uniqueBrands = [
          ...new Set(response.data.map((item) => item.brand)),
        ];
        ``;

        setBrands(uniqueBrands);
        setIsLoaded(true);
      } catch (error) {
        console.log("Error fetching products : ", error);
        setIsLoaded(false);
      }
    };

    fetchProducts();
  }, []);

  // -----------------------------------------
  // Determine max price based on loaded products
  // -----------------------------------------
  let [max, setMax] = useState(0);

  useEffect(() => {
    if (pageLocation == "/products") {
      setCurrentCategory(products);
    }
    if (pageLocation == "/products/phones") {
      const filteringCategory = products.filter((item) => {
        return item.id.includes("P");
      });

      setCurrentCategory(filteringCategory);
    }
    if (pageLocation == "/products/laptops") {
      const filteringCategory = products.filter((item) => {
        return item.id.includes("lap");
      });

      setCurrentCategory(filteringCategory);
    }

    setPage(1);
  }, [products, pageLocation]);

  useEffect(() => {
    if (!currentCategory.length) return;

    let localMax = 0;

    for (const item of currentCategory) {
      let price = Number(item.price);
      if (price > localMax) localMax = item.price;
    }

    setMax(localMax);
    setPriceRange([0, localMax]);
  }, [currentCategory]);

  // -----------------------------------------
  // Price range state
  // -----------------------------------------
  const [priceRange, setPriceRange] = useState([0, max]);

  // -----------------------------------------
  // Pagination state
  // -----------------------------------------
  const [page, setPage] = useState(1);

  // Reset page to 1 when price filter changes
  const priceFilterHandler = (value) => {
    setPriceRange(value);
    setPage(1);
  };

  // -----------------------------------------
  // Apply filter to products
  // -----------------------------------------
  const filteredProducts = currentCategory
    .filter((item) => {
      const price = Number(item.price);
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .filter((item) => !inStockOnly || item.in_stock === true)
    .filter(
      (item) =>
        selectedBrands.length === 0 || selectedBrands.includes(item.brand),
    );

  // -----------------------------------------
  // Pagination calculations
  // -----------------------------------------
  const itemsPerPage = 8;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = filteredProducts.slice(start, end);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Ensure current page is valid after filtering
  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount || 1);
    }
  }, [pageCount]);

  //------------------------------------------
  // Brand Filter
  // -----------------------------------------
  const handleBrandChange = (brandName) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandName)) {
        return prev.filter((b) => b !== brandName);
      } else {
        return [...prev, brandName];
      }
    });

    setPage(1);
  };

  //------------------------------------------
  // Filter toggle
  // -----------------------------------------
  const filterToggleHandler = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  //------------------------------------------
  // RENDER
  // -----------------------------------------
  return (
    <Row className="shopContainer Mycontainer mb-5 mt-3 mt-xl-5 d-flex justify-content-between align-items-start  w-100">
      {/* -----------------------------------------
          Right Sidebar Filters
      ------------------------------------------- */}
      <Col
        xs={11}
        lg={8}
        xl={3}
        className="shopFilterContainer mx-auto mx-xl-0 mb-2 sticky-lg-top mt-0"
      >
        <div
          className="border p-3 text-center bg-white rounded cursorPointer d-xl-none"
          onClick={filterToggleHandler}
        >
          فیلتر ها
        </div>
        <Accordion
          className={`d-xl-block ${isFilterOpen ? "d-block" : "d-none"}`}
          defaultActiveKey={["0"]}
        >
          {/* Filter by price */}
          <Accordion.Item
            eventKey="0"
            className="border rounded-3 my-2 overflow-hidden"
          >
            <Accordion.Header className="fw-bold text-primary">
              فیلتر بر اساس قیمت
            </Accordion.Header>

            <Accordion.Body className="bg-light">
              <div className="p-4">
                <FilterRange min={0} max={max} onChange={priceFilterHandler} />
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Filter by brand */}
          <Accordion.Item
            eventKey="1"
            className="border rounded-3 my-2 overflow-hidden"
          >
            <Accordion.Header className="fw-bold text-primary">
              فیلتر بر اساس برند
            </Accordion.Header>

            <Accordion.Body className="bg-light">
              <div className="p-4">
                {brands.length > 0 ? (
                  brands.map((brand, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-start align-items-center my-2"
                    >
                      <input
                        type="checkbox"
                        className="form-check"
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                      <label htmlFor={brand} className="ms-2">
                        {brand}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>در حال بارگذاری...</p>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Filter by availability */}
          <Accordion.Item
            eventKey="2"
            className="border rounded-3 my-2 overflow-hidden"
          >
            <Accordion.Header className="fw-bold text-primary">
              فیلتر محصولات موجود
            </Accordion.Header>

            <Accordion.Body className="bg-light">
              <div className="p-3 d-flex justify-content-start align-items-center">
                <p className="m-0 me-2">فقط موجودها</p>
                <input
                  className="form-check"
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => {
                    setInStockOnly(!inStockOnly);
                    setPage(1);
                  }}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>

      {/* -----------------------------------------
          Right Side: Products List + Pagination
      ------------------------------------------- */}
      <Col xs={12} xl={9} className="shopProductContainer p-0 h-100">
        <div className="bg-white border px-3 pb-2 rounded rounded-3">
          {/* Top Bar */}
          <div
            className="d-flex justify-content-between align-items-center pBgGray my-4 rounded rounded-3"
            style={{ height: "50px" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <p style={{ margin: "0 20px" }}>تمام محصولات</p>
            </div>

            <div className="h-100 d-flex justify-content-center align-items-center">
              <p style={{ margin: "0 20px" }}>
                {filteredProducts.length} محصول
              </p>
            </div>
          </div>

          {/* Products + Loading + Empty State */}
          <div className="mx-auto">
            <Row xs={1} sm={2} md={3} lg={4} className="w-100 g-2 mx-auto pb-4">
              {!isLoaded ? (
                loadCount.map((item) => <SkeletonLoading key={item} />)
              ) : (
                <>
                  {currentProducts.length === 0 ? (
                    <div className="text-center py-5 fs-5 fw-semibold opacity-75 w-100">
                      موردی یافت نشد
                    </div>
                  ) : (
                    currentProducts.map((item) => (
                      <Col key={item._id.$oid}>
                        <ProductCard productData={item} />
                      </Col>
                    ))
                  )}
                </>
              )}
            </Row>
          </div>
          {/* Pagination */}
          <Pagination
            pageCount={pageCount}
            forcePage={page}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </div>
      </Col>
    </Row>
  );
}

export default Shop;
