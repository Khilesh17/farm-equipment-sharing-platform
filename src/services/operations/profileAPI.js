import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI";
import { setLoading, setUser } from "../../redux/slices/profileSlice";

const {
  GET_USER_DETAILS_API,
  GET_RENTED_EQUIPMENTS_API,
  GET_OWNED_EQUIPMENTS_API
} = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getMyEquipments(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_OWNED_EQUIPMENTS_API,
      null,
      { Authorization: `Bearer ${token}` }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response.data.data;
  }
  catch (error) {
    console.log("GET_OWNED_EQUIPMENTS_API API ERROR............", error)
    toast.error("Could Not Get Owned Equipments")
  }
  toast.dismiss(toastId);
  return result;
}

export async function getRentedEquipments(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_RENTED_EQUIPMENTS_API,
      null,
      { Authorization: `Bearer ${token}` }
    )
    
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data;
  }
  catch (error) {
    console.log("GET_RENTED_EQUIPMENTS_API API ERROR............", error)
    toast.error("Could Not Get Rented Equipments")
  }
  toast.dismiss(toastId);
  return result;
}