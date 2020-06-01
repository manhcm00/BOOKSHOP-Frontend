import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import WorkIcon from '@material-ui/icons/Work';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
});

export default function SwipeableTemporaryDrawer() {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom'
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
			style={{ marginTop: '50px' }}
		>
			<List>
				<ListItem button key={'Home'}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={'Home'} />
				</ListItem>
				<ListItem button key={'Info'}>
					<ListItemIcon>
						<InfoIcon />
					</ListItemIcon>
					<ListItemText primary={'About'} />
				</ListItem>
				<ListItem button key={'Work'}>
					<ListItemIcon>
						<WorkIcon />
					</ListItemIcon>
					<ListItemText primary={'Work'} />
				</ListItem>
				<ListItem button key={'Projects'}>
					<ListItemIcon>
						<SpellcheckIcon />
					</ListItemIcon>
					<ListItemText primary={'Projects'} />
				</ListItem>
			</List>
			<Divider />
			<List>
				{[ 'All mail', 'Trash', 'Spam' ].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const BurgerStyle = {
		width: '25px',
		height: '3px',
		backgroundColor: 'rgba(47, 53, 66,1.0)',
		margin: '5px',
		transition: 'all 0.3s ease'
	};

	return (
		<div>
			<React.Fragment key={'left'}>
				<div onClick={toggleDrawer('left', true)}>
					<div style={BurgerStyle} />
					<div style={BurgerStyle} />
					<div style={BurgerStyle} />
				</div>
				<SwipeableDrawer
					anchor={'left'}
					open={state['left']}
					onClose={toggleDrawer('left', false)}
					onOpen={toggleDrawer('left', true)}
				>
					{list('left')}
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}
