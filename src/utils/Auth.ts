import Cookies from 'js-cookie';

export const API_URL = `${import.meta.env.api_url}`;
export const DOMAIN = `${window.location.protocol}//${window.location.host}${import.meta.env.BASE_URL}`;
export const APPLICATION_ID = "949151508702826496";

export const AUTHORIZE_URL = "https://discord.com/api/oauth2/authorize";

// cookie with name lc_token_exists and is set to 1 if lc_token exists
export function hasToken(): boolean {
    return Cookies.get('lc_token_exists') === '1';
}

export function clearStorage(cookieId: string) {
    Cookies.remove(cookieId);
    localStorage.removeItem(cookieId);
    sessionStorage.removeItem(cookieId);
}

export function getDiscordAuthUrl(): string {
    const params = new URLSearchParams();
    params.append("client_id", APPLICATION_ID);
    params.append("redirect_uri", `${DOMAIN}#/oauth2`);
    params.append("response_type", "code");
    params.append("scope", "identify guilds");

    const query = params.toString();
    return `${AUTHORIZE_URL}?${query}`;
}