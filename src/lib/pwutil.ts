export function getPwUrl(stub: string) {
    const test: boolean = process.env.TEST as unknown as boolean;
    return `https://${test ? "test." : ""}politicsandwar.com/${stub}`;
}