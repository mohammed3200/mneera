import { IpcHandler } from '../main/preload'

declare global {
  interface Window {
    ipc: {
      invoke: (channel: string, ...args: any[]) => Promise<any>;
      send: (channel: string, value: unknown) => void;
      on: (channel: string, callback: (...args: unknown[]) => void) => () => void;
    };
  }
}