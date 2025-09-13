
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Enhanced Health Connect Custom Colors
        medical: {
          blue: {
            light: '#90CAF9',
            DEFAULT: '#2196F3',
            dark: '#1565C0'
          },
          green: {
            light: '#A5D6A7',
            DEFAULT: '#4CAF50',
            dark: '#2E7D32'
          },
          red: {
            light: '#EF9A9A',
            DEFAULT: '#F44336',
            dark: '#C62828'
          },
          yellow: {
            light: '#FFF59D',
            DEFAULT: '#FFEB3B',
            dark: '#F57F17'
          },
          purple: {
            light: '#CE93D8',
            DEFAULT: '#9C27B0',
            dark: '#6A1B9A'
          },
          neutral: {
            lightest: '#F8FAFC',
            lighter: '#F1F5F9',
            light: '#E2E8F0',
            DEFAULT: '#94A3B8',
            dark: '#64748B',
            darker: '#334155',
            darkest: '#0F172A'
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 0.25rem)',
        sm: 'calc(var(--radius) - 0.5rem)'
      },
      boxShadow: {
        'soft-sm': '0 2px 10px -3px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
        'soft': '0 4px 20px -5px rgba(0, 0, 0, 0.08), 0 2px 8px -3px rgba(0, 0, 0, 0.05)',
        'soft-md': '0 8px 30px -8px rgba(0, 0, 0, 0.12), 0 4px 12px -3px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 12px 40px -10px rgba(0, 0, 0, 0.15), 0 6px 16px -4px rgba(0, 0, 0, 0.1)',
        'soft-xl': '0 16px 50px -12px rgba(0, 0, 0, 0.18), 0 8px 20px -5px rgba(0, 0, 0, 0.12)',
        'inner-soft': 'inset 0 2px 8px -4px rgba(0, 0, 0, 0.04)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
