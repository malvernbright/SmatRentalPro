import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../config/api";

export const RegisterSchema = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const schema = yup.object().shape({
        name: yup.string().required("This field is required!"),
        email: yup.string().email().required("This field is required!"),
        password: yup.string().min(7, "Minimum characters is 10").max(20, "Maximum characters is 20").required("This field is required!"),
        confirmPassword: yup.string().required("This field is required!").oneOf([yup.ref("password"), ''], "Passwords don't match").required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async ({ name, email, password }) => {
        // event.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/auth/register/", { name, email, password })
                .then((res) => {
                    if (res.status === 201) {
                        alert("Registration successful, please check your email");
                        navigate('/registration-success');
                    }
                })

        } catch (error) {
            alert(error);
            setLoading(false)
        } finally {
            setLoading(false);
            // return;
        }
    }
    return { register, handleSubmit, onSubmit, errors, loading }
}


