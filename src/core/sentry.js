    /**
 * Core tracking error
 * Reexport from Raven-js (sentry)
 * Copyright @2018 giangnh@youngworld.vn
 */

import Raven from 'raven-js'

/**
 * Init sentry from env SENTRY_ENDPOINT
 */
Raven.config(SENTRY_URI, {
    environment: ENV,
    release: '1.0.0',
    autoBreadcrumbs: {
        console: false
    },
    logger: 'ms_sdk'
}).install()

/**
 * Auto capture window error
 * https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
 */
export function logWindowError() {
  window.onerror = (message, source, lineno, colno, error) => {
    Raven.captureBreadcrumb({
      data: {
        message,
        source,
        lineno,
        colno
      }
    })
    Raven.captureException(error)
    return false
  }
}

export default Raven