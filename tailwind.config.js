/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "",
	content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		fontFamily: {
			body: ['"Inter"', "sans-serif"],
		},
	},
	plugins: [],
};
