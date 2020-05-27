import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import theme1 from './theme1.png';
import theme2 from './theme2.png';
import theme3 from './theme3.png';

const items = [
	{
		src: theme1,
		key: '1'
	},
	{
		src: theme2,
		key: '2'
	},
	{
		src: theme3,
		key: '3'
	}
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;
