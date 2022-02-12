---
title: Client instance
icon: instance
---

## el

The DOM element object mounted by the current instance

## update

Type: `(options: Partial<Omit<WalineOptions,'el' |'dark'>>) => void`

An optional parameter can be passed in as the configuration object that needs to be updated. All initialization options are available except for `el` and `dark`.

## destory

Type: `() => void`

Destroy the current Waline instance, and clear all contents in the current Waline mounted element.
