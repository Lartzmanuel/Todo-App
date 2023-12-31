
function addItem() {
    let text = document.getElementById("todo-input");
    // console.log("Submitted to the database successfully")
    db.collection("todo-items").add({
        text: text.value,
        status:"active",
    })
    text.value = ""
}

function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        generateItems(items);
    })
}

function generateItems(items){

    let itemsHTML = "";
    items.forEach((item) => {
        itemsHTML += `
        <div class="todo-item">
            <div class="check">
                <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked" : ""}">
                    <img src="./assets/icon-check.svg" alt="checked">
                </div>
            </div>
            <div class="todo-text  ${item.status == "completed" ? "checked" : ""}">
                ${item.text}
            </div>
                <div class="cancel" id="button">
                    <div class="times" data-id="${item.id}">&#128473;</div>
                </div>
        </div>
        `

        document.querySelector(".todo-items").innerHTML = itemsHTML;
        createEventListeners();
        createEventListeners1()
    })
}

function createEventListeners(){
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    todoCheckMarks.forEach((checkMark)=>{
        checkMark.addEventListener("click", function(){
            markCompleted(checkMark.dataset.id);
        })
    })
}

function markCompleted(id){
    
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc){
        if(doc.exists){
            let status = doc.data().status;
            if(status == "active"){
                item.update({
                    status: "completed"
                })
            }
            else if (status == "completed"){
                item.update({
                    status: "active"
                })
            }
        }
    })
}


function createEventListeners1(){
    let times = document.querySelectorAll(".times");
    times.forEach((item)=>{
        item.addEventListener("click", function(){
            deleteItem(item.dataset.id);
        })
    })
}

function deleteItem(id){
    db.collection("todo-items").doc(id).delete();
}


getItems();