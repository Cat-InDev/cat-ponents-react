import get from 'lodash/get'

export const renderNavbarSession = (newProps: Record<string, any>) => {
    return {
        "logo": 'https://media.istockphoto.com/id/1214084790/es/vector/s%C3%ADmbolo-del-c%C3%ADrculo-del-gato-negro.jpg?s=612x612&w=0&k=20&c=3zFdcYnmheCrlyripH-VmdLIUStE5G98S6MsmVAziO0=',
        itemList: [
            { 
                variant: 'list', 
                icon: "Storefront", 
                config: { 
                    label: 'Entidades', 
                    itemList: [ 
                        { variant: 'button', icon: "SupervisedUserCircle", config: { label: 'Usuarios' } }, 
                        { variant: 'button', icon: "Hail", config: { label: 'Clientes' } }, 
                        { variant: 'button', icon: "Wallpaper", config: { label: 'Marcas', action: {
                            callback: {
                                action: {
                                    name: "navigate",
                                    taskConfig: {
                                        eventName: "app-navigate-to",
                                        eventParams: { to: "/brands" }
                                    },
                                    taskName: "$dispatchEvent"
                                }
                            } 
                        } } }, 
                        { variant: 'button', icon: "Cases", config: { label: 'Negocios' } }, 
                        { variant: 'button', icon: "Store", config: { label: 'Sucursales' } }, 
                        { variant: 'button', icon: "Inventory", config: { label: 'Inventarios' } },           
                    ]
                }
            }, 
            { 
                variant: 'list', 
                icon: "Calculate", 
                config: { 
                    label: 'Contable', 
                    itemList: [ 
                        { variant: 'button', icon: "MonetizationOn", config: { label: 'Presupuestos' } }, 
                        { variant: 'button', icon: "PointOfSale", config: { label: 'Ventas' } }, 
                        { variant: 'button', icon: "Sell", config: { label: 'Ingresos' } }, 
                        { variant: 'button', icon: "ShoppingBag", config: { label: 'Compras', action: () => alert("") } },
                        { variant: 'button', icon: "Wallet", config: { label: 'Egresos' } },
                    ] 
                } 
            },             
            { variant: 'button', icon: "Assessment", config: { label: 'Reportes', action: {} } }, 
            { variant: 'divider' },
            { variant: 'button', icon: "Business", config: { label: 'Corporativo', action: {} } }, 
            { variant: 'divider' },
            { 
                variant: 'list', 
                icon: "SupervisorAccount", 
                config: { 
                    label: 'Catalo', 
                    itemList: [ 
                        { variant: 'button', icon: "CardMembership", config: { label: 'Suscripción y pagos' } }, 
                    ] 
                } 
            }, 
            { variant: 'button', icon: "Forum", config: { label: 'Convexa', action: {} } }, 
        ],
        title: 'TITLE',
        menuList: [
            {
                icon: 'AccountCircle',
                itemList: [
                    {
                        variant: 'avatar',
                        avatar: "",
                        label: 'Inbox',
                        action: {
                            callback: {
                                action: {
                                    name: "doLogout",
                                        taskConfig: {
                                            eventName: "do-logout-auth-event",
                                            eventParams: {}
                                        },
                                        taskName: "$dispatchEvent"
                                    }
                                }
                        }
                    },
                    { variant: 'divider' },
                    {
                        variant: 'button',
                        icon: "PowerSettingsNew",
                        label: 'Logout',
                        action: {
                            callback: {
                                action: {
                                    name: "doLogout",
                                        taskConfig: {
                                            eventName: "do-logout-auth-event",
                                            eventParams: {}
                                        },
                                        taskName: "$dispatchEvent"
                                    }
                                }
                        }
                    }
                ]
            }
        ],
        ...newProps
    }
    
}

export const getConfigToRenderPageCommon = async({ http: { Service }, env }: any) => {
    const response = await Service.get(`${get(env, 'env.DefaultHost')}/corporate/assets`,
    {
        requiresAuth: true,
        includeRefreshToken: true,
        _retry: false
    });
    
    return {             
        "matrix.{0}.{0}.params": renderNavbarSession({
            title: response.data.name,
            "logo": response.data.media.logo
        }) 
    }
}