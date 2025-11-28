import axios from "axios";

class UserService {
    static async getData() {
        return await axios.get("http://localhost:3001/users/1")
    }
    static async validateUser(email: string, password?: string) {
        try {
            const res = await axios.get("http://localhost:3001/users", {params: {username: email, password: password}});
            return res.data?.[0] || undefined;
        } catch (err) {
            return console.log(err);
        }
    }
}
export default UserService;