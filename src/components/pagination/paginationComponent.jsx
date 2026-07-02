import React from "react";

function Pagination({
  pageCount,
  forcePage,
  onPageChange,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 3,
}) {
  const current = forcePage;

  const createPageArray = () => {

  if (pageCount <= 1) return [1];

  const pages = [];

  // صفحات اولیه
  for (let i = 1; i <= Math.min(marginPagesDisplayed, pageCount); i++) {
    pages.push(i);
  }

  const start = Math.max(
    current - Math.floor(pageRangeDisplayed / 2),
    marginPagesDisplayed + 1
  );

  const end = Math.min(
    start + pageRangeDisplayed - 1,
    pageCount - marginPagesDisplayed
  );

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  for (
    let i = Math.max(pageCount - marginPagesDisplayed + 1, 1);
    i <= pageCount;
    i++
  ) {
    pages.push(i);
  }

  const unique = Array.from(new Set(pages)).sort((a, b) => a - b);

  const finalPages = [];

  for (let i = 0; i < unique.length; i++) {
  finalPages.push(unique[i]);

  if (unique[i + 1] && unique[i + 1] !== unique[i] + 1) {
    finalPages.push("...");
  }
}

  return finalPages;
};

  const pages = createPageArray();

  return (
    <div className="d-flex justify-content-center m-4 mb-5 gap-2">

      {/* قبلی */}
      <button
        className="btn btn-outline-primary"
        onClick={() => current > 1 && onPageChange(current - 1)}
      >
        قبلی
      </button>

      {/* صفحات */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="mx-2">…</span>
        ) : (
          <button
            key={index}
            className={`btn pb-0 ${
              current === page ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {/* بعدی */}
      <button
        className="btn btn-outline-primary"
        onClick={() => current < pageCount && onPageChange(current + 1)}
      >
        بعدی
      </button>
    </div>
  );
}



export default Pagination