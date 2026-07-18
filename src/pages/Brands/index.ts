import { CustomFormFieldTypes } from "@cat.in.dev/cat-ponents-react"
import { getConfigToRenderPageCommon } from "../../components/NavVarSession"
import { BussinessUnitCrudConfig } from "../BussinessUnit";
import get from 'lodash/get'
import { CorporateItemsCrudConfig } from "../Corporate-Items";

export const RenderBrandsPage = () => {
    return {
        getConfig: getConfigToRenderPageCommon,
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
                    endColumn: 48,
                    endRow: 75,
                    id: "card-1",
                    componentType: 'FORM',
                    params: { 
                        config: {
                            title: "Marcas",
                            components: [
                                {
                                    fields: [
                                        { 
                                            type: 'crud' as CustomFormFieldTypes.Crud, 
                                            config: { 
                                                formConfig: {
                                                    id: "brands-crud",
                                                    title: 'Crear Marca',
                                                    components: [
                                                        { 
                                                            prop: "brandForm",
                                                            fields: [
                                                                {
                                                                    type: CustomFormFieldTypes.Data,
                                                                    config: {
                                                                        disposition: "row",
                                                                        type: "text",
                                                                        label: "Nombre de la marca",
                                                                        prop: "brandName",
                                                                        placeholder: "Ej: Pan Quetzal",
                                                                        validator: [
                                                                            {
                                                                                $regex: {
                                                                                    validate: "^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\\s.,;:()&/%-]{5,500}$",
                                                                                    message: "Debes proporcionar un nombre válido"
                                                                                },
                                                                            },
                                                                            {
                                                                                $emptyValue: {
                                                                                    message: "*",
                                                                                    validate: null
                                                                                }
                                                                            }
                                                                        ],
                                                                        notNull: true,
                                                                        size: 2,
                                                                        editable: true
                                                                    }
                                                                }, 
                                                                { 
                                                                    type: CustomFormFieldTypes.Data, 
                                                                    config: { 
                                                                        label: 'Describenos tu marca, la marca es la identidad de tus productos, tu corporación puede tener muchas marcas, despues podras crear muchas más marcas y unidades de negocio.',
                                                                        disposition: 'row',
                                                                        notNull: true,
                                                                        prop: 'brandDescription',
                                                                        type: 'textarea',
                                                                        validator: [
                                                                            {
                                                                                $regex: {
                                                                                    validate: "^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\\s.,;:()&/%-]{10,500}$",
                                                                                    message: "Debes proporcionar una descripción válida"
                                                                                },
                                                                                $emptyValue: {
                                                                                    validate: null,
                                                                                    message: "*"
                                                                                }
                                                                            }
                                                                        ],
                                                                        size: 2,
                                                                        editable: true
                                                                    } 
                                                                },
                                                                { 
                                                                    type: CustomFormFieldTypes.Data, 
                                                                    config: {                       
                                                                        type: 'files',  
                                                                        fileTypes: "image/*", 
                                                                        label: "Elige un logo para tu marca",
                                                                        prop: "brandLogo",
                                                                        validator: [
                                                                            {
                                                                                $regex: {
                                                                                    validate: "::\\(length\\)\\[1\\]::",
                                                                                    message: "Solo puedes cargar 1 imagen"
                                                                                }
                                                                            }
                                                                        ],
                                                                        multiple: false,
                                                                        notNull: true,
                                                                        size: 4,
                                                                        editable: true
                                                                    },    
                                                                }
                                                            ], 
                                                            type: 'col',
                                                            size: 12
                                                        },
                                                        {
                                                            prop: "bussiness",
                                                            size: 12,
                                                            title: "Unidades de negocio",
                                                            container: { 
                                                                type: "modal", 
                                                                config: {
                                                                    buttonConfig: {
                                                                        size: 4,
                                                                        variant: "outlined",
                                                                        title: "Unidades de negocio",
                                                                        height: "large",
                                                                        color: {
                                                                            code: "#475569"
                                                                        },
                                                                        icon: {
                                                                            position: "start",
                                                                            name: "Cases"
                                                                        }
                                                                    },
                                                                    routeConfig: (config: any) => {
                                                                        const page = config["__$page"];
                                                                        const brandAction = page["query"]["brand-action"]

                                                                        let queryParamSet = "modal";

                                                                        if (brandAction==="edit") queryParamSet = "add"
                                                                        else if (brandAction==="view") queryParamSet = "view"
                                                                        else queryParamSet = "create"
                                                                        
                                                                        console.log(queryParamSet);

                                                                        return {    
                                                                            replace: false,
                                                                            queryParams: {
                                                                                "brand-business": queryParamSet
                                                                            },
                                                                            autoOpen: {
                                                                                for: "query", def: { "brand-business": [queryParamSet] }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            fields: [
                                                                BussinessUnitCrudConfig()
                                                            ]
                                                        },
                                                        {
                                                            prop: "items",
                                                            size: 12,
                                                            title: "Corporate Items (Productos/Servicios/Activos)",
                                                            container: { 
                                                                type: "modal", 
                                                                config: {
                                                                    buttonConfig: {
                                                                        size: 4,
                                                                        variant: "outlined",
                                                                        title: "Items (Productos/Servicios/Activos)",
                                                                        height: "large",
                                                                        color: {
                                                                            code: "#475569"
                                                                        },
                                                                        icon: {
                                                                            position: "start",
                                                                            name: "SmartToy"
                                                                        }
                                                                    },
                                                                    routeConfig: (config: any) => {
                                                                        const page = config["__$page"];
                                                                        const brandAction = page["query"]["brand-action"]

                                                                        let queryParamSet = "modal";

                                                                        if (brandAction==="edit") queryParamSet = "add"
                                                                        else if (brandAction==="view") queryParamSet = "view"
                                                                        else queryParamSet = "create"
                                                                    

                                                                        return {    
                                                                            replace: false,
                                                                            queryParams: {
                                                                                "brand-items": queryParamSet
                                                                            },
                                                                            autoOpen: {
                                                                                for: "query", def: { "brand-items": [queryParamSet] }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            fields: [
                                                                CorporateItemsCrudConfig()
                                                            ]
                                                        }
                                                    ],
                                                    prop: 'brandsCrud'
                                                },
                                                queryRoute: { action: "brand-action", id: "brand-id" },
                                                getRowData: (async (config: any) => {

                                                    const env = config["__$env"]["env"]
                                                    const params = config["__$params"]
                                                    const service = config["__$utils"]["http"]["service"]
                                                    const route = config["__$page"];

                                                    const brandId = params["_id"] || route["query"]["brand-id"];

                                                    const serviceURL = env["DefaultHost"];
                                                    const results = await service.get(`${serviceURL}/brand/${brandId}`, {
                                                        requiresAuth: true,
                                                        includeRefreshToken: true
                                                    });

                                                    return {
                                                        "__formHasError__": false, 
                                                        "brandsCrud.brandForm.brandName": results?.data?.name, 
                                                        "brandsCrud.brandForm.brandDescription": results?.data?.description, 
                                                        "brandsCrud.brandForm.brandLogo": [ { content: results?.data?.media.logo, metadata: { type: "image/webp" } } ]                                                        
                                                    }
                                                }),
                                                tableConfig: {
                                                    columns: [
                                                        {
                                                            id: ["name", "brandsCrud.brandForm.brandName"],
                                                            label: "Marca"
                                                        },
                                                        {
                                                            id: ["created_at"],
                                                            label: "Creado"
                                                        }
                                                    ],                                            
                                                    rowActions: {
                                                        columnName: "Acciones",
                                                        actions: [
                                                            
                                                        ]
                                                    },
                                                    searchable: true
                                                },                                        
                                                entityName: "items",
                                                rows: async(config: any) => {
                                                    const filter = get(config, "__$params.filter", {});
                                                    const size = get(config, "__$params.size", {});
                                                    const page = get(config, "__$params.page", {});
                                                    const env = config["__$env"]["env"]
                                                    const serviceURL = env["DefaultHost"];
                                                    const service = config["__$utils"]["http"]["service"]
                                                    const results = await service.get(`${serviceURL}/brand?filter=${encodeURIComponent(JSON.stringify({...filter, page, size}))}`, {
                                                        requiresAuth: true,
                                                        includeRefreshToken: true
                                                    });

                                                    return { 
                                                        rows: results?.data?.results || [],
                                                        length: results?.data?.counts || 0
                                                    }
                                                },
                                                onDeleteRegister: async (config: any) => {
                                                    const env = config["__$env"]["env"]
                                                    const serviceURL = env["DefaultHost"];
                                                    const service = config["__$utils"]["http"]["service"]
                                                    const brandId = get(config, "__$params.data._id");

                                                    if(!brandId) return

                                                    await service.delete(`${serviceURL}/brand/${brandId}`, {
                                                        requiresAuth: true,
                                                        includeRefreshToken: true
                                                    });
                                                },
                                                saveButton: {
                                                    size: 4,
                                                    variant: "contained",
                                                    height: "large",
                                                    color: {
                                                        code: "#4e946a",
                                                        hoverCode: "#475569"
                                                    },
                                                    action: {
                                                        prev: () => {},
                                                        callback: async (config: any) => {
                                                            const env = config["__$env"]["env"]
                                                            const serviceURL = env["DefaultHost"];
                                                            const service = config["__$utils"]["http"]["service"]

                                                            const route = config["__$page"];
                                                            const brandId = route["query"]["brand-id"];
                                                            const brandAction = route["query"]["action"];
                                                            const data = config["__$params"]["data"]

                                                            if(!brandId) {
                                                                const response = await service.post(`${serviceURL}/brand`, data, {
                                                                    requiresAuth: true,
                                                                    includeRefreshToken: true
                                                                });
                                                                return response.data;
                                                            } else if (brandAction === "edit" && brandId) {
                                                                const response = await service.patch(`${serviceURL}/brand/${brandId}`, data, {
                                                                    requiresAuth: true,
                                                                    includeRefreshToken: true
                                                                });
                                                                return response.data
                                                            }
                                                        },
                                                        onSuccess: () => {},
                                                        onError: () => {}
                                                    },
                                                    icon: {
                                                        name: "Save"
                                                    }
                                                },
                                                prop: "brands",
                                                formData: {}
                                            }
                                        }
                                    ], 
                                    size: 12,
                                    type: 'row'
                                }
                            ]
                        },
                        getFormData: (async () => {
                            await new Promise(resolve => setTimeout(resolve, 2))
                            return { 
                            }
                        })
                    }
                }
            }
        }
    }
}