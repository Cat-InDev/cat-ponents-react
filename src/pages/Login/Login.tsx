import { CustomFormFieldTypes } from "@cat.in.dev/cat-ponents-react"

export const RenderLoginPage = () => {
    return {
        dev: false,
        columns: 50,
        type: "matrix",                                    
        unitaryCellH: 30,
        unitaryCellW: 75,
        strictScreen: true,
        rows: 30,
        matrix: {
            "{5}": {
                "{15}": {
                    endColumn: 32,
                    endRow: 18,
                    id: "card-1",
                    componentType: 'FORM',
                    params: { 
                        config: {
                            title: "Login",                    
                            components: [{
                                fields: [
                                    {
                                        type: CustomFormFieldTypes.Data,
                                        config: {
                                            disposition: "row",
                                            type: "email",
                                            label: "Email",
                                            prop: "email",
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
                                            label: "Password",
                                            prop: "password",
                                            validator: [
                                                {
                                                    $regex: {
                                                        validate: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._\\-])[A-Za-z\\d@$!%*?&._\\-]{8,}$",
                                                        message: "Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un símbolo especial (como @, $, !, %, , ?, &, ., _, o -)."
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
                                        type: CustomFormFieldTypes.SubmintButton,
                                        config: {
                                            disposition: "row",
                                            action: {
                                                callback: {
                                                    action: {
                                                        name: "do-login-auth",
                                                        taskConfig: {
                                                            eventName: "do-login-auth-event",
                                                            eventParams: {
                                                                password: { $get: { key: "$._$data_.__$params.data.password" } },
                                                                username: { $get: { key: "$._$data_.__$params.data.email" } }
                                                            }
                                                        },
                                                        taskName: "$dispatchEvent"
                                                    }
                                                }
                                            },
                                            title: "Iniciar Sesión",
                                            color: {
                                                code: "#6495ED",
                                                hoverCode: "#483D8B"
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
                                                        name: "toSignup",
                                                        taskConfig: {
                                                            eventName: "to-auth-signup",
                                                            eventParams: {}
                                                        },
                                                        taskName: "$dispatchEvent"
                                                    }
                                                }
                                            },
                                            title: "Quiero registrarme",
                                            color: {
                                                code: "#6495ED",
                                                hoverCode: "#7169a0ff"
                                            },
                                            size: 4,
                                            variant: "outlined"
                                        }
                                    }
                                ],
                                type: "row",
                                size: 12
                            }]
                        },     
                        formData: {},
                        setFormData: (props: any) => { console.log(props) }
                    },
                }
            },
        }
    }
}