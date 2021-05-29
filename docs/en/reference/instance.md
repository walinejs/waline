# Client instance

## update

Type: `(options: Partial<Omit<WalineOptions,'el' |'dark'>>) => void`

An optional parameter can be passed in as the configuration object that needs to be updated. All initialization options are available except for `el` and `dark`.

## destory

Type: `() => void`

Destroy the current Waline instance, and clear all contents in the current Waline mounted element.
