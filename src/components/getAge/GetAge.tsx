import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./GetAge.module.scss";
import { Button } from "@vkontakte/vkui";

interface nameAge {
    name: string;
    age: number;
}

const schema = yup.object({
    name: yup
        .string()
        .required("Enter a name")
        .min(1, "The name is too short")
        .max(10, "The name is too long")
        .matches(/^[a-zA-Z]*$/, "Only Latin letters"),
});

export const GetAge = () => {
    const [name, setName] = useState<string>(""); // current name
    const [age, setAge] = useState<number | null>(null); // current age
    const [data, setData] = useState<Array<nameAge>>([]);

    const [cancelToken, setCancelToken] = useState<CancelTokenSource>(
        axios.CancelToken.source(),
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

    useEffect(() => {
        // cleanup function to cancel the request if the component unmounts
        return () => cancelToken.cancel("Component unmounted.");
    }, [cancelToken]);

    const fetchAge = async () => {
        // cancel the previous request before making a new request
        cancelToken.cancel("New request incoming");
        const newCancelToken = axios.CancelToken.source();
        setCancelToken(newCancelToken);

        try {
            const response = await axios.get(
                `https://api.agify.io/?name=${name}`,
                {
                    cancelToken: newCancelToken.token,
                },
            );
            setData([
                ...data,
                { name: response.data.name, age: response.data.age },
            ]);
            setAge(response.data.age);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
            } else {
                // Handle other errors
                alert("Произошла ошибка. Попробуйте перезагрузить страницу");
            }
        }
    };

    const getAge = () => {
        const existingEntry = data.find((obj) => obj.name === name);
        if (existingEntry) {
            setAge(existingEntry.age);
        } else {
            fetchAge();
        }
    };

    return (
        <>
            <form className={styles.nameForm}>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter a name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <p style={{ color: "red" }}>{errors.name?.message}</p>
                <Button
                    size="l"
                    onClick={handleSubmit(() => {
                        setAge(null);
                        getAge();
                    })}
                >
                    Submit
                </Button>
                {age && <p>Age: {age}</p>}
            </form>
        </>
    );
};
