// import React, { useEffect, useState } from "react";
// import { LockClosedIcon } from "@heroicons/react/solid";
// import { Redirect, Link, useHistory, useLocation } from "react-router-dom";
// import { signup } from "./ApiAuth";
// import auth from "./AuthHelper";


// export default function Signup(props) {
//   const history = useHistory();
//   const location = useLocation();
  
  
//   const [values, setValues] = useState({
   
//     user_name: "",
//     user_password:"",
//     user_type: "user",
//     redirect: false,
//   });

//   const handleOnChange = (name) => (event) => {
//     console.log(values);
//     console.log(name+"-"+ event.target.value);

//     setValues({ ...values, [name]: event.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const user = {
//       user_email: values.user_email ,
//       user_password: values.user_password,
//       user_name: values.user_name ,
//       user_type: values.user_type,
//     };
    
//     signup(user).then((result) => {
//         console.log(result);
//         setValues({...values, redirect:true})
//       });
    
//   };

//   const {from} = props.location.state || {
//     from: {
//       pathname: "/villbook/signin"
//     }
//   }
//   if(values.redirect){
//     console.log('redirect : ' || { from })
//     return (<Redirect to={from}/>)
//   }

//   return (
//     <>
//       <div class="p-20 min-h-screen overflow-auto w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-br from-gray-500 to-blue-500">
//         <div class="container max-w-5xl mx-auto px-4 pt-20">
//         <div class="w-4/5">
//             <h1 class="pb-20 pl-16 text-white text-5xl font-bold">Find Villa Only in <br /><span class="text-blue-400">VillaBooking</span></h1>
//             <h3 className="pl-20 pb-20 font-sans lg text-blue-900 font-bold">And Get More Benefits Now</h3>
//           </div>
//         </div>
//         <div class="container mx-auto flex flex-col items-center">
//           <form class="pr-shadow-lg w-80 p-4 flex flex-col bg-transparent rounded-lg ">
//             {values.error && (
//               <p class="text-red-400 text-lg italic">{values.error}</p>
//             )}
//             <input
//               type="text"
//               placeholder="Email or Phone Number"
//               class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
//               value={values.user_email}
//               onChange={handleOnChange('user_email')}
//             />
//             <input
//               type="password"
//               placeholder="Pasword"
//               class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              
//               onChange={handleOnChange("user_password")}
//             />

//             <input
//               type="text"
//               placeholder="Username"
//               class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              
//               onChange={handleOnChange("user_name")}
//             />
            
//             <hr />
//             <Link to="/villbook/signup">
//               <button onClick={onSubmit} class="w-full bg-green-400 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg">
//                 Create New Account
//               </button>
//             </Link>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }