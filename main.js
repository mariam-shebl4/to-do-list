let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
// to empity array
let arryOfTasks = [];


//check if there is tasks in local storge
if (localStorage.getItem("taskss")) {
    arryOfTasks = JSON.parse(localStorage.getItem("taskss"));
}

// trigger get data from local storge function
getdatafromlocalstrg();

// add tasks and remove it after submiting
submit.onclick = function () {
   if (input.value !=="") {
    
    addTaskstoarray(input.value); // add task to array of tasks
    
    input.value =""; // empty input field
    
 }
};

//click on tasks elements
tasks.addEventListener("click", (e) => {
    //delete button
    if (e.target.classList.contains("del")) {
        //remove from local storge
        delTsksbylocalstrg(e.target.parentElement.getAttribute("data-id"));
        //remove task from page
        e.target.parentElement.remove();
        
    }

    // task update
    if (e.target.classList.contains("task")){
       //toggle completed the task
       toggleStatus(e.target.getAttribute("data-id"))
        // toggle done class
        e.target.classList.toggle("taskdone");   
    }
})
 // add task to array
function addTaskstoarray(tasktext){
    //task data
    const task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
    };

    // push task to array of tasks
    arryOfTasks.push(task);
    
    //add tasks to page
    addelements(arryOfTasks);
    // add tasks to local storge
    adData2localStorgefromary(arryOfTasks);

}

function addelements(arryOfTasks){
    // empty taskx div
    tasks.innerHTML = "";
    arryOfTasks.forEach((task) => {
        // create main div
        let div = document.createElement("div");
        div.className = "task";
        //check if task is done
        if (task.completed) {
            div.className = "taskdone";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delete
        let span = document.createElement("span");
        span.className = "del";
        // append button to main div
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);
        
        //add task div to task container
        tasks.appendChild(div);

    });
}

function adData2localStorgefromary(arryOfTasks) {
    window.localStorage.setItem("taskss",JSON.stringify(arryOfTasks));
}

//get data from local storge

function getdatafromlocalstrg(){
    let data = window.localStorage.getItem("taskss");
    if (data) {
        let taskss = JSON.parse(data);
        addelements(taskss);
    }
}

function delTsksbylocalstrg(taskId) {
    arryOfTasks = arryOfTasks.filter((task) => task.id != taskId);
    adData2localStorgefromary(arryOfTasks);
}

function toggleStatus(taskId){
      for (let i = 0; i < arryOfTasks.length; i++) {
        if (arryOfTasks[i].id == taskId) {
            arryOfTasks[i].completed == false ? (arryOfTasks[i].completed == true) : (arryOfTasks[i].completed == false)

            
        }     
      }  
      adData2localStorgefromary(arryOfTasks); 
}


