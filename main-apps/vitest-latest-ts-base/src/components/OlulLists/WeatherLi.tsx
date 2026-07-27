interface WeatherItem {
	week: string[];
	weather: string[];
	temperature: number;
	percent: number;
}

interface WeatherListProps {
	propWeather: WeatherItem[];
}

export default function WeatherList({ propWeather }: WeatherListProps) {
	return (
		<ul className="ul-box">
			{propWeather.map((el, index) => (
				<li key={index}>
					<h5>{el.week[1]}</h5>
					<em>{el.weather[1]}</em>
					<p>{el.temperature}°C</p>
					<p>{el.percent}%</p>
				</li>
			))}
		</ul>
	);
}
