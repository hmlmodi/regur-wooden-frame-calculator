const product1 = {
    sku: "001",
    price: 50
};

const product2 = {
    sku: "002",
    price: 100
};

const product3 = {
    sku: "003",
    price: 150
};

const product4 = {
    sku: "004",
    price: 200
};

const products = [product1, product2, product3, product4];
let orders = [];

if (localStorage.getItem("orders")) {
    orders = JSON.parse(localStorage.getItem("orders"));
} else {
    orders = [];
}

populateOrderTable();
// --------------------------------------------------------------------------------------



// this function will populate SKU dropdown from products array
function populateSKUs() {
    for (let i = 0; i < products.length; i++) {
        const option = document.createElement("option");
        option.innerText = products[i].sku;
        document.getElementById("sku-dropdown").appendChild(option);
    }
}

populateSKUs();

updatePrice(products[0].price);




// this will update the price/cm value
function updatePrice(value) {
    let price = document.getElementById("price-cm");
    price.innerText = value;
}

document.getElementById("sku-dropdown").addEventListener("change", (event) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].sku === event.target.value) {
            updatePrice(products[i].price);
        } else {
            continue;
        }
    }
});

const frameWidth = document.getElementById("frame-width");
const frameHeight = document.getElementById("frame-height");


frameWidth.addEventListener("input", (event) => {
    updatePerimeter(Number(frameHeight.value), Number(frameWidth.value));
});

frameHeight.addEventListener("input", (event) => {
    updatePerimeter(Number(frameHeight.value), Number(frameWidth.value));
});


function updatePerimeter(height, width) {

    if (height > 0 && width > 0) {
        const perimeter = 2 * (height + width);
        document.getElementById("totalperimeter").innerText = perimeter;
    } else {
        document.getElementById("totalperimeter").innerText = "0";
    }
}

function calculatePrice(price, perimeter) {
    const framePrice = price * perimeter;
    document.getElementById("frame-price").innerText = framePrice;
    if (Number(document.getElementById("frame-price").innerText) > 0) {
        document.getElementById("addToOrderButton").disabled = false;
    } else {
        document.getElementById("addToOrderButton").disabled = true;
    };
}


document.getElementById("calculate").addEventListener("click", () => {
    const price = Number(document.getElementById("skuprice").innerText);
    const perimeter = Number(document.getElementById("totalperimeter").innerText);
    calculatePrice(price, perimeter);
});

document.getElementById("addToOrderButton").addEventListener("click", addToOrder);


function addToOrder() {
    const sku = document.getElementById("sku-dropdown").value;
    const quantity = 1;
    const width = document.getElementById("frame-width").value;
    const height = document.getElementById("frame-height").value;
    const lineTotal = document.getElementById("frame-price").innerText;

    const orderItem = {
        sku,
        quantity,
        width,
        height,
        lineTotal
    };

    orders.push(orderItem);
    localStorage.setItem("orders", JSON.stringify(orders));
    populateOrderTable();
}



function populateOrderTable() {
    const orderTable = document.getElementById("order-table");

    orderTable.getElementsByTagName("tbody")[0].innerHTML = "";

    const header = document.createElement("tr");

    const th_sku = document.createElement("th");
    th_sku.innerText = "SKU";

    const th_quantity = document.createElement("th");
    th_quantity.innerText = "QUANTITY";

    const th_width = document.createElement("th");
    th_width.innerText = "WIDTH";

    const th_height = document.createElement("th");
    th_height.innerText = "HEIGHT";

    const th_lineTotal = document.createElement("th");
    th_lineTotal.innerText = "LINE TOTAL";

    header.appendChild(th_sku);
    header.appendChild(th_quantity);
    header.appendChild(th_width);
    header.appendChild(th_height);
    header.appendChild(th_lineTotal);

    orderTable.getElementsByTagName("tbody")[0].appendChild(header);

    for (let i = 0; i < orders.length; i++) {
        const tr = document.createElement("tr");

        const sku = document.createElement("td");
        sku.innerText = orders[i].sku;

        const quantity = document.createElement("td");
        quantity.innerText = orders[i].quantity;

        const width = document.createElement("td");
        width.innerText = orders[i].width;

        const height = document.createElement("td");
        height.innerText = orders[i].height;

        const lineTotal = document.createElement("td");
        lineTotal.innerText = orders[i].lineTotal;

        tr.appendChild(sku);
        tr.appendChild(quantity);
        tr.appendChild(width);
        tr.appendChild(height);
        tr.appendChild(lineTotal);

        orderTable.getElementsByTagName("tbody")[0].appendChild(tr);

        clearForm();
    }
    let sum = 0;
    for (let item = 0; item < orders.length; item++) {
        sum = sum + Number(orders[item].lineTotal);
    }
    document.getElementById("order-total").innerText = sum;

}

function clearForm() {
    document.getElementById("sku-dropdown").value = "";
    document.getElementById("price-cm").innerText = "";
    document.getElementById("frame-width").value = "";
    document.getElementById("frame-height").value = "";
    document.getElementById("totalperimeter").innerText = "";
    document.getElementById("frame-price").innerText = "";
}