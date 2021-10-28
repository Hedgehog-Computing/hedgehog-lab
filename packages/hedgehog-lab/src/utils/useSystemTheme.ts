import { useEffect, useState } from 'react'

const getMql = () => {
  if (typeof window === 'undefined') {
    return
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
}

const getSystemTheme = (matches: boolean) => (matches ? 'dark' : 'light')

export type SystemTheme = 'dark' | 'light'

const getDefaultTheme = (isSSR: boolean): SystemTheme => {
  if (!isSSR) {
    const mql = getMql()
    if (mql) {
      return getSystemTheme(mql.matches)
    }
  }
  return 'light'
}

const useSystemTheme = (isSSR: boolean = false) => {
  const defaultTheme = getDefaultTheme(isSSR)
  const [systemTheme, setSystemTheme] = useState<SystemTheme>(defaultTheme)
  useEffect(() => {
    const mql = getMql()
    const mqlListener = (e: any) => setSystemTheme(getSystemTheme(e.matches))
    if (mql) {
      setSystemTheme(getSystemTheme(mql.matches))
      mql.addListener(mqlListener)
    }
    return () => mql && mql.removeListener(mqlListener)
  }, [])
  return systemTheme
}

export default useSystemTheme