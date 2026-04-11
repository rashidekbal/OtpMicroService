export default class ApiResponse{
    status:number;
    message:any;
    constructor(status:number,message:any){
        this.status=status;
        this.message=message;
    }
}