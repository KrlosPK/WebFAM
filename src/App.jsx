// import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './components/Home/Home'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
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
					<Route path='recover-password' />
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}
