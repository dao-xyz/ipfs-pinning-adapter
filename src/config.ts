export interface SimpleConfig {
    apiKey: string
}

export interface KeySecretConfig extends SimpleConfig {
    secret: string
}
