import Chart from "../../components/chart/Chart";
import FeatureInfo from '../featureInfo/FeatureInfo'
import { userData } from "../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from '../topbar/Topbar'

export default function Transactions() {
  return (
    <>
    <Topbar/>

    <div className='container'>
      <div className="homeWidgets">
        <WidgetLg/>
      </div>
    </div>

    
    </>
    
   
  );
}