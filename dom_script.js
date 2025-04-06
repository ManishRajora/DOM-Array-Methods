const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionersBtn = document.getElementById('show-millioners');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let user_data = []

getRandomUser();
getRandomUser();
getRandomUser();

// function to get random user
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const new_user = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    
    user_data.push(new_user);
    updateDOM();
}

// update DOM
function updateDOM(provided_data = user_data){
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    provided_data.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<h3><span class="bold">${item.name}</span> <span class="light"> ${formatMoney(item.money)}</span></h3>`;
        main.appendChild(element);
    });
}

// format money
function formatMoney(money){
    return '$ ' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// double money
function doubleMoney(){
    user_data = user_data.map(function(user){
        return {name: user.name, money: user.money * 2};
    });
    updateDOM();
}

// show millioners
function showMillioners(){
    user_data = user_data.filter(function(user){
        return user.money >= 1000000;
    });
    updateDOM();
}

// sort by richest
function sortByRichest(){
    user_data = user_data.sort(function(user1, user2){
        return user2.money - user1.money;
    });
    updateDOM();
}

// calculate total wealth
function calculateWealth(){
    const total_wealth = user_data.reduce((acc, curr) => acc += curr.money, 0);        // acc = 0

    const wealthEL = document.createElement('div');
    wealthEL.classList.add('wealth');
    wealthEL.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total_wealth)}</strong><h3>`;
    main.appendChild(wealthEL);
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionersBtn.addEventListener('click', showMillioners);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);