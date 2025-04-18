import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Link from "next/link";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [customers, setCustomers] = useState([]);

  const getAuthParam = (url = "") => {
    const prefix = url.includes("?") ? "&" : "?";
    const token = localStorage.getItem("token");
    if (url.includes("customer")) {
      return token ? `1${prefix}token=${token}` : "";
    }
    return token ? `${prefix}token=${token}` : "";
  };
  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchData(`http://localhost:8000/reports${getAuthParam()}`, setReports);
  }, []);

  return (
    <div className="container">
      <h1 className="title has-text-centered mt-5">Bangazon Reports</h1>
      <ul className="box">
        {reports.map(({ id, url, title }) => (
          <div key={id} className="mb-4">
            {!url.includes("customer=") ? (
              <li className="card p-4 m-2">
                <Link href={`${url}${getAuthParam(url)}`}>
                  <button className="button is-secondary is-fullwidth">
                    {title}
                  </button>
                </Link>
              </li>
            ) : (
              <div className="card p-4 m-2">
                <div
                  className="dropdown is-hoverable"
                  style={{ width: "100%" }}
                >
                  <div className="dropdown-trigger" style={{ width: "100%" }}>
                    <button
                      className="button is-secondary"
                      style={{ width: "100%" }}
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    >
                      {title}
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content p-3">
                      <label className="label">Customer ID:</label>
                      <input
                        type="number"
                        className="input is-small mb-2"
                        placeholder="Enter Customer ID"
                      />
                      <button
                        className="button is-link is-secondary is-fullwidth"
                        onClick={({
                          target: {
                            previousSibling: { value },
                          },
                        }) => {
                          if (value)
                            window.location.href = `${url}${value}${getAuthParam(
                              url
                            )}`;
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

Reports.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  );
};
export default Reports;

