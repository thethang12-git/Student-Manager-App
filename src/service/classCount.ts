import axios from "axios";

class ClassCountData {
    static async getClassCount() {
        return await axios.get("http://localhost:3001/classCount");
    }
    static async updateData(value: { id: string; name: string; time: string; day: string; }) {
        return axios.post("http://localhost:3001/classCount",value);
    }
}
export default ClassCountData;