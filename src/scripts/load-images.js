export default function loadImages(imageFiles) {
		let loadCount = 0;
		let loadTotal = imageFiles.length;

		// Load the images
		let loadedImages = [];
		for (let i=0; i < loadTotal; i++) {
			let image = new Image();

			image.onload = function () {
				loadCount++;
			};

			image.src = imageFiles[i];
			loadedImages[i] = image;
		}

		return loadedImages;
	}

	// //загрузка всех картинок
	// let loadCount = 0;
	// let loadTotal = 0;
	// let preloaded = false;
	
	// function loadImages(imageFiles) {
	// 	loadCount = 0;
	// 	loadTotal = imageFiles.length;
	// 	preloaded = false;

	// 	// Load the images
	// 	let loadedImages = [];
	// 	for (let i=0; i<imageFiles.length; i++) {
	// 		let image = new Image();

	// 		image.onload = function () {
	// 				loadCount++;
	// 				if (loadCount === loadTotal) {
	// 					preloaded = true;
	// 				}
	// 		};

	// 		image.src = imageFiles[i];
	// 		loadedImages[i] = image;
	// 	}

	// 	return loadedImages;
	// }
