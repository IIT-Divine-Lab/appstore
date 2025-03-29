import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { RxCross2 } from "react-icons/rx";
import data from "./data.json"

function App() {
   const [sortedData, setSortedData] = useState([])
   const descSlice = window.innerWidth < 360 ? 45 : window.innerWidth < 767 ? 50 : 50;
   const nameSlice = window.innerWidth < 360 ? 10 : window.innerWidth < 767 ? 13 : 20;
   const [modal, setModal] = useState(false);
   const [modalContent, setModalContent] = useState(-1);

   const sortData = useCallback(() => {
      setSortedData(data.sort((a, b) => a.appName.localeCompare(b.appName)));
   }, [])

   useEffect(() => {
      if (sortedData.length === 0)
         sortData()
   }, [sortData])

   return (
      <div className='min-h-screen relative overflow-hidden w-full flex justify-center items-center'>
         <div className='h-screen overflow-auto w-full flex justify-center items-center bg-gray-50 pt-[15vh] pb-[5vh]'>
            <div className='h-[90%] z-0 w-[90%] bg-white rounded-2xl'>
               {/* Header */}
               <div className='bg-white h-[10%] w-[100%] fixed top-0 left-0 z-50 flex items-center border-b-[#3f3f3f] border-b-2'>
                  <h1 className='font-bold text-4xl ml-[5%] pl-[44px]'>Appshala App Store</h1>
               </div>
               {/* Header End*/}
               <div className='items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 p-5'>
                  {
                     sortedData.map((item, index) => {
                        if (item.working && item.appSize !== 0)
                           return <div onClick={() => { setModal(true); setModalContent(index) }} className=' border-1 hover:animate-[transition-up_0.2s_ease-in_forwards] hover:bg-gray-50 cursor-pointer items-center flex rounded-2xl border-blue-500 h-[100px] p-2 m-4' key={index}>
                              <div className='mr-3 h-[80%] w-[30%] flex items-center justify-center'>
                                 <img className='w-auto min-h-5 min-w-16 h-full' src={item.appIcon} alt={item.appName} />
                              </div>
                              <div className='w-[70%] h-[80%] flex flex-col items-start'>
                                 <h2 className='font-bold'>{item.appName.length > nameSlice ? item.appName.slice(0, nameSlice) + "..." : item.appName}</h2>
                                 <h6 className=' italic text-sm'>{item.appDesc.length > descSlice ? item.appDesc.slice(0, descSlice) + "..." : item.appDesc}</h6>
                              </div>
                           </div>
                     })
                  }
               </div>
               {
                  modal ?
                     <>
                        <div className='absolute top-0 left-0 h-[100vh] w-full'>
                           <div style={{ transform: "translateX(-50%) translateY(-50%)" }} className='fixed flex justify-center rounded-2xl z-20 items-center top-1/2 left-1/2 bg-white w-140 not-sm:w-100 opacity-100'>
                              <div className='w-[90%] flex pt-6 pb-8 px-4'>
                                 <div className='flex ml-4 flex-col w-full'>
                                    <div onClick={() => setModal(false)} className='mb-6 cursor-pointer pt-0 mt-0 flex w-full justify-end'>
                                       <RxCross2 size={24} />
                                    </div>
                                    <div className='flex items-center justify-between'>
                                       <div>
                                          <h2 className='text-xl font-semibold mb-1'>{data[modalContent].appName}</h2>
                                          <h6 className='italic'>{(data[modalContent].appSize > 1024 ? (data[modalContent].appSize / 1024).toFixed(2) + " MB" : data[modalContent].appSize === 0 ? "0 MB" : (data[modalContent].appSize) + " KB")}</h6>
                                       </div>
                                       <div>
                                          <img className='h-auto w-16' src={data[modalContent].appIcon} alt={data[modalContent].appName} />
                                       </div>
                                    </div>
                                    <div className='mt-4 mb-6'>
                                       {data[modalContent].appDesc}
                                    </div>
                                    <div className='flex justify-end'>
                                       <a href={data[modalContent].appLink} target='blank' download className='p-3 bg-blue-400 text-white font-semibold rounded-2xl cursor-pointer'>Download</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div onClick={() => setModal(false)} className='absolute top-0 bottom-0 z-10 left-0 w-full min-h-full bg-blue-400 opacity-15'>

                        </div>
                     </>
                     :
                     ""
               }
            </div>
         </div>
      </div>
   )
}

export default App
