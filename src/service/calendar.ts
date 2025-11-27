import axios from "axios"

class CalenHandle {
    static async getData() {
        return await axios.get('http://localhost:3001/events')
    }
    static showCreateNew(obj:any,setShow: React.Dispatch<React.SetStateAction<boolean>>,setFormik:any) {
            setShow(true)
            if(!obj.event){
                setFormik({...obj, id : obj.id})
                // console.log(obj)
                return
            }
            setFormik({...obj.event,id : obj.event.id})
            // console.log(obj.event)
            
    }
    static async postData(dataID :any,data:any ) : Promise<void> {
        return await axios.patch(`http://localhost:3001/events/${dataID}`, data);
    }
    static async handleDrop(
        obj: any,
    ): Promise<void> {
        try {
            const updatedEvent = {
                title: obj.event.title,
                start: obj.event.start,
                end: obj.event.end,
                allDay: obj.event.allDay,
            };

            const id = obj.event.id;

            await axios.patch(`http://localhost:3001/events/${id}`, updatedEvent);

        } catch (error) {
            console.error(error);
        }
    }
    static async deleteHandle(id: string): Promise<void> {
        try {
            await axios.delete(`http://localhost:3001/events/${id}`);
        } catch (error) {
            console.error(error);
        }
    }
//  tạo sự kiện mới

}
export default CalenHandle