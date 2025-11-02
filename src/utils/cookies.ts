export const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === "undefined") return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  };
  
  export const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    const key = encodeURIComponent(name) + "=";
    for (const c of cookies) {
      if (c.startsWith(key)) return decodeURIComponent(c.substring(key.length));
    }
    return null;
  };
  
  export const deleteCookie = (name: string) => {
    if (typeof document === "undefined") return;
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  };
  