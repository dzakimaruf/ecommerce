// import React, { useState, useEffect } from 'react'
// import codeid from '../assets/images/villbook.png'
// import { useHistory, useLocation } from 'react-router'
// import { signinUser } from '../views/action/UserAction'
// import { useDispatch, useSelector } from 'react-redux'

// export default function Signin() {

//   // const [values, setValues] = useState({
//   //   email: undefined,
//   //   password: undefined,
//   //   redirect: false,
//   //   user_type: undefined,
//   //   error: ''
//   // });

//   // const [villas, setVillas] = useState("")

//   // const handleOnChange = name => event => {
//   //   setValues({ ...values, [name]: event.target.value })
//   // }
  
//   // const onSubmit = (e) => {
//   //   e.preventDefault();
//   //   const user = {
//   //     user_email: values.email || undefined,
//   //     user_password: values.password || undefined
//   //   }

//   //   signin(user).then((data) => {
//   //     //console.log(data)
//   //     if (data.error) {
//   //       setValues({ ...values, error: data.error })
//   //     } else {
//   //       auth.authenticate(data, () => {
//   //         setValues({ ...values, user_type: data.users.user_type, redirect: true })
//   //       })
//   //     }

      
//   //   })


// const [values, setValues] = useState({
//     user_email: "",
//     user_password: "",
//     error: false,
// });

// const history = useHistory();
// const location = useLocation();

// const dispatch = useDispatch();

// const handleOnChange = (name) => (event) => {
//     setValues({ ...values, [name]: event.target.value });
//   };

// const {userSignin} = useSelector((state) => state);
// const { userInfo } = userSignin

// useEffect(() => {
//     console.log(userSignin)
//     //dispatch(signinUser())
// }, [])

// useEffect(() => {
//     if(userInfo){
//     /* const redirect = location.search
//     ? new URLSearchParams(location.search).get("redirect")
//     : "/villbook/landing"; */
//     if(userInfo.users && userInfo.users.user_type ==="admin") {
//         history.push("/villbook/adminvilla");
//     } else {
//         history.push("/villbook/landing");
//     }
  
//     }
// }, [userInfo,history])
// const onSubmit = (e) => {
//     console.log(values.user_email, values.user_password)
//     e.preventDefault();
//     if (values.user_email && values.user_password) {
//         dispatch(signinUser(values.user_email, values.user_password));
//     } 
// };
  
//   // const { from } = props.location.state || {
//   //   from: {
//   //     pathname: '/villbook/'
//   //   }
//   // }

//   // if (values.redirect) {
//   //   if (values.user_type === "admin"){
//   //     return (<Redirect to="/villbook/adminvilla"/>)
//   //   }else{
//   //     return (<Redirect to="/villbook/Landing"/>)
 
//   //   }
//   // }
  
//   return (
//     <>
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />

//       <div class="bg-gradient-to-br from-gray-500 to-blue-500 min-h-screen overflow-auto">
//         <div class="container max-w-5xl mx-auto px-4 pt-20">
//           <div class="w-4/5">
//             <h1 class="mt-32 text-white text-6xl font-bold">Best Villas Site <br /><span class="text-blue-400">Ning Indonesia.</span></h1>
//           </div>
//           <div class="w-5/6 my-10 ml-6">
//             <h3 class="text-gray-300">
//               Book and Find The Villas Around The World <br />
//               <strong class="text-white">With Easiest Way</strong>
//               <br /> More Choices and Experiences Only In <h1><span class="font-bold text-blue-400" > TheVillaBooking.com </span> </h1>
//             </h3>
            

//           </div>
//           <div class="hidden sm:block opacity-50 z-0">
//             <div class="shadow-2xl w-96 h-96 rounded-full -mt-72"></div>
//             <div class="shadow-2xl w-96 h-96 rounded-full -mt-96"></div>
//             <div class="shadow-xl w-80 h-80 rounded-full ml-8 -mt-96"></div>
//           </div>
//           <div class="text-white relative">
//             <img src={codeid} className="h-64 w-64 items-center" />
//             <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-5 uppercase">
//             </div>

//             <div class=" h-screen w-full flex flex-col-reverse md:flex-row items-right justify-center pl-96 " >

//               <div class="container mx-auto flex flex-col items-center ">
//                 <form class="pr-shadow-lg w-80 p-4 flex flex-col rounded-lg text-black " action="#" method="POST">
//                   {values.error &&
//                     <p class="text-blue text-lg italic">{values.error}</p>}

//                   <input type="text" placeholder="Email or Phone Number" class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" id="email-address"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     onChange={handleOnChange('user_email')}
//                     required />
//                   <input type="text" placeholder="Pasword" class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     onChange={handleOnChange('user_password')}
//                     required />
//                   <button type="submit" onClick={onSubmit} class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg">Login</button>
//                   <p class="text-center text-gray-300 text-sm my-4">
//                 <a href="http://localhost:3000/villbook/signup" class="font-bold hover:text-blue-400" > Forgot Password</a>
//                 </p>
//                   <hr />
//                   <a href="/villbook/signup" class="w-full bg-green-400 mt-8 mb-4 text-white pl-16 p-3 rounded-lg font-semibold text-lg">Create New Account</a>
//                 </form>
//                 <p class="text-center text-gray-300 text-sm my-4">
    
//                 </p>
//                 <div class="bg-indigo-700 text-indigo-200 md:text-center py-2 px-4">
//                   <a href="http://localhost:3000/villbook/landing" class="font-bold hover:text-blue-400" > TheVillaBooking.com</a>
// </div>



//               </div>
//             </div>

//           </div>
//         </div>
        
//       </div>


//     </>
//   )
// }