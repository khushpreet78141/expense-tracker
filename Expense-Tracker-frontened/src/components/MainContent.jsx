import React from 'react'
import { useState,useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
const MainContent = () => {
  const [popup, setpopup] = useState(false);

  const [expenseName, setexpenseName] = useState("");
  const [expenseAmount, setexpenseAmount] = useState(0);
  const [category, setcategory] = useState("other");
  const [date, setdate] = useState("");
  const [detailsArray, setdetailsArray] = useState([]);
  const [filterCategory, setfilterCategory] = useState("all");
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    const fetchExpenses = async() =>{
      try{const res = await fetch("http://localhost:3000/api/expenses",{method:"GET",headers:{"content-type":"application/json"}})
    const data = await res.json()
    setdetailsArray(data)
    }catch(err){
      console.error("fetching of expenses is failed: ",err)
    }
    }
    fetchExpenses()
    
    
  }, [])




  
  const handleAdd = async() => {
    if (!expenseName || !expenseAmount || !date) {
      return;

    }
    if (editingId) {
      try{
      const res = await fetch(`http://localhost:3000/api/expenses/${editingId}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({expenseName,expenseAmount,category,date})})
      if(!res.ok){
        throw new Error("update failed");
      }
      const data = await res.json()
      setdetailsArray(detailsArray => detailsArray.map(item => (
        item._id === editingId ? data : item
      )))
      toast('🦄 Updated', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });}catch(err){
        console.error("this error comes while updating",err.message)
      }

    }
    else {
      try{

      const res = await fetch("http://localhost:3000/api/expenses",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({expenseName,expenseAmount,category,date})})
      if(!res.ok){
        throw new Error("fetching is failed");
      }
      const data = await res.json();

      setdetailsArray([...detailsArray, data.addexpense])

      toast('New Expense added', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });}catch(err){
        console.error("this error comes while adding ",err.message);
      }
    }

    setpopup(false)
    setEditingId(null)
    setexpenseName("")
    setexpenseAmount(0)
    setcategory("other")
    setdate("")

  }

  const filteredArray = filterCategory === "all" ? detailsArray : detailsArray.filter(item => item.category === filterCategory)
  console.log(filteredArray);
  const total = filteredArray.reduce((sum, item) => sum + item.expenseAmount, 0)
  console.log(total)



  const handleDelete = async(id) => {
    try{
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`,{ method : "DELETE" })
    if(!res.ok){
      throw new Error("fetching failed")
    }
    
    setdetailsArray(detailsArray.filter(item => item._id !== id));

    toast('Expense Deleted', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });}catch(err){
      console.error("this error occurs while deletion :",err.message)
    }

  }
  const handleEdit = (item) => {
    setpopup(true)
    setEditingId(item._id)
    setexpenseName(item.expenseName)
    setexpenseAmount(item.expenseAmount)
    setcategory(item.category)
    setdate(item.date)


  }
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />
      <div>
        <div className='w-full h-60 bg-violet-200 relative'>
          <div className='top  flex justify-around items-center pt-15'>

            <div className='text-violet-950 text-3xl hover:text-4xl w-xl cursor-pointer transition transition-all ease-out'>𝑬𝓧𝓟ℰ𝓝𝓢ℰ𝓢</div>
            <div className="create bg-violet-950 text-white p-2 rounded-4xl cursor-pointer hover:bg-violet-200 hover:text-violet-950 border border-violet-950 w-[170px]" onClick={() => setpopup(true)}> + Create Expenses</div>
          </div>
        </div>
        {(detailsArray.length === 0) && (<div className='w-5xl  border border-gray-400 rounded-2xl m-auto p-4 flex flex-col items-center justify-center absolute top-[245px] left-55 bg-white'>
          <div><lord-icon
            src="https://cdn.lordicon.com/ejurburo.json"
            trigger="morph"
            style={{ width: "250px", height: "250px" }}>
          </lord-icon></div>
          <h1 className='m-2 text-2xl font-bold'>You Don't have any Expenses yet</h1>
          <h3 className='m-2 text-gray-500'>Go to add expenses</h3>
          <div className="create bg-violet-950 m-2 text-white p-2 rounded-4xl cursor-pointer hover:bg-violet-200 hover:text-violet-950 border border-violet-950 w-[170px]" onClick={() => setpopup(true)}> + Create Expenses</div>
        </div>)}



        {(filteredArray.length === 0 && detailsArray.length !== 0) && <div className='border flex flex-col justify-evenly h-52 border-gray-400 w-4xl text-center rounded-4xl m-auto mt-10'> <h1 className='m-2 text-2xl font-bold'>You Don't have any Expenses of this category</h1> <h3 className='m-2 text-gray-500'>Go to add expenses</h3><div className="create m-auto bg-violet-950 text-white p-2 rounded-4xl cursor-pointer hover:bg-violet-200 hover:text-violet-950 border border-violet-950 w-[170px]" onClick={() => setpopup(true)}> + Create Expenses</div></div>}
        {detailsArray.length > 0 && (



          <div>
            <div className="twobuttons absolute top-[225px] left-96 flex gap-10 items-center">
              <div className="search">
                <span className='bg-violet-950 text-white p-2 rounded-full mx-1'>Filter by Category : </span>
                <select name="searchbyCategory" value={filterCategory} onChange={(e) => setfilterCategory(e.target.value)} className="border border-violet-950 p-2" id="">
                  <option value="all">all</option>
                  <option value="beauty">beauty</option>
                  <option value="grocery">grocery</option>
                  <option value="clothes">clothes</option>
                  <option value="communication">communication</option>
                  <option value="accomodation">accomodation</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div className="total bg-violet-950 text-white p-2 rounded-full mx-1">
                Total Expenses : {total}
              </div>
            </div>
            <div className='top-[280px] left-50 w-7xl flex flex-col gap-4 m-auto absolute'>

              {filteredArray.map(item => <div key={item._id} className="card w-6xl border h-30 rounded-4xl hover:w-[1155px] shadow hover:shadow-violet-950 hover:ease-in-out  hover:border-gray-50 transition-all hover:h-130px hover:top-[275px]  border-gray-400      bg-white">
                <div className="top h-15 p-3 grid grid-cols-5 mx-10 ">
                  <span>Spent on</span>
                  <span>expenses</span>
                  <span>category</span>
                  <span>Date</span>
                  <span>Actions</span>

                </div>
                <hr className='bg-gray-400 border-[0.2px] border-gray-400 h-[0.2px] mx-3 ' />
                <div className="bottom   h-15 p-3 grid grid-cols-5 mx-10">
                  <span>{item.expenseName}</span>
                  <span>{item.expenseAmount}</span>
                  <span >{item.category}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <div className='flex gap-4'>
                    <button className="bg-violet-950 text-white px-2 rounded-xl" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="bg-violet-950 text-white px-2 rounded-xl" onClick={() => handleDelete(item._id)}>Delete</button>
                  </div>
                  
                </div>
              </div>


              )}</div>
          </div>
        )}


        {popup && (
          <div className='inputBox fixed inset-0 transition-all transition ease-in'>
            < div className='absolute inset-0 bg-black/30 backdrop-blur-md' onClick={() => setpopup(false)} />
            <div className='w-4xl rounded-3xl backdrop-blur-2xl bg-violet-50 shadow left-56 relative z-50 shadow-violet-950  border-violet-950 h-[400px] mt-60 mb-7 flex flex-col justify-evenly items-center '>
              <button className="cross text-5xl fixed right-5 top-6" onClick={() => setpopup(false)}>⤬</button>
              <div><input type="text" onChange={(e) => setexpenseName(e.target.value)} value={expenseName} className='w-xl border border-violet-950 rounded-full hover:shadow hover:shadow-violet-950 text-[18px] p-2' placeholder='Expend on ' /> {expenseName==="" && <p className='text-red-700 ml-28 mt-0'>please enter where you spent?</p>}</div>
              <div><input type="number" onChange={(e) => setexpenseAmount(e.target.value)} value={expenseAmount} className='w-xl border border-violet-950 rounded-full hover:shadow hover:shadow-violet-950 text-[18px] p-2' placeholder='Enter amount' />
              {expenseAmount===0 && <p className='text-red-700 ml-28 mt-0'>enter amount</p>}</div>
              <div><span className='w-[250px] mx-3 text-xl'>Select Category:</span><select className="w-[250px] mx-3 text-xl p-1" name="category" id="" onChange={(e) => setcategory(e.target.value)} value={category}>
                <option value="beauty">beauty</option>
                <option value="grocery">grocery</option>
                <option value="clothes">clothes</option>
                <option value="communication">communication</option>
                <option value="accomodation">accomodation</option>
                <option value="other">other</option>
              </select></div>
              <div><span className='text-xl mx-3'>Enter Date:</span>
                <input type="date" onChange={(e) => setdate(e.target.value)} value={date} className='text-xl mx-3' />
                {date==="" && <p className='text-red-700 ml-28'>enter date</p>}

              </div>
              <button className='bg-violet-950 text-xl text-white py-2 rounded-3xl px-4' disabled={expenseName.length < 3 || expenseAmount === 0 || date === ""} onClick={() => handleAdd()}>{editingId ? "Update" : "Add"}</button>
            </div>
          </div>

        )}

      </div></>
  )
}

export default MainContent

