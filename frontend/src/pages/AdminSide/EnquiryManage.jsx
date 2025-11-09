import { useEffect, useState } from "react";
import axios from "axios";

export default function EnquiryManage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios
      .post("http://localhost:5000/apis/enquiry/getall",{})
      .then((res) => {
        console.log("data is ", res);
        setData(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err is", err);
        setLoading(false);
      });
  }, []); // empty dependency array avoids infinite calls

  return (
    <>
      <section
        id="hero"
        className="hero section"
        style={{ background: "#fcfdff" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-12">
              <div className="hero-content text-center mt-3 mb-3">
                <h2 className="mb-4">Enquiries</h2>
                <div className="enquiry-table-wrap">
                  <table className="table table-bordered table-striped enquiry-table-desktop">
                    <thead>
                      <tr style={{ background: "#343a40", color: "#fff" }}>
                        <th style={{ width: "60px" }}>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>CreatedAT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((el, index) => (
                          <tr key={el.id || index}>
                            <td>{index + 1}</td>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.contact}</td>
                            <td>{el.message}</td>
                            <td>
                              {new Date(el?.createdAt).toLocaleDateString()}{" "}
                              {new Date(el?.createdAt).toLocaleTimeString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center" }}>
                            No enquiries found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="enquiry-table-mobile">
                    {data.map((enquiry, idx) => (
                      <div className="enquiry-card" key={enquiry.id || idx}>
                        <div className="enquiry-card-header">
                          <b>
                            {idx + 1}. {enquiry.name}
                          </b>
                        </div>
                        <div className="enquiry-card-row">
                          <span>Email:</span> {enquiry.email}
                        </div>
                        <div className="enquiry-card-row">
                          <span>Phone:</span> {enquiry.phone || enquiry.contact}
                        </div>
                        <div className="enquiry-card-row">
                          <span>Message:</span> {enquiry.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Total enquiries: {data.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .enquiry-table-mobile {
          display: none;
        }
        @media (max-width: 600px) {
          .enquiry-table-desktop {
            display: none;
          }
          .enquiry-table-mobile {
            display: block;
          }
          .enquiry-card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 10px #0001;
            margin: 10px auto;
            padding: 14px 18px;
            text-align: left;
            max-width: 430px;
          }
          .enquiry-card-header {
            font-size: 1.13em;
            border-bottom: 1px solid #eee;
            margin-bottom: 7px;
            padding-bottom: 4px;
            color: #212529;
          }
          .enquiry-card-row {
            font-size: 0.96em;
            margin-bottom: 4px;
          }
          .enquiry-card-row span {
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
