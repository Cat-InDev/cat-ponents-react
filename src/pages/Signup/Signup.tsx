import { CustomFormFieldTypes } from "@cat.in.dev/cat-ponents-react"

export const RenderSignupPage = () => {
    return {
        dev: false,
        columns: 100,        
        rows: 90,
        type: "matrix",                                    
        unitaryCellH: 30,
        unitaryCellW: 75,
        strictScreen: true,
        matrix: {
            "{5}": {
                "{15}": {
                    endColumn: 90,
                    endRow: 85,
                    id: "card-1",
                    componentType: 'FORM',
                    params: {
                        config: {
                            id: "signup-corporate",
                            title: "Crear Cuenta",                    
                            components: [
                                {
                                    title: "Datos de la corporación",
                                    type: "row",
                                    fields: [
                                        {
                                            type: CustomFormFieldTypes.Data,
                                            config: {
                                                disposition: "col",
                                                type: "text",
                                                label: "Nombre de la Corporación / Grupo empresarial",
                                                prop: "companyName",
                                                placeholder: "Ej: Grupo Panadero Quetzal",
                                                validator: [
                                                    {
                                                        $regex: {
                                                            validate: "^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9&.,\\- ]{2,100}$",
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
                                                size: 1.85
                                            }
                                        },
                                        
                                        {
                                            type: CustomFormFieldTypes.Data,
                                            config: {
                                                disposition: "col",
                                                type: "options",
                                                label: "País",
                                                prop: "country",
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
                                                size: 1.85,
                                                options: [
                                                    { label: "Guatemala", value: "GT" }
                                                ]
                                            }
                                        },
                                        { 
                                            type: CustomFormFieldTypes.Data, 
                                            config: { 
                                                label: 'Cuentamos mas sobre el grupo corporativo',
                                                disposition: 'row',
                                                notNull: true,
                                                prop: 'corporateDescription',
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
                                                editable: false
                                            } 
                                        },
                                        { 
                                            type: CustomFormFieldTypes.Data, 
                                            config: {                       
                                                type: 'files',  
                                                fileTypes: "image/*", 
                                                label: "Elige un logo para tu corporación",
                                                prop: "corporateLogo",
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
                                                size: 3         
                                            },    
                                        }                              
                                    ],
                                    size: 12
                                },
                                {
                                    title: "Cuentanos sobre tu marca",
                                    type: "row",
                                    fields: [
                                        {
                                            type: CustomFormFieldTypes.Data,
                                            config: {
                                                disposition: "col",
                                                type: "text",
                                                label: "Nombre de la marca",
                                                prop: "brandName",
                                                placeholder: "Ej: Pan Quetzal",
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
                                                size: 2
                                            }
                                        },   
                                        { 
                                            type: CustomFormFieldTypes.Data, 
                                            config: { 
                                                label: 'Describenos tu marca principal, la marca es la identidad de tus productos, tu corporación puede tener muchas marcas, despues podras crear muchas más marcas y unidades de negocio.',
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
                                                editable: false
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
                                                size: 3         
                                            },    
                                        }                                                           
                                    ],
                                    size: 12
                                },
                                {
                                    title: "Datos de contacto",
                                    type: "col",
                                    size: 6,
                                    fields: [
                                        {
                                            type: CustomFormFieldTypes.Data,
                                            config: {
                                                disposition: "row",
                                                type: "text",
                                                label: "Nombre(s)",
                                                prop: "ownerFirstName",
                                                validator: [
                                                    {
                                                        $regex: {
                                                            validate: "^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$",
                                                            message: "Debes proporcionar almenos un nombre, deben comenzar con mayusculas"
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
                                                disposition: "row",
                                                type: "text",
                                                label: "Apellido(s)",
                                                prop: "ownerLastName",
                                                validator: [
                                                    {
                                                        $regex: {
                                                            validate: "^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$",
                                                            message: "Debes proporcionar almenos un apellido, deben comenzar con mayusculas"
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
                                                disposition: "row",
                                                type: "text",
                                                label: "Teléfono / WhatsApp",
                                                prop: "adminPhone",
                                                placeholder: "+502 9999-9999",
                                                validator: [],
                                                size: 4
                                            }
                                        },
                                    ]
                                },
                                {
                                    title: "Datos de la cuenta",
                                    type: "col",
                                    size: 6,
                                    fields: [
                                        {
                                            type: CustomFormFieldTypes.Data,
                                            config: {
                                                disposition: "row",
                                                type: "email",
                                                label: "Correo electrónico",
                                                prop: "adminEmail",
                                                validator: [
                                                    {
                                                        $regex: {
                                                            validate: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                                                            message: "Formato de correo inválido"
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
                                                disposition: "row",
                                                type: "password",
                                                label: "Contraseña",
                                                prop: "password",
                                                validator: [
                                                    {
                                                        $regex: {
                                                            validate: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._\\-])[A-Za-z\\d@$!%*?&._\\-]{8,}$",
                                                            message: "Al menos 8 caracteres, mayúscula, minúscula, número y símbolo"
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
                                                disposition: "row",
                                                type: "password",
                                                label: "Confirmar contraseña",
                                                prop: "confirmPassword",
                                                validator: [
                                                    {
                                                        $emptyValue: {
                                                            message: "*",
                                                            validate: null
                                                        }
                                                    },
                                                    {
                                                        $dontMatch: {
                                                            validate: { $get: { key: "$._$data_.params.data.password" } },
                                                            message: "Las contraseñas no coinciden"
                                                        },
                                                    },
                                                ],
                                                notNull: true,
                                                size: 4
                                            }
                                        },
                                    ]
                                },
                                {
                                    type: "row",
                                    fields: [
                                        {
                                            type: CustomFormFieldTypes.SubmintButton,
                                            config: {
                                                disposition: "row",
                                                action: {
                                                    callback: {
                                                        action: {
                                                            name: "do-signup-auth",
                                                            taskConfig: {
                                                                eventName: "do-signup-auth-event",
                                                                eventParams: {
                                                                    data: { $get: { key: "$._$data_.__$params.data" } }
                                                                }
                                                            },
                                                            taskName: "$dispatchEvent"
                                                        }
                                                    }
                                                },
                                                title: "Crear Cuenta",
                                                color: {
                                                    code: "#64a6ed",
                                                    hoverCode: "#392d71"
                                                },
                                                size: 4,
                                                variant: "outlined"
                                            }
                                        },
                                        {
                                            type: CustomFormFieldTypes.Button,
                                            config: {
                                                disposition: "row",
                                                action: {
                                                    callback: {
                                                        action: {
                                                            name: "toLogin",
                                                            taskConfig: {
                                                                eventName: "to-auth-login",
                                                                eventParams: {}
                                                            },
                                                            taskName: "$dispatchEvent"
                                                        }
                                                    }
                                                },
                                                title: "Ya tengo una cuenta",
                                                color: {
                                                    code: "#1c9a13",
                                                    hoverCode: "#0f5504"
                                                },
                                                size: 4,
                                                variant: "contained"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },               
                        formData: {},
                        setFormData: () => {}
                    }
                }
            },
            "{86}":{
                "{0}": {
                    componentType: "FOOTER",
                    id: "footer",
                    endRow: 90,
                    endColumn: 99,
                    params: {
                        contact: {
                            label: "Contacto",
                            address:'Guatemala',
                            phone:'--------------',
                            email:'catindev.enterprise@gmail.com'
                        },                                                        
                        title: 'Catalo Corporativo',
                        description: 'Catalo Corporate es la plataforma administrativa central de Catalo, diseñada para gestionar corporaciones, marcas, negocios y sucursales desde un solo lugar. Administra inventarios, productos, servicios, usuarios, roles, ventas y módulos empresariales con una arquitectura flexible y escalable enfocada en pequeñas y medianas empresas.',
                        columns: [
                            {
                                links: [
                                    {
                                        label: "Documentation",
                                        url: "#"
                                    },
                                    {
                                        label: "Help Center",
                                        url: "#"
                                    }
                                ],
                                title: "Resources"
                            },
                            {
                                links: [
                                    {
                                        label: "Documentation",
                                        url: "#"
                                    },
                                    {
                                        label: "Help Center",
                                        url: "#"
                                    }
                                ],
                                title: "Resources"
                            }
                        ],
                        icons: {
                            "Facebook": { url: "https://www.facebook.com" }
                        }
                    }
                }
            }
        }
    }
}