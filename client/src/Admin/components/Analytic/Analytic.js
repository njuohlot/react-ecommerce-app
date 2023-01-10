import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from '../topbar/Topbar'
import { useEffect, useState } from "react";


export default function Analytic() {
 
  return (
    <>
    <Topbar/>

    <div className='container'>
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetLg/>
      </div>
    </div>

    
    </>
    
   
  );
}