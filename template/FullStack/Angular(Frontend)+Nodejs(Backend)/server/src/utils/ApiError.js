class ApiError extends Error{
    constructor(statuscode,message="something went wrong",errors=[],stack=""){
        super(message)
        this.statuscode=statuscode
        this.message=message
        this.errors=errors
        if(stack)
            this.stack=stack
        else
            Error.captureStackTrace(this.constructor)
    }
}
module.exports=ApiError