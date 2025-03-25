let isFlow = true;

function toggleView() {
    let flow = document.getElementById("flow");
    let breakDiv = document.getElementById("break");
    let toggleBtn = document.getElementById("toggle-btn");
    
    if (isFlow) {
        flow.classList.add("hidden");
        breakDiv.classList.remove("hidden");
        toggleBtn.style.transform = "translateX(100%)";
    } else {
        flow.classList.remove("hidden");
        breakDiv.classList.add("hidden");
        toggleBtn.style.transform = "translateX(0)";
    }
    isFlow = !isFlow;
}
function DeleteAllConuters(id) {
    document.getElementById(id + '-ps').value = 0;
    document.getElementById(id + '-iss').value = 0;
    document.getElementById(id + '-omni-ps').value = 0;
    document.getElementById(id + '-omni-iss').value = 0;
}
function toggleCounter(id) { 
    let element = document.getElementById(id);
    let container = document.getElementById(id + '-container');
    container.style.display = element.classList.contains('active') ? 'none' : 'block';
    element.classList.toggle('active');
    checkOmniVisibility()
}
function checkOmniVisibility() {
    document.getElementById('p2-omni').style.display = 
        document.getElementById('p2').classList.contains('active') ? 'block' : 'none';

    document.getElementById('p4-omni').style.display = 
        document.getElementById('p4').classList.contains('active') ? 'block' : 'none';
}
function changeValue(id, delta) {
    let input = document.getElementById(id);
    input.value = parseInt(input.value || 0) + delta;
} 
function addExtraField() { 
    let container = document.getElementById('extra-fields'); 
    let div = document.createElement('div'); 
    div.className = 'extra-item'; 
    let input = document.createElement('input'); 
    input.type = 'number'; 
    let select = document.createElement('select'); 
    ['ISS MIX', 'ISS Non-Sort', 'Cubiscan', 'TT', 'Prep', 'Defective', 'Defective Recall', 'Defective PS', 'CONSO', 'Damage', 'Hazamt', 'Potravina/Krmivo', 'Likvidace'].forEach(t => { 
        let option = document.createElement('option'); 
        option.textContent = t; select.appendChild(option); 
    }); 
    let removeBtn = document.createElement('button'); 
    removeBtn.textContent = 'Delete'; 
    removeBtn.onclick = () => div.remove(); 
    div.appendChild(input); 
    div.appendChild(select); 
    div.appendChild(removeBtn); 
    container.appendChild(div); 
}
function generateMessage() {
    let message = '/md\n';

    ['p2', 'p3', 'p4'].forEach(id => {
        if (document.getElementById(id).classList.contains('active')) {
            message += `**${id.toUpperCase()}:**\n`;
            message += `- PS - ${document.getElementById(id + '-ps').value}\n`;
            message += `- ISS - ${document.getElementById(id + '-iss').value }\n`;
        }
    });

    message += '**UB:**\n';

    // Process extra input fields
    document.querySelectorAll('.extra-item').forEach(i => {
        let value = i.querySelector('input').value;
        let option = i.querySelector('select').value;
        if (value) message += `- ${value} ${option}\n`;
    });

    if (document.getElementById('p2-omni').classList.contains('active') && document.getElementById('p2').classList.contains('active')) {
            message += '\n';
            message += '-------------------\n';  
            message += '\n';  
            message += '**Omniscan:**\n'
            message += `- PS - ${document.getElementById('p2-omni-ps').value}\n`;
            message += `- ISS - ${document.getElementById('p2-omni-iss').value}\n`;
        }
        else if (document.getElementById('p4-omni').classList.contains('active') && document.getElementById('p4').classList.contains('active')) {
            message += '\n';
            message += '-------------------\n';  
            message += '\n';  
            message += '**Omniscan:**\n'
            message += `- PS - ${document.getElementById('p4-omni-ps').value}\n`;
            message += `- ISS - ${document.getElementById('p4-omni-iss').value}\n`;
        };


    document.getElementById('message-preview').textContent = message;

    // Copy to clipboard
    navigator.clipboard.writeText(message).then(() => alert('Copied!'));
}
function updateLanguage() {
    let lang = document.getElementById('lang').value;
    let translations = {
        ru: "По всем вопросам или в случае неполадок обращаться к",
        en: "For any questions or issues, contact",
        cz: "Pro jakékoli dotazy nebo problémy kontaktujte"
    };
    document.getElementById('contact-text').innerHTML = `${translations[lang]} <br>Chime: popolekf@amazon.cz <br>Discord: @jlawash`;
}
function DeleteAllExstras() {
    document.getElementById('extra-fields').innerHTML = '';
}
function validateInput(id) {
    let input = document.getElementById(id);
    if (isNaN(input.value) || input.value === "") {
        input.value = 0;
    }
}
