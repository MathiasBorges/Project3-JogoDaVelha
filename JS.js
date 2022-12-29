const elementsCel = document.querySelectorAll("[data-cell]");
const base = document.querySelector("[data-board]");
const smsEnd = document.querySelector("#smsEndGame");
const displayEndGame = document.querySelector(".winM");
const refreshBTN = document.querySelector(".btnRe");
let CircleTurn;


const WinsWays = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6],
];

const beginGame = () => {
	CircleTurn = false;
	for (const cels of elementsCel) {
		cels.addEventListener('click',handleClick, { once: true });
	}
	
	base.classList.add("x");
};

const finishedGame = (draw) => {
	if(draw){
		displayEndGame.style.display="flex";
		smsEnd.innerText = "Empate";
	}else{
		displayEndGame.style.display="flex";
		smsEnd.innerText = CircleTurn 
		? "O venceu ;)" 
		: "X venceu ;)";
	}
	
} 

refreshBTN.onclick = () => {
	displayEndGame.style.display="none"
	location.reload();
}

const checkWin = (currentPlayer) => {
	return WinsWays.some(combination => {
		return combination.every(index => {
			return elementsCel[index].classList.contains(currentPlayer)
		});
	});
};
const checkDraw = () => {
	return [... elementsCel].every(cell => {
	return cell.classList.contains("x") || cell.classList.contains("circle");
	});
};

const localMarked = (cels, addClass) =>{
		cels.classList.add(addClass);
};

const changeSy = () => {
	CircleTurn = !CircleTurn;
	
	base.classList.remove("circle");
	base.classList.remove("x");

	if (CircleTurn) {
		base.classList.add("circle");
	} else {
		base.classList.add("x");
	}
};

const handleClick = (e) => { 
	//Colocar X ou O
	const cels = e.target;
	const addClass = CircleTurn ? "circle" : "x";
	localMarked(cels, addClass);

	//Verificar Vitória
	const Won = checkWin(addClass);
	const draw = checkDraw();

	if (Won){ 
			finishedGame(false);
	
	}else if (draw){
		finishedGame(true)
	}else{
		changeSy();
	}
	//Verificar Empates
	//Alternar entre O e X (V)
	
};

beginGame();
