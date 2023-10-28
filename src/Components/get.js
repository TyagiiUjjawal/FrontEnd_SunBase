import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function CustomerList() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [error, setError] = useState(null);
  const red = () => {
    navigate("/create");
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("bearerToken");
      if (!token) {
        setError("Unauthorized. Token missing.");
        return;
      }
      try {
        const response = await axios.get(
          "https://sunbase-back.onrender.com/get-customer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomerData(response.data);
      } catch (error) {
        setError("Internal Server Error");
        console.error("Error getting customer:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      {error ? (
        <div style={styles.error}>Error: {error}</div>
      ) : customerData.length > 0 ? (
        <div style={styles.dataContainer}>
          <div style={styles.header}>
            <h2>Customer List</h2>
            <Link to="/create">
              {" "}
              <button style={styles.addButton}>Create Customer</button>
            </Link>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Street</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.street}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.state}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.loading}>Loading...</div>
      )}
    </div>
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
    marginBottom: "20px",
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

export default CustomerList;
