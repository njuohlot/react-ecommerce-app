import Chart from "../../components/chart/Chart";
import FeatureInfo from '../featureInfo/FeatureInfo'
import { userData } from "../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from '../topbar/Topbar'

export default function Report() {
  return (
    <>
    <Topbar/>

    <div className='container'>
    <FeatureInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetLg/>
      </div>
    </div>

    
    </>
    
   
  );
}