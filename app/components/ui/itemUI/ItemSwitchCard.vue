<script setup lang="ts"></script>

<template>
	<div class="switch-card">
		<div class="joy-con left">
			<div class="minus button"></div>
			<div class="joystick">
				<div class="joystick-inner-border">
					<div class="joystick-inner"></div>
				</div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
			</div>
			<div class="numpad-container">
				<div class="numpad-part numpad-top">
					<div class="numpad-button">▲</div>
				</div>
				<div class="numpad-part numpad-middle">
					<div class="numpad-button">◀</div>
					<div class="numpad-button">▶</div>
				</div>
				<div class="numpad-part numpad-bottom">
					<div class="numpad-button">▼</div>
				</div>
			</div>
			<div class="record-button">
				<div class="record-button-inner"></div>
			</div>
		</div>
		<div class="screen-outline">
			<div class="screen-border">
				<div class="screen"></div>
			</div>
		</div>

		<div class="joy-con right">
			<div class="plus-symbol">
				<div class="plus-symbol-overlap-fixer"></div>
			</div>

			<div class="joystick">
				<div class="joystick-inner-border">
					<div class="joystick-inner"></div>
				</div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
			</div>

			<div class="numpad-container">
				<div class="numpad-part numpad-top">
					<div class="numpad-button">X</div>
				</div>
				<div class="numpad-part numpad-middle">
					<div class="numpad-button button">Y</div>
					<div class="numpad-button button">A</div>
				</div>
				<div class="numpad-part numpad-bottom">
					<div class="numpad-button button">B</div>
				</div>
			</div>

			<div class="home-button-border">
				<div class="home-button">⌂</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.switch-card {
	display: flex;
	align-items: stretch;
	width: 470px;
	height: 196.5px; /* 104px * 3 */
}
.screen-outline {
	display: flex;
	align-items: stretch;
	padding: 10px 14px;
	justify-content: center;
	border-radius: 2px;
	background: rgb(71, 77, 79);
	background: linear-gradient(
		180deg,
		rgba(71, 77, 79, 1) 0%,
		rgba(90, 97, 100, 1) 3%,
		rgba(46, 50, 51, 1) 5%,
		rgba(46, 50, 51, 1) 100%
	);
}
.screen-border {
	border-top: 17px solid black;
	border-bottom: 17px solid black;
	border-left: 25px solid black;
	border-right: 25px solid black;
	border-radius: 6px;
	flex: 1;
	background-color: black;
	width: 263px;
	display: flex;
}
.screen {
	border-radius: 2px;
	background: rgb(38, 39, 43);
	background: linear-gradient(
		135deg,
		rgba(38, 39, 43, 1) 0%,
		rgba(49, 52, 62, 1) 49%,
		rgba(38, 39, 43, 1) 100%
	);
	flex: 1;
	overflow: hidden;
	cursor: pointer;
}
.screen img {
	height: 100%;
	width: 100%;
	object-fit: cover;
}
.joy-con {
	background-color: pink;
	width: 65px;
	height: 196.5px;
	position: relative;
}
.joy-con.left {
	border-top-left-radius: 40px;
	border-bottom-left-radius: 40px;
	background: rgb(0, 186, 219);
	background: linear-gradient(148deg, rgba(0, 186, 219, 1) 0%, rgba(0, 185, 220, 1) 100%);
	box-shadow:
		inset 3px -4px 10px #058ca5,
		inset 0px 5px 3px #6ad9ed;
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}
.joy-con.right {
	border-top-right-radius: 40px;
	border-bottom-right-radius: 40px;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	background: rgb(250, 97, 93);
	background: linear-gradient(148deg, rgba(250, 97, 93, 1) 0%, rgba(239, 79, 77, 1) 100%);
	box-shadow:
		inset -3px -4px 10px #d12621,
		inset 0px 5px 3px #fd877c;
}

.joy-con.left .minus {
	position: absolute;
	top: 18px;
	width: 10px;
	height: 2px;
	border: 0.8px solid #222;
	border-radius: 1px;
	right: 5px;
	background-color: #3c3d41;
}

.joy-con.left .joystick {
	left: 50%;
	transform: translate(-50%);
	top: 35px;
}
.joy-con.right .joystick {
	top: 87.5px;
	left: 14px;
	filter: contrast(130%) drop-shadow(0px 1px 2px #00000088);
}
.joystick {
	background-color: #2d2e33;
	border-radius: 100%;
	height: 28px;
	width: 28px;
	position: relative;
	border: 1px solid #2d2e33;
	overflow: hidden;
	cursor: pointer;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-column-gap: 1px;
	grid-row-gap: 1px;
	filter: drop-shadow(0px 1px 2px #00000088);
}
.joystick-edge {
	background-color: #444;
}
.joystick-inner-border {
	position: absolute;

	top: 50%;
	left: 50%;
	background-color: #2d2e33;
	padding: 1px;
	z-index: 2;
	border-radius: 100%;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	justify-content: center;
}
.joystick-inner {
	width: 22px;
	height: 22px;
	border-radius: 50%;
	background-color: #282c2f;
	box-shadow:
		inset 0px -4px 4px rgb(49, 49, 49),
		inset 0px 4px 12px rgb(124, 124, 124),
		inset 0px 4px 6px rgb(0, 0, 0);
	z-index: 3;
	position: relative;
}

.numpad-container {
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
}
.joy-con.left .numpad-container {
	top: 82px;
	left: 12px;
	color: #1b1b1c;
	font-size: 8px;
}
.joy-con.right .numpad-container {
	top: 28.5px;
	left: 8px;
	color: #d7d7d7;
	font-size: 7px;
}

.numpad-middle {
	display: flex;
	align-items: center;
	gap: 16px;
}

.plus-symbol {
	width: 10px;
	height: 10px;
	position: absolute;
	display: inline-block;
	top: 14.5px;
	left: 5px;
	cursor: pointer;
}
.plus-symbol-overlap-fixer {
	position: absolute;
	background-color: #333;
	width: 2px;
	height: calc(100% - 2px);
	border-radius: 1px;
	top: 50%;
	left: 50%;
	z-index: 3;
	transform: translate(-50%, -50%);
}
.plus-symbol::before,
.plus-symbol::after {
	content: "";
	position: absolute;
	background-color: #333;
	border: 0.8px solid #222;
	border-radius: 1px;
}

.plus-symbol::before {
	width: 2px;
	height: 86.5%;
	left: 50%;
	transform: translateX(-50%);
}

.plus-symbol::after {
	width: 86.5%;
	height: 2px;
	top: 50%;
	transform: translateY(-50%);
}

.numpad-button {
	width: 12px;
	height: 12px;
	background-color: #505050;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	border: 1px solid #2d2e33;
	box-shadow:
		inset -0.5px -0.5px 1.5px rgba(92, 92, 92, 0.5),
		/* İç gölgeler küçük boyuta uygun şekilde azaltıldı */ inset 0.2px 1px 0.8px
			rgba(143, 143, 143, 0.658),
		inset /* Üst kısımda hafif ışık efekti */ -1px -1px 2px rgba(31, 31, 31, 0.76),
		0px 0px 3px #00000055;
}
.numpad-part {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.record-button {
	width: 10px;
	height: 10px;
	cursor: pointer;
	border: 1px solid #2d2e33;
	border-radius: 1px;
	position: absolute;
	top: 134px;
	left: 39px;
	background: rgb(96, 95, 101);
	background: linear-gradient(135deg, #605f65 0%, rgba(60, 61, 66, 1) 100%);
	display: flex;
	align-items: center;
	justify-content: center;
}
.record-button-inner {
	width: 4px;
	height: 4px;
	background: rgb(96, 95, 101);
	background: linear-gradient(135deg, #605f65 0%, rgba(60, 61, 66, 1) 100%);
	border: 1px solid #2d2e33;
	border-radius: 50%;
}

.home-button-border {
	position: absolute;
	cursor: pointer;
	top: 132.5px;
	left: 12px;
	border: 1px solid #1b1b1c;
	background: linear-gradient(135deg, #a0a0a0 0%, #303030 100%);
	height: 14px;
	width: 14px;
	padding: 1px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.home-button {
	width: 12px;
	height: 12px;
	border: 0.9px solid #1b1b1c;
	background: linear-gradient(180deg, #6b6b6b 0%, #303030 100%);
	border-radius: 50%;
	display: flex;
	color: black;
	align-items: center;
	justify-content: center;
	font-size: 9px;
}

.button {
	cursor: pointer;
}
.heart-card {
	position: relative;
	width: 200px;
	height: 200px;
	background-color: #ff6b6b;
	transform: rotate(-45deg);
	margin-top: 50px;
	z-index: 2;
}

.heart-card::before,
.heart-card::after {
	content: "";
	position: absolute;
	width: 200px;
	height: 200px;
	background-color: #ff6b6b;
	border-radius: 50%;
	z-index: -1;
}

.heart-card::before {
	top: -100px;
	left: 0;
}

.heart-card::after {
	left: 100px;
	top: 0;
}

.content {
	position: absolute;
	top: 50px;
	left: 50px;
	width: 100px;
	height: 100px;
	transform: rotate(40deg);
	text-align: center;
	color: white;
}

.content h2 {
	font-size: 18px;
	margin-bottom: 10px;
}

.content p {
	font-size: 14px;
}
</style>
