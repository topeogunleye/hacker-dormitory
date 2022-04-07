import React from 'react';
import {v4 as uuid} from 'uuid';

function ResidentsList({residents}) {
	console.log(residents)
	return (
		<div className="pa-10 mt-10 w-75">
			<div className="font-weight-bold text-center">Residents List</div>
			{residents && residents.map((student) => (
			<ul className="mt-10 styled w-50 mx-auto" data-testid="residentsNameList">
				<li key="item1" className="slide-up-fade-in">
					{student}
				</li>
			</ul>
			))}
		</div>
	);
}

export default ResidentsList;
