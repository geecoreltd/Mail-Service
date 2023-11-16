export type Receiver=string;

export type Receivers=Receiver[]

export interface ReqBody {
    receivers:Receivers;
    sender:string;
    subject:string;
    message:string;
}