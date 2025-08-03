import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () =>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords)
    setpasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast(`Copied your text successfuly to clipboard`, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
    navigator.clipboard.writeText(text);
  };

  const spanRef = useRef();
  const passwordRef = useRef();
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (spanRef.current.innerHTML === "Show") {
      spanRef.current.innerHTML = "Hide";
      passwordRef.current.type = "text";
    } else {
      spanRef.current.innerHTML = "Show";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async() => {
     const id = uuidv4();
  const newEntry = { ...form, id };

  setpasswordArray([...passwordArray, newEntry]);

  let res = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newEntry)
  });
     toast(`Password Saved!`, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" })
  };

  const deletePassword = async(id) => {
    console.log(`deleting with id: ${id}`);
    setpasswordArray(passwordArray.filter(item=>item.id!==id));
    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    let res = await fetch("http://localhost:3000/", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    
    id
  })
});

    toast(`Password Deleted`, {

      position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
    // console.log([...passwordArray, form]);
  };

  
const editPassword = (id) => {
  const item = passwordArray.find(entry => entry.id === id);
  if (item) {
    setform(item);
  }
};


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container bg-gray-400 shadow-xl shadow-neutral-500 w-full rounded-4xl flex justify-center my-4 mx-auto p-10 text-center">
        <div className="container flex flex-col justify-center text-white">
          <div className="container text-4xl font-bold text-black my-4">
            <h1>Enter your Credentials</h1>
          </div>
          <div className="forms my-5 px-4">
            <input
              type="text"
              className="bg-gray-300  w-full px-3 py-1 rounded-xl  text-black"
              placeholder="Enter Website URL"
              value={form.site}
              onChange={handleChange}
              name="site"
            />
            <div className=" flex my-2 gap-1.5">
              <input
                type="text"
                className="bg-gray-300  w-full px-3 py-1 rounded-xl  text-black"
                placeholder="Enter your Username"
                value={form.username}
                onChange={handleChange}
                name="username"
              />
              <div className="password-section gap-1 flex items-center">
                <input
                  type="password"
                  ref={passwordRef}
                  className="bg-gray-300  w-75 px-3 py-1 rounded-xl  text-black"
                  placeholder="Enter your Password"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                />
                <span
                  ref={spanRef}
                  className="bg-gray-300 py-1 px-1 hover:bg-gray-700 hover:text-gray-300 text-gray-500 rounded-xl cursor-pointer"
                  onClick={showPassword}
                >
                  Show
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="bg-gray-900 p-2 mt-2 px-3 mx-auto text-center rounded-3xl hover:bg-gray-800 cursor-pointer"
            >
              Add Password
            </button>
          </div>
        </div>
      </div>

      {/* Display saved passwords */}
      <div className="mt-10 px-4">
        <h2 className="text-4xl font-bold text-black mb-4">Saved Passwords</h2>
        {passwordArray.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 text-left bg-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-400 text-white">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Website</th>
                  <th className="px-4 py-2 border border-gray-300">Username</th>
                  <th className="px-4 py-2 border border-gray-300">Password</th>
                  <th className="px-4 py-2 border border-gray-300">Actions</th>

                </tr>
              </thead>
              <tbody>
                {passwordArray.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      {entry.site}
                      <span
                        className="text-sm text-blue-800 underline ml-2 cursor-pointer float-end"
                        onClick={() => copyText(entry.site)}
                      >
                        copy
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {entry.username}
                      <span
                        className="text-sm text-blue-800 underline ml-2 cursor-pointer float-end"
                        onClick={() => copyText(entry.username)}
                      >
                        copy
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {entry.password}
                      <span
                        className="text-sm text-blue-800 underline ml-2 cursor-pointer float-end"
                        onClick={() => copyText(entry.password)}
                      >
                        copy
                      </span>
                    </td>

                    <td className="px-4 py-2 border text-center border-gray-300">
                      <span className="text-sm ml-2 cursor-pointer bg-gray-400 rounded-2xl p-1 px-2 text-white hover:bg-gray-500 ease-in-out transition-all " onClick={()=> {deletePassword(entry.id)}}>Delete</span>
                      <span className="text-sm ml-2 cursor-pointer bg-gray-400 rounded-2xl p-1 px-2 text-white hover:bg-gray-500 ease-in-out transition-all " onClick={()=> {editPassword(entry.id)}}>Edit</span>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-black">No passwords saved yet.</p>
        )}
      </div>
    </>
  );
};

export default Manager;
