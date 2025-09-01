/** @type {import('tailwindcss').config} */

export default {
    cotent:[
        './index.html',
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme:{
        extend:{
            colors:{
                dark:{
                primary:"#17B794",
                secondary:"#E0315B",
                backgroundPrimary:"#010101",
                backgroundSecondary:"#101214",
            },
            light: {
                primary: "#159A7A",    
                secondary: "#D72649",       
                backgroundPrimary: "#FFFFFF",
                backgroundSecondary: "#F5F7FA",
              }
              
        },
        spacing:{
            xs:'0.25rem',
            sm:'0.5rem',
            base:'1rem',
            lg:'1.5rem',
            xl:'2rem',
            xxl:'2.5rem',
            xxxl:'3rem'
        }
    }
    },
    plugins:{
        
    }
}