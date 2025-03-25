import { useEffect, useState } from 'react';
import './App.css'
import data from "./data.json"

function App() {
   const descSlice = 65;
   const nameSlice = 17;
   const [modal, setModal] = useState(false);
   const [modalContent, setModalContent] = useState(-1);

   useEffect(() => {
      console.log(modalContent);
      console.log(modal);

      console.log(data[modalContent])
   }, [modalContent, modal])

   return (
      <div className='h-screen relative overflow-hidden w-full flex justify-center items-center bg-gray-50'>
         <div className='h-screen overflow-auto w-full flex justify-center items-center bg-gray-50'>
            <div className='h-[90%] z-0 w-[90%] bg-white rounded-2xl'>
               <div className='items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 p-5'>
                  {
                     data.map((item, index) => {
                        if (item.working && item.appSize !== 0)
                           return <div onClick={() => { setModal(true); setModalContent(index) }} className=' border-1 hover:animate-[transition-up_0.2s_ease-in_forwards] cursor-pointer flex rounded-2xl border-blue-500 h-max p-4 m-4' key={index}>
                              <div className='mr-3 h-auto min-w-16 min-h-20 flex justify-center'>
                                 <img className='w-full h-full' src={item.appIcon} alt="" />
                              </div>
                              <div>
                                 <h2 className='font-bold'>{item.appName.length > nameSlice ? item.appName.slice(0, nameSlice) + "..." : item.appName}</h2>
                                 <h6 className=' italic text-sm'>{item.appDesc.length > descSlice ? item.appDesc.slice(0, descSlice) + "..." : item.appDesc}</h6>
                              </div>
                           </div>
                        else
                           return <></>
                     })
                  }
               </div>
               {
                  modal ?
                     <>
                        <div className='absolute top-0 left-0 h-full w-full'>
                           <div style={{ transform: "translateX(-50%) translateY(-50%)" }} className='absolute flex justify-center rounded-2xl z-20 items-center top-1/2 left-1/2 bg-white w-140 not-sm:w-100 opacity-100'>
                              <div className='h-[90%] w-[90%] flex py-10 px-4'>
                                 <div className='flex ml-4 flex-col w-full'>
                                    <div className='flex items-center justify-between'>
                                       <div>
                                          <h2 className='text-xl font-semibold mb-1'>{data[modalContent].appName}</h2>
                                          <h6 className='italic'>{(data[modalContent].appSize > 1024 ? (data[modalContent].appSize / 1024) + " MB" : data[modalContent].appSize === 0 ? "0 MB" : (data[modalContent].appSize) + " KB")}</h6>
                                       </div>
                                       <div>
                                          <img className='h-auto min-w-16' src={data[modalContent].appIcon} alt="" />
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
