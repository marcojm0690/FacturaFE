import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Facturas, Producto } from "src/models/facturas";
import { environment } from '../environment/environment.development'
@Injectable()
export class FacturaService {
    private token: string = "9875454101";
    constructor(
        private http: HttpClient) { }

    ObtieneFactura(numeroFactura: number) {
        debugger;
        return this.http.get<Facturas>(environment.apiUrl + `method=ObtieneFactura&token=${this.token}&numero_factura=${numeroFactura}`);
    }
    BuscarProducto(nombre: string) {
        debugger;
        return this.http.get<Producto>(environment.apiUrl + `method=BuscarProducto&token=${this.token}&producto=${nombre}`);
    }
    AgregaDetalle(codigo: string, cantidad: number, numeroFactura: number) {
        return this.http.post<string>(environment.apiUrl + `method=AgregaDetalle&token=${this.token}&numero_factura=${numeroFactura}&codigo_articulo=${codigo}&cantidad=${cantidad}`, numeroFactura);
    }
    BorrarDetalle(linea: number, numeroFactura: number) {
        return this.http.post<string>(environment.apiUrl + `method=BorrarDetalle&token=${this.token}&numero_factura=${numeroFactura}&linea=${linea}&numero_factura=${numeroFactura}`, numeroFactura);
    }
    CreaFactura(numeroFactura: number, fecha: string) {
        return this.http.post<string>(environment.apiUrl + `method=CreaFactura&token=${this.token}&numero_factura=${numeroFactura}&fecha=${fecha}`, numeroFactura);
    }
}