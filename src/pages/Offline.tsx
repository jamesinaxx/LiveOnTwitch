import React from 'react';

import Channel from '../components/Channel';

type MainProps = {
	channels: string[];
};

export default function Offline(props: MainProps) {
	return (
		<div className="main">
			{!props.channels.length ? (
				<small>Add channels in the settings page</small>
			) : (
				props.channels.map((channel, i) => (
					<Channel key={i} online={false} name={channel} />
				))
			)}
		</div>
	);
}