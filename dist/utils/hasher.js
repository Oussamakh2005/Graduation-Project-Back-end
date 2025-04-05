import { hash } from 'bcrypt';
const hasher = (data) => {
    const hashed = hash(data, 14);
    return hashed;
};
export default hasher;
