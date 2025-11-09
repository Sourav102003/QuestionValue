import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentManage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/apis/student/getall",
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
  }, []); // Empty dependency array to avoid infinite requests

  return (
    <>
      <section id="hero" className="hero section" style={{ background: "#fcfdff" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-12">
              <div className="hero-content text-center mt-3 mb-3">
                <h2 className="mb-4">Student List</h2>
                <div className="student-table-wrap">
                  <table className="table table-bordered table-striped student-table-desktop">
                    <thead>
                      <tr style={{ background: "#212529", color: "#fff" }}>
                        <th style={{ width: "60px" }}>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>CreatedAt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((el, index) => (
                          <tr key={el.id || index}>
                            <td>{index + 1}</td>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.phone}</td>
                            <td>{el.address}</td>
                            <td>
                              {new Date(el?.createdAt).toLocaleDateString()}{" "}
                              {new Date(el?.createdAt).toLocaleTimeString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center" }}>
                            No students found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="student-table-mobile">
                    {data.map((student, idx) => (
                      <div className="student-card" key={student.id || idx}>
                        <div className="student-card-header">
                          <b>
                            {idx + 1}. {student.name}
                          </b>
                        </div>
                        <div className="student-card-row">
                          <span>Email:</span> {student.email}
                        </div>
                        <div className="student-card-row">
                          <span>Phone:</span> {student.phone}
                        </div>
                        <div className="student-card-row">
                          <span>Address:</span> {student.address}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Total Students: {data.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .student-table-mobile {
          display: none;
        }
        @media (max-width: 600px) {
          .student-table-desktop {
            display: none;
          }
          .student-table-mobile {
            display: block;
          }
          .student-card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 10px #0001;
            margin: 10px auto;
            padding: 14px 18px;
            text-align: left;
            max-width: 430px;
          }
          .student-card-header {
            font-size: 1.13em;
            border-bottom: 1px solid #eee;
            margin-bottom: 7px;
            padding-bottom: 4px;
            color: #212529;
          }
          .student-card-row {
            font-size: 0.96em;
            margin-bottom: 4px;
          }
          .student-card-row span {
            font-weight: 600;
            min-width: 70px;
            display: inline-block;
            color: #01418e;
          }
        }
      `}</style>
    </>
  );
}
