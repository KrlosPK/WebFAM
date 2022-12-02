// import { Suspense } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';

export const App = () => {
	return (
		<>
			<Navbar />
			<Home />
		</>
	);
};
