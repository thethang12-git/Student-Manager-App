import axios from "axios";

class StudentService {
    static async getData() {
        return await axios.get("http://localhost:3001/students");
    }
    static async getStudentById(id: any) {
        try {
            const res = await axios.get("http://localhost:3001/students", {params: {id}});
            return res.data?.[0] || undefined;
        } catch (err) {
            return console.log(err);
        }
    }
    static async addStudent(value:any){
        return await axios.post("http://localhost:3001/students",value)
    }
    static async deleteStudentById(id:any){
        return await axios.delete("http://localhost:3001/students/"+id);
    }
    static async updateStudent(id: any, data: any) {
        return axios.patch(`http://localhost:3001/students/${id}`, data);
    }
}
export default StudentService;