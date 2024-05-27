import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";

export const PropertyApplicationSchema = () => {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        message: yup.string().required("Message is required!"),
        phone: yup.string().required("Your phone is required!"),
        property: yup.string().notRequired(),
        property_id: yup.number().notRequired(),
    });

    const { register: postData, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (payload) => {
        await api.post("/api/applicants", payload)
            .then(res => {
                if(res.status==200){
                    alert(res.data.message)
                    navigate("/")
                }
            })
            .catch(error => {
                alert(error.data)
                console.error(error)
            })
    }

    return { postData, handleSubmit, errors, onSubmit }
}


