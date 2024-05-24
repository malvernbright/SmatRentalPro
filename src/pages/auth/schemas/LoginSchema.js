import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../config/constants";

export const LoginSchema = () => {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email().required("This field is required!"),
        password: yup.string().min(7, "Minimum characters is 7").max(20, "Maximum characters is 20").required("This field is required!"),
    });

    const { register: login, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async ({ email, password }) => {
        // event.preventDefault();
        // setLoading(true);
        try {
            const response = await api.post("/api/auth/login", { email, password });
            if (response.status == 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access_token)
                console.log(response.data)
                if (localStorage.getItem(ACCESS_TOKEN)) {
                    navigate('/');
                }
                else {
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                    navigate('/');
                }
            }else{
                console.log(response.data);
            }

        } catch (error) {
            // console.log(error.message, error.status);
            alert(error);
        } finally {
            // setLoading(false);
            // setLoading(false);
            // setUsername('');
            // setPassword('');
            // return;
        }
    }

    return { login, handleSubmit, errors, onSubmit }
}


