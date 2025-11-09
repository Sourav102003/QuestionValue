import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function ExamType() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  useEffect(() => {
    const data = { name: params.id };
    axios
      .post(
        "http://localhost:5000/apis/exam/getexamByterm",
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
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="examtype-col">
            <div className="examtype-content text-center">
              <h1 className="hero-title" style={{ marginBottom: '2.3rem' }}>
                Select Exam Type for Term: 
              </h1>
              <div className="term-list">
                {data.map((exam) => (
                  <Link key={exam}
                   to={"/subject/"+exam} className="term-block">
                    {exam}
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
