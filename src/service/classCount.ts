import axios from "axios";

class ClassCountData {
    static async getClassCount() {
        return await axios.get("http://localhost:3001/classCount");
    }
}
export default ClassCountData;