// import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './components/Home/Home'
import { Login } from './components/Login/login'
import { NotFound } from './components/Not-found/NotFound'

export const App = () => {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<Navbar />
							<Home />
						</>
					}
				/>
				<Route path='/login' element={<Login />}>
					<Route path='recuperar-contraseña' />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}
