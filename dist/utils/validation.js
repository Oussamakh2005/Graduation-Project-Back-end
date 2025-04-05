const validate = (data, schema) => {
    try {
        const validatedData = schema.parse(data);
        return validatedData;
    }
    catch (err) {
        return false;
    }
};
export default validate;
