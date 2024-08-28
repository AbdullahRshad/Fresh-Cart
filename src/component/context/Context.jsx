import { createContext } from "react";

const counterContext= createContext(0)

function counterContextProvider() {
    
const [counter, setCounter] = useState(0)

    return <counterContext.Provider value={{counter,setCounter}}>

    </counterContext.Provider>
}