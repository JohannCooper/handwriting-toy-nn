import NeuralNetwork from "./NeuralNetwork.js";
// import {mnist_train_10000, mnist_train_5000, mnist_train_100, mnist_test_10} from "./Dataset.js";

const canvas = document.getElementById("drawing");
const ctx = canvas.getContext("2d");
ctx.scale(28, 28);

const train_inputs = [];
const train_targets = [];
// const test_inputs = [];
// const test_targets = [];

const inputTag = document.getElementById("trainingFile");
inputTag.addEventListener("change", e => {
	const reader = new FileReader();
	reader.readAsText(inputTag.files[0]);
	reader.onload = e => {
		const lines = reader.result.split("\n").map(line => {
			return line.split(",");
		});


		lines.forEach(line => {
			const fillArray = new Array(10).fill(0.01);
			fillArray[line[0]] = 0.99;
			train_targets.push(fillArray);
		});

		lines.forEach(line => {
			line.shift();
			line.forEach((e, i) => {
				line[i] = (e === 0) ? 0.01 : 0.99;
			});
			train_inputs.push(line);
		});

		train_inputs.pop();
		train_targets.pop();

		const NN = new NeuralNetwork(784, 100, 10, 0.1);

		train_inputs.forEach((input, i) => {
			NN.train(input, train_targets[i]);
		});

		console.log("TRAINING COMPLETE");

		let active = false;
		let user_input = new Array(784).fill(0.01);

		function drawPixel(x, y, radius, fillColor) {
		    ctx.fillStyle = fillColor;
		    ctx.fillRect(x, y, radius, radius);
		}

		document.addEventListener("mousedown", e => {
			active = true;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			user_input = new Array(784).fill(0.01);
		});

		document.addEventListener("mouseup", e => {
			active = false;
			const output = NN.query(user_input).map(x => x[0]);
			const guess = output.indexOf(Math.max(...output));
			console.log("GUESS: " + guess);
		});

		document.addEventListener("mousemove", e => {
		    if (e.type === "mousemove" && active) {
		    	let x = Math.floor((e.pageX - canvas.offsetLeft) / 28);
		    	let y = Math.floor((e.pageY - canvas.offsetTop) / 28);

		    	let index1 = (x + 0) + ((y + 0) * 28);
		    	let index2 = (x + 1) + ((y + 0) * 28);
		    	let index3 = (x + 2) + ((y + 0) * 28);
		    	let index4 = (x + 0) + ((y + 1) * 28);
		    	let index5 = (x + 1) + ((y + 1) * 28);
		    	let index6 = (x + 2) + ((y + 1) * 28);
		    	let index7 = (x + 0) + ((y + 2) * 28);
		    	let index8 = (x + 1) + ((y + 2) * 28);
		    	let index9 = (x + 2) + ((y + 2) * 28);
		    	user_input[index1] = 0.99;
		    	user_input[index2] = 0.99;
		    	user_input[index3] = 0.99;
		    	user_input[index4] = 0.99;
		    	user_input[index5] = 0.99;
		    	user_input[index6] = 0.99;
		    	user_input[index7] = 0.99;
		    	user_input[index8] = 0.99;
		    	user_input[index9] = 0.99;
		    	drawPixel(x + 0, y + 0, 1, "#000");
		    	drawPixel(x + 1, y + 0, 1, "#000");
		    	drawPixel(x + 2, y + 0, 1, "#000");
		    	drawPixel(x + 0, y + 1, 1, "#000");
		    	drawPixel(x + 1, y + 1, 1, "#000");
		    	drawPixel(x + 2, y + 1, 1, "#000");
		    	drawPixel(x + 0, y + 2, 1, "#000");
		    	drawPixel(x + 1, y + 2, 1, "#000");
		    	drawPixel(x + 2, y + 2, 1, "#000");
		    }
		});
	};
}, false);

// mnist_train_10000.forEach(val => {
// 	const fillArray = new Array(10).fill(0.01);
// 	fillArray[val[0]] = 0.99;
// 	train_targets.push(fillArray);
// });

// mnist_train_10000.forEach(val => {
// 	val.shift();
// 	val.forEach((e, i) => {
// 		val[i] = (e === 0) ? 0.01 : 0.99;
// 	});
// 	train_inputs.push(val);
// });

// mnist_train_100.forEach(val => {
// 	const fillArray = new Array(10).fill(0.01);
// 	fillArray[val[0]] = 0.99;
// 	test_targets.push(fillArray);
// });

// mnist_train_100.forEach(val => {
// 	val.shift();
// 	val.forEach((e, i) => {
// 		val[i] = (e === 0) ? 0.01 : 0.99;
// 	});
// 	test_inputs.push(val);
// });

// let foo = 0;
// window.addEventListener("keydown", key => {
// 	if (key.code === "ArrowRight") {
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
// 		drawInput(train_inputs[foo]);
// 		foo++;
// 	}
// });

// function drawInput(input) {
// 	ctx.fillStyle = "#F00";
// 	input.forEach((pixel, i) => {
// 		if (pixel === 0.99) {
// 			ctx.fillRect(i % 28, Math.floor(i / 28), 1, 1);
// 		}
// 	});
// }

// const NN = new NeuralNetwork(784, 100, 10, 0.1);

// train_inputs.forEach((input, i) => {
// 	NN.train(input, train_targets[i]);
// });

// let correct = 0;
// test_inputs.forEach((input, i) => {
// 	const target = test_targets[i].indexOf(Math.max(...test_targets[i]));
// 	const output = NN.query(input).map(x => x[0]);
// 	const guess = output.indexOf(Math.max(...output));
	
// 	// console.log("Target: " + target);
// 	// console.log("Guess: " + guess);
// 	if (target === guess) correct++;
// });

// console.log("Accuracy: " + correct + "%");

// let active = false;
// let user_input = new Array(784).fill(0.01);

// function drawPixel(x, y, radius, fillColor) {
//     ctx.fillStyle = fillColor;
//     ctx.fillRect(x, y, radius, radius);
// }

// document.addEventListener("mousedown", e => {
// 	active = true;
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	user_input = new Array(784).fill(0.01);
// });

// document.addEventListener("mouseup", e => {
// 	active = false;
// 	const output = NN.query(user_input).map(x => x[0]);
// 	const guess = output.indexOf(Math.max(...output));
// 	console.log("GUESS: " + guess);
// 	drawInput(user_input);
// });

// document.addEventListener("mousemove", e => {
//     if (e.type === "mousemove" && active) {
//     	let x = Math.floor((e.pageX - canvas.offsetLeft) / 28);
//     	let y = Math.floor((e.pageY - canvas.offsetTop) / 28);

//     	let index1 = (x + 0) + ((y + 0) * 28);
//     	let index2 = (x + 1) + ((y + 0) * 28);
//     	let index3 = (x + 2) + ((y + 0) * 28);
//     	let index4 = (x + 0) + ((y + 1) * 28);
//     	let index5 = (x + 1) + ((y + 1) * 28);
//     	let index6 = (x + 2) + ((y + 1) * 28);
//     	let index7 = (x + 0) + ((y + 2) * 28);
//     	let index8 = (x + 1) + ((y + 2) * 28);
//     	let index9 = (x + 2) + ((y + 2) * 28);
//     	user_input[index1] = 0.99;
//     	user_input[index2] = 0.99;
//     	user_input[index3] = 0.99;
//     	user_input[index4] = 0.99;
//     	user_input[index5] = 0.99;
//     	user_input[index6] = 0.99;
//     	user_input[index7] = 0.99;
//     	user_input[index8] = 0.99;
//     	user_input[index9] = 0.99;
//     	drawPixel(x + 0, y + 0, 1, "#000");
//     	drawPixel(x + 1, y + 0, 1, "#000");
//     	drawPixel(x + 2, y + 0, 1, "#000");
//     	drawPixel(x + 0, y + 1, 1, "#000");
//     	drawPixel(x + 1, y + 1, 1, "#000");
//     	drawPixel(x + 2, y + 1, 1, "#000");
//     	drawPixel(x + 0, y + 2, 1, "#000");
//     	drawPixel(x + 1, y + 2, 1, "#000");
//     	drawPixel(x + 2, y + 2, 1, "#000");
//     }
// });