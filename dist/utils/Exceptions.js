var Exceptions;
(function (Exceptions) {
    Exceptions[Exceptions["OK"] = 2000] = "OK";
    Exceptions[Exceptions["NOT_OK"] = 4000] = "NOT_OK";
    Exceptions[Exceptions["UNAUTHERIZED"] = 4001] = "UNAUTHERIZED";
    Exceptions[Exceptions["ALREADY_EXIST"] = 4003] = "ALREADY_EXIST";
    Exceptions[Exceptions["NOT_FOUND"] = 4004] = "NOT_FOUND";
    Exceptions[Exceptions["INVALID_DATA"] = 4022] = "INVALID_DATA";
    Exceptions[Exceptions["INTERNAL_ERROR"] = 5000] = "INTERNAL_ERROR";
})(Exceptions || (Exceptions = {}));
export default Exceptions;
