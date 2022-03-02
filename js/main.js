class Hamburger {
    constructor(sizes, stuffings, arrToppings) { 
        this.size = {};
        this.stuffing = {};
        this.arrToppings = arrToppings;
        this.toppings = [];
        this.sizes = sizes;
        this.stuffings = stuffings;
        this.calculatePrice();
        this.calculateCalories();
    }

    calculatePrice() {
        let sum = Number(this.size.price) + Number(this.stuffing.price)
        if (this.toppings.length) this.toppings.forEach(({price}) => sum = sum + Number(price))
        
        return sum;
    }
    calculateCalories() {
        let calories = Number(this.size.calories) + Number(this.stuffing.calories);
        if (this.toppings.length) this.toppings.forEach((item) => calories = calories + Number(item.calories));
        
        return calories;
    }
    setSize(size) {
        this.size = this.sizes.find(item => item.code === size);
    }
    setStuffing(stuffing) {
        this.stuffing = this.stuffings.find(item => item.code === stuffing);
    }
    addTopping(topping) {
        const currentTopping = this.arrToppings.find(item => item.code === topping);
        if (currentTopping) this.toppings.push(currentTopping);
    }
    removeTopping(topping) {
        this.toppings = this.toppings.filter(item => item.code !== topping);
    }
    getSize() {
        return this.size;
    }
    getStuffing() {
        return this.stuffing;
    }
    getToppings(topping) {
        return this.toppings;
    }
}

const arrSize = [
    { code: 'small', name: 'маленький', price: 50, calories: 20 },
    { code: 'big', name: 'большой', price: 100, calories: 40 },
];
const arrStuffing = [
    { code: 'cheese', name: 'сыр', price: 10, calories: 20 },
    { code: 'salad', name: 'салат', price: 20, calories: 5 },
    { code: 'potatoes', name: 'картофель', price: 15, calories: 10 },
];
const arrToppings = [
    { code: 'spices', name: 'Посыпать приправой', price: 15, calories: 0 },
    { code: 'mayonnaise', name: 'Полить майонезом', price: 20, calories: 5 },
]

let size = arrSize[0];
let stuffing = arrStuffing[0];
const hamburger = new Hamburger(arrSize, arrStuffing, arrToppings);
hamburger.setSize(size.code);
hamburger.setStuffing(stuffing.code);
printResult();

document.querySelector('.section-size').addEventListener('change', changeSize);
document.querySelector('.section-stuffinge').addEventListener('change', changeStuffing);
document.querySelector('.section-topping').addEventListener('change', changeTopping);


function changeSize(event) {
    if (event.target.classList.contains('section-size__input')) {
        hamburger.setSize(event.target.value);
        printResult();
    }
}

function changeStuffing(event) {
    if (event.target.classList.contains('section-stuffinge__input')) {
        hamburger.setStuffing(event.target.value);
        printResult();
    }
}

function changeTopping(event) {
    if (event.target.classList.contains('section-topping__input')) {
        if (event.target.checked) hamburger.addTopping(event.target.value);
        else hamburger.removeTopping(event.target.value);
        printResult();
    }
}

function printResult() {
    const price = hamburger.calculatePrice();
    const calories = hamburger.calculateCalories();
    const size = hamburger.getSize();
    const stuffing = hamburger.getStuffing();
    const toppings = hamburger.getToppings();
    console.log(toppings);

    document.querySelector('#hamburger-size').textContent = size.name;
    document.querySelector('#hamburger-stuffing').textContent = stuffing.name;
    document.querySelector('#hamburger-price').textContent = price;
    document.querySelector('#hamburger-calories').textContent = calories;
    if (toppings.length) {
        document.querySelector('#hamburger-topping').textContent = `Добавки: ${toppings.map(({ name }) => name).join(', ')}`;
    } else document.querySelector('#hamburger-topping').textContent = '';
}

