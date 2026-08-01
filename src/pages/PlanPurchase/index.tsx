import { CustomFormFieldTypes } from "@cat.in.dev/cat-ponents-react";
import { getConfigToRenderPageCommon } from "../../components/NavVarSession"
import get from 'lodash/get';

const getInfoToRenderPurchasePage = async (config: any) => {
    const Service = config["__$utils"]["http"]["service"]
    const env = config["__$env"]["env"]
    const page = config["__$page"]
    const pageParams = page["params"];
    
    const results = await Service.get(`${get(env, 'DefaultHost')}/plans/${pageParams.id}`, {
        requiresAuth: true,
        includeRefreshToken: true
    });    

    const limits = results.data.limits
    const accountant = limits.accountant

    const verifyValue = (value?: number) => {
        if([null, undefined].includes(value as any)) return 0
        else if([-1].includes(value as any)) return "Ilimitado"
        else return value
    }
    
    const registers = {
        "matrix.{9}.{2}.params.formData": {
            quantity: 1,
            price: results.data.base_price,
            currency: results.data.currency
        },
        "matrix.{9}.{2}.params.config.components.2.fields.0.config.text": `TOTAL: ${results.data.currency} ${results.data.base_price}`,
        "matrix.{28}.{2}.params.rows": [
            {
                "resource": "Presupuestos",
                "limit": verifyValue(accountant.budget)
            },
            {
                "resource": "Registrar Gastos",
                "limit": verifyValue(accountant.expenditures)
            },
            {
                "resource": "Registrar Ingresos",
                "limit": verifyValue(accountant.incomes)
            },
            {
                "resource": "Registrar Compras",
                "limit": verifyValue(accountant.purchase)
            },
            {
                "resource": "Registrar Ventas",
                "limit": verifyValue(accountant.sells)
            },
            {
                "resource": "Marcas",
                "limit": verifyValue(limits.brands)
            },
            {
                "resource": "Unidades de negocio",
                "limit": verifyValue(limits.business)
            },
            {
                "resource": "Sucursales",
                "limit": verifyValue(limits.branches)
            },
            {
                "resource": "Catalogos",
                "limit": verifyValue(limits.catalogs)
            },
            {
                "resource": "Categorias",
                "limit": verifyValue(limits.categories)
            },
            {
                "resource": "Clientes",
                "limit": verifyValue(limits.clients)
            },
            {
                "resource": "Corporate Items",
                "limit": verifyValue(limits.items)
            },
            {
                "resource": "Usuarios",
                "limit": verifyValue(limits.users)
            }
        ]
    }

    return registers
}

export const RenderPlanPurchasePage = () => {
    return {
        getConfig: async (config: any) => ({...await getConfigToRenderPageCommon(config), ...await getInfoToRenderPurchasePage(config)}),
        dev: false,
        columns: 50,
        type: "matrix",                                    
        unitaryCellH: 30,
        unitaryCellW: 75,
        strictScreen: true,
        rows: 75,
        matrix: {
            "{0}": {
                "{0}": {
                    componentType: "NAVBAR",
                    endColumn: 49,
                    endRow: 1,
                    id: "navbar",
                    params: {}
                }
            },
            "{3}": {
                "{2}": {
                    endRow: 8,
                    endColumn: 15,
                    component: <h1>ADQUIRIR PLAN CATALO</h1>
                }
            },
            "{9}": {
                "{2}": {
                    endColumn: 49,
                    endRow: 25,
                    id: "catalo-plans-table-components",
                    componentType: 'FORM',
                    params: {
                        formData: {},
                        config: {
                            title: "Compra",
                            id: "purchase-plan-form",
                            components: [
                                {
                                    size: 12,
                                    type: 'row',
                                    fields: [
                                        {
                                            type: CustomFormFieldTypes.Data, 
                                            config: { 
                                                label: 'Cantidad a suscribir',
                                                disposition: 'row',
                                                onChange: (params: any) => {
                                                    const dispatcher = get(params, "__$utils.event.dispatch");
                                                    const basePrice = +get(params, '__$params.data.price');
                                                    const quantity = +get(params, '__$params.data.quantity');
                                                    const currency = get(params, '__$params.data.currency');

                                                    dispatcher({
                                                        eventName: "total-subscription-update-text",
                                                        eventParams: {
                                                            text: `TOTAL: ${currency} ${basePrice*quantity}`
                                                        }
                                                    })
                                                },
                                                validator: [
                                                    {
                                                        $regex: {
                                                            validate: '^(?:[1-9]|[1-9][0-9])$',
                                                            message: "Cantidad permitida entre 1 y 99"
                                                        }
                                                    },
                                                    {
                                                        $emptyValue: {
                                                            validate: null,
                                                            message: "*Este campo es obligatorio"
                                                        }
                                                    }
                                                ],
                                                notNull: true,
                                                prop: 'quantity',
                                                type: 'number',
                                                size: 2,
                                                range: {
                                                    min: 1,
                                                    max: 99
                                                },
                                            } 
                                        },
                                        {
                                            type: CustomFormFieldTypes.Data,
                                            config: {
                                                disposition: "row",
                                                type: "options",
                                                label: "Metodo de pago",
                                                prop: "payment_method_selected",
                                                orientation: "containered",
                                                selection: "single",
                                                validator: [
                                                    {
                                                        $emptyValue: {
                                                            message: "*",
                                                            validate: null
                                                        }
                                                    }
                                                ],
                                                notNull: true,
                                                size: 2,
                                                options: [
                                                ]
                                            },
                                            getConfig: async (config: any) => {
                                                const Service = config["__$utils"]["http"]["service"]
                                                const env = config["__$env"]["env"]
                                                const methods = await Service.get(`${get(env, 'DefaultHost')}/payment-methods/preview`, {
                                                    requiresAuth: true,
                                                    includeRefreshToken: true
                                                });

                                                const methodOptions = methods.data.map((r: any) => ({ label: r.name, value: r._id }))

                                                return {
                                                    "options": [{label: "Crear Nuevo", value: "create"}, ...methodOptions]
                                                }
                                            }
                                        }
                                    ],
                                },
                                {
                                    prop: "payment_method_form",
                                    size: 12,
                                    title: "Crear Metodo de Pago",
                                    container: { 
                                        type: "modal", 
                                        config: {
                                            buttonConfig: {
                                                size: 4,
                                                variant: "outlined",
                                                title: "Crear Metodo de Pago",
                                                height: "large",
                                                color: {
                                                    code: "#475569"
                                                },
                                                icon: {
                                                    position: "start",
                                                    name: "CreditCard"
                                                }
                                            },
                                            routeConfig: () => {                         
                
                                                let queryParamSet = "create";
                
                                                return {    
                                                    replace: false,
                                                    queryParams: {
                                                        "payment-method": queryParamSet
                                                    },
                                                    autoOpen: {
                                                        for: "query", def: { "payment-method": [queryParamSet] }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    fields: [
                                        {
                                            type: 'data',
                                            config: {
                                                type: 'stripe',
                                                prop: 'payment',
                                                label: 'Datos de Pago',
                                                size: 4,
                                                notNull: true,
                                                hidePostalCode: true
                                            }                                            
                                        }
                                    ]
                                },
                                {
                                    size: 12,
                                    type: 'row',
                                    fields: [
                                        {
                                            type: CustomFormFieldTypes.Subtitle, 
                                            config: { 
                                                id: "total-subscription",
                                                text: ""
                                            } 
                                        },
                                        {
                                            type: CustomFormFieldTypes.SubmintButton, 
                                            config: { 
                                                id: "submit-subscription",
                                                title: "Confimar Subscripción",
                                                variant: "contained",
                                                color: {
                                                    code: "#4e946a",
                                                    hoverCode: "#475569"
                                                },
                                                icon: {
                                                    position: "start",
                                                    name: "BookmarkAdd"
                                                },
                                                size: 4,
                                                action: {
                                                    callback: (config: any) => {
                                                        console.log(config);
                                                    }
                                                }
                                            } 
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            "{28}": {
                "{2}": {
                    endColumn: 48,
                    endRow: 75,
                    id: "catalo-plans-table-components",
                    componentType: 'TABLE',
                    params: { 
                        id: "catalo-plans-table",
                        title: "Limites Adquiridos",
                        rows: [],
                        searchable: true,
                        orderable: true,
                        columns: [
                            {id: 'resource', label: 'Recurso'}, 
                            {id: 'limit', label: 'Limite'}, 
                        ]
                    }
                }
            }
        }
    }
}