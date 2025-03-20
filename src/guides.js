export const guides = {
    almacenes: [
        {
            id: "altacombokits",
            titulo: "Alta de nuevos productos en combo o kits",
            requerimientos: "Que los “insumos” o “elementos del combo o kit o receta” este dados de alta.",
            pasos:[
                "1)	Ir a Módulo de Almacenes",
                "2)	Ir a la Sección de Catálogos / y elegir la opción de Productos",
                "3)	Click en “Nuevo”",
                "4) Capturar",
                    "   a.	(Obligatorio) Clave",
                    "   b.	(Opcional) Elegir la categoría (el sistema automáticamente elegirá Categoria:Todos)",
                    "   c.	(Obligatorio) Seleccionar una clave del catálogo SAT en ...",
                    "   d.	(Obligatorio) Seleccionar una clave de unidad del catálogo SAT en ...",
                    "   e.	(Opcional)	Capturar el Precio público",
                    "   f.	(Opcional)	Capturar Unidad",
                "El sistema automáticamente configurara el producto con",
                "   1.	Tasa del 16% de IVA",
                "   2.	Disponible para venta",
                "   3.	Activo",
                "5)	Click en la opción de “Es kit”",
                "6)	Capturar los “insumos o elementos del combo, kit o receta” del producto",
                "7)	Capturar los “insumos o elementos del combo, kit o receta” del producto",
                "8)	Guardar"
            ],
            imagenes: [
                "https://i.postimg.cc/NMKwDSCj/paso1-altadenuevosproductosencombookits.png",
                "https://i.postimg.cc/RZGFDrd7/paso2-eskit.png"
            ],
            video: [
                "https://www.youtube.com/watch?v=_zOZls5NIr8&ab_channel=STACION"
            ]
        },
        {
            id: "altanuevosproductos",
            titulo:"Alta de nuevos productos",
            requerimientos:"Ninguno",
            pasos:[
                "1)	Ir a Módulo de Almacenes",
                "2)	Ir a la Sección de Catálogos / y elegir la opción de Productos",
                "3)	Click en “Nuevo”",
                "4)	Capturar",
                "   a.	(Obligatorio) 	Clave",
                "   b.	(Opcional)	Elegir la categoría (el sistema automáticamente elegirá Categoria:Todos) ",
                "   c.	(Obligatorio)	Seleccionar una clave del catálogo SAT en ",
                "   d.	(Obligatorio) 	Seleccionar una clave de unidad del catálogo SAT en  ",
                "   e.	(Opcional)	Capturar el Precio público",
                "   f.	(Opcional)	Capturar Unidad",
                "El sistema automáticamente configurara el producto con",
                "   1.	Tasa del 16% de IVA",
                "   2.	Disponible para venta",
                "   3.	Activo",
                "5)	Guardar", 

            ],
            imagenes: [
                "https://i.postimg.cc/NMKwDSCj/paso1-altadenuevosproductosencombookits.png"
            ],
            video: [
                ""
            ]
        },
        {
            id: "cancelacionfacturas",
            titulo:"Hacer cancelaciones de facturas",
            requerimientos:"Que exista una factura, nota de crédito o complemento de pago emitido y vigente en SAT.",
            pasos:[
                "1)	Ir a Módulo de Ventas",
                "2)	Ir a la Sección de Informes / y elegir la opción de Comprobantes, aparecen las facturas o notas de crédito del día.",
                "3)	En la opción de Buscar elegir el periodo o la fecha a buscar del Cfdi a cancelar.",
                "4)	Elegir el Cfdi a cancelar y con botón derecho del mouse, elegir la opción de Cancelar CFDI",
                "•	Si el Cfdi es Público en General se cancelara de manera inmediata",
                "•	Si el Cfdi es para alguien con RFC diferente a Público en General, si es menor de $5,000 pesos se cancelará de manera inmediata",
                "•	Si el Cfdi es mayor a $5,000 pesos y tiene más de 72 horas de emitido, el sistema lo pondrá en “proceso de cancelación” y el SAT enviará por Buzón al correo del RFC receptor la alerta de documento en proceso de cancelación. Si el cliente en 72 horas no lo revisa, el Cfdi se podrá cancelar definitivamente.",
                "5)	(Opcional) Cuando se quiere revisar el estatus de un Cfdi, hacer el paso 3 y 4, y elegir la opción de “Revisar estatus”, lo cual el sistema revisara si fue “aceptada o no la cancelación por el RFC Receptor o si fue omitida en su revisión”.",
                "6)	El sistema pondrá el estatus al documento de Cancelado y cambiara de color a “Rojo”.",
            ],
            video: [

            ]
        },
        {
            id: "",
            titulo:"",
            requerimientos:"",
            pasos:[

            ],
            imagenes: [

            ],
            video: [

            ]
        },
        {
            id: "",
            titulo:"",
            requerimientos:"",
            pasos:[

            ],
            imagenes: [

            ],
            video: [

            ]
        },
        {
            id: "",
            titulo:"",
            requerimientos:"",
            pasos:[

            ],
            imagenes: [

            ],
            video: [

            ]
        }

    ],

    compras: [
        {
            id: "altaproveedores",
            titulo:"Alta de proveedores",
            requerimientos:"Ninguno",
            pasos:[
                "1)	Ir a Módulo de Compras",
                "2)	Ir a la Sección de Catálogos / y elegir la opción de Proveedores",
                "3)	Click en “Nuevo”",
                "4)	Capturar",
                "a.	(Obligatorio) 	RFC",
                "b.	(Obligatorio) 	Nombre / Razón social",
                "c.	(Obligatorio) 	Método de pago (PUE o PPD)",
                "d.	(Opcional)	Calle",
                "e.	(Opcional)	No. Exterior ",
                "f.	(Opcional)	No. Interior",
                "g.	(Opcional)	C.P. y “click” en ...",
                "h.	(Opcional)	Colonia",
                "i.	(Opcional)	Localidad",
                "j.	(Opcional)	Estado",
                "k.	(Opcional)	País: MEX",
                "l.	(Opcional)	Correo electrónico",
                "m.	(Opcional)	Teléfono",
                "n.	(Opcional)	Cualquier otro dato que aparezca. ",
                "5)	Guardar",
            ],
            imagenes: [
                "https://i.postimg.cc/kgRbJ38x/paso1altaprove.png"
            ],
            video: [

            ]
        },
        {
            id: "ordenescompra",
            titulo:"Hacer ordenes de compra",
            requerimientos:[
                "Tener dado de alta el proveedor.",
                "Tener dados de alta los productos, conocer su precio-proveedor"
            ],
            pasos:[
                "1)	Ir a Módulo de Compras",
                "2)	Ir a la Sección de Operaciones / y elegir la opción de Orden de Compra",
                "3)	Elegir la operación de Orden de Compra",
                "4)	Elegir el Proveedor",
                "5)	Capturar el o los Productos",
                "a.	(Obligatorio) 	Clave o Descripción del producto",
                "b.	(Obligatorio) 	Cantidad",
                "c.	(Obligatorio) 	Precio o Costo del Producto ",
                "6)	Generar (el sistema generara un documento)",
            ],
            imagenes: [
                "https://i.postimg.cc/9F5kcVvh/paso1ordenescompra.png"
            ],
            video: [

            ]
        },
    ],

    modulo1: [
        {
            id: "ejemplo1",
            titulo:"Guía 1",
            requerimientos:"...",
            pasos:[
"..."
            ],
            imagenes: [

            ],
            video: [

            ]
        },
        {
            id: "ejemplo2",
            titulo:"Guía 2",
            requerimientos:"...",
            pasos:[
                "..."
            ],
            imagenes: [

            ],
            video: [

            ]
        }
    ],
    modulo2: [
        {
            id: "ejemplo1",
            titulo:"Guía 1",
            requerimientos:"...",
            pasos:[
"..."
            ],
            imagenes: [

            ],
            video: [

            ]
        },
        {
            id: "ejemplo2",
            titulo:"Guía 2",
            requerimientos:"...",
            pasos:[
                "..."
            ],
            imagenes: [

            ],
            video: [

            ]
        }
    ]
};

export default guides;