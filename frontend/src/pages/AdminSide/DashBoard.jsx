import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { toast } from "react-toastify";

export default function DashBoard() {
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalEnquiry, setTotalEnquiry] = useState(0);
  const [totalPaper, setTotalPaper] = useState(0);

  useEffect(() => {
    const headers = { authorization: sessionStorage.getItem("token") };
    axios
      .post("http://localhost:5000/apis/dashboard", {}, { headers })
      .then((res) => {
        if (res.data.success) {
          setTotalStudent(res.data.totalstudent); // Make sure keys match exactly your backend: totalstudent, totalenquiry, totalpaper
          setTotalEnquiry(res.data.totalenquiry);
          setTotalPaper(res.data.totalpaper);
        } else {
          toast.error(res.data.message || "Failed to load dashboard data");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Something went wrong while loading dashboard");
      });
  }, []);

  const metrics = [
    { value: totalStudent, suffix: "+", label: "Students" },
    { value: totalPaper, suffix: "+", label: "Papers" },
    { value: totalEnquiry, suffix: "+", label: "Enquiries" },
    { value: 24, suffix: "/7", label: "Customer Support" },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="metrics-section">
          <div className="row text-center">
            {metrics.map(({ value, suffix, label }, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="metric-card interactive">
                  <div className="metric-value">
                    <CountUp
                      end={value || 0}
                      duration={2}
                      decimals={value % 1 !== 0 ? 1 : 0}
                    />
                    {suffix}
                  </div>
                  <div className="metric-label">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
