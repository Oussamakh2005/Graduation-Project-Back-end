import { compare } from 'bcrypt';
const compareHash = async (plainText, hash) => {
    return compare(plainText, hash);
};
export default compareHash;
