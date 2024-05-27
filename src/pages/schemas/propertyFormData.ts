import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import axios from "axios";
import { ACCESS_TOKEN, URL } from "../../config/constants";

interface Props {
    title: string,
    description: string,
    size: string,
    price: number,
    tenure: string,
    // property_image: HTMLInputElement,
    property_image: any
}

export const propertyFormDataPost = (props: Props) => {
    const handleSubmit = (event: any) => {
        event.preventDefault()
        const token = localStorage.getItem(ACCESS_TOKEN)
        const formData = new FormData();
        const price = JSON.stringify({price: props.price});
        formData.append('title', props.title);
        formData.append('description', props.description);
        formData.append('size', props.size);
        formData.append('price', price);
        formData.append('tenure', props.tenure);
        formData.append('property_image', props.property_image?.files[0]);

        api.post("/api/properties", formData, {
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
            }
        })
            .then(response => {
                alert(response.data)
                console.log(response.data)
            })
            .catch(error => {
                alert(error)
                console.error(error)
            })
    }
    return { handleSubmit }
}

export const PropertyCreationSchema = () => {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        title: yup.string().required("Property title is required!"),
        description: yup.string().required("Property description is required!"),
        size: yup.string().required("Property size is required!"),
        price: yup.number().min(0).integer("Only number is accepted").positive().required("Property price is required!"),
        tenure: yup.string().required("Payment frequency is required!"),
        property_image: yup.mixed()
            .test("file", "File is required!", (value) => value !== null)
        // .test("fileType", "Only images are allowed!", (value)=>{
        //     return value && ["image/jpeg", "image/png", "image/jpg"]
        //     .includes(value.type);
        // })
        // .test("fileSize", "File should be less than 7MB", (value)=>{
        //     return value && value.size < 7000000;
        // }),
    });

    const { register: postData, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async ({ title, description, size, price, tenure, property_image }) => {
        console.log(title, description, size, price, tenure, property_image)
        await api.post(
            "/api/properties",
            { title, description, size, price, tenure, property_image },
        )
            .then(res => {
                if (res.status == 200) {
                    alert(res.data.message)
                    navigate("/")
                }
            })
            .catch(error => {
                alert(error.data)
                console.error(error)
            })
    }

    return { postData, handleSubmit, errors, onSubmit, }
}


