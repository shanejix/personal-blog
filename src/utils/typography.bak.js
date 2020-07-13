/**
 * Typography.js 配置文件
 */

import "../fonts/fonts-shared.css"
import "./global.css"

import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography
