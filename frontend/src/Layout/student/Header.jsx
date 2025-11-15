export default function Header()
{
    return(
        <>
        <header id="header" className="header d-flex align-items-center fixed-top">
  <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
    <a
      href="index.html"
      className="logo d-flex align-items-center me-auto me-xl-0"
    >
      <h1 className="sitename">QuestionValue</h1>
    </a>
    <nav id="navmenu" className="navmenu">
      <ul>
        <li>
          <a href="/" className="active">
            Home
          </a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/ChatBoat">ChatBot</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        
        <li className="dropdown">
          <a href="#">
            <span>Dropdown</span>{" "}
            <i className="bi bi-chevron-down toggle-dropdown" />
          </a>
          <ul>
            <li>
              <a href="#">Dropdown 1</a>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Admin</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <ul>
                <li>
                  <a href="/DashBoard">DashBoard</a>
                </li>
                <li>
                  <a href="/studentTable">studentTable</a>
                </li>
                <li>
                  <a href="/EnquiryManage">EnquiryManage</a>
                </li>
                <li>
                  <a href="/UploadPaper">Upload Paper</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 5</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Dropdown 2</a>
            </li>
            <li>
              <a href="#">Dropdown 3</a>
            </li>
            <li>
              <a href="#">Dropdown 4</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <i className="mobile-nav-toggle d-xl-none bi bi-list" />
    </nav>
    <a className="btn-getstarted" href="/Login">
      Login
    </a>
  </div>
</header>
        </>
    )
}