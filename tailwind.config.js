//  {import('tailwindcss').Config}
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       screens: {
        xs: "320px",   
        xsm: "375px",  
        smd: "430px",
      },
    },
    
  },
  plugins: [],
}
