import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNav = (props) => {
    const header = props.header
    const [menu, setMenu] = useState(false);

  return (

      <div className="w-full bg-green-primary text-white text-2xl font-semibold tracking-wide flex flex-row justify-between items-center p-3 h-12  ">
        {header}
        <button onClick={() => setMenu(true)}>
          <MenuOutlinedIcon/>
        </button>


      <div
        className={`bg-green-primary h-screen absolute flex flex-col justify-start items-end gap-10 top-0 right-0 duration-300 ease-in-out ${
          menu ? "w-auto px-10 py-4" : "w-0"
        } `}
      >
        {menu ? (
          <>
            <button className="cursor-pointer" onClick={() => setMenu(false)}>
              <CloseOutlinedIcon/>
            </button>

            <ul className="flex flex-col gap-4 text-yellow-primary text-lg 2xl:text-xl font-medium">
              <Link to={'/admin'}>Home</Link>
              <Link to={'/admin/rules'}>Rules</Link>
              <Link to={'/notifications'}>Notifications</Link>
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
      </div>
    
      

  )
}

export default AdminNav
