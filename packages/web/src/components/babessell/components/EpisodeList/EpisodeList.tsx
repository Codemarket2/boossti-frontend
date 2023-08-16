import React from "react";

interface Episode {
	name: string;
	number: string;
	thumbnail: string;
}

const episodes: Episode[] = [
	{
		name: `The Break-in`,
		number: `S12 - E1`,
		thumbnail: `https://www.bravotv.com/sites/bravo/files/styles/watch-thumbnail--tablet-1_5x/public/media_mpx/thumbnails/tve-static-bravotv.akamaized.net/prod/image/943/167/RHBH_1201_Preview_1_Erika_Says_Sutton_Lead_Charge_800x450_2032508483758.jpg?h=ae1281eb&itok=zwGjtRsX`,
	},
	{
		name: `Receipt Offender`,
		number: `S12 - E2`,
		thumbnail: `https://www.bravotv.com/sites/bravo/files/styles/watch-thumbnail--tablet-1_5x/public/media_mpx/thumbnails/tve-static-bravotv.akamaized.net/prod/image/823/894/RHBH_1202_FULL_EPISODE_THUMB_800x450_2034528323718.jpg?h=ae1281eb&itok=GEIhI2iH`,
	},
	{
		name: `There's Sutton About Crystal`,
		number: `S12 - E3`,
		thumbnail: `https://www.bravotv.com/sites/bravo/files/styles/watch-thumbnail--tablet-1_5x/public/media_mpx/thumbnails/tve-static-bravotv.akamaized.net/prod/image/12/130/RHBH_1203_Preview_2_Dorit_Crystal_800x450_2036899907583.jpg?h=ae1281eb&itok=MCMPRlAh`,
	},
	{
		name: `The Crystal Conundrum`,
		number: `S12 - E4`,
		thumbnail: `https://www.bravotv.com/sites/bravo/files/styles/watch-thumbnail--tablet-1_5x/public/media_mpx/thumbnails/tve-static-bravotv.akamaized.net/prod/image/957/463/RHBH_1210_FULL_EPISODE_THUMB_800x450_2055135299673.jpg?h=ae1281eb&itok=GJ4ZbNpV`,
	},
	{
		name: `In Hot Water`,
		number: `S12 - E5`,
		thumbnail: `https://www.bravotv.com/sites/bravo/files/styles/watch-thumbnail--tablet-1_5x/public/media_mpx/thumbnails/tve-static-bravotv.akamaized.net/prod/image/256/667/RHBH_1207_Preview_1_Erika_Sutton_Friends_Again_800x450_2045748803552.jpg?h=ae1281eb&itok=lOglMNM4`,
	},
	{
		name: `High Cries and Misty Demeanors`,
		number: `S12 - E6`,
		thumbnail: `https://www.bravotv.com/sites/bravo/files/styles/watch-thumbnail--tablet-1_5x/public/media_mpx/thumbnails/tve-static-bravotv.akamaized.net/prod/image/927/30/RHBH_1211_PREVIEW_STRINGOUT_YT_800x450_2055130691740.jpg?h=ae1281eb&itok=_BF-TUmz`,
	},
	{
		name: `Ship-Faced`,
		number: `S12 - E7`,
		thumbnail: `https://www.bravotv.com/sites/bravo/files/styles/watch-thumbnail--tablet-1_5x/public/media_mpx/thumbnails/tve-static-bravotv.akamaized.net/prod/image/895/647/RHBH_1212_Preview_2_Sutton_Relaxed_Not_Slutty_800x450_2056083523614.jpg?h=ae1281eb&itok=jUD88w3J`,
	},
	{
		name: `It Takes a Villain`,
		number: `S12 - E8`,
		thumbnail: `https://www.bravotv.com/sites/bravo/files/styles/watch-thumbnail--tablet-1_5x/public/media_mpx/thumbnails/tve-static-bravotv.akamaized.net/prod/image/318/27/RHBH_1208_FULL_EPISODE_THUMB_800x450_2047960643572.jpg?h=ae1281eb&itok=EZsqavbz`,
	},
];

function EpisodeList() {
	const episodeInfo = episodes.map((episode, i) => (
		<div
			key={i}
			style={{
				position: "relative",
				width: "300px",
				height: "260px",
				margin: "0",
			}}
		>
			<div
				style={{
					width: "300px",
					display: "inline-block",
					position: "relative",
				}}
				className="image-container"
			>
				<img
					src={episode.thumbnail}
					alt="thumbnail"
					className="thumbnail"
					style={{
						width: "300px",
						display: "inline-block",
						position: "relative",
					}}
				/>
				<p
					className="text-overlay"
					style={{
						position: "absolute",
						bottom: 0,
						right: 0,
						backgroundColor: "rgba(120, 120, 120, 0.6)",
						color: "black",
						borderRadius: "5px",
						width: "fit-content",
						padding: "2px",
					}}
				>
					44:24
				</p>
			</div>

			<h3
				className="episode-number"
				style={{
					fontSize: "15px",
					fontWeight: 500,
					margin: 0,
					marginLeft: "5px",
				}}
			>
				{episode.number}
			</h3>
			<h2
				className="episode-name"
				style={{ fontSize: "22px", margin: 0, marginLeft: "5px" }}
			>
				{episode.name}
			</h2>
		</div>
	));

	return (
		<div
			className="episodes"
			style={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				alignItems: "center",
				gap: "30px",
				padding: "3% 0 3% 0",
			}}
		>
			{episodeInfo}
		</div>
	);
}

export default EpisodeList;
