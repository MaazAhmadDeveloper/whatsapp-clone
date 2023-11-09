import React , {useState , createContext, useRef, useEffect} from "react";
import { io } from "socket.io-client"

const AccountProvider = ({children})=>{

    const [ account , setAccount] = useState();
    const [person , setPerson] = useState({});
    const [activeUsers , setActiveUsers] = useState([]);
    const [messageFlag , setMessageFlag] = useState(false);
    const [message , setMessage] = useState("");

    const socket = useRef();

    useEffect(()=>{
        socket.current = io("ws://localhost:9000");
    },[])

    return <AccountContext.Provider 
        value={{
            account,
            setAccount,
            person,
            setPerson,
            socket,
            setActiveUsers,
            activeUsers,
            messageFlag,
            setMessageFlag,
            setMessage,
            message
        }}
    >
         {children}
    </AccountContext.Provider>
}

export const AccountContext = createContext(null);

export default AccountProvider;