
window.onload = function doStuff(){
    //запускаем секундомер
    setInterval(updateClock,1000)

    //строим список сразуже после загрузки
    let listElem = document.getElementById('list');
    renderList(listElem,state);
}


////////////////////////////////////////////////////////////////////
// задание 3 секундомер
let seconds = 0;
let  updateClock = () => {
    let clock = document.getElementById('clock_value');
    clock.innerText = seconds;
    seconds +=1; 
}


////////////////////////////////////////////////////////////////////
// задание 1. строим таблицу

fetch('https://api.github.com/gists/public').then(response => {
    console.log(response);
    return response.json();
}).then( gists => {
    let table = document.getElementById('table_body');
    gists.forEach((gist) => {
        keys = Object.keys(gist.files)
        keys.forEach(key => {
        let row = document.createElement('tr');

        let filenameCol = document.createElement('td');
        let languageCol = document.createElement('td');
        let raw_urlCol = document.createElement('td');

        filenameCol.innerText = gist.files[key].filename;
        languageCol.innerText = gist.files[key].language;
        raw_urlCol.innerText = gist.files[key].raw_url;

        row.appendChild(filenameCol);
        row.appendChild(languageCol);
        row.appendChild(raw_urlCol);

        table.appendChild(row)
            
        })
    })
})

//////////////////////////////////////////////////////////////
// задание 4
var _x = 1;

var foo = {
    _x: 2,
    bar: function() {
    return this._x;
    }
}

console.log('1. ', foo.bar());
var baz = foo.bar;
console.log('2. ', baz.call(foo));
 
setTimeout(function() {
console.log('3. ', baz.call(this));
}, 500); 
var _x = 4;
//////////////////////////////////////////////////////////////
// задание 2

// задаем данные и заполняем массив
let state = [];
let previousLevel;

for(var i=1;i<11;i++){
    let el;
    el = {
        text: `${i} ->`,
        click: 0,
        next: [],
        level: [i]
    }
    for(var j=1;j<11;j++){
        let elSec;
        elSec = {
            text: `${i}.${j} ->`,
            click: 0,
            next: [],
            level: [i,j]
        }
        for(var k=1;k<11;k++){
            let elThird;
            elThird = {
                text: `${i}.${j}.${k} ->`,
                click: 0,
                next: [],
                level: [i,j]
            }
            elSec.next.push(elThird)
        }
        el.next.push(elSec);
    }
    state.push(el);
}

// функция для рендера следующего уровня списка
let renderList = (rootElem,list) => {
    console.log(list);
    if(list.length != 0){
        while (rootElem.firstChild){ rootElem.removeChild(rootElem.firstChild);}
    }
    list.forEach((item) =>{
        listItem = document.createElement('li');
        listItem.innerText = `(${item.click}) ` + item.text;

        // вещаем обработчик чтобы переходить по уровням, и обновлять view, при изменение state
        listItem.onclick = (event) => {
            previousLevel = item.level;
            item.click++;
            event.target.innerText = `(${item.click}) ` + item.text;
            renderList(rootElem,item.next);
        }
        rootElem.appendChild(listItem)
    })
}

// функция для перехода на уровень выше текущего, висит на кнопке назад
let renderPrevious =  () => {
    let listElem = document.getElementById('list');
    if(previousLevel.length === 1 ){
        renderList(listElem,state);
    }
    else if(previousLevel.length === 2){
        renderList(listElem,state[previousLevel[0] - 1].next);
        previousLevel = [previousLevel[0]];
    }
}