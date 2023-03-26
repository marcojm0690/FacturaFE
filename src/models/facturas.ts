export class Facturas {
    DETALLES!: Detalles[]
    FACTURA!: Factura
    ALERTA!: string
}

export class Detalles {
    PRECIO!: number
    CODIGO_ARTICULO!: string
    LINEA!: number
    ARTICULO!: string
    CANTIDAD!: number
    TOTAL_LINEA!: number
}

export class Factura {
    TOTAL!: number
    FECHA!: string
    NUMERO_FACTURA!: number
    USUARIO!: string
}
export class Producto {
    PRODUCTOS!: Productos[]
    ALERTA!: string
}

export class Productos {
    PRECIO!: number
    CODIGO_ARTICULO!: string
    DESCRIPCION!: string
}
