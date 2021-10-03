const { GAE_APPLICATION, GOOGLE_CLOUD_PROJECT } = process.env;

console.log(`GAE_APPLICATION: ${GAE_APPLICATION}`);

const region = (): string | null => (
    GAE_APPLICATION ? GAE_APPLICATION.split('~')[0] : null
);

export const serviceUri = (service: string): string => (
    `https://${service}-dot-${GOOGLE_CLOUD_PROJECT}.${region()}.r.appspot.com`
);