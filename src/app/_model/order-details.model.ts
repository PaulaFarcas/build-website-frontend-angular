import { OrderQuantity } from "./order-quantity.mode";

export interface OrderDetails{
    fullName:string;
    fullAddress:string;
    contactNumber:string;
    alternateContractNumber:string;
    orderProductQuantityList:OrderQuantity[];

}