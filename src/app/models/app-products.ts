export class Product {
    $key : string;
    title: string;
    imageURL : string;
    description : string;
    price : number;
    category : string;
    quantityInStock : number;
    isBestSeller : boolean = true;
    isNewArrival : boolean = true;
    addedBy : string
    createdAt : Date = new Date();
    modifiedAt : Date = new Date();
    isSoldOut : boolean = false;
}
