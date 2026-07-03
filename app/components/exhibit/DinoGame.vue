<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by ashif_6672 -->
	<div class="dino-game">
		<div class="dino-runner"></div>
		<div class="dino-obstacle"></div>
		<div class="dino-ground"></div>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by ashif_6672 */
.dino-game {
	width: 100%;
	height: 150px;
	position: relative;
	overflow: hidden;
	margin: 0 auto;
	border-bottom: 1px solid #ddd;
	display: flex;
	justify-content: center;

	.dino-runner {
		width: 44px;
		height: 47px;
		position: absolute;
		bottom: 12px;
		left: 50%;
		margin-left: -22px;
		z-index: 2;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAAvAgMAAABiRrxWAAAADFBMVEX///9TU1P39/f///+TS9URAAAAAXRSTlMAQObYZgAAAPpJREFUeF7d0jFKRkEMhdGLMM307itNLALyVmHvJuzTDMjdn72E95PGFEZSmeoU4YMMgxhskvQec8YSVFX1NhGcS5ywtbmC8khcZeKq+ZWJ4F8Sr2+ZCErjkJFEfcjAc/6/BMlfcz6xHdhRthYzIZhIHMcTVY1scUUiAphK8CMSPUbieTBhvD9Lj0vyV4wklEGzHpciKGOJoBp7XDcFs4kWxxM7Ey3iZ8JbzASAvMS7XLOJHTTvEkEZSeQl7DMuwVyCasqK5+XzQRYLUJlMbPXjFcn3m8eKBSjWZMJwvGIOvViAzCbUj1VEDoqFOEQGE3SyInJQLOQMJL4B7enP1UbLXJQAAAAASUVORK5CYII=");

		animation:
			dinoRun 0.25s infinite steps(2),
			dinoJump 1.5s infinite linear;
	}

	.dino-obstacle {
		width: 17px;
		height: 35px;
		position: absolute;
		bottom: 12px;
		right: -50px;
		z-index: 1;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAjCAMAAABRlI+PAAAADFBMVEX////////39/dTU1PhglcSAAAAAXRSTlMAQObYZgAAAPNJREFUeF7tlkEKwzAMBLXr//+5iQhU7gRRQkyhZI+DhwH74jhmO+oIJBVwURljuAXagG5QqkSgBLqg3JnxJ1Cb8SmQ3o6gpO85owGlOB4m2BNKJ11BSd01owGlOHkcIAuHkz6UNpPKgozPM54dADHjJuNhZiJxdQCQgZJeBczgCAAy3yhPJvcnmdC9mZwBIsQMFV5AkzHBNknFgcKM+oyDIFcfCAoy03m+jSMIcmoVZkKqSjr1fghyahRmoKRUHYLiSI1SMlCq5CDgX6BXmKkfn+oQ0KEyyrzoy8GbXJ9xrM/YjhUZgl9nnsyTCe9rgSRdV15CwRcIEu8GGQAAAABJRU5ErkJggg==");

		animation: moveObstacle 1.5s infinite linear;
	}

	.dino-ground {
		width: 100%;
		height: 12px;
		position: absolute;
		bottom: 5px;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAAMAgMAAAAPCKxBAAAABlBMVEX///9TU1NYzE1OAAAAAXRSTlMAQObYZgAAALJJREFUeF7t1EEKAyEMhtEvMNm7sPfJEVyY+1+ltLgYAsrQCtWhbxEhQvgxIJtSZypxa/WGshgzKdbq/UihMFMlt3o/CspEYoihIMaAb6mCvM6C+BTAeyo+wN4yykV/6pVfkdLpVyI1hh7GJ6QunUoLEQlQglNP2nkQkeF8+ei9cLxMue1qxVRfk1Ej0s6AEGWfVOk0QUtnK5Xo0Lac6wpdtnQqB6VxomPaz+dgF1PaqqmeWJlz1jYUaSIAAAAASUVORK5CYII=");
		background-repeat: repeat-x;
		animation: moveGround 4s linear infinite;
	}
}

@keyframes dinoRun {
	from {
		background-position: -44px 0;
	}
	to {
		background-position: -132px 0;
	}
}

@keyframes dinoJump {
	0%,
	35% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-60px);
	}
	65%,
	100% {
		transform: translateY(0);
	}
}

@keyframes moveObstacle {
	0% {
		right: -50px;
	}
	100% {
		right: 100%;
	}
}

@keyframes moveGround {
	from {
		background-position: 0 0;
	}
	to {
		background-position: -1200px 0;
	}
}
</style>
