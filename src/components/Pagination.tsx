import { Page } from "./types";

export const Pagination = ( props: Page ) => {

    const {activePage, count, rowsPerPage, totalPages, setActivePage} = props;
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
  
    return (
      <div>
        <div className="pagination">
            <button disabled={activePage === 1} onClick={() => setActivePage(1)} className="cta-btn">
              ⏮️ First
            </button>
            <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)} className="cta-btn">
              ⬅️ Previous
            </button>
            <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)} className="cta-btn">
              Next ➡️
            </button>
            <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)} className="cta-btn">
              Last ⏭️
            </button>
        </div>  
          <h5>
            Page: {activePage} of {totalPages}, Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
          </h5>
      </div>
    );
  }
  