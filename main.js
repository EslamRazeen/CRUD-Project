let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.querySelector(".total");
let count = document.getElementById("count"); 
let category = document.getElementById("category");
let submit = document.getElementById("create") ;


let arr;
if(localStorage.product != null){
    arr = JSON.parse(localStorage.product);
}else{
    arr = [];
}


let mood = "create";
let tmp = 0;


//total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = `Total: ${result}`;
        total.style.backgroundColor = "green";
    }
    else{
        total.style.backgroundColor = "rgb(147, 2, 2)";
    }
}
//create
submit.onclick = function(){
    let obj = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML.slice(7),
        count : count.value,
        category : category.value,
    }
    if(mood === "create"){
        for(let i = 0 ; i < count.value ;i++){
            arr.push(obj);
        }
    }
    else{
        arr[tmp] = obj;
        count.style.display = "block";
        submit.innerHTML = "Create";
        mood = "create";
    }



    localStorage.setItem("product" , JSON.stringify(arr));

    console.log(arr);


    cleanData();
    showData();
    numberOfPro();
}

//clean data
function cleanData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = "Total: ";
    count.value = '';
    category.value = '';
    total.style.backgroundColor = "rgb(147, 2, 2)";
}


//show data
function showData(){
    let table = '';
    if(arr.length){
        for(let i = 0 ; i<arr.length ; i++){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].total}</td>
            <td>${arr[i].category}</td>
            <td><button onclick = "updateElement(${i})">update</button></td>
            <td><button onclick = "deleteElement(${i})">delete</button></td>
        </tr>
            `
        }
        document.querySelector(".outputs tbody").innerHTML = table;
        deleteAll();
        numberOfPro();
    }
}
showData();

//Delete all
function deleteAll(){
    let btn = document.createElement("button");
    let txt = document.createTextNode(`Delete All`);
    btn.appendChild(txt);
    if(!document.querySelector(".del").childElementCount){
        document.querySelector(".del").appendChild(btn);
    }

    btn.onclick = function(){
        document.querySelector(".outputs tbody").innerHTML = '';
        localStorage.clear();
        arr = [];
        document.querySelector(".del button").remove();
        numberOfPro();
    }


}

//Delete Element
function deleteElement(i){
    arr.splice(i , 1);
    localStorage.setItem("product" , JSON.stringify(arr));
    showData();
}

//num of pro
function numberOfPro(){
    document.querySelector(".p").innerHTML = "";
    if(arr.length){
        let text = document.createTextNode(`Number Of Products: ${arr.length}`);
        document.querySelector(".p").appendChild(text);
        document.querySelector(".p").classList.add("pp");
    }
    else{
        document.querySelector(".p").style.display = "none";
        document.querySelector(".p").classList.remove("pp");
    }
}



function updateElement(i){
    mood = "update";
    tmp = i;
    title.value = arr[i].title;
    price.value = arr[i].price;
    taxes.value = arr[i].taxes;
    ads.value = arr[i].ads;
    discount.value = arr[i].discount;
    category.value = arr[i].category;

    count.style.display = "none";
    submit.innerHTML = "Update";
}

