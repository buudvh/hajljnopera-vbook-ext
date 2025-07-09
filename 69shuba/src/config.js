let BASE_URL = 'https://www.69shuba.com';
const STVHOST = "http://14.225.254.182";
const DEFAULT_COVER = "https://raw.githubusercontent.com/damvanhoangbuu1/hajljnopera-vbook-ext/main/asset/cover.jpg";
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}