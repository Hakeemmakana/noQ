export default interface IMenuRepository{
    createTable(data:Partial<ITable>,hotelId:string):Promise<ITable>;
    getAllTable(search:string,page:number,limit:number,hotelId:string):Promise<PaginatedResult<ITable>>;
    getTableById(id:string):Promise<ITable | null>;
    updateTable(id:string,data:Partial<ITable>):Promise<ITable | null>;
    statusChangeTable(id:string,status:string):Promise<ITable | null>;
    deleteTable(id:string):Promise<ITable | null>;
    findByName(name: string, hotelId: string, excludeId?: string): Promise<ITable | null> 
}