function ExternalLink({ children, href = "#", ...rest }) {
	return (
		<a href={href} target='_blank' rel='noreferrer' {...rest}>
			{children}
		</a>
	);
}

export default ExternalLink;
