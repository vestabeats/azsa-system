import React from 'react'
 interface HCard{
    imgURL:any,changeImage:any,MainImg:any
}

const HeroCard = (props:HCard) => {
    const handleClick=()=>{
        if(props.MainImg !== props.imgURL.thumb){
            props.changeImage(props.imgURL.thumb)
        }
    }
  return (
    <div className={`border-2 flex justify-center rounded-xl ${props.MainImg===props.imgURL.thumb ? 'border-green-800':'border-transparent'} cursor-pointer max-sm:flex-1`}
    onClick={handleClick}>
        <div className='flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4'>
        <img src={props.imgURL.thumbnail} alt='shoe collection' width={127} height={103} className='object-contain '/>
        <div className='flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6'>

        </div>
        </div>
    </div>
  )
}

export default HeroCard