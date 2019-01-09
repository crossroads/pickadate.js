// @flow

import type { RenderOptions } from 'pickadate/apis/react-dom/types'
import { RENDER_OPTIONS as DOM_RENDER_OPTIONS } from 'pickadate/apis/dom/defaults'

export const RENDER_OPTIONS: RenderOptions = {
  weekdays: DOM_RENDER_OPTIONS.weekdays,
  renderCell: ({ children }) => children,
  className: DOM_RENDER_OPTIONS.className,
}