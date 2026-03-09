import { devEnv } from "./dev.env"
import { prodEnv } from "./prod.env"

type CompilationToTypes = 'ELECTRON'|'WEB'

export const COMPILATION_TO: CompilationToTypes = (import.meta.env.VITE_COMPILATION_TO || 'WEB') as CompilationToTypes
export const ENVS = {
    use: (import.meta.env.VITE_ENV || 'DEV') as string,
    DEV: devEnv,
    PROD: prodEnv
}