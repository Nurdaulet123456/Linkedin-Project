import  {useState, useCallback} from "react";

const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<String | null | any>('')

    const request = useCallback(async (url: string, method: string = 'GET', body: any = null, headers: any = {}) => {

        setLoading(true)

        try {  
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Invalid responseTo')
            }

            setLoading(false)

            return data

        } catch (error) {
            setLoading(false)
            setErr(`${error}`)
            throw error
        }

    }, [])
    
    const clearError = useCallback(() => setErr(null), [])

    return {
        loading,
        setLoading,
        request,
        err,
        clearError,
        setErr
    }
}

export {useHttp}