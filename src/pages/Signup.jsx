import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { sendOTP } from "../services/operations/authAPI"
import { setUserData } from "../redux/slices/authSlice";

const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
    }

    dispatch(setUserData(signupData))
    dispatch(sendOTP(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="w-screen h-screen flex font-montserrat">

      <div className="p-6 w-1/4 xl:w-2/5 h-full bg-green-500">
        <h1 className="text-4xl font-luckiest">
          <span className="text-black">FARM </span>
          <span className="text-green-400">SHARE</span>
        </h1>

        <p className="mt-4 text-xl font-extrabold text-white">Sharing Equipments Made Easy</p>

        <Link
          to={"/login"}
        >
          <p className="mt-4 text-white text-lg">
            already have an account ?
          </p>
        </Link>
      </div>

      <div className="py-12 px-6 w-3/4">
        <h1 className="text-3xl font-extrabold">Create Your Account</h1>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex w-full flex-col mt-12 gap-y-8 px-6">
          <div className="w-full flex gap-x-4">
            <label className="w-full">
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="w-full rounded-[0.3rem] border-2 outline-none border-green-500 p-[12px] text-black placeholder:text-green-500"
              />
            </label>
            <label className="w-full">
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="w-full rounded-[0.3rem] border-2 outline-none border-green-500 p-[12px] text-black placeholder:text-green-500"
              />
            </label>
          </div>
          <label className="w-full">
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full rounded-[0.3rem] border-2 outline-none border-green-500 p-[12px] text-black placeholder:text-green-500"
            />
          </label>
          <label className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-[0.3rem] border-2 outline-none border-green-500 p-[12px] text-black placeholder:text-green-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[15px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#268C43" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#268C43" />
              )}
            </span>
          </label>
          <label className="relative">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded-[0.3rem] border-2 outline-none border-green-500 p-[12px] text-black placeholder:text-green-500"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[15px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#268C43" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#268C43" />
              )}
            </span>
          </label>
          <button
            type="submit"
            className="rounded-[6px] bg-green-500 py-[8px] px-10 font-extrabold text-white hover:bg-green-400 mx-auto drop-shadow-lg mt-4"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup