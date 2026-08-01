import { CustomFormFieldTypes } from "@cat.in.dev/cat-ponents-react";
import get from 'lodash/get';
import { getConfigToRenderPageCommon } from "../../components/NavVarSession"

export const getEntitiesConfigForItems = async (config: any) => {
    const Service = config["__$utils"]["http"]["service"]
    const env = config["__$env"]["env"]

    const results = await Service.get(`${get(env, 'DefaultHost')}/brand`, {
        requiresAuth: true,
        includeRefreshToken: true
    });

    return {
        "matrix.{3}.{2}.params.config.components.0.fields.0.config.formConfig.components.0.fields.0.config.options": results.data.results.map((r: any) => ({ label: r.name, value: r._id }))
    }
}

const entitiesSelectorsForm = ([
    {
        type: CustomFormFieldTypes.Data,
        config: {
            disposition: "row",
            type: "options",
            label: "Marca Propietaria",
            prop: "brand_id",
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
            size: 4,
            options: [
            ]
        }
    },
])

export const CorporateItemsCrudConfig = (useEntitiesSelector = false) => ({
    type: 'crud' as CustomFormFieldTypes.Crud, 
    config: { 
        formConfig: {
            id: "corporate-items-crud",
            title: 'Crear Corporate Item',
            prop: 'corporateItemsCrud', 
            components: [
                { 
                    prop: "corporateItemsForm",
                    fields: [
                        ...(useEntitiesSelector ? entitiesSelectorsForm : []),
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "text",
                                label: "Nombre del item",
                                prop: "name",
                                placeholder: "Ej: Bateria de 9 volteos",
                                validator: [
                                    {
                                        $regex: {
                                            validate: "^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\\s.,;:()&/%-]{3,500}$",
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
                                size: 4
                            }
                        },
                        { 
                            type: CustomFormFieldTypes.Data, 
                            config: { 
                                label: 'Descripción del item',
                                disposition: 'row',
                                notNull: true,
                                prop: 'description',
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
                                size: 4,
                                editable: true
                            } 
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "options",
                                label: "Tipo de item",
                                prop: "type",
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
                                size: 1.96,
                                options: [
                                    { label: "Producto", value: "product" },
                                    { label: "Servicio", value: "service" },
                                    { label: "Material", value: "material" },
                                    { label: "Paquete", value: "bundle" },
                                ]
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "col",
                                type: "options",
                                label: "Estado del item",
                                prop: "status",
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
                                size: 1.96,
                                options: [
                                    { label: "Habilitado", value: "enabled" },
                                    { label: "Deshabilitado", value: "disabled" },
                                ]
                            }
                        },                        
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "text",
                                label: "SKU",
                                prop: "sku",
                                placeholder: "Ej: PQ-12AV-001",
                                validator: [
                                    {
                                        $regex: {
                                            validate: "^[A-Za-z0-9\\s\\-]{1,100}$",
                                            message: "Debes proporcionar un SKU válido"
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
                                size: 1.96
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "col",
                                type: "text",
                                label: "Código de barras",
                                prop: "barcode",
                                placeholder: "Ej: 7501234567890",
                                validator: [
                                    {
                                        $regex: {
                                            validate: "^[0-9]{8,14}$",
                                            message: "Debes proporcionar un código de barras válido"
                                        },
                                    }
                                ],
                                notNull: false,
                                size: 1.96
                            }
                        },                        
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "files",
                                fileTypes: "image/*",
                                label: "Imágenes del item",
                                prop: "images",
                                validator: [
                                    {
                                        $regex: {
                                            validate: "::\\(length\\)\\[(?:[1-9]|\\d{2,})\\]::",
                                            message: "Debes cargar entre 1 y 9 imágenes"
                                        }
                                    }
                                ],
                                multiple: true,
                                notNull: false,
                                size: 4,
                                editable: true
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "number",
                                label: "Costo (Compra)",
                                prop: "cost",
                                placeholder: "0.00",
                                validator: [
                                    {
                                        $emptyValue: {
                                            message: "*",
                                            validate: null
                                        }
                                    }
                                ],
                                notNull: true,
                                size: 1.96,
                                range: {
                                    min: 0
                                }
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "col",
                                type: "number",
                                label: "Precio (Venta)",
                                prop: "price",
                                placeholder: "0.00",
                                validator: [],
                                notNull: false,
                                size: 1.96,
                                range: {
                                    min: 0
                                }
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "number",
                                label: "Peso (g)",
                                prop: "weight",
                                placeholder: "Gramos",
                                validator: [],
                                notNull: false,
                                size: 1,
                                range: {
                                    min: 0
                                }
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "col",
                                type: "number",
                                label: "Altura (cm)",
                                prop: "height",
                                placeholder: "Centímetros",
                                validator: [],
                                notNull: false,
                                size: 1,
                                range: {
                                    min: 0
                                }
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "number",
                                label: "Ancho (cm)",
                                prop: "width",
                                placeholder: "Centímetros",
                                validator: [],
                                notNull: false,
                                size: 1,
                                range: {
                                    min: 0
                                }
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "col",
                                type: "number",
                                label: "Profundidad (cm)",
                                prop: "depth",
                                placeholder: "Centímetros",
                                validator: [],
                                notNull: false,
                                size: 1,
                                range: {
                                    min: 0
                                }
                            }
                        }                        
                    ], 
                    type: 'col',
                    size: 12
                }
            ],            
        },
        getRowData: (async (config: any) => {
            const env = config["__$env"]["env"]
            const params = config["__$params"]
            const service = config["__$utils"]["http"]["service"]
            const route = config["__$page"];

            const itemId = params["_id"] || route["query"]["item-id"];

            const serviceURL = env["DefaultHost"];
            const results = await service.get(`${serviceURL}/item/${itemId}`, {
                requiresAuth: true,
                includeRefreshToken: true
            });

            const data = results?.data;

            return {
                "__formHasError__": false, 
                "corporateItemsCrud.corporateItemsForm.name": data?.name,                                                     
                "corporateItemsCrud.corporateItemsForm.description": data?.description,                                                     
                "corporateItemsCrud.corporateItemsForm.sku": data?.sku,                                                     
                "corporateItemsCrud.corporateItemsForm.barcode": data?.barcode,
                "corporateItemsCrud.corporateItemsForm.type": data?.type,
                "corporateItemsCrud.corporateItemsForm.status": data?.status,
                "corporateItemsCrud.corporateItemsForm.images": data?.media?.images?.map((img: any) => ({
                    content: img.image,
                    title: `imagen.${img.ext}`,
                    metadata: { type: `image/${img.ext}` }
                })) || [],
                "corporateItemsCrud.corporateItemsForm.weight": data?.seo?.weight,
                "corporateItemsCrud.corporateItemsForm.height": data?.seo?.height,
                "corporateItemsCrud.corporateItemsForm.width": data?.seo?.width,
                "corporateItemsCrud.corporateItemsForm.depth": data?.seo?.depth,
                "corporateItemsCrud.corporateItemsForm.price": data?.price,
                "corporateItemsCrud.corporateItemsForm.cost": data?.cost,
            }
        }),
        tableConfig: {
            columns: [
                {
                    id: ["name", "corporateItemsCrud.corporateItemsForm.name"],
                    label: "Nombre"
                },
                {
                    id: ["sku", "corporateItemsCrud.corporateItemsForm.sku"],
                    label: "SKU"
                },
                {
                    id: ["type", "corporateItemsCrud.corporateItemsForm.type"],
                    label: "Tipo"
                },
                {
                    id: ["price", "corporateItemsCrud.corporateItemsForm.price"],
                    label: "Precio"
                },
                {
                    id: ["status", "corporateItemsCrud.corporateItemsForm.status"],
                    label: "Estado"
                },
                {
                    id: ["created_at"],
                    label: "Creado"
                }
            ],                                            
            rowActions: {
                columnName: "actions",
                actions: [
                    
                ]
            },
            searchable: true,            
        },                                        
        entityName: "items",
        queryRoute: { action: "item-action", id: "item-id" },
        rows: async (config: any) => {
            const filter = get(config, "__$params.filter", {});
            const pageSize = get(config, "__$params.size", {});
            const pageNumer = get(config, "__$params.page", {});

            const env = config["__$env"]["env"]
            const serviceURL = env["DefaultHost"];
            const service = config["__$utils"]["http"]["service"]
            const page = config["__$page"];

            const brandId = page["query"]["brand-id"];

            if (!brandId) {
                return {
                    rows: [],
                    length: 0
                }
            }

            const results = await service.get(`${serviceURL}/brand/${brandId}/items?filter=${encodeURIComponent(JSON.stringify({...filter, page: pageNumer, size: pageSize}))}`, {
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
            const itemId = get(config, "__$params.data._id");

            if(!itemId) return

            await service.delete(`${serviceURL}/item/${itemId}`, {
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
                prev: ({}) => {},
                callback: (params: any) => {
                    console.log(params);
                },
                onSuccess: async (config: any) => {
                    const env = config["__$env"]["env"]
                    const serviceURL = env["DefaultHost"];
                    const service = config["__$utils"]["http"]["service"]
                    const page = config["__$page"];
                    const pageQuery = page["query"];

                    const brandId = pageQuery["brand-id"];     
                    const itemAction = pageQuery["item-action"];   
                    const itemId = pageQuery["item-id"];

                    const data = config["__$params"]["data"]

                    const payload = {
                        name: data.name,
                        description: data.description,
                        sku: data.sku,
                        barcode: data.barcode || undefined,
                        type: data.type,
                        status: data.status,
                        media: {
                            images: data.images?.map((img: any) => ({
                                ext: img.metadata?.type?.split("/")[1] || "webp",
                                image: img.content
                            })) || []
                        },
                        seo: {
                            weight: data.weight || undefined,
                            height: data.height || undefined,
                            width: data.width || undefined,
                            depth: data.depth || undefined,
                        },
                        price: data.price || undefined,
                        cost: data.cost,
                    }

                    if(!itemAction && brandId) {
                        const response = await service.post(`${serviceURL}/brand/${brandId}/item`, payload, {
                            requiresAuth: true,
                            includeRefreshToken: true
                        });
                        return response.data
                    }

                    if (itemAction === "edit" && itemId) {
                        const response = await service.patch(`${serviceURL}/item/${itemId}`, payload, {
                            requiresAuth: true,
                            includeRefreshToken: true
                        });
                        return response.data
                    }
                },
                onError: () => {}
            },
            icon: {
                name: "Save"
            }
        },
        prop: "corporate-items",
        formData: {}
    }
})

export const RenderCorporateItemsPage = () => {
    return {
        getConfig: async (...params: any[]) => ({...await getConfigToRenderPageCommon(params[0]), ...await getEntitiesConfigForItems(params[0])}),
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
                            title: "Corporate Items (Productos/Servicios/Activos)",
                            components: [
                                {
                                    fields: [
                                        CorporateItemsCrudConfig(true)
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