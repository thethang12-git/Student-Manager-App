import axios from "axios"

class CalenHandle {
    static async getData() {
        return await axios.get('http://localhost:3001/events')
    }
    static showCreateNew(obj:any,setShow: React.Dispatch<React.SetStateAction<boolean>>,setFormik:any) {
            setShow(true)
            if(!obj.event){
                setFormik(obj)
                console.log(obj)
                return
            }
            setFormik(obj.event)
            console.log(obj.event)
            
    }
}
export default CalenHandle