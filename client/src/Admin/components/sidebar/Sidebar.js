import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  Storefront,
  AttachMoney,
  PermIdentity,
  BarChart,
  MailOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to='/admin/analytic'>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            </Link>
           
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to='/admin/category'>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Category
            </li>
            </Link>
            <Link to='/admin/transactions'>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            </Link>
            
            <Link to='/admin/report'>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
            </Link>
          </ul>
        </div>
        
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            
          </ul>
        </div>
    
      </div>
    </div>
  );
}