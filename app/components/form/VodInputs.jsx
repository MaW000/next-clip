import { useState } from 'react'
import Button from '../ui/button';
import TextField from './TextField';
const VodInputs = ({handleData}) => {
    const [data, setData] = useState({
        keyword: '',
        num: 0,
    })
    return (
        <>
            <div className='text-center items-center flex flex-col gap-4 mt-2 '>
               <div className='mr-28'>

                    <TextField 
                        id='keyword'
                        name='keyword'
                        variant='center'
                        type='text'
                        className='w-[100px]'
                        value={data.keyword}
                        onChange={(e) => setData((prev) => ({...prev, keyword: e.target.value}))}
                        placeholder='Enter a keyword'
                    />
                    <TextField 
                        id='num'
                        name='num'
                        variant='centerNum'
                        type='number'
                        className='w-[100px] mt-2'
                        value={data.num}
                        onChange={(e) => setData((prev) => ({...prev, num: e.target.value}))}
                        placeholder='Number of occurences'
                    />
              
               </div>
              
                <Button 
                    variant='solid'
                    color='purple'
                    className='text-center w-[50%] items-center '
                    onClick={() => {
                        handleData(data)
                        setData({keyword: '',num: 0})
                        
                    }}
                >
                    Submit
                </Button>
            
            </div>
        </>
    )
}

export default VodInputs