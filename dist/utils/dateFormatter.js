const dateFormatter = (date) => {
    return date.toISOString().split("T")[0];
};
export default dateFormatter;
