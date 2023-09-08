import handleErrors from "./handleErrors.middleeware"
import ensureBody from "./ensureBody.middleware"
import verifyEmailExist from "./verifyEmailExist.middleware"
import ensureTokenValid from "./ensureTokenValid.middleware"
import verifyUserPermission from "./verifyUserPermission.middleware"
import checkIdIfExist from "./checkIdIfExist.middleware"
import verifyAdmin from "./verifyAdmin.middleware"


export default
{
    handleErrors,
    ensureBody,
    verifyEmailExist,
    ensureTokenValid,
    verifyUserPermission,
    checkIdIfExist,
    verifyAdmin
}