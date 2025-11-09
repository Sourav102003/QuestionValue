import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Subjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const requestData = { exam: params.id };
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/apis/subject/getsubjectByexam",
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

  const downloadSubjectFile = async (imageUrl, subjectName) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/apis/paper/download",
        { url: imageUrl },
        {
          responseType: "blob",
          headers: { authorization: sessionStorage.getItem("token") },
        }
      );

      const contentType = response.headers["content-type"];
      if (contentType && contentType.includes("application/json")) {
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
      console.error("Download failed", err);
      alert("Download failed: " + err.message);
    }
  };

  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="subjects-col">
            <div className="subjects-content text-center">
              <h1 className="hero-title" style={{ marginBottom: "2.3rem" }}>
                Subjects for <span className="subjects-dept"></span>,{" "}
                <span className="subjects-year"></span>,{" "}
                <span className="subjects-term"></span>
              </h1>
              <div className="subjects-list">
                {loading ? (
                  <div>Loading...</div>
                ) : data.length === 0 ? (
                  <div className="subjects-none">No subjects found for this term.</div>
                ) : (
                  data.map(({ subject, image }) => (
                    <div
                      key={subject}
                      className="term-block"
                      style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                      onClick={() => downloadSubjectFile(image, subject)}
                    >
                      {subject}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
