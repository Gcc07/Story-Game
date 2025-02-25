
var main_content = document.getElementById('main');
var story_paragraph = document.getElementById('story_paragraph');
var story_image = document.getElementById('story_image');
var initial_button = document.getElementById('initial_button');

class Scene {
    constructor(name, paragraph, image, choice_buttons) {
        this.name = name;
        this.paragraph = paragraph;
        this.image = image;
        this.choice_buttons = choice_buttons;
    }
}

function load_new_scene(loaded_scene) {
    story_paragraph.innerHTML = loaded_scene.paragraph;
    story_image.src = loaded_scene.image;
    for (var i = 0; i < loaded_scene.choice_buttons.length; i++) {
        console.log(loaded_scene.choice_buttons[i]);
        var button = document.createElement('button');
        button.innerHTML = loaded_scene.choice_buttons[i].name;
        var button_choice = loaded_scene.choice_buttons[i]
        button.addEventListener('click', function() {
            button.remove();
            button.textContent = "button_choice"
            load_new_scene(button_choice);
        });
    main_content.appendChild(button);
    }
}

derelect_ship = new Scene("Derelect Ship", " ", 
    "images/crash.png", []); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

mountains = new Scene("Continue on the Blue Cereus Dunes", "", 
    "images/mountains.png", [derelect_ship]); 

dunes = new Scene("Go towards the Night Mountains", "", 
    "images/mountains.png", [derelect_ship]); 

start_scene = new Scene("Begin your survival.", "You are an exploration android model sent by an employer to survey planets. After your ship's reactor core fails upon enterting this planets atmosphere, you just barely avoid a total crash landing. This planet is enshrouded under an endless  blue eclipse, with limited energy reserves. Both you and the ship are running out of time. Your energy core depletes under the influence of the cold night.", 
    "images/crash.png", [mountains, dunes]); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

console.log(start_scene.paragraph);

load_new_scene(start_scene);

// initial_button.addEventListener('click', function() {
//     load_new_scene(Start);
//     document.main.removeChild(initial_button);
// });