/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'neon': {
          'pink': '#ff0080',
          'blue': '#00d4ff',
          'green': '#00ff88',
          'purple': '#8a2be2',
          'orange': '#ff6b35',
        },
        'glass': {
          'bg': 'rgba(255, 255, 255, 0.05)',
          'border': 'rgba(255, 255, 255, 0.1)',
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #0066ff 100%)',
        'neon-gradient': 'linear-gradient(135deg, #ff0080 0%, #ff6b35 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff, 0 0 20px #00d4ff',
        'neon-pink': '0 0 5px #ff0080, 0 0 10px #ff0080, 0 0 15px #ff0080, 0 0 20px #ff0080',
        'neon-green': '0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88, 0 0 20px #00ff88',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'flash': 'flash 1s infinite',
        'shake': 'shake 0.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideInFromBottom 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        flash: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0.5' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      textShadow: {
        'neon': '0 0 10px rgba(0, 212, 255, 0.8)',
      },
      utilities: {
        '.line-clamp-2': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.glass-effect': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
        '.neon-glow': {
          'box-shadow': '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff, 0 0 20px #00d4ff',
        },
        '.neon-glow-pink': {
          'box-shadow': '0 0 5px #ff0080, 0 0 10px #ff0080, 0 0 15px #ff0080, 0 0 20px #ff0080',
        },
        '.neon-glow-green': {
          'box-shadow': '0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88, 0 0 20px #00ff88',
        },
        '.gradient-text': {
          'background': 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #0066ff 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.flash-sale-badge': {
          'background': 'linear-gradient(45deg, #ff0080, #ff6b35)',
          'animation': 'flash 1s infinite',
        },
        '.limited-stock-badge': {
          'background': 'linear-gradient(45deg, #ff6b35, #ff0080)',
          'animation': 'shake 0.5s infinite',
        },
        '.trending-badge': {
          'background': 'linear-gradient(45deg, #00ff88, #00d4ff)',
          'animation': 'bounce 1s infinite',
        },
        '.countdown-timer': {
          'background': 'rgba(255, 0, 128, 0.1)',
          'border': '1px solid #ff0080',
          'border-radius': '8px',
          'padding': '8px 12px',
          'font-family': 'Orbitron, monospace',
          'font-weight': '700',
          'color': '#ff0080',
          'animation': 'pulse 1s infinite',
        },
        '.progress-bar': {
          'width': '100%',
          'height': '4px',
          'background': 'rgba(255, 255, 255, 0.1)',
          'border-radius': '2px',
          'overflow': 'hidden',
        },
        '.progress-fill': {
          'height': '100%',
          'background': 'linear-gradient(90deg, #ff0080, #ff6b35)',
          'border-radius': '2px',
          'transition': 'width 0.3s ease',
        },
        '.hover-lift': {
          'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.hover-lift:hover': {
          'transform': 'translateY(-8px)',
          'box-shadow': '0 20px 40px rgba(0, 212, 255, 0.3)',
        },
        '.loading-spinner': {
          'width': '40px',
          'height': '40px',
          'border': '3px solid rgba(255, 255, 255, 0.1)',
          'border-top': '3px solid #00d4ff',
          'border-radius': '50%',
          'animation': 'spin 1s linear infinite',
        },
        '.line-clamp-2': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}