import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../config/api";
import { useNavigate } from "react-router-dom";

export const RegisterSchema = () => {
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

    const onSubmit = async () => {
        // event.preventDefault();
        // setLoading(true);
        try {
            await api.post("/api/auth/register/", { register })
                .then((res) => {
                    if (res.status === 201) {
                        alert("Registration successful, please login");
                        navigate('/login');
                    }
                })

        } catch (error) {
            console.log(error);
            alert(error);
        } finally {
            // setLoading(false);
            // setLoading(false);
            // setUsername('');
            // setPassword('');
            // return;
        }
    }
    return { register, handleSubmit, onSubmit, errors }
}


