import React from 'react'
import PerformanceTable from '../components/Performance/PerformanceTable'
import BarGraphPerformance from '../components/Performance/BarGraphPerformance'
import LineChartPerformance from '../components/Performance/LineGraphPerformance'

const Performance:React.FC = () => {
  return (
    <>
    <div className='mb-2'>
        
    <PerformanceTable/>
    
    <div className='w-fullmy-16 p-4 rounded shadow-sm'>
    <h4 className='text-2xl  font-bold'>

    BarChart
    </h4>
    <BarGraphPerformance/>
    </div>
    <div className='w-full h-full mb-1 p-4 rounded shadow-sm'>
      <h4 className='text-2xl  font-bold'>

      LineChart 
      </h4> 
    <LineChartPerformance/>
    </div>
    
    </div>
   
    </>
  )
}

export default Performance