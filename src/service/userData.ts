import axios from "axios";

class UserService {
    static async getUserById(id: any) {
        return await axios.get(`http://localhost:3001/users/${id}`)
    }
    static async validateUser(email: string, password?: string) {
        try {
            const res = await axios.get("http://localhost:3001/users", {params: {email: email, password: password}});
            return res.data?.[0] || undefined;
        } catch (err) {
            return console.log(err);
        }
    }
        
    static async addUser(data: {
        name: string;
        email?: string;
        password?: string;
        role: string;
        avatar?: string;
        studentId?: string;
        phoneNumber?: string;
        address?: string;
        facebook?: string;
    }) {
        try {
            const res = await axios.post(
                "http://localhost:3001/users",
                data
            );

            return res.data;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    static async updateUser(id: string, data: {
        name?: string;
        email?: string;
        password?: string;
        role?: string;
        avatar?: string;
        studentId?: string;
        phoneNumber?: string;
        address?: string;
        facebook?: string;
    }) {
        try {
            const res = await axios.patch(
                `http://localhost:3001/users/${id}`,
                data
            );

            return res.data;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
}
export default UserService;