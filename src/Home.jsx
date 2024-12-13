import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // Number of rows per page

    // Calculate indices
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = data.slice(indexOfFirstRow, indexOfLastRow);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleSave = () => {
    setData(
      data.map((item) =>
        item.id == editingId ? { ...item, title: editTitle } : item
      )
    );
    setEditingId(null);
    setEditTitle("");
  };


  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center px-5 mt-3">
        <h1 className="">Details</h1>
        <table className="table table-borderd shadow">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td>
                  <button className="btn" onClick={() => handleDelete(item.id)}>
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#cc1414" }}
                    />
                  </button>
                </td>

                <td>
                  {editingId === item.id ? (
                    <button onClick={handleSave} className="btn btn-success">
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditTitle(item.title);
                      }}
                      className="btn"
                    >
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "#1e488f" }}
                      />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
               <i class="fa-solid fa-angles-left"></i>
            </button>
            <span> Page {currentPage} of {Math.ceil(data.length / rowsPerPage)} </span>
            <button
                disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                <i class="fa-solid fa-angles-right"></i>
            </button>
        </div>

      </div>
    </>
  );
}

export default Home;
