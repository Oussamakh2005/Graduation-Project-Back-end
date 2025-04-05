const authenticated = async (req, res) => {
    console.log(req.userId);
    res.status(200).json({
        ok: true,
        message: "Authenticated"
    });
};
export default authenticated;
