import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Header } from "../model/header";
import { Stock } from "../model/stock";

@Injectable({
    providedIn : 'root'
})


export class StockService{
    constructor(private http : HttpClient){}
    
    headers = { 'content-type': 'application/json'} 

    createStock(stock : Object): Observable<Object>{
        console.log("in Service");
        return this.http.post(`${environment.apiUrl}/medicine/store/create`,stock,{'headers':this.headers,observe :'body'},)

    }
    findById(id : number){
        return this.http.get<Stock>(`${environment.apiUrl}/medicine/store/findById/`+id,{'headers':this.headers,observe :'body'},)  
    }
    getAll(){
        return this.http.get(`${environment.apiUrl}/medicine/store/findAll`,{'headers':this.headers,observe :'body'},)  
    }

    multiSearch(stock : Stock){
        return this.http.post(`${environment.apiUrl}/medicine/store/multiSearch`,stock,{'headers':this.headers,observe :'body'})
    }
    findByBrand(brand : string){
        return this.http.get<Stock[]>(`${environment.apiUrl}/medicine/store/findByBrand/`+brand,{'headers':this.headers,observe :'body'},)  
    }
    genrateBill(list : any){
        const httpOptions = {
            responseType: 'arraybuffer' as 'json'
            // 'responseType'  : 'blob' as 'json'        //This also worked
          };
        return this.http.post<any>(`${environment.apiUrl}/medicine/store/genrateBill/`,list,httpOptions)
    }
}