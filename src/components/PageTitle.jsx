import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	title: {
		'& > *': {
			padding: 5,
		}
	},
}));

const PageTitle = ({ titleName }) => {
	const classes = useStyles();
	return (
		<div className={classes.title}>
			<div className='row justify-content-center mt-5 p-10'>
				<h3> {titleName} </h3>
			</div>
		</div>
	);
}

export { PageTitle };
