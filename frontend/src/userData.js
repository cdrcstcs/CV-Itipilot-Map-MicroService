import { useEffect, useState } from "react";
import axios from "axios";
const useUserData = () => {
    const [loading, setLoading] = useState(false);
    const [userDataFetch, setUserData] = useState([]);
    // const [authUser, setAuthUser] = useState(null);
    // function getCookie(name) {
    //     const cookieRegex = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)');
    //     const cookieMatch = document.cookie.match(cookieRegex);
    //     if (cookieMatch) {
    //         return decodeURIComponent(cookieMatch[3]);
    //     } else {
    //         return null;
    //     }
    // }
    // useEffect(() => {
    // const fetchAuthUser = async () => {
    //     try {
    //         const token = getCookie('usertoken');
    //         console.log(token);
    //         const response = await axios.post(`http://localhost:4500/verify`, { token });
    //         console.log('Authentication response:', response.data);
    //         setAuthUser(response.data);
    //     } catch (error) {
    //         console.error('Authentication error:', error);
    //         setAuthUser(null);
    //     }
    // };
    // if(!authUser){
    //     fetchAuthUser();
    // }
    // }, []);
    // console.log(authUser);
    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4500/users`);
                // console.log(response);
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        // if(authUser){
        // }
        getUserData();
    }, []);
    console.log(userDataFetch);
    return { loading, userDataFetch };
};
export default useUserData;
