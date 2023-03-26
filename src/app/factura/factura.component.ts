import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Detalles, Factura, Facturas, Producto, Productos } from 'src/models/facturas';
import { FacturaService } from 'src/services/facturaService';

@Component({
    selector: 'app-factura',
    templateUrl: './factura.component.html',
    styleUrls: ['./factura.component.css'],
    providers: [
        FacturaService, MessageService, ConfirmationService
    ],
})
export class FacturaComponent {
    pagetitle = "Create Invoice"
    invoicedetail !: FormArray<any>;
    invoiceproduct !: FormGroup<any>;
    productDialog: boolean = false;
    numFacturaDialog: boolean = false;
    selectedDate!: Date;
    mastercustomer: any;
    numeroFactura: number = 0;
    isCreated: boolean = false;
    products!: Productos[];
    selectedProduct!: Productos;
    productoBuscar: string = "";
    masterproduct: any;
    editinvoiceno: any;
    isedit = false;
    editinvdetail: any;
    constructor(private facturaService: FacturaService,
        private activeroute: ActivatedRoute,
        private builder: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) {
    }
    ngOnInit(): void {
    }
    Confirmar(index: number) {
        this.invoicedetail = this.invoiceform.get("details") as FormArray;
        this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
        let qty = this.invoiceproduct.get("qty")?.value;
        let price = this.invoiceproduct.get("salesPrice")?.value;
        let total = qty * price;
        let code = this.invoiceproduct.get("productCode")?.value;
        this.invoiceproduct.get("total")?.setValue(total);

        this.facturaService.AgregaDetalle(code, qty, this.numeroFactura).subscribe({
            next: (result: any) => {
                debugger;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: result.ALERTA, life: 3000 });
            },
            error: (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });

            },
        });

    }
    crearFactura() {
        this.facturaService.CreaFactura(this.numeroFactura, this.selectedDate.toLocaleString()).subscribe({
            next: (result: any) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: result.ALERTA, life: 3000 });
                this.isCreated = true;
                console.log(result);
            },
            error: (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
                this.isCreated = false;
                console.log(error);
            },
        });
    }
    hideDialog() {
        this.productDialog = false;
    }
    guardarProducto() {
        this.productDialog = false;
        this.invoicedetail.push(this.GenerarFila());
        this.CalculoItem(this.invoicedetail.controls.length - 1);

    }
    cargarProductos() {
        this.selectedProduct = new Productos();
        //this.selectedProduct = new Productos() ;
        this.facturaService.BuscarProducto(this.productoBuscar).subscribe({
            next: (result: any) => {
                debugger;
                this.products = result.PRODUCTOS;
                console.log(result);
            },
            error: (error: any) => {
                debugger;
                console.log(error);
            },
        });

    }
    invoiceform = this.builder.group({
        invoiceNo: this.builder.control('', Validators.required),
        customerId: this.builder.control('', Validators.required),
        date: this.builder.control('', Validators.required),
        customerName: this.builder.control(''),
        deliveryAddress: this.builder.control(''),
        total: this.builder.control({ value: 0, disabled: true }),
        tax: this.builder.control({ value: 0, disabled: true }),
        netTotal: this.builder.control({ value: 0, disabled: true }),
        details: this.builder.array([])

    });

    agregarNuevoProducto() {
        this.invoicedetail = this.invoiceform.get("details") as FormArray;

        let customercode = this.invoiceform.get("customerId")?.value;
        this.productDialog = true;
        // if ((customercode != null && customercode != '')  || this.isedit) {

        debugger;

        // } else {
        //   this.alert.warning('Please select the customer', 'Validation');
        // }
    }
    get invproducts() {
        return this.invoiceform.get("details") as FormArray;
    }

    GenerarFila() {

        var group = this.builder.group({
            productLine: this.builder.control(''),
            invoiceNo: this.builder.control(''),
            productCode: this.builder.control('', Validators.required),
            productName: this.builder.control(''),
            qty: this.builder.control(1),
            salesPrice: this.builder.control(0),
            total: this.builder.control({ value: 0, disabled: true })
        });
        debugger;
        group.get("productCode")?.setValue(this.selectedProduct.CODIGO_ARTICULO);
        group.get("productName")?.setValue(this.selectedProduct.DESCRIPCION);
        group.get("qty")?.setValue(1);
        group.get("salesPrice")?.setValue(this.selectedProduct.PRECIO);

        return group;
    }

    CalculoItem(index: any) {
        debugger;
        this.invoicedetail = this.invoiceform.get("details") as FormArray;
        this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
        let qty = this.invoiceproduct.get("qty")?.value;
        let price = this.invoiceproduct.get("salesPrice")?.value;
        let total = qty * price;
        this.invoiceproduct.get("total")?.setValue(total);

        this.calcularMonto();
    }
    EliminarProducto(index: any) {
        if (confirm('¿Desea eliminar la línea?')) {
            this.invproducts.removeAt(index);
            this.calcularMonto();
            //¿De dónde saco el número de linea para poder eliminar el detalle?
            // this.facturaService.BorrarDetalle(index, this.numeroFactura).subscribe({
            //     next: (result: any) => {
            //         debugger;
            //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: result.ALERTA, life: 3000 });
            //         this.isCreated = true;
            //         console.log(result);
            //     },
            //     error: (error: any) => {
            //         debugger;
            //         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });

            //         console.log(error);
            //     },
            // });
        }
    }

    calcularMonto() {
        let array = this.invoiceform.getRawValue().details;
        let sumtotal = 0
        array.forEach((x: any) => {
            sumtotal = sumtotal + x.total;
        });

        let sumtax = (13 / 100) * sumtotal;
        let nettotal = sumtotal + sumtax;

        this.invoiceform.get("total")?.setValue(sumtotal);
        this.invoiceform.get("tax")?.setValue(sumtax);
        this.invoiceform.get("netTotal")?.setValue(nettotal);
    }
}