import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "@vkontakte/vkui";

interface factTypes {
    fact: string;
    length: number;
}

export const GetFact = () => {
    const [fact, setFact] = useState<factTypes | null>();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const fetchFact = async () => {
        try {
            const response = await axios.get("https://catfact.ninja/fact");
            setFact(response.data);
        } catch (error) {
            new Error();
            alert("Произошла ошибка. Попробуйте перезагрузить страницу");
        }
    };

    useEffect(() => {
        if (fact?.fact && textareaRef.current) {
            const value: string = fact.fact;
            const firstSpaceIndex: number = value.indexOf(" ");
            if (firstSpaceIndex > 0) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(
                    firstSpaceIndex,
                    firstSpaceIndex,
                );
            }
        }
    }, [fact]);
    return (
        <>
            <textarea
                ref={textareaRef}
                name=""
                id=""
                cols={30}
                rows={10}
                value={fact?.fact}
            ></textarea>
            <br />

            <Button
                size="l"
                onClick={() => {
                    fetchFact();
                }}
            >
                submit
            </Button>
        </>
    );
};
