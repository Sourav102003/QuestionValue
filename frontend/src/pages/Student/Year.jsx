import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Year() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();
  const params = useParams();

  useEffect(() => {
    const data = { department: params.id };
    axios
      .post(
        "http://localhost:5000/apis/year/getYearsByDepartment",
        data,
        {},
        { headers: { authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        console.log("data is ", res);
        setData(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err is", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="year-section">
      <div className="year-container">
        <div className="year-row">
          <div className="year-col">
            <div className="hero-content text-center">
              <h1 className="hero-title" style={{ marginBottom: "2.3rem" }}>
                Select Year for Computer Science and Engineering
              </h1>
              <div className="year-list">
                {data.map((year) => (
                  <Link key={year} to={"/Term/" + year} className="year-block">
                    {year}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
