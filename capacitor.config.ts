import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gbosss.orderbharatbusiness',
  appName: 'Orderbharat Business',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    },
  },
  
};

export default config;
