const BASE_URL = "http://localhost:4000/api/v1"


// AUTH EndPoints
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password"
}


// Profile Endpoints
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_RENTED_EQUIPMENTS_API: BASE_URL + "/profile/get-rented-equipments",
    GET_OWNED_EQUIPMENTS_API: BASE_URL + "/profile/get-own-equipments",
}

// Setting Page EndPoint
export const settingEndPoints = {
    UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/update-profile-picture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/update-profile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/delete-account",
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }
  
