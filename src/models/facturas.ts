export interface Facturas {
    DETALLES: Detalles[]
    FACTURA: Factura
    ALERTA: string
}

export interface Detalles {
    PRECIO: number
    CODIGO_ARTICULO: string
    LINEA: number
    ARTICULO: string
    CANTIDAD: number
    TOTAL_LINEA: number
}

export interface Factura {
    TOTAL: number
    FECHA: string
    NUMERO_FACTURA: number
    USUARIO: string
}
export interface Producto {
    PRODUCTOS: Productos[]
    ALERTA: string
}

export interface Productos {
    PRECIO: number
    CODIGO_ARTICULO: string
    DESCRIPCION: string
}
