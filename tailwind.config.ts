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
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
				// Custom mobile-first breakpoints
				'mobile': {'max': '767px'},
				'tablet': {'min': '768px', 'max': '1023px'},
				'desktop': {'min': '1024px'},
			},
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
				// TokenX custom colors with enhanced palette
				tokenx: {
					purple: '#7c3aed',
					'purple-light': '#a855f7',
					'purple-dark': '#581c87',
					'purple-glow': 'rgba(124, 58, 237, 0.3)',
					blue: '#3b82f6',
					'blue-light': '#60a5fa',
					'blue-dark': '#1e40af',
					'blue-glow': 'rgba(59, 130, 246, 0.3)',
					dark: '#0f0f23',
					'dark-light': '#1a1a2e',
					'dark-lighter': '#16213e',
					'dark-card': 'rgba(26, 26, 46, 0.8)',
					accent: '#f472b6',
					success: '#10b981',
					warning: '#f59e0b',
					'glass': 'rgba(255, 255, 255, 0.05)',
					'glass-border': 'rgba(255, 255, 255, 0.1)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'xl': '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Poppins', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace']
			},
			fontSize: {
				'2xs': ['0.625rem', { lineHeight: '0.75rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
				// Mobile-specific font sizes
				'mobile-xs': ['0.75rem', { lineHeight: '1rem' }],
				'mobile-sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'mobile-base': ['1rem', { lineHeight: '1.5rem' }],
				'mobile-lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'mobile-xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'mobile-2xl': ['1.5rem', { lineHeight: '2rem' }],
				'mobile-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'mobile-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
				// Mobile-specific spacing
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
				'safe-left': 'env(safe-area-inset-left)',
				'safe-right': 'env(safe-area-inset-right)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-fast': {
					from: { opacity: '0', transform: 'translateY(15px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					from: { transform: 'translateY(100%)' },
					to: { transform: 'translateY(0)' }
				},
				'slide-down': {
					from: { transform: 'translateY(-100%)' },
					to: { transform: 'translateY(0)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
					'50%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.8), 0 0 40px rgba(59, 130, 246, 0.3)' }
				},
				'glow-intense': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(124, 58, 237, 0.6), 0 0 40px rgba(124, 58, 237, 0.3)',
						filter: 'brightness(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px rgba(124, 58, 237, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
						filter: 'brightness(1.1)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.8' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out',
				'fade-in-fast': 'fade-in-fast 0.4s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.3s ease-out',
				'glow': 'glow 3s ease-in-out infinite alternate',
				'glow-intense': 'glow-intense 2s ease-in-out infinite alternate',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'gradient-shift': 'gradient-shift 3s ease infinite'
			},
			backgroundImage: {
				'gradient-tokenx': 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
				'gradient-purple': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
				'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
				'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
			},
			backdropBlur: {
				'xs': '2px',
				'3xl': '64px'
			},
			boxShadow: {
				'glow-sm': '0 0 10px rgba(124, 58, 237, 0.3)',
				'glow': '0 0 20px rgba(124, 58, 237, 0.4)',
				'glow-lg': '0 0 30px rgba(124, 58, 237, 0.5)',
				'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
				'glass-lg': '0 24px 48px rgba(0, 0, 0, 0.15)',
				'inner-glow': 'inset 0 2px 4px 0 rgba(124, 58, 237, 0.1)'
			},
			// Mobile-specific utilities
			minHeight: {
				'screen-mobile': '100vh',
				'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
			},
			maxHeight: {
				'screen-mobile': '100vh',
				'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
