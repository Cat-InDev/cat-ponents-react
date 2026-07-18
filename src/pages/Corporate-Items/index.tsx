import { CustomFormFieldTypes } from "@cat.in.dev/cat-ponents-react";
import get from 'lodash/get';

export const CorporateItemsCrudConfig = () => ({
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
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "row",
                                type: "text",
                                label: "Nombre del item",
                                prop: "itemName",
                                placeholder: "Ej: Pan Quetzal 12av.",
                                validator: [
                                    {
                                        $regex: {
                                            validate: "^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\\s.,;:()&/%-]{10,500}$",
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
                                label: 'Describenos tu sucursal.',
                                disposition: 'row',
                                notNull: true,
                                prop: 'branchDescription',
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
                                label: 'Cual es la dirección de tu sucursal.',
                                disposition: 'col',
                                notNull: true,
                                prop: 'branchAddress',
                                type: 'textarea',
                                validator: [
                                    {
                                        $regex: {
                                            validate: "^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\\s.,;:()&/%-]{10,500}$",
                                            message: "Debes proporcionar una dirección válida"
                                        },
                                        $emptyValue: {
                                            validate: null,
                                            message: "*"
                                        }
                                    }
                                ],
                                size: 1.97,
                                editable: true
                            } 
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "col",
                                type: "options",
                                label: "Estado de la sucursal",
                                prop: "branchStatus",
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
                                size: 1.97,
                                options: [
                                    { label: "Habilitado", value: "enabled" },
                                    { label: "Deshabilitado", value: "disabled" },
                                ]
                            }
                        },
                        {
                            type: CustomFormFieldTypes.Data,
                            config: {
                                disposition: "col",
                                type: "map",
                                label: "Ubicación",
                                prop: "branchGeo",
                                search: true,
                                zoom: 15,
                                height: 750                                 ,
                                validator: [
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

            const branchId = params["_id"] || route["query"]["branch-id"];

            const serviceURL = env["DefaultHost"];
            const results = await service.get(`${serviceURL}/branch/${branchId}`, {
                requiresAuth: true,
                includeRefreshToken: true
            });

            return {
                "__formHasError__": false, 
                "branchesCrud.branchesForm.branchName": results?.data?.name,                                                     
                "branchesCrud.branchesForm.branchDescription": results?.data?.description,                                                     
                "branchesCrud.branchesForm.branchAddress": results?.data?.address,                                                     
                "branchesCrud.branchesForm.branchStatus": results?.data?.status,                                                     
                "branchesCrud.branchesForm.branchGeo": results?.data?.geo,                                                     
            }
        }),
        tableConfig: {
            columns: [
                {
                    id: ["name", "branchesCrud.branchesForm.branchName"],
                    label: "Sucursal"
                },
                {
                    id: ["address", "branchesCrud.branchesForm.branchAddress"],
                    label: "Dirección"
                },
                {
                    id: ["status", "branchesCrud.branchesForm.branchStatus"],
                    label: "Status"
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
        queryRoute: { action: "branch-action", id: "branch-id" },
        rows: async (config: any) => {
            const filter = get(config, "__$params.filter", {});
            const pageSize = get(config, "__$params.size", {});
            const pageNumer = get(config, "__$params.page", {});

            const env = config["__$env"]["env"]
            const serviceURL = env["DefaultHost"];
            const service = config["__$utils"]["http"]["service"]
            const page = config["__$page"];

            const businessAction = page["query"]["business-action"];     
            const businessId = page["query"]["business-id"];    
            const modalType = page["query"]["business-branch"]; 

            if (!businessAction && modalType) {
                return {
                    rows: [],
                    length: 0
                }
            }

            if (businessId) {
                const results = await service.get(`${serviceURL}/business-unit/${businessId}/branches?filter=${encodeURIComponent(JSON.stringify({...filter, page: pageNumer, size: pageSize}))}`, {
                    requiresAuth: true,
                    includeRefreshToken: true
                });

                return { 
                    rows: results?.data?.results || [],
                    length: results?.data?.counts || 0
                }
            }            
        },
        onDeleteRegister: async (config: any) => {
            const env = config["__$env"]["env"]
            const serviceURL = env["DefaultHost"];
            const service = config["__$utils"]["http"]["service"]
            const branchId = get(config, "__$params.data._id");

            if(!branchId) return

            await service.delete(`${serviceURL}/branch/${branchId}`, {
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

                    const businessId = pageQuery["business-id"];     
                    const businessAction = pageQuery["business-action"];   
                    const branchId = pageQuery["branch-id"];     
                    const branchAction = pageQuery["branch-action"];   
                    const modalType = pageQuery["business-branch"];

                    const data = config["__$params"]["data"]

                    if(!businessAction && modalType) return
                    
                    if(!branchAction && businessId) {
                        const response = await service.post(`${serviceURL}/branch`, {
                            ...data,
                            businessId
                        }, {
                            requiresAuth: true,
                            includeRefreshToken: true
                        });
                        return response.data
                    }

                    if (branchAction === "edit" && branchId) {
                        const response = await service.patch(`${serviceURL}/branch/${branchId}`, data, {
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