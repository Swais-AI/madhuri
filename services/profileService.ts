import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const getProfile = async () => {

    const response = await axios.get(
        `${API_URL}/profile`
    );

    return response.data;

};