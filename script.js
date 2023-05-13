populate();
async function populate() {
	const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
	const request = new Request(requestURL);

	const response = await fetch(request);
	const superHeroes = await response.json();

	populateHeader(superHeroes); // ✅
	populateHeroes(superHeroes); // 👈
	populateTable(superHeroes);
}

// I'll just write it here if I lag. I said "async" on line 1 makes it work for slow internet connections and not have to wait for results, it just keeps going if it fails. It means "Asynchronously"

function populateHeader(obj) {
	const header = document.querySelector('header');
	const myH1 = document.createElement('h1');
	myH1.textContent = obj.squadName; // super hero squad
	header.appendChild(myH1);

	const myParagraph = document.createElement('p');
	myParagraph.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
	header.appendChild(myParagraph);
}

function populateHeroes(obj) {
	const section = document.querySelector('section');
	const heroes = obj.members; // Molecule Man, Madame Uppercute, Eternal Flame (in an Array)

	for (const hero of heroes) {
		const myArticle = document.createElement('article');
		const myH2    	= document.createElement('h2');
		const myPara1   = document.createElement('p');
		const myPara2   = document.createElement('p');
		const myPara3   = document.createElement('p');
		const myList    = document.createElement('ul');

		myH2.textContent = hero.name; 
		myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
		myPara2.textContent = `Age: ${hero.age}`;
		myPara3.textContent = 'Superpowers:';

		const superPowers = hero.powers; // this gives us an array
		for (const power of superPowers) {
			const listItem = document.createElement('li');
			listItem.textContent = power;
			myList.appendChild(listItem);
		}

		myArticle.appendChild(myH2);
		myArticle.appendChild(myPara1);
		myArticle.appendChild(myPara2);
		myArticle.appendChild(myPara3);
		myArticle.appendChild(myList);

		section.appendChild(myArticle);
	}
}

function populateTable(obj) {
	const heroes      = obj.members;
	const table       = document.querySelector("#superHeroTable");
	const nameRow     = document.querySelector(".name").children;
	const identityRow = document.querySelector(".identity").children;
	const ageRow      = document.querySelector(".age").children;
	const powersRow   = document.querySelector(".superpowers").children;
	
	let idx = 1;
	for (const hero of heroes) {
		nameRow[idx].textContent = hero.name;
		identityRow[idx].textContent = hero.secretIdentity;
		ageRow[idx].textContent = hero.age;

		// Superpowers
		const powers = hero.powers;
		console.log(powers);
		const list = document.createElement('ul');
		for (const power of powers) {
			const listItem = document.createElement('li');
			listItem.textContent = power;
			list.appendChild(listItem);
		}
		powersRow[idx].appendChild(list);
		idx++;
	}
}
