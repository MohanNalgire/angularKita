export enum TodoStatus {
    OPEN ='open',
    DONE ='done'
}
export interface ITodo {
    _id: string;
    title: string;
    description: string;
    status: TodoStatus;
}