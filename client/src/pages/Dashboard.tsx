import React from 'react';
import CardSlider from '../components/Dashboard/CardSlider';
import BarGraph from '../components/Dashboard/BarGraph';
import LineChartComponent from '../components/Dashboard/LineGraph';
import { useSelector } from 'react-redux';
import PerformanceTable from '../components/Performance/PerformanceTable';
import BarGraphPerformance from '../components/Performance/BarGraphPerformance';
import LineChartPerformance from '../components/Performance/LineGraphPerformance';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <section className='h-full bg-white'>
      {user?.isAdmin | user?.isCreator | user?.isOfficials ? (
        <div className="h-full w-full p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
          <CardSlider />
        </div>
      ) : (
        <PerformanceTable />
      )}

{user?.isAdmin | user?.isCreator | user?.isOfficials? (

      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-2xl font-bold'>
          BarChart by Year
        </h4>
        <BarGraph />
      </div>
): (
  <div className='w-fullmy-16 p-4 rounded shadow-sm'>
    <h4 className='text-2xl  font-bold'>

    BarChart
    </h4>
    <BarGraphPerformance/>
    </div>
)}

{user?.isAdmin | user?.isCreator | user?.isOfficials ? (
      <div className='w-full h-full mb-4 sm:mb-1 bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-2xl font-bold'>
          LineChart by Year
        </h4>
        <LineChartComponent />
      </div>):(
         <div className='w-full h-full mb-1 p-4 rounded shadow-sm'>
         <h4 className='text-2xl  font-bold'>
   
         LineChart 
         </h4> 
       <LineChartPerformance/>
       </div>
      )}
    </section>
  );
};

export default Dashboard;
