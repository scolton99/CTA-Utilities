require(['client/ts/CTASignboard'], module => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).CTASignboard = new module.CTASignboard();
});