import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { isProduction } from "./utils";

import headerEN from "../assets/locales/en/header.json";
import HomepageEN from "../assets/locales/en/homepage.json";
import AboutEN from "../assets/locales/en/aboutpage.json";
import ContactEN from "../assets/locales/en/contactpage.json";
import AuthEN from "../assets/locales/en/auth.json";
import footerEN from "../assets/locales/en/footer.json";
import AboutFIL from "../assets/locales/fil/aboutpage.json";
import HomepageFIL from "../assets/locales/fil/homepage.json";
import headerFIL from "../assets/locales/fil/header.json";
import ContactFIL from "../assets/locales/fil/contactpage.json";
import AuthFIL from "../assets/locales/fil/auth.json";
import footerFIL from "../assets/locales/fil/footer.json";
import headerES from "../assets/locales/es/header.json";
import HomepageES from "../assets/locales/es/homepage.json";
import AboutES from "../assets/locales/es/aboutpage.json";
import ContactES from "../assets/locales/es/contactpage.json";
import AuthES from "../assets/locales/es/auth.json";
import footerES from "../assets/locales/es/footer.json";
import headerJA from "../assets/locales/ja/header.json";
import HomepageJA from "../assets/locales/ja/homepage.json";
import AboutJA from "../assets/locales/ja/aboutpage.json";
import ContactJA from "../assets/locales/ja/contactpage.json";
import AuthJA from "../assets/locales/ja/auth.json";
import footerJA from "../assets/locales/ja/footer.json";

export const defaultNS = "header";

export const resources = {
	en: {
		header: headerEN,
		homepage: HomepageEN,
		aboutpage: AboutEN,
		contactpage: ContactEN,
		auth: AuthEN,
		footer: footerEN,
	},
	fil: {
		header: headerFIL,
		homepage: HomepageFIL,
		aboutpage: AboutFIL,
		contactpage: ContactFIL,
		auth: AuthFIL,
		footer: footerFIL,
	},
	es: {
		header: headerES,
		homepage: HomepageES,
		aboutpage: AboutES,
		contactpage: ContactES,
		auth: AuthES,
		footer: footerES,
	},
	ja: {
		header: headerJA,
		homepage: HomepageJA,
		aboutpage: AboutJA,
		contactpage: ContactJA,
		auth: AuthJA,
		footer: footerJA,
	},
} as const;

void i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources,
		defaultNS,
		ns: ["header", "footer", "homepage", "aboutpage", "contactpage", "auth"],
		fallbackLng: "en",
		debug: !isProduction,
		interpolation: { escapeValue: false },
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			lookupLocalStorage: "i18nextLng",
		},
	});

export default i18n;
