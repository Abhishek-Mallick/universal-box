
class ApiResponse {
    constructor(statuscode,data,message="Sucess"){
        this.statuscode=statuscode
        this.data=data
        this.message=message
        this.success=statuscode<400
    }
}

module.exports=ApiResponse
