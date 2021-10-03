const { GAE_APPLICATION, GOOGLE_CLOUD_PROJECT } = process.env;

const region = (): string | null => (
    GAE_APPLICATION ? GAE_APPLICATION.split('~')[0] : null
);

export const serviceUri = (service: string): string => (
    `https://${service}-dot-${GOOGLE_CLOUD_PROJECT}.${region()}.r.appspot.com`
);