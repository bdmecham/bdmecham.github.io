
// This creates a card this is sortable by the number!
function addCharacter(name, num) {
    var newli = document.createElement("li");
    if(name != "" && num != ""){
        newli.className = `person-card`;
        newli.innerHTML = `<span class="roll" >${num}</span>
        <span class="name">${name}</span>
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
        <span class="remove-person">X</span>`;

      document.getElementById("init-list").appendChild(newli);

      document.getElementById("list-input").reset();
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
function nextRound() {
  var round = document.getElementById("counter").innerHTML;
  var count = parseInt(round.replace("Round: ", ""));
  count++;
  document.getElementById("counter").innerHTML = "Round: " + count;
}

// Clear All
function clearAll() {
  list = document.getElementById("init-list").innerHTML = "";

  var round = document.getElementById("counter").innerHTML;
  var count = parseInt(round.replace("Round: ", ""));
  count = 0;
  document.getElementById("counter").innerHTML = "Round: " + count;
}