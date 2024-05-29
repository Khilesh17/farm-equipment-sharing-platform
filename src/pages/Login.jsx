import loginImg from "../assets/feeding trough 1.png"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Good to see you Again !"
      description2="Take Full Advantage of our Application."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login