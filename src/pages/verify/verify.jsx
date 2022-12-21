import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const VerifyPage = () => {

    const location = useLocation()
    const [message, setMessage] = useState()
    
    useEffect(() => {
        validateAccount();
    }, []);

    const validateAccount = async () => {
        try {
            const id = new URLSearchParams(location.search).get('id')
            const token = new URLSearchParams(location.search).get('token')
            const result = await fetch(`https://project-2-planets-server.onrender.com/verify/account/${id}/${token}`);
            let response = await result.json();
            setTimeout(async () => {
                if (result.status === 400) {
                    setMessage(response.message)
                    return
                }
                setMessage(response)
            }, 3000)
        } catch (error) {}
    }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            {
                message === undefined
                    ? 'Validating... Please wait.'
                    : message
            }
        </div>
    )
}

export default VerifyPage