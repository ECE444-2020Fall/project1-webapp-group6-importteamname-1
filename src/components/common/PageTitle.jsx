/**
 * FileName: PageTitle.jsx
 *
 * Description: Displays title on a page.
 *
 * Author(s): WebTemplateStudio
 * Date: November 17, 2020 
 */


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


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
};

PageTitle.propTypes = {
	titleName: PropTypes.string
};

export { PageTitle };
