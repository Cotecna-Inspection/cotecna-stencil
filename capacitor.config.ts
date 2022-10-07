import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.cotecna.stencilcomponents",
  appName: "cotecna-stencil-components",
  webDir: "www",
  bundledWebRuntime: false,
  server: {
    iosScheme: "http",
    androidScheme: "http",
    url: "http://192.168.0.12:3333"
  }
}

export default config;
