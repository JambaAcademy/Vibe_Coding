
# Cryptocurrency Dashboard

## Overview
This project is a real-time, visually appealing, and mobile-responsive cryptocurrency dashboard built with React, Vite, Tailwind CSS, and Chart.js. It displays live prices, price charts, percentage changes, and alert notifications for major cryptocurrencies including Bitcoin, Ethereum, Dogecoin, Solana, Cardano, and XRP. Users can toggle between dark and light themes for a personalized experience.

## Features
- **Live Prices:** Fetches and displays up-to-date prices for BTC, ETH, DOGE, SOL, ADA, and XRP using the CoinGecko API.
- **Price Charts:** Shows recent price history for each coin using interactive line charts (Chart.js).
- **Percentage Change:** Displays 24-hour percentage change for each coin, color-coded for up/down movement.
- **Price Alerts:** Notifies users when any coin moves more than 5% in either direction.
- **Theme Toggle:** Switch between dark and light modes for comfortable viewing.
- **Mobile Responsive:** Layout adapts beautifully to all screen sizes.

## Demo
![Dashboard Screenshot](./assets/dashboard-demo.png) <!-- Add your own screenshot if available -->

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation
1. Clone the repository:
	```sh
	git clone https://github.com/yourusername/cryptocurrency_dashboard.git
	cd cryptocurrency_dashboard
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the development server:
	```sh
	npm run dev
	```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/App.jsx`: Main dashboard component. Handles fetching prices, chart rendering, theme toggle, and alert logic.
- `src/index.css`: Tailwind CSS and custom styles.
- `src/main.jsx`: Entry point for React app.
- `tailwind.config.js` & `postcss.config.cjs`: Tailwind and PostCSS configuration.
- `package.json`: Project dependencies and scripts.

## How It Works

1. **Fetching Data:**
	- Uses the CoinGecko API to fetch live prices and 24h change for all supported coins every 10 seconds.
	- Stores price history for each coin to render charts.

2. **Displaying Data:**
	- Each coin is shown in a visually distinct card with its name, symbol, current price, and percentage change.
	- Price charts are rendered using Chart.js for the last 20 data points.

3. **Alerts:**
	- If a coin moves more than 5% since the last update, a color-coded alert is shown at the top of the dashboard.

4. **Theme Toggle:**
	- Users can switch between dark and light themes using the toggle button in the header.
	- Theme is managed via React state and Tailwind CSS classes.

5. **Responsiveness:**
	- The layout uses Tailwind's grid and flex utilities to ensure cards and charts are centered and spaced evenly on all devices.

## Customization

- **Add More Coins:**
  - Edit the `COINS` array in `src/App.jsx` to add or remove supported cryptocurrencies.
- **Change Chart Style:**
  - Modify Chart.js options in `App.jsx` for different chart types or colors.
- **Alert Threshold:**
  - Adjust the percentage threshold for alerts in the price change logic.

## Dependencies
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- [@heroicons/react](https://github.com/tailwindlabs/heroicons)

## License
MIT

## Credits
- CoinGecko for free cryptocurrency price API
- Tailwind Labs for Heroicons

---
For questions or contributions, open an issue or pull request on GitHub!
