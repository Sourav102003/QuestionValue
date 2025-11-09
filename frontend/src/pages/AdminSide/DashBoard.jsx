import React from "react";
import CountUp from "react-countup";

export default function DashBoard() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="metrics-section">
          <div className="row text-center">
            {[
              { value: 480, suffix: "+", label: "Successful Projects" },
              { value: 99.8, suffix: "%", label: "Customer Satisfaction" },
              { value: 65, suffix: "+", label: "Team Members" },
              { value: 24, suffix: "/7", label: "Customer Support" },
            ].map(({ value, suffix, label }, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="metric-card interactive">
                  <div className="metric-value">
                    <CountUp end={value} duration={2} decimals={value % 1 !== 0 ? 1 : 0} />
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
