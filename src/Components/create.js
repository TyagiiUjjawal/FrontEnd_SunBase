import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const containerStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

const labelStyle = {
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

function App() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("bearerToken");

    if (!token) {
      setError("Unauthorized. Token missing.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/create-customer",
        {
          token,
          data: {
            ...data,
            token: token,
          },
        }
      );
      setResponse(response.data);
      setError(null);
    } catch (error) {
      setError(error.response.data);
      setResponse(null);
    }
  };

  return (
    <>
      <div style={containerStyle}>
        <h1>Create Customer</h1>
        <form>
          <div>
            <label style={labelStyle} htmlFor="first_name">
              First Name:
            </label>
            <input
              type="text"
              name="first_name"
              value={data.first_name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="last_name">
              LAST Name:
            </label>
            <input
              type="text"
              name="last_name"
              value={data.last_name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <button onClick={handleSubmit} style={buttonStyle}>
            Create Customer
          </button>
        </form>
        {response && (
          <div>
            <h2>Response</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
        {error && (
          <div>
            <h2>Error</h2>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div style={styles.header}>
        <Link to="/get">
          {" "}
          <button style={styles.addButton}>Display Customer's</button>
        </Link>
      </div>
    </>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  addButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    border: "2px solid red",
    padding: "10px",
    color: "red",
    textAlign: "center",
    borderRadius: "5px",
    background: "#ffe6e6",
    width: "300px",
    margin: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    marginBottom: "10px",
  },
  dataContainer: {
    marginTop: "50px",
    border: "2px solid #ccc",
    padding: "20px",
    borderRadius: "5px",
    width: "80%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  loading: {
    textAlign: "center",
  },
};

export default App;
