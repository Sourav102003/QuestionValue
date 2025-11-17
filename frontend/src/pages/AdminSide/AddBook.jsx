import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBook() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !department || !image) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("department", department);
    formData.append("image", image);

    axios
      .post("http://localhost:5000/apis/library/add", formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message || "Book added!");
          setName("");
          setDepartment("");
          setImage("");
        } else {
          toast.error(res.data.message || "Error!");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Upload failed!");
      });
  }

  return (
    <>
      <ToastContainer />
      <section id="hero" className="hero section" style={{ background: "#fcfdff" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-12">
              <div className="hero-content text-center mt-3 mb-3">
                <h2 className="mb-4">ADD BOOKS</h2>
                <div className="student-table-wrap">
                  <div className="container d-flex justify-content-center">
                    <form
                      onSubmit={handleSubmit}
                      className="php-email-form w-100"
                      style={{
                        maxWidth: "60%",
                        minWidth: "320px",
                        background: "#f8f9fa",
                        padding: "30px",
                        borderRadius: "15px",
                        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-6 form-group mt-3">
                          <label className="mb-1">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-md-6 form-group mt-3">
                          <label className="mb-1">Department</label>
                          <input
                            type="text"
                            className="form-control"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="row justify-content-center align-items-center mt-4">
                        <div className="col-md-6 form-group d-flex flex-column align-items-center">
                          <label className="mb-1">Image</label>
                          <input
                            type="file"
                            className="form-control"
                            style={{ maxWidth: "300px" }}
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                          />
                        </div>
                        <div className="col-md-6 form-group d-flex flex-column align-items-center">
                          <button
                            type="submit"
                            className="btn px-5 py-2 mt-4"
                            style={{
                              background: "linear-gradient(90deg, #1a87e7, #00bfff)",
                              border: "none",
                              borderRadius: "30px",
                              fontWeight: "600",
                              color: "white",
                              width: "100%",
                              maxWidth: "300px",
                            }}
                            disabled={loading}
                          >
                            {loading ? "Uploading..." : "Update"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
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
