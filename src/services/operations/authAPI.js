import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { setLoading, setToken, setUserData } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { resetCart } from "../../redux/slices/cartSlice";



const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = authEndpoints;


export function sendOTP(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                SENDOTP_API,
                {
                    email,
                    checkUserPresent: true,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Otp Sent Successfully");
            navigate("verify-email");

        }
        catch (err) {
            console.log("Send otp Error : ", err);
            toast.error("Could not Send OTP");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                SIGNUP_API,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    otp
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Sign up Successfull");
            navigate("/login");
        }
        catch (err) {
            toast.error("Sign up Failed");
            navigate("/signup");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                LOGIN_API,
                {
                    email,
                    password
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")
            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            
            dispatch(setUserData({
                ...response.data.user,
                image: userImage
            }));

            console.log(response.data);

            //Now updating the local storage
            localStorage.setItem("token", JSON.stringify(response.data.user.token));
            localStorage.setItem("userData", JSON.stringify(response.data.user));

            navigate("/dashboard/my-profile");
        }
        catch (err) {
            toast.error("Login Failed")
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUserData(null));
        dispatch(resetCart());

        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        toast.success("Logged Out");
        navigate("/");
    }
}