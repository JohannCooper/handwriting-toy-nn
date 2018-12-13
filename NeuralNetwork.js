import {sigmoid, addMatrices, convertArrayToMatrix, createWeightMatrix, subtractMatrices, multiplyMatrices, dotMatrices, transposeMatrix} from "./matrix.js";

export default class NeuralNetwork {
	constructor(inputs, hidden, outputs, learningRate) {
		this.inputs = inputs;
		this.hidden = hidden;
		this.outputs = outputs;
		this.learningRate = learningRate;
		this.weightsInputHidden = createWeightMatrix(this.hidden, this.inputs);
		this.weightsHiddenOutput = createWeightMatrix(this.outputs, this.hidden);
	}
	train(inputs, targets) {
		const inputsMatrix = convertArrayToMatrix(inputs);
		const targetsMatrix = convertArrayToMatrix(targets);

		const hiddenInputs = dotMatrices(this.weightsInputHidden, inputsMatrix);
		const hiddenOutputs = hiddenInputs.map(x => [sigmoid(x)]);

		const finalInputs = dotMatrices(this.weightsHiddenOutput, hiddenOutputs);
		const finalOutputs = finalInputs.map(x => [sigmoid(x)]);

		const outputErrors = subtractMatrices(targetsMatrix, finalOutputs);
		const hiddenErrors = dotMatrices(transposeMatrix(this.weightsHiddenOutput), outputErrors);

		const hiddenOutputsT = transposeMatrix(hiddenOutputs);
		const inputsMatrixT = transposeMatrix(inputsMatrix);
		const onesMatrix1 = new Array(finalOutputs.length).fill(1).map(row => new Array(finalOutputs[0].length).fill(1));
		const onesMatrix2 = new Array(hiddenOutputs.length).fill(1).map(row => new Array(hiddenOutputs[0].length).fill(1));
		const jumble = dotMatrices(multiplyMatrices(multiplyMatrices(outputErrors, finalOutputs), subtractMatrices(onesMatrix1, finalOutputs)), hiddenOutputsT);
		const lrMatrix1 = new Array(jumble.length).fill(this.learningRate).map(row => new Array(jumble[0].length).fill(this.learningRate));
		const bumble = dotMatrices(multiplyMatrices(multiplyMatrices(hiddenErrors, hiddenOutputs), subtractMatrices(onesMatrix2, hiddenOutputs)), inputsMatrixT);
		const lrMatrix2 = new Array(bumble.length).fill(this.learningRate).map(row => new Array(bumble[0].length).fill(this.learningRate));

		const foo = multiplyMatrices(lrMatrix1, jumble);
		this.weightsHiddenOutput = addMatrices(this.weightsHiddenOutput, foo);
		const bar = multiplyMatrices(lrMatrix2, bumble);
		this.weightsInputHidden = addMatrices(this.weightsInputHidden, bar);
	}
	query(inputs) {
		const inputsMatrix = convertArrayToMatrix(inputs);

		const hiddenInputs = dotMatrices(this.weightsInputHidden, inputsMatrix);
		const hiddenOutputs = hiddenInputs.map(x => [sigmoid(x)]);

		const finalInputs = dotMatrices(this.weightsHiddenOutput, hiddenOutputs);
		const finalOutputs = finalInputs.map(x => [sigmoid(x)]);

		return finalOutputs;
	}
}