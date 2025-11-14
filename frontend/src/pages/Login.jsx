import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");

  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let data = { email, password };

    axios
      .post("http://localhost:5000/apis/user/login", data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res?.data?.message);

          sessionStorage.setItem("token", res?.data?.token);
          sessionStorage.setItem("userId", res?.data?.data?._id);
          sessionStorage.setItem("name", res?.data?.data?.name);
          sessionStorage.setItem("email", res?.data?.data?.email);
          sessionStorage.setItem("userType", res?.data?.data?.userType);

          if (res.data.data.userType === 3) {
            setTimeout(() => nav("/"), 2000);
          } 
          if (res.data.data.userType === 1) {
            setTimeout(() => nav("/admin/DashBoard"), 2000);
          } 
          
        } 
        else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err is", err);
        toast.error("Login failed!");
      });
  };

  function handleRegister(e) {
    e.preventDefault();

    let data = new FormData();
    data.append("name", name);
    data.append("email", email2);
    data.append("password", password2);
    data.append("phone", phone);
    data.append("address", address);

    axios
      .post("http://localhost:5000/apis/student/register", data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setTimeout(() => nav("/"), 2000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("Registration error:", err);
        toast.error("Something went wrong during registration!");
      });
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {!isSignup ? (
          <div>
            <h2 style={styles.title}>Login</h2>
            <form style={styles.form} onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                style={styles.input}
                required
                pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$"
                title="Enter a valid email like Example@gmail.com "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" style={styles.button}>
                Login
              </button>
            </form>
            <p style={styles.footer}>
              Don’t have an account?{" "}
              <span style={styles.link} onClick={() => setIsSignup(true)}>
                Sign up
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h2 style={styles.title}>Signup</h2>
            <form style={styles.form} onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Name"
                style={styles.input}
                required
                pattern="[A-Za-z\s]+"
                title="Name should contain only letters and spaces"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
             
              <input
                type="email"
                placeholder="Email"
                style={styles.input}
                required
                pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$"
                title="Enter a valid email like Example@gmail.com"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                required
                pattern=".{6,}"
                title="Password must be at least 6 characters"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <input
                type="number"
                placeholder="Phone"
                style={styles.input}
                required
                pattern="[1-9][0-9]{9}"
                title="Phone number must be 10 digits and cannot start with 0"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                style={styles.input}
                required
                pattern="[A-Za-z0-9\s,.-]+"
                title="Address can contain letters, numbers, commas, dots and dashes"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
              <button type="submit" style={styles.button}>
                Sign Up
              </button>
            </form>
            <p style={styles.footer}>
              Already have an account?{" "}
              <span style={styles.link} onClick={() => setIsSignup(false)}>
                Login
              </span>
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    width: "350px",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  title: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: { marginTop: "28px", fontSize: "14px", color: "#555" },
  link: { color: "#6a11cb", fontWeight: "bold", cursor: "pointer" },
};
