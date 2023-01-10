import Chart from "../../components/chart/Chart";
import FeatureInfo from '../featureInfo/FeatureInfo'
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'

export default function AdminHome() {
  return (
    <>
    <Topbar/>
    <div className="home">
    <Sidebar/>
    <div className='container'>
    <FeatureInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
    </div>
    
    </>
    
   
  );
}