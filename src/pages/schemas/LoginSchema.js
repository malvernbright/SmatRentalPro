import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { ACCESS_LEVEL, ACCESS_TOKEN, REFRESH_TOKEN } from "../../config/constants";
import api from "../../config/api";


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
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access_token)
                response.data.roles.map(role => {
                    sessionStorage.setItem(ACCESS_LEVEL, role.name)
                    // setRoles(role.name)
                })
                if (localStorage.getItem(ACCESS_TOKEN)) {
                    navigate('/');
                }
                else {
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                    navigate('/');
                }
            }

        } catch (error) {
            if (error.message === "Request failed with status code 401") {
                alert('You are not verified. Please verify first')
            } else {
                alert(error.message)
            }
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


