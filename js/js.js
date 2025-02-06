/* Регулярная сумма */
buttonTimeSum.onclick = function () {
	let ulTimeSum = document.getElementById('ulTimeSum')
	ulTimeSum.classList.toggle('calculator_ulSumOpen');
}
yearTimeSum.onclick = function () {
	let yearTimeSum = document.getElementById('yearTimeSum').innerText
	buttonTimeSum.innerText = yearTimeSum
	let ulTimeSum = document.getElementById('ulTimeSum')
	ulTimeSum.classList.toggle('calculator_ulSumOpen');

	let value = document.getElementById('yearTimeSum').value;
	buttonTimeSum.value = value
}
monthTimeSum.onclick = function () {
	let monthTimeSum = document.getElementById('monthTimeSum').innerText
	buttonTimeSum.innerText = monthTimeSum;
	ulTimeSum.classList.toggle('calculator_ulSumOpen');

	let value = document.getElementById('monthTimeSum').value;
	buttonTimeSum.value = value

}
/* Процент кнопка */
buttonTimeRate.onclick = function () {
	let ulTimeSum = document.getElementById('ulTimeRate');
	ulTimeSum.classList.toggle('calculator_ulSumOpen');
}
yearTimeRate.onclick = function () {
	let yearTimeRate = document.getElementById('yearTimeRate').innerText
	buttonTimeRate.innerText = yearTimeRate
	let ulTimeSum = document.getElementById('ulTimeRate')
	ulTimeSum.classList.toggle('calculator_ulSumOpen');
	let value = document.getElementById('yearTimeSum').value;
	buttonTimeRate.value = value;
}

monthTimeRate.onclick = function () {
	let monthTimeRate = document.getElementById('monthTimeRate').innerText
	buttonTimeRate.innerText = monthTimeRate
	let ulTimeSum = document.getElementById('ulTimeRate')
	ulTimeSum.classList.toggle('calculator_ulSumOpen');
	let value = document.getElementById('monthTimeRate').value;
	buttonTimeRate.value = value

}

calculation.onclick = function () {
	if (document.getElementById('start').value > 0) {
		let startSum = +document.getElementById('start').value/*startSum*/
		let regularSum = +document.getElementById('regularAmount').value/*регулярные вложения*/
		let r = +document.getElementById('procent').value/*процент*/
		let t = +document.getElementById('age').value/*время в годах*/
		let rP = +document.getElementById('buttonTimeRate').value/*переодичность процентов */
		let nS = +document.getElementById('buttonTimeSum').value/*переодичность  sum*/


		let allSum, finishSum, allProc


		//Без регулярной суммы
		if (!regularSum) {
			function calcSumm(startSum, r, t, rP) {

				for (let i = 0; i < t; i++) {
					finishStartSum = startSum * (Math.pow(1 + (r / 100), rP));
					startSum = finishStartSum
				}
				return finishStartSum
			}
			let finishSum = Math.floor(calcSumm(startSum, r, t, rP));
			allProc = finishSum - startSum

			fin(finishSum, allProc, 0)


		}
		//С регулярной  суммой в год и процент 
		if (regularSum && nS == 1 && rP == 1) {
			function calcSumm(startSum, regularSum, r, t, rP, nS) {
				for (let i = 0; i < t; i++) {
					finishStartSum = startSum * (Math.pow(1 + (r / 100), rP)) + regularSum * nS * (Math.pow(1 + (r / 100), rP));
					startSum = finishStartSum
				}
				return finishStartSum
			}
			let finishSum = Math.floor(calcSumm(startSum, regularSum, r, t, rP, nS));

			function calcRegSum(regularSum, t, nS) {
				let allSum = 0
				for (let i = 0; i < t; i++) {
					allSum += regularSum * nS
				}
				return allSum
			}
			let allSum = calcRegSum(regularSum, t, nS)

			function calcAllProc(finishSum, startSum, regularSum, t) {
				let sum = 0
				for (let i = 0; i < t; i++) {
					sum = startSum + regularSum
					startSum = sum
				}
				return finishSum - sum
			}
			let allProc = calcAllProc(finishSum, startSum, regularSum, t)
			fin(finishSum, allProc, allSum)
		}

		//С регулярной  суммой в месяц и процент в год  
		if (regularSum && nS == 12 && rP == 1) {
			function calcSumm(startSum, regularSum, r, t, rP, nS) {
				for (let i = 0; i < t; i++) {
					finishStartSum = startSum * (Math.pow(1 + (r / 100), rP)) + regularSum * nS * (Math.pow(1 + (r / 100), rP));
					startSum = finishStartSum
				}
				return finishStartSum
			}
			let finishSum = Math.floor(calcSumm(startSum, regularSum, r, t, rP, nS));

			function calcRegSum(regularSum, t, nS) {
				let allSum = 0
				for (let i = 0; i < t; i++) {
					allSum += regularSum * nS
				}
				return allSum
			}
			let allSum = calcRegSum(regularSum, t, nS)

			function calcAllProc(finishSum, startSum, regularSum, t) {
				let sum = 0
				for (let i = 0; i < t; i++) {
					sum = startSum + regularSum * nS
					startSum = sum
				}
				return finishSum - sum
			}
			let allProc = calcAllProc(finishSum, startSum, regularSum, t)
			fin(finishSum, allProc, allSum)
		}
		/*
		Расчет ежемесечного  полнения и процента.
		*/
		if (regularSum && nS == 12 && rP == 12) {
			function calcSumm(startSum, regularSum, r, t, nS) {
				t = t * nS
				for (let i = 0; i < t; i++) {
					finishStartSum = startSum * ((1 + (r / 100))) + regularSum * ((1 + (r / 100)));
					startSum = finishStartSum
				}
				return finishStartSum
			}
			let finishSum = Math.floor(calcSumm(startSum, regularSum, r, t, nS));

			function calcRegSum(regularSum, t, nS) {
				let allSum = 0
				for (let i = 0; i < t; i++) {
					allSum += regularSum * nS
				}
				return allSum
			}
			let allSum = calcRegSum(regularSum, t, nS)

			function calcAllProc(finishSum, startSum, regularSum, nS) {
				nS = t * nS
				let sum = startSum + regularSum * nS

				return finishSum - sum
			}
			let allProc = calcAllProc(finishSum, startSum, regularSum, nS)
			fin(finishSum, allProc, allSum)

		}
		/*
			Расчет ежемесечного  процента, один  раз в год  .
			*/
		if (regularSum && nS == 1 && rP == 12) {
			function calcSumm(startSum, regularSum, r, t, rP, nS) {
				for (let i = 0; i < t; i++) {
					finishStartSum = startSum * (Math.pow(1 + (r / 100), 1)) + regularSum * nS * (Math.pow(1 + (r / 100), rP));
					startSum = finishStartSum
				}
				return finishStartSum
			}
			let finishSum = Math.floor(calcSumm(startSum, regularSum, r, t, rP, nS));

			function calcRegSum(regularSum, t, nS) {
				let allSum = 0
				for (let i = 0; i < t; i++) {
					allSum += regularSum * nS
				}
				return allSum
			}
			let allSum = calcRegSum(regularSum, t, nS)

			function calcAllProc(finishSum, startSum, regularSum, nS) {
				nS = t * nS
				let sum = startSum + regularSum * nS

				return finishSum - sum
			}

			let allProc = calcAllProc(finishSum, startSum, regularSum, nS)
			fin(finishSum, allProc, allSum)

		}
		function fin(finishSum, allProc, allSum) {
			let finish = document.getElementById('finish')
			let TotalTopups = document.getElementById('TotalTopups')
			let totalPercen = document.getElementById('TotalPercent')
			finish.innerText = finishSum
			TotalTopups.innerText = allSum
			totalPercen.innerText = allProc
		}
	}
}