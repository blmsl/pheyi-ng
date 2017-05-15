export class Item {
    // $key : string ;
    title: string;
    imageURL : string;
    description : string;
    price : number;
    quantityInStock : number;
    isBestSeller : boolean = true;
    isNewArrival : boolean = true;
    addedBy : string
    createdAt : Date = new Date();
}
