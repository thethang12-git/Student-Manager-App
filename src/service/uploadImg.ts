import axios from "axios";

const CLOUD_NAME = "dui5lhaq7";
const UPLOAD_PRESET = "fe-only";

export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
    );

    return res.data.secure_url;
}
