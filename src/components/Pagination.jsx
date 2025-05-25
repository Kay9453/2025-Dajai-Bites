import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Pagination({ pageInfo, handlePageChange }) {
  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination mt-3">
          <li className={`page-item ${!pageInfo.has_pre && "disabled"}`}>
            <Link
              onClick={() => {
                handlePageChange(pageInfo.current_page - 1);
              }}
              className="page-link"
              href="#"
            >
              上一頁
            </Link>
          </li>
          {Array.from({ length: pageInfo.total_pages }).map((_, index) => (
            <li
              className={`page-item ${
                pageInfo.current_page === index + 1 && "active"
              }`}
              key={index + 1}
            >
              <Link
                onClick={() => {
                  handlePageChange(index + 1);
                }}
                className="page-link"
                href="#"
              >
                {index + 1}
              </Link>
            </li>
          ))}

          <li className={`page-item ${!pageInfo.has_next && "disabled"}`}>
            <Link
              onClick={() => {
                handlePageChange(pageInfo.current_page + 1);
              }}
              className="page-link"
              href="#"
            >
              下一頁
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

Pagination.propTypes = {
  pageInfo: PropTypes.object.isRequired, 
  handlePageChange: PropTypes.func.isRequired
}

