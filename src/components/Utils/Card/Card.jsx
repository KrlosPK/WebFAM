import './Card.css'

const Card = ({
	background,
	title,
	description,
	titleColor,
	descriptionColor,
	size
}) => {
	// ? Sizes
	if (size === 'all') size = '100%'
	if (size === 'extralarge') size = '60%'
	if (size === 'large') size = '50%'
	if (size === 'medium') size = '40%'
	if (size === 'short') size = '30%'
	if (size === 'extrashort') size = '20%'

	return (
		<div
			className='Card'
			style={{ backgroundColor: background, width: size }}
		>
			<h2 style={{ color: titleColor }}>{title}</h2>
			<p style={{ color: descriptionColor }}>{description}</p>
		</div>
	)
}

export { Card }
