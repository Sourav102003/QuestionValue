import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Helper to build actual file URL from subject name
function getFileUrl(subject) {
  // If all files are PDFs, update the extension to .pdf
  return `https://res.cloudinary.com/example/${subject}.pdf`;
  // Or if files have different extensions, manage accordingly.
  // In real use, you should have subject={name, url} and return subject.url;
}

export default function Subjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const data = { exam: params.id };
    axios
      .post(
        "http://localhost:5000/apis/subject/getsubjectByexam",
        data,
        { headers: { authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        setData(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [params.id]); // make sure to update on id change

 const downloadSubjectFile = async (subject) => {
  try {
    const fileUrl = getFileUrl(subject);
    const response = await axios.post(
      "http://localhost:5000/apis/paper/download",
      { url: fileUrl },
      {
        responseType: "blob",
        headers: { authorization: sessionStorage.getItem("token") }
      }
    );
console.log(fileUrl);

    const contentType = response.headers["content-type"];
    // If backend returns JSON error, don't download!
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
    const fileName = fileExtension ? `${subject}.${fileExtension}` : subject;

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
                  data.map((subject) => (
                    <div
                      key={subject}
                      className="term-block"
                      style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                      onClick={() => downloadSubjectFile(subject)}
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
