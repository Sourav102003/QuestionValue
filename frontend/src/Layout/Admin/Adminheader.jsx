export default function Adminheader()
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
          <a href="/admin/DashBoard" className="active">
            DashBoard
          </a>
        </li>
        <li>
           <a href="/admin/studentTable">studentTable</a>
        </li>
        <li>
          <a href="/admin/EnquiryManage">EnquiryManage</a>
        </li>
        <li>
         <a href="/admin/UploadPaper">Upload Paper</a>
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