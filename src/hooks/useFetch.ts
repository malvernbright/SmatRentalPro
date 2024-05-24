import { useQuery } from "@tanstack/react-query";
import api from "../config/api";
import { Props } from "./interfaceProps";


export const useFetch = (props: Props) => {
    const { data, error, isLoading } = useQuery({
        queryKey: [props.queryKey],
        queryFn: async () => {
            try {
                const response = await api.get(props.endpoint)
                console.log(response.data)
                return response.data;
            } catch (err) {
                console.error(error)
                throw err;
            }
        }
    })
    return { data, error, isLoading }
}