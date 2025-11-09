import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Department() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      
      axios
        .post(
          "http://localhost:5000/apis/department/getall",
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
    <>
      <section id="hero" className="hero section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="hero-content text-center">
                <h1 className="hero-title" style={{ marginBottom: '2.3rem' }}>
                  Choose Your Department
                </h1>
                <div className="department-glass-list">
                  {data.map(dept => (
                    <Link
                        key={dept.name}
                        to={"/Year/"+dept.name}  
                        className="department-glass-block"
                      >
                        {dept.name}
                        <div className="department-code">{dept.name}</div>
                      </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
