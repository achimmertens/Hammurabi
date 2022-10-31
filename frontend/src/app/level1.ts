import { Binary } from "@angular/compiler";
import { Account } from "./account"

export interface Level1 {
    content: Account[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: Binary
    numberOfElements: number;
    first: Binary;
    sort: any;
    size: number;
    number: number;
    empty:Binary;
}