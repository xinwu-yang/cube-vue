'use strict'

import CryptoJS from 'crypto-js'

// const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') // 十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量
let shaStr = CryptoJS.SHA256('cube-password-key').toString()
const key = CryptoJS.enc.Hex.parse(shaStr.substr(0, 32))
const iv = CryptoJS.enc.Hex.parse(shaStr.substr(32, 63))

/**
 * AES加密
 * CipherOption，加密的一些选项：
 * mode：加密模式，可取值（CBC、CFB、CTR、CTRGladman、OFB、ECB)，都在CryptoJS.mode对象下
 * padding：填充方式，可取值（Pkcs7、Ansix923、Iso10126、ZeroPadding、NoPadding)，都在CryptoJS.pad对象下
 * iv：偏移量，mode === ECB时，不需要iv
 * @param {string} str 需要加密的字符串
 * @param {boolean} needBase64 加密后的字符串是否需要再次进行base64编码
 * @returns {string} 加密后的字符串
 */
export function aesEncrypt(str, needBase64 = false) {
  let parsedStr = CryptoJS.enc.Utf8.parse(str)
  // 返回的是一个加密对象
  let encrypted = CryptoJS.AES.encrypt(parsedStr, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  if (needBase64) {
    // 将加密结果再次进行base64编码
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  }
  return encrypted.ciphertext.toString()
}

/**
 * AES解密
 * @param {string} str 需要解密的字符串
 * @param {boolean} isBase64 是否是base64编码后的字符串
 * @returns {string} 解密后的字符串
 */
export function aesDecrypt(str, isBase64 = false) {
  let restoreBase64 = str
  if (isBase64) {
    // 先将Base64还原一下，因为加密的时候做了一些字符的替换
    restoreBase64 = str.replace(/\-g/, '+').replace(/_/, '/')
  }
  // 返回的是解密后的对象
  let decrypt = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(restoreBase64), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  // 将解密对象转换成UTF8的字符串
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  // 返回解密结果
  return decryptedStr.toString()
}
