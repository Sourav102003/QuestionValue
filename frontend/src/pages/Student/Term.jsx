import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Term() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  useEffect(() => {
    const data = { year: params.id };
    axios
      .post(
        "http://localhost:5000/apis/term/gettermByYears",
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
    <section className="term-section">
      <div className="term-container">
        <div className="term-row">
          <div className="term-col">
            <div className="hero-content text-center">
              <h1 className="hero-title" style={{ marginBottom: "2.3rem" }}>
                Select Term for Computer Science and Engineering 2024
              </h1>
              <div className="term-list">
                {data.map((term) => (
                  <Link key={term} to={"/Exam/"+term} className="term-block">
                    {"Term "+term}
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
