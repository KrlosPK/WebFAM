import { NavLink as NavLinkReactRouter } from 'react-router-dom'

export const NavLink = ({ children, to, ...props }) => {
  return (
    <NavLinkReactRouter
      className={({ isActive }) => (isActive ? 'is-active' : undefined)}
      to={to}
      {...props}
    >
      {children}
    </NavLinkReactRouter>
  )
}
