import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Library() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const requestData = { department: params.id };
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/apis/library/getLibraryByDepartment",
        requestData,
        { headers: { authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        setData(res?.data?.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params.id]);

  const downloadSubjectFile = async (imageUrl, subjectName = "file") => {
    try {
      const response = await axios.post(
        "http://localhost:5000/apis/library/download",
        { url: imageUrl },
        {
          responseType: "blob",
          headers: { authorization: sessionStorage.getItem("token") },
        }
      );

      const contentType = response.headers["content-type"];
      if (contentType && contentType.includes("application/json")) {
        // Download API returned an error JSON instead of the file
        const reader = new FileReader();
        reader.onload = () => {
          alert("Download failed: " + reader.result);
        };
        reader.readAsText(response.data);
        return;
      }

      let fileExtension = "";
      if (contentType.includes("pdf")) fileExtension = "pdf";
      else if (contentType.includes("jpeg")) fileExtension = "jpg";
      else if (contentType.includes("png")) fileExtension = "png";

      const blob = new Blob([response.data], { type: contentType });
      const fileName = fileExtension ? `${subjectName}.${fileExtension}` : subjectName;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  };

  return (
    <>
      <section id="hero" className="hero section" style={{ background: "#fcfdff" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-12">
              <div className="hero-content text-center mt-3 mb-3">
                <h2 className="mb-4">Library List</h2>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="student-table-wrap">
                    <table className="table table-bordered table-striped student-table-desktop">
                      <thead>
                        <tr style={{ background: "#212529", color: "#fff" }}>
                          <th style={{ width: "60px" }}>#</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Image</th>
                          
                          <th>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0 ? (
                          data.map((el, index) => (
                            <tr key={el._id || index}>
                              <td>{index + 1}</td>
                              <td>{el.name}</td>
                              <td>{el.department}</td>
                              <td>
                                {el.image ? (
                                  <img
                                    src={el.image}
                                    alt={el.name}
                                    width={70}
                                    style={{
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 8px #ddd",
                                      border: "2px solid #eee",
                                    }}
                                  />
                                ) : (
                                  "No image"
                                )}
                              </td>
                             
                              <td>
                                {el.image ? (
                                  <button
                                    className="icon-download-btn"
                                    onClick={() => downloadSubjectFile(el.image, el.name)}
                                    title="Download"
                                    aria-label="Download"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="22"
                                      width="22"
                                      viewBox="0 0 24 24"
                                      style={{
                                        verticalAlign: "middle",
                                        filter: "drop-shadow(0 2px 4px #228be6aa)",
                                      }}
                                      fill="#228be6"
                                    >
                                      <path d="M5 20h14v-2H5v2zm7-18c-1.1 0-2 .9-2 2v8.17l-3.59-3.58L5 11l7 7 7-7-1.41-1.41L13 12.17V4c0-1.1-.9-2-2-2z"/>
                                    </svg>
                                  </button>
                                ) : (
                                  <span style={{ color: "#ccc" }}>Unavailable</span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                              No library items found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="student-table-mobile">
                      {data.map((student, idx) => (
                        <div className="student-card" key={student._id || idx}>
                          <div className="student-card-header">
                            <b>
                              {idx + 1}. {student.name}
                            </b>
                          </div>
                          <div className="student-card-row">
                            <span>department:</span> {student.department}
                          </div>
                          <div className="student-card-row">
                            <span>image:</span> {student.image ? (
                              <img
                                src={student.image}
                                alt={student.name}
                                width={70}
                                style={{
                                  borderRadius: "8px",
                                  boxShadow: "0 2px 8px #ddd",
                                  border: "2px solid #eee",
                                }}
                              />
                            ) : "No image"}
                          </div>
                          {student.image && (
                            <div className="student-card-row">
                              <button
                                className="icon-download-btn"
                                onClick={() => downloadSubjectFile(student.image, student.name)}
                                title="Download"
                                aria-label="Download"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="22"
                                  width="22"
                                  viewBox="0 0 24 24"
                                  style={{
                                    verticalAlign: "middle",
                                    filter: "drop-shadow(0 2px 4px #228be6aa)",
                                  }}
                                  fill="#228be6"
                                >
                                  <path d="M5 20h14v-2H5v2zm7-18c-1.1 0-2 .9-2 2v8.17l-3.59-3.58L5 11l7 7 7-7-1.41-1.41L13 12.17V4c0-1.1-.9-2-2-2z"/>
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <strong>Total Items: {data.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .icon-download-btn {
          border: none;
          background: #fff;
          padding: 7px 12px;
          border-radius: 50px;
          box-shadow: 0 2px 8px #228be633;
          transition: box-shadow 0.16s, background 0.13s;
          cursor: pointer;
          outline: none;
        }
        
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
