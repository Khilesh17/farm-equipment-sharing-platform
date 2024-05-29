import signupImg from "../assets/tractor 1.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join Farms Share to Start Renting Your Equipments."
      description1="Make Money by Giving Rent to Your Equipments."
      description2="Save Money by taking Equipmetns on rent rather than purchasing it."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup