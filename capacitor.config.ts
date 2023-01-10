import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.cotecna.stencilcomponents",
  appName: "Cotecna Stencil Components",
  webDir: "www",
  bundledWebRuntime: false,
  /**
   * NOTE: UNCOMMENT THE NEXT LINES TO DEBUG, SET YOUR IP ADDRESS AND PORT ON THE URL PROPERTY
   */
  server: {
    iosScheme: "http",
    androidScheme: "http",
    url:"http://192.168.0.11:3334"
  }
}

export default config;
