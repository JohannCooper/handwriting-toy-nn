export function sigmoid(x) {
	return 1 / (1 + Math.exp(-x));
}

export function convertArrayToMatrix(inputs) {
    const matrix = [];

    for (let i = 0; i < inputs.length; i++) {
        matrix.push([inputs[i]]);
    }

    return matrix;
}

export function createWeightMatrix(rows, columns) {
    const matrix = [];

    for (let r = 0; r < rows; r++) {
        matrix.push([]);
        for (let c = 0; c < columns; c++) {
            matrix[r].push(Math.random() - 0.5);
        }
    }

    return matrix;
}

export function addMatrices(M1, M2) {
    const result = [];

    M1.forEach((row, i) => {
        result.push([]);
        row.forEach((val, j) => {
            result[i].push(val + M2[i][j]);
        });
    });

    return result;
}

export function dotMatrices(M1, M2) {
	if (M1[0].length !== M2.length) throw "INVALID MATRIX MULTIPLICATION";

    const result = new Array(M1.length).fill(0).map(row => new Array(M2[0].length).fill(0));
    
    return result.map((row, i) => {
        return row.map((val, j) => {
            return M1[i].reduce((sum, elm, k) => sum + elm * M2[k][j], 0);
        });
    });
}

export function multiplyMatrices(M1, M2) {
    const result = [];

    M1.forEach((row, i) => {
        result.push([]);
        row.forEach((val, j) => {
            result[i].push(val * M2[i][j]);
        });
    });

    return result;
}

export function subtractMatrices(M1, M2) {
    const result = [];

    M1.forEach((row, i) => {
        result.push([]);
        row.forEach((val, j) => {
            result[i].push(val - M2[i][j]);
        });
    });

    return result;
}

export function transposeMatrix(M) {
	const result = new Array(M[0].length).fill(0).map(row => new Array(M.length).fill(0));
	
	return result.map((row, i) => {
        return row.map((val, j) => {
        	return M[j][i];
        });
    });
}

// const inputs = [[0.9], [0.1], [0.8]];
// const weightsInputHidden = [[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]];
// const weightsHiddenOutput = [[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]];

// const xHidden = dotMatrices(weightsInputHidden, inputs);
// const oHidden = xHidden.map(x => [sigmoid(x)]);
// const xOutput = dotMatrices(weightsHiddenOutput, oHidden);
// const oOutput = xOutput.map(x => [sigmoid(x)]);