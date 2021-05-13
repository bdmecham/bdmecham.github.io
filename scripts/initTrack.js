let removeid = 0;
// This creates a card this is sortable by the number!
function addCharacter(name, num) {
    var newli = document.createElement("li");
    if(name != "" && num != ""){
        newli.className = `person-card`;
        newli.innerHTML = `<div class="roll" >${num}</div>
        <div class="name">${name}</div>
        <ul class="conditions">
            <li>
                <input type="checkbox" name="blinded" id="blinded">
                <label for="blinded">Blinded</label>
            </li>
            <li>
                <input type="checkbox" name="charmed" id="charmed">
                <label for="charmed">Charmed</label>
            </li>
            <li>
                <input type="checkbox" name="deafened" id="deafened">
                <label for="deafened">Deafened</label>
            </li>
            <li>
                <input type="checkbox" name="frightened" id="frightened">
                <label for="frightened">Frightened</label>
            </li>
            <li>
                <input type="checkbox" name="grappled" id="grappled">
                <label for="grappled">Grappled</label>
            </li>
            <li>
                <input type="checkbox" name="incapacitated" id="incapacitated">
                <label for="incapacitated">Incapacitated</label>
            </li>
            <li>
                <input type="checkbox" name="invisible" id="invisible">
                <label for="invisible">Invisible</label>
            </li>
            <li>
                <input type="checkbox" name="paralyzed" id="paralyzed">
                <label for="paralyzed">Paralyzed</label>
            </li>
            <li>
                <input type="checkbox" name="petrified" id="petrified">
                <label for="petrified">Petrified</label>
            </li>
            <li>
                <input type="checkbox" name="poisoned" id="poisoned">
                <label for="poisoned">Poisoned</label>
            </li>
            <li>
                <input type="checkbox" name="prone" id="prone">
                <label for="prone">Prone</label>
            </li>
            <li>
                <input type="checkbox" name="restrained" id="restrained">
                <label for="restrained">Restrained</label>
            </li>
            <li>
                <input type="checkbox" name="stunned" id="stunned">
                <label for="stunned">Stunned</label>
            </li>
            <li>
                <input type="checkbox" name="unconscious" id="unconscious">
                <label for="unconscious">Unconscious</label>
            </li>
        </ul>
        <select name="exhaustion" id="exhaustion-levels">
            <option value="exhaustion0">No Exhaustion</option>
            <option value="exhaustion1">Exhaustion 1</option>
            <option value="exhaustion2">Exhaustion 2</option>
            <option value="exhaustion3">Exhaustion 3</option>
            <option value="exhaustion4">Exhaustion 4</option>
            <option value="exhaustion5">Exhaustion 5</option>
            <option value="exhaustion6">Exhaustion 6</option>
        </select>
        <button id="remove${removeid}" onClick="removeCard(this.id)">
        Remove</button>`;

      document.getElementById("init-list").appendChild(newli);

      document.getElementById("list-input").reset();
      removeid++;
    }
    
}




// Sort Function
function sort() {
    var list, i, switching, b, shouldSwitch;
  list = document.getElementById("init-list");
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByClassName("person-card");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (parseInt(b[i].getElementsByClassName("roll")[0].innerHTML) < parseInt(b[i+1].getElementsByClassName("roll")[0].innerHTML)) {
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
    round = document.getElementById("counter").innerHTML;
    count = parseInt(round.replace("Round: ", ""));
    if(count === 0){
        list = document.getElementById("init-list");
        b = list.getElementsByClassName("person-card");
        b[0].setAttribute("id","active-card");
        count++;
        document.getElementById("counter").innerHTML = "Round: " + count;
        document.getElementById("start").innerHTML = "Next Player";
    }
    else{
        list = document.getElementById("init-list");
        b = list.getElementsByClassName("person-card");
        for (var i = 0; i < (b.length); i++) {
            if(b[i].id == "active-card"){
                currentlyActive = i;
            }
        }
        if (currentlyActive === b.length-1){
            b[currentlyActive].removeAttribute("id");
            b[0].setAttribute("id","active-card");
            count++;
            document.getElementById("counter").innerHTML = "Round: " + count;
            
        }
        else{
            b[currentlyActive].removeAttribute("id");
            b[currentlyActive+1].setAttribute("id","active-card");
            
        }

        document.getElementById('active-card').scrollIntoView({behavior: "smooth", block: "center"});
    }
    
    
}

function nextRound() {
  var round = document.getElementById("counter").innerHTML;
  var count = parseInt(round.replace("Round: ", ""));
  count++;
  document.getElementById("counter").innerHTML = "Round: " + count;
}

function clearAll() {
  list = document.getElementById("init-list").innerHTML = "";

  var round = document.getElementById("counter").innerHTML;
  var count = parseInt(round.replace("Round: ", ""));
  count = 0;
  document.getElementById("counter").innerHTML = "Round: " + count;
  document.getElementById("start").innerHTML = "Start";
  removeid = 0;
}

function removeCard(id) {

    if(document.getElementById(id).closest('li').id == "active-card"){
        start();
    }
    document.getElementById('init-list').removeChild(document.getElementById(id).closest('li'));
}