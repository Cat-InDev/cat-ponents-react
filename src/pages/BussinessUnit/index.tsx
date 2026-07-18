import { CustomFormFieldTypes } from "@cat.in.dev/cat-ponents-react";
import { BranchesCrudConfig } from "../Branches";
import get from 'lodash/get'

export const BussinessUnitCrudConfig = () => ({
    type: 'crud' as CustomFormFieldTypes.Crud, 
    config: { 
        formConfig: {
            id: "business-unit-crud",
            title: 'Crear Unidad de Negocio',
            prop: 'bussinessCrud',
            components: [
                { 
                    prop: "bussinessForm",
                    fields: [
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "text",
                                label: "Nombre de la unidad de negocio",
                                prop: "bussinessName",
                                placeholder: "Ej: Cafeteria",
                                validator: [
                                    {
                                        $regex: {
                                            validate: "^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\\s.,;:()&/%-]{5,100}$",
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
                                size: 2
                            }
                        }, 
                        { 
                            type: CustomFormFieldTypes.Data, 
                            config: { 
                                label: 'Describenos tu unidad de negocio.',
                                disposition: 'row',
                                notNull: true,
                                prop: 'bussinessDescription',
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
                                disposition: "row",
                                type: "options",
                                label: "Tipo de negocio",
                                prop: "businessType",
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
                                    { label: "Hotel", value: "hotel" },
                                    { label: "Restaurant", value: "restaurant" },
                                    { label: "Tienda", value: "store" },
                                    { label: "Servicios", value: "service" },
                                ]
                            }
                        },
                        { 
                            type: CustomFormFieldTypes.Data, 
                            config: {                       
                                type: 'files',  
                                fileTypes: "image/*", 
                                label: "Elige un logo para tu unidad de negocio",
                                prop: "businessLogo",
                                validator: [
                                    {
                                        $regex: {
                                            validate: "::\\(length\\)\\[1\\]::",
                                            message: "Solo puedes cargar 1 imagen"
                                        }
                                    }
                                ],
                                multiple: false,
                                notNull: false,
                                editable: true,
                                size: 4
                            },    
                        }
                    ], 
                    type: 'col',
                    size: 12
                },
                {
                    prop: "branches",
                    size: 12,
                    title: "Sucursales por unidad de negocio",
                    container: { 
                        type: "modal", 
                        config: {
                            buttonConfig: {
                                size: 4,
                                variant: "outlined",
                                title: "Sucursales del negocio",
                                height: "large",
                                color: {
                                    code: "#475569"
                                },
                                icon: {
                                    position: "start",
                                    name: "Store"
                                }
                            },
                            routeConfig: (config: any) => {                               
                                const page = config["__$page"];
                                const action = page["query"]["business-action"]

                                let queryParamSet = "modal";

                                if (action==="edit") queryParamSet = "add"
                                else if (action==="view") queryParamSet = "view"
                                else queryParamSet = "create"

                                return {    
                                    replace: false,
                                    queryParams: {
                                        "business-branch": queryParamSet
                                    },
                                    autoOpen: {
                                        for: "query", def: { "business-branch": [queryParamSet] }
                                    }
                                }
                            }
                        }
                    },
                    fields: [
                        BranchesCrudConfig()
                    ]
                }
            ],            
        },
        getRowData: (async (config: any) => {
            const env = config["__$env"]["env"]
            const params = config["__$params"]
            const service = config["__$utils"]["http"]["service"]
            const route = config["__$page"];

            const businessId = params["_id"] || route["query"]["business-id"];

            const serviceURL = env["DefaultHost"];
            const results = await service.get(`${serviceURL}/business-unit/${businessId}`, {
                requiresAuth: true,
                includeRefreshToken: true
            });

            return {
                "__formHasError__": false, 
                "bussinessCrud.bussinessForm.bussinessName": results?.data?.name, 
                "bussinessCrud.bussinessForm.businessType": results?.data?.type, 
                "bussinessCrud.bussinessForm.bussinessDescription": results?.data?.description, 
                "bussinessCrud.bussinessForm.businessLogo": [ { content: results?.data?.media.logo, metadata: { type: "image/webp" } } ]                                                        
            }
        }),
        tableConfig: {
            columns: [
                {
                    id: ["name", "bussinessCrud.bussinessForm.bussinessName"],
                    label: "Unidad de negocio"
                },
                {
                    id: ["type", "bussinessCrud.bussinessForm.businessType"],
                    label: "Tipo"
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
            searchable: true
        },           
        queryRoute: { action: "business-action", id: "business-id" },
        rows: async(config: any) => {
            const filter = get(config, "__$params.filter", {});
            const pageSize = get(config, "__$params.size", {});
            const pageNumer = get(config, "__$params.page", {});

            const env = config["__$env"]["env"]
            const serviceURL = env["DefaultHost"];
            const service = config["__$utils"]["http"]["service"]
            const page = config["__$page"];

            const brandAction = page["query"]["brand-action"];     
            const brandId = page["query"]["brand-id"];     

            if (!brandAction) {
                return {
                    rows: [],
                    length: 0
                }
            }

            const results = await service.get(`${serviceURL}/brand/${brandId}/business-unit?filter=${encodeURIComponent(JSON.stringify({...filter, page: pageNumer, size: pageSize}))}`, {
                requiresAuth: true,
                includeRefreshToken: true
            });

            return { 
                rows: results?.data?.results || [],
                length: results?.data?.counts || 0
            }
        },                       
        entityName: "items",
        onDeleteRegister: async (config: any) => {
            const env = config["__$env"]["env"]
            const serviceURL = env["DefaultHost"];
            const service = config["__$utils"]["http"]["service"]
            const businessId = get(config, "__$params.data._id");
            console.log(businessId);
            if(!businessId) return;
            await service.delete(`${serviceURL}/business-unit/${businessId}`, {
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
                    const page = config["__$page"];
                    const pageQuery = page["query"];

                    const brandAction = pageQuery["brand-action"];     
                    const brandId = pageQuery["brand-id"];     
                    const businessId = pageQuery["business-id"];     
                    const businessAction = pageQuery["business-action"];   
                    const data = config["__$params"]["data"]

                    if(!brandAction) return
                    
                    if(!businessAction && brandId) {
                        const response = await service.post(`${serviceURL}/business-unit`, {
                            ...data,
                            brandId
                        }, {
                            requiresAuth: true,
                            includeRefreshToken: true
                        });
                        return response.data
                    }

                    if (businessAction === "edit" && businessId) {
                        const response = await service.patch(`${serviceURL}/business-unit/${businessId}`, data, {
                            requiresAuth: true,
                            includeRefreshToken: true
                        });
                        return response.data
                    }

                },
                onSuccess: () =>  {},
                onError: () => {}
            },
            icon: {
                name: "Save"
            }
        },
        prop: "business",
        formData: {}
    }
})