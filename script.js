var timerEl = document.getElementById('timeLeft');
var startButton = document.getElementById('start');
var questionEl = document.getElementById('main');
var scoreEl = document.getElementById('main');
var initial = null;
questionIndex = 0;
console.log(startButton);

//time given on quiz
var timeLeft = 45;

// these are the list of question
var questions = [
	{
		//question found at  https://www.interviewbit.com/javascript-mcq/
		question: "What does the 'var' keyword do?",
		a: 'loccally delcares a variable',
		b: 'globally delcares a variable',
		c: 'creates an int',
		d: 'gives a boolean value to an object',
		answer: 'loccally delcares a variable',
	},
	{
		question:
			"Javascript is an _______ language?",
		a: 'Object-Oriented',
		b: 'Object-Based',
		c: 'Procedural',
		d: 'None of the Above',
		answer: 'Object-Oriented',
	},
	{
		question:
			'What does API mean?',
		a: 'Application Production Interface',
		b: 'Abridged Programming Interface',
		c: 'Application Programming Interface',
		d: 'Abridged Protocol Interface',
		answer: 'Application Programming Interface',
	},
	{
		question: 'What Year was JavaScript written?',
		a: '1989',
		b: '1995',
		c: '2001',
		d: '2003',
		answer: '1995',
	},
	{
		question: 'Which of the following keywords is used to define a variable in Javascript',
		a: 'const',
		b: 'let',
		c: 'var',
		d: 'All of the Above',
		answer: 'All of the Above',
	},
	{
		question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
		a: 'Throws an error',
		b: 'Ingores the Statements',
		c: 'Gives a warning',
		d: 'None of the above',
		answer: 'Ingores the Statements',
	},
	{
		question: 'What keyword is used to check whether a given property is valid or not?',
		a: 'in',
		b: 'is in',
		c: 'lies',
		d: 'exists',
		answer: 'in',
	},

];

function startQuiz() {
	countdown();
	displayquestion();
}

function countdown() {
	var interval = setInterval(function () {
		if (questionIndex < 7 && timeLeft > 0) {
			timerEl.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else if (timeLeft === 1) {
			timerEl.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else {
			timerEl.textContent = 'Time: ' + timeLeft;
			clearInterval(interval);
			score();
		}
	}, 1000);
}

// allows application to display question and add existing question
function displayquestion() {
	if (questionIndex < 7) {
		document.getElementById('main').innerHTML = '';

		var current = questions[questionIndex];

		var question = document.createElement('h3');
		question.textContent = current.question;
		questionEl.appendChild(question);

		var a = document.createElement('button');
		a.textContent = current.a;
		questionEl.appendChild(a);

		var b = document.createElement('button');
		b.textContent = current.b;
		questionEl.appendChild(b);

		var c = document.createElement('button');
		c.textContent = current.c;
		questionEl.appendChild(c);

		var d = document.createElement('button');
		d.textContent = current.d;
		questionEl.appendChild(d);

		a.addEventListener('click', anwserCheck);
		b.addEventListener('click', anwserCheck);
		c.addEventListener('click', anwserCheck);
		d.addEventListener('click', anwserCheck);
	} else {
		score();
	}
}

function displaymyScores() {}

function anwserCheck() {
	console.log(this);
	if (questions[questionIndex].answer === this.textContent) {
		console.log('correct');
		questionIndex++;
		console.log(questionIndex);
		displayquestion();
	} else {
		console.log('incorrect');
		questionIndex++;
		console.log(questionIndex);
		timeLeft -= 8;
		displayquestion();
		
	}
}
// lets score be tracked as time left 
function score() {
	document.getElementById('main').innerHTML = '';

	var scoreText = document.createElement('h1');
	scoreText.innerHTML = 'Score: ' + timeLeft;
	scoreEl.appendChild(scoreText);
	if (timeLeft < 0) {
		scoreText.innerHTML = 'Score: 0';
		timeLeft = 0;
	}

	initial = document.createElement('input');
	scoreEl.appendChild(initial);

	var submit = document.createElement('button');
	submit.innerHTML = 'Submit';
	scoreEl.appendChild(submit);

	submit.onclick = saveScore;
}

function saveScore() {
	var userscore = {
		name: initial.value,
		fs: timeLeft,
	};
	myScores.push(userscore);
	window.localStorage.setItem('myScores', JSON.stringify(myScores));
	document.getElementById('main').innerHTML = '';
	timeLeft = 45;
	questionIndex = 0;
}

var viewscore = document.querySelector('.myScore');
viewscore.addEventListener('click', loadScore);
function loadScore() {
	for (var i = 0; i < myScores.length; i++) {
		var n = document.createElement('h4');

		var currentmyScore = myScores[i];

		n.textContent = currentmyScore.name + ' got ' + currentmyScore.fs + '!';

		scoreEl.appendChild(n);
	}
}

var myScores = JSON.parse(localStorage.getItem('myScores')) || [];

startButton.onclick = startQuiz;
