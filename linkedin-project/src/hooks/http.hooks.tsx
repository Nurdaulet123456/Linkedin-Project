import  {useState, useCallback} from "react";

const useHttp = () => {
    const [login, setLogin] = useState<boolean>(false);

    return {
        login,
        setLogin
    }
}

export {useHttp}