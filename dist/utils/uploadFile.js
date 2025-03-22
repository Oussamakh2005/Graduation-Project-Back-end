import { v4 as uuidV4 } from "uuid";
import supabase from "../services/supabaseClient.js";
const upload = async (file) => {
    const filePath = `uploads/${uuidV4()}+_${file.originalname}`;
    const { data, error } = await supabase.storage.from("cars_images").upload(filePath, file.buffer, { contentType: file.mimetype });
    if (error) {
        console.log(error);
        return null;
    }
    ;
    console.log(data);
    console.log("image uploaded");
    const publicUrl = supabase.storage.from('cars_images').getPublicUrl(filePath).data.publicUrl;
    console.log("image url " + publicUrl);
    return publicUrl;
};
export default upload;
//# sourceMappingURL=uploadFile.js.map