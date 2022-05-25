import { useEffect, useState } from "react";


const useToken = user => {

    const [token, setToken] = useState('');


    useEffect(() => {

        const email = user?.user?.email;
        const currentUser = { email: email };

        if (user) {
            fetch(`http://localhost:5000/user/${email}`, {

                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log('data inside use token', data);
                    const accessToken = data.token;

                    // local storage token টা save রাখবো
                    localStorage.setItem("accessToken", accessToken);

                    setToken(accessToken);
                })
        }
    }, [user])

    return [token, setToken];

};

export default useToken;