import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function UploadPaper() {
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [data3, setdata3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState("");
  const [term, setTerm] = useState("");
  const [exam, setExam] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/apis/department/getall",
        {},
        { headers: { authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        console.log("data is ", res);
        setdata(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err is", err);
        setLoading(false);
      });

    axios
      .post(
        "http://localhost:5000/apis/subject/getall",
        {},
        { headers: { authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        console.log("data is ", res);
        setdata2(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err is", err);
        setLoading(false);
      });

    axios
      .post(
        "http://localhost:5000/apis/year/getall",
        {},
        { headers: { authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        console.log("data is ", res);
        setdata3(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err is", err);
        setLoading(false);
      });
  }, []);

       function handleSubmit(e) {
    e.preventDefault();
        setLoading(true);
    let data = new FormData();
    data.append("name",`${subject}_${exam}_${year}`);
    data.append("year",year );
    data.append("subject",subject);
    data.append("department", department);
    data.append("image", image); 
    data.append("term", term);
    data.append("exam", exam);
    data.append("semester", semester);
    data.append("user", sessionStorage.getItem("email"));


    axios
      .post("http://localhost:5000/apis/paper/add", data, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
           toast.success(res.data.message || "Upload successful!");
           console.log("data uploaded");
           
      setYear(""); setSubject(""); setDepartment("");
      setImage(""); setTerm(""); setExam(""); setSemester("");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong!!");
      });
  }


  return (

    <section id="about" className="about section">
      <div className="container">
         <ToastContainer position="top-center" autoClose={3000} />
        <div className="card shadow-lg p-4 metrics-section">
          <h2 className="text-center mb-4">
            Upload Previous Year Question Paper
          </h2>
          <form 
          onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Department */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Department</label>
                <input
                  list="departmentOptions"
                  name="department"
                  className="form-control"
                  placeholder="Select or enter Department"
                  value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                />
                <datalist id="departmentOptions">
                  {data.map((d) => (
                    <option key={d.name} value={d.name} />
                  ))}
                </datalist>
              </div>

              {/* Subject */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Subject</label>
                <input
                  list="subjectOptions"
                  name="subject"
                  className="form-control"
                  placeholder="Select or enter Subject"
                  value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                />
                <datalist id="subjectOptions">
                  {data2.map((s) => (
                    <option key={s.name} value={s.name} />
                  ))}
                </datalist>
              </div>

              {/* Year */}
              <div className="col-6 col-md-4">
                <label className="form-label fw-semibold">Year</label>
                <input
                  list="yearOptions"
                  name="year"
                  className="form-control"
                  placeholder="Select or enter Year"
                  value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                />
                <datalist id="yearOptions">
                  {data3.map((y) => (
                    <option key={y.year} value={y.year} />
                  ))}
                </datalist>
              </div>

              {/* Semester */}
              <div className="col-6 col-md-4">
                <label className="form-label fw-semibold">Semester</label>
                <input
                  list="semesterOptions"
                  name="semester"
                  className="form-control"
                  placeholder="Select or enter Semester"
                  value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
                />
                <datalist id="semesterOptions">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num} />
                  ))}
                </datalist>
              </div>

              {/* Term */}
              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Term</label>
                <input
                  list="termOptions"
                  name="term"
                  className="form-control"
                  placeholder="Select or enter Term"
                  value={term}
                onChange={(e) => setTerm(e.target.value)}
                required
                />
                <datalist id="termOptions">
                  {[1, 2].map((term) => (
                    <option key={term} value={term} />
                  ))}
                </datalist>
              </div>

              {/* Exam */}
              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Exam</label>
                <input
                  list="examOptions"
                  name="exam"
                  className="form-control"
                  placeholder="Select or enter Exam"
                  value={exam}
                onChange={(e) => setExam(e.target.value)}
                required
                />
                <datalist id="examOptions">
                  {["MSE(Mid-Semester Exam)", "ESE(End-Semester Exam)", "SUPPLY"].map((exam) => (
                    <option key={exam} value={exam} />
                  ))}
                </datalist>
              </div>
              

              {/* File Upload */}
              <div className="col-12">
                <label className="form-label fw-semibold">Upload PDF</label>
                <input
                  type="file"
                  
                  className="form-control"
                  name="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary px-4 mt-3">
                  Upload Paper
                </button>
              </div>
            </div>
          </form>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .row.g-3 > [class*="col-"] {
              flex: 0 0 100%;
              max-width: 100%;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
