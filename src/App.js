import React, { useState, useEffect } from "react";
import "./App.css";
import { API_URL } from "./config";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data)
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };


  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const displayedProjects = projects?.slice(startIndex, endIndex);

  // Pagination logic
  const totalPages = Math.ceil(projects?.length / recordsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // console.log(displayedProjects)
  return (
    <div className="app-container">
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {displayedProjects?.length > 0 && displayedProjects?.map((project, index) => {
            console.log(project)
            return (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>{Math.round(project["percentage.funded"])}</td>
                <td>{project["amt.pledged"]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "disabled" : ""}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
