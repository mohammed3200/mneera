import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
} from 'electron'
import Store from 'electron-store'

// Define type aliases
type WindowState = Rectangle;
type Bounds = Rectangle;

export const createWindow = (
  windowName: string,
  options: BrowserWindowConstructorOptions & { width: number; height: number }
): BrowserWindow => {
  const key = 'window-state'
  const name = `window-state-${windowName}`
  const store = new Store<Rectangle>({ name })
  const defaultSize = {
    width: options.width,
    height: options.height,
  }

  const restore = (): WindowState => store.get(key, defaultSize as WindowState)

  const getCurrentPosition = (): WindowState => {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    }
  }

  const windowWithinBounds = (windowState: WindowState, bounds: Bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    )
  }

  const resetToDefaults = (): WindowState => {
    const bounds = screen.getPrimaryDisplay().bounds
    return {
      width: defaultSize.width,
      height: defaultSize.height,
      x: Math.floor((bounds.width - defaultSize.width) / 2),
      y: Math.floor((bounds.height - defaultSize.height) / 2),
    }
  }

  const ensureVisibleOnSomeDisplay = (windowState: WindowState): WindowState => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds)
    })
    return visible ? windowState : resetToDefaults()
  }

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition())
    }
    store.set(key, state)
  }

  let state: WindowState = ensureVisibleOnSomeDisplay(restore())

  const win = new BrowserWindow({
    ...state,
    ...options,
  })

  win.on('close', saveState)

  return win
}