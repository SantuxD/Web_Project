
const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
    checkAllDone();
}

 document.getElementById("add-btn").addEventListener("click", addTask);


listcontainer.addEventListener("click",function(e){
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        saveData();
        checkAllDone();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        checkAllDone();
    }

},false)

function saveData(){
    localStorage.setItem("data",listcontainer.innerHTML);

}
function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showTask();

function checkAllDone() {
  const tasks = listcontainer.querySelectorAll("li");
  if (tasks.length === 0) return;

  const allDone = Array.from(tasks).every(task => task.classList.contains("checked"));

  if (allDone) {
    celebrate();
  }
}
function celebrate() {
  const duration = 3 * 1000; // 3 seconds
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}