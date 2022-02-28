// Changes the color of the conditions to activate/deactivate them.
function changeColor(element){
    
    if(element.className == 'condition-option-active'){
      element.className = "condition-option";
    }
    else{
      element.className = "condition-option-active";
    }
}

let removeid = 0;
// This creates a card this is sortable by the number!
function addCharacter(name, num) {
    var newli = document.createElement("li");
    if(name != "" && num != ""){
        newli.className = `entry-container`;
        newli.setAttribute('draggable', true);
        newli.innerHTML = `<div class="entry-roll">${num}</div>
        <div class="entry-name">${name}</div>
        <div class="conditions">
            <span class="condition-option" onclick="changeColor(this)">Blinded</span>
            <span class="condition-option" onclick="changeColor(this)">Deafened </span>
            <span class="condition-option" onclick="changeColor(this)">Charmed</span>
            <span class="condition-option" onclick="changeColor(this)">Frightened</span>
            <span class="condition-option" onclick="changeColor(this)">Poisoned</span>
            <span class="condition-option" onclick="changeColor(this)">Stunned</span>
            <span class="condition-option" onclick="changeColor(this)">Paralyzed</span>
            <span class="condition-option" onclick="changeColor(this)">Petrified</span>
            <span class="condition-option" onclick="changeColor(this)">Prone</span>
            <span class="condition-option" onclick="changeColor(this)">Grappled</span>
            <span class="condition-option" onclick="changeColor(this)">Restrained</span>
            <span class="condition-option" onclick="changeColor(this)">Incapacitated</span>
            <span class="condition-option" onclick="changeColor(this)">Unconscious</span>
            <span class="condition-option" onclick="changeColor(this)">Invisible</span>
            <span class="condition-option" onclick="changeColor(this)">Concentration</span>
            <select class="condition-option" name="exhaustion" id="exhaustion-levels">
                <option value="exhaustion0">Exhaustion</option>
                <option value="exhaustion1">Level 1</option>
                <option value="exhaustion2">Level 2</option>
                <option value="exhaustion3">Level 3</option>
                <option value="exhaustion4">Level 4</option>
                <option value="exhaustion5">Level 5</option>
                <option value="exhaustion6">Level 6</option>
            </select>
      </div>
      <div class="entry-btns">
        <div class="entry-btns-util">^</div>
        <div id="remove${removeid}" onClick="removeCard(this.id)" class="entry-btns-util">X</div>
        <div id="down${removeid}" onCLick="moveCardDown(this.id)" class="card-down entry-btns-util">v</div>
      </div>
        `;

    document.getElementById("init-list").appendChild(newli);

    document.getElementById("list-input").reset();
    removeid++;
    }
    
}

// Remove a card from initiative count
function removeCard(id) {

    if(document.getElementById(id).closest('li').id == "active-card"){
        start();
    }
    document.getElementById('init-list').removeChild(document.getElementById(id).closest('li'));
}


// Move card down in the list to make adjustments
function moveCardDown(id) {
    var list, i, switched, b;
    switched = false;
    list = document.getElementById("init-list");
    b = list.getElementsByClassName("entry-container");
    for (i = 0; i < (b.length - 1); i++) {
        if(b[i] === document.getElementById(id).closest('li') && switched === false){
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switched = true;
        }
    }
}

// Sort Function
function sort() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("init-list");
    switching = true;
    while (switching) {
        switching = false;
        b = list.getElementsByClassName("entry-container");
        for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (parseInt(b[i].getElementsByClassName("entry-roll")[0].innerHTML) < parseInt(b[i+1].getElementsByClassName("entry-roll")[0].innerHTML)) {
            shouldSwitch = true;
            break;
        }
        }
        if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        }
    }
}

// Advance Round Counter
/*This gets the round number and checks if its zero. if so it starts the initiative, if not it goes through and finds who's active, and then makes the next person in line active. If it is the end of the round it advances the counter and starts over.*/
function start(){
    var currentlyActive, round, count, list, b;
    round = document.getElementById("toolbar-counter").innerHTML;
    count = parseInt(round.replace("Round: ", ""));
    if(count === 0){
        list = document.getElementById("init-list");
        b = list.getElementsByClassName("entry-container");
        b[0].setAttribute("id","active-card");
        count++;
        document.getElementById("toolbar-counter").innerHTML = "Round: " + count;
        document.getElementById("toolbar-start").innerHTML = "Next";
    }
    else{
        list = document.getElementById("init-list");
        b = list.getElementsByClassName("entry-container");
        for (var i = 0; i < (b.length); i++) {
            if(b[i].id == "active-card"){
                currentlyActive = i;
            }
        }
        if (currentlyActive === b.length-1){
            b[currentlyActive].removeAttribute("id");
            b[0].setAttribute("id","active-card");
            count++;
            document.getElementById("toolbar-counter").innerHTML = "Round: " + count;
            
        }
        else{
            b[currentlyActive].removeAttribute("id");
            b[currentlyActive+1].setAttribute("id","active-card");   
        }
    }
    document.getElementById('active-card').scrollIntoView({behavior: "smooth", block: "center"});
    
}

// This adjusts the round count element.
function nextRound() {
  var round = document.getElementById("toolbar-counter").innerHTML;
  var count = parseInt(round.replace("Round: ", ""));
  count++;
  document.getElementById("toolbar-counter").innerHTML = "Round: " + count;
}

// Clears & Resets the tracker.
function clearAll() {
  list = document.getElementById("init-list").innerHTML = "";

  var round = document.getElementById("toolbar-counter").innerHTML;
  var count = parseInt(round.replace("Round: ", ""));
  count = 0;
  document.getElementById("toolbar-counter").innerHTML = "Round: " + count;
  document.getElementById("toolbar-start").innerHTML = "Start";
  removeid = 0;
}
