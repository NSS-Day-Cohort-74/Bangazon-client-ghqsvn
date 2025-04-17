import React, { useEffect } from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Link from "next/link";

const Reports = () => {
  const [reports, setReports] = React.useState([]);
  const auth =
    typeof window !== "undefined"
      ? `?token=${localStorage.getItem("token")}`
      : `?token=${localStorage.getItem("token")}`;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`http://localhost:8000/reports${auth}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Bangazon Reports</h1>
      <ul className="box">
        {reports.map((report) => (
          <li key={report.id} className="card p-4 m-2">
            <Link href={`${report.url}${auth}`}>{report.title}</Link>
          </li>
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
