module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React component files
  ],
  theme: {
    extend: {
      colors: {
        light: "#f0f0f3", // Light background
        dark: "#d1d9e6", // Slightly darker for shadows
      },
      boxShadow: {
        neumorphism: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff", // Soft shadows
        neumorphismInset: "inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff", // Inset shadow
      },
      borderRadius: {
        'lg': '16px', // Large rounded corners
      },
    },
  },
  plugins: [],
};
