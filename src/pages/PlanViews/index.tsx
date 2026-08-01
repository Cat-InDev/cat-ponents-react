import { getConfigToRenderPageCommon } from "../../components/NavVarSession"
import get from 'lodash/get'

export const RenderPlanViewPage = () => {
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
                    endRow: 5,
                    endColumn: 15,
                    component: <h1>PLANES CATALO</h1>
                }
            },
            "{6}": {
                "{2}": {
                    endColumn: 48,
                    endRow: 75,
                    id: "catalo-plans-table-components",
                    componentType: 'TABLE',
                    params: { 
                        id: "catalo-plans-table",
                        columns: 4,
                        rows: async (config: any) => {
                            const filter = get(config, "__$params.filter", {});
                            const pageSize = get(config, "__$params.size", {});
                            const pageNumer = get(config, "__$params.page", {});
                
                            const env = config["__$env"]["env"]
                            const serviceURL = env["DefaultHost"];
                            const service = config["__$utils"]["http"]["service"]

                            const results = await service.get(`${serviceURL}/plans?filter=${encodeURIComponent(JSON.stringify({...filter, page: pageNumer, size: pageSize}))}`, {
                                requiresAuth: true,
                                includeRefreshToken: true
                            });

                            return { 
                                rows: results?.data?.results || [],
                                length: results?.data?.counts || 0
                            }
                        },
                        rowActions: {
                            actions: [
                                {
                                    label: "Adquirir",
                                    icon: "AddShoppingCart",
                                    onClick: (config: any) => {
                                        const navigate = config["__$utils"]["routing"]["navigate"]
                                        const data = config["__$params"]["data"]
                                        const id = data["_id"]["value"]
                                        navigate(`/catalo-plans/${id}`)
                                    }
                                }
                            ]
                        },
                        searchable: true,
                        orderable: true,
                        visualization: "cards",
                        detailLabels:{
                            _id: {
                                id: "_id",
                                label: "ID"
                            },
                            title: {
                                id: 'name',
                                label: 'Product Name'
                            },
                            shortDescription: {
                                id: "description",
                                label: 'Description',
                                default: 'Catalo Plan'
                            },
                            currency: {
                                id: "currency",
                                label: 'Currency',
                                default: 'USD'
                            },
                            price: {
                                id: 'base_price',
                                label: 'Price'
                            }
                        }                
                    }
                }
            }
        }
    }
}