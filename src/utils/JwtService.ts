/* eslint-disable camelcase */
import CryptoJS from 'crypto-js'

const ID_TOKEN_KEY = 'id_token' as string
const ID_PERMISSIONS_KEY = 'permissions' as string

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => window.localStorage.getItem(ID_TOKEN_KEY)

export const saveUser = (user: any): void => {
  window.localStorage.setItem('user', JSON.stringify(user))
}

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token)
}

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
}

/**
 * @description get the user permissions from localStorage
 */
export const getPermissions = (): string | null => window.localStorage.getItem(ID_PERMISSIONS_KEY)

/**
 * @description save the user permissions into localStorage
 * @param permissions: string
 */
export const savePermissions = (permissions: string): void => {
  window.localStorage.setItem(ID_PERMISSIONS_KEY, permissions)
}

/**
 * @description remove the user permissions from localStorage
 */
export const destroyPermissions = (): void => {
  window.localStorage.removeItem(ID_PERMISSIONS_KEY)
}

const decipherPermissions = (): string => {
  const { public: { SERVER_APP_TOKEN, SERVER_APP_IV } } = useRuntimeConfig()

  const permissionsPayload = window.localStorage.getItem(ID_PERMISSIONS_KEY)

  const { Utf8 } = CryptoJS.enc

  const $secret_key = SERVER_APP_TOKEN as string
  const $secret_iv = SERVER_APP_IV as string

  const key = CryptoJS.SHA256($secret_key)
    .toString(CryptoJS.enc.Hex)
    .substring(0, 32)

  const iv = CryptoJS.SHA256($secret_iv)
    .toString(CryptoJS.enc.Hex)
    .substring(0, 16)

  const encrypt = CryptoJS.enc.Base64.parse(permissionsPayload || '').toString(
    CryptoJS.enc.Utf8,
  )

  const decrypt = CryptoJS.AES.decrypt(encrypt, Utf8.parse(key), {
    iv: Utf8.parse(iv),
  }).toString(Utf8)

  return decrypt
}

export const hasPermissionTo = (permission: string): boolean => {
  const action = permission.split(':')[0]
  const permissions = JSON.parse(decipherPermissions())

  // Check if the permission is in the permissions list
  const foundPermission = permissions.find((permision: any) => permision.module === module && permision.actions === action)

  if (foundPermission) {
    return true
  }

  return false
}

export default {
  getToken,
  saveUser,
  saveToken,
  destroyToken,
  getPermissions,
  savePermissions,
  destroyPermissions,
  hasPermissionTo,
}
