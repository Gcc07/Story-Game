
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

// function load_new_scene(loaded_scene) {
    
//     story_paragraph.innerHTML = loaded_scene.paragraph;
//     story_image.src = loaded_scene.image;

//     for (var i = 0; i < loaded_scene.choice_buttons.length; i++) {
//         //console.log(loaded_scene.choice_buttons[i]);
//         var button = document.createElement('button');
//         button.innerHTML = loaded_scene.choice_buttons[i].name;
//         var button_choice = loaded_scene.choice_buttons[i]
//         button.addEventListener('click', function() {
//             clear_buttons();
//             console.log(button_choice);
//             load_new_scene(button_choice);
//         });
//         main_content.appendChild(button);
//     }
// }
function load_new_scene(loaded_scene) {
    story_paragraph.innerHTML = loaded_scene.paragraph;
    story_image.src = loaded_scene.image;

    for (let i = 0; i < loaded_scene.choice_buttons.length; i++) {
        var button = document.createElement('button');
        button.innerHTML = loaded_scene.choice_buttons[i].name;
        let button_choice = loaded_scene.choice_buttons[i];
        button.addEventListener('click', function() {
            clear_buttons();
            load_new_scene(button_choice);
        });
        main_content.appendChild(button);
    }
}

function clear_buttons() {
    while (main_content.lastElementChild.tagName.toLowerCase() === 'button') {
        console.log("removing button");
        main_content.removeChild(main_content.lastElementChild);
    }
}

// Ending Scenes
death = new Scene("Succumb to your fate. ", "The Cerulean Eclipse has sapped you of your energy. You are unable to continue your exploration. Your employer will not be pleased.", 
    "images/death.gif", []); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.
placeholder = new Scene("Placeholder Name.", "Placeholder Paragraph.", 
    "images/crash.png", [death]); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.
    
// Initialize all scene variables


// Branch: Mountains

derelect_ship = new Scene("Derelict Ship", "You need anything you can find. It's best to search it.", 
    "images/crash.png", [death]); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

mountains_continue1 = new Scene("Search for civilization", "You continue your travels. It's too dangerous to scavenge. Perhaps you can find a settlement.", 
    "images/mountains.png", [placeholder]); 

mountains = new Scene("Go towards the Night Mountains", "You could lose your way in the dunes. The Cereus succulents have an annoying blue glow to them.", 
    "images/mountains.png", [mountains_continue1]); 

// Branch: Dunes
walk_endlessly4 = new Scene("Where is everything.", "It is dark. Impossibly dark. You reach where even the light of the eclipse cannot reach. You are lost. You are alone. You are out of energy. You cannot continue your travels.",
    "images/tmp.png", [placeholder]);

walk_endlessly4 = new Scene("Continue to move.", "You tread on endlessly. The dunes are endless. The weight of the sun and moon suppress your energy core unbearably.",
    "images/tmp.png", [placeholder]);

walk_endlessly3 = new Scene("Continue to move.", "You drag on more. There are less Cereus succulents here. You feel the weight of the eclipse on your energy core. You need to find a way to recharge quickly.",
    "images/tmp.png", [walk_endlessly4]);

walk_endlessly2 = new Scene("Continue to move.", "You walk more.",
    "images/tmp.png", [walk_endlessly3]);

walk_endlessly1 = new Scene("Continue to move.", "You walk.",
    "images/tmp.png", [walk_endlessly2]);

avoid_light = new Scene("Avoid the light.", "You continue your travels. It's impossible to know what it could have been. It's best to avoid it. <br> You continue your travels.",
    "images/tmp.png", [walk_endlessly1]);

touch_it = new Scene("Touch it.", "You reach out to touch it. It feels different from the other bioluminescent fauna. You feel a surge of energy. You feel stronger. <br> The weight of the eclipse is lifted from your energy core. You can continue your travels just a little longer.",
    "images/tmp.png", [placeholder]); 

see_light = new Scene("Go to it.", "You walk closer and see it. It's a Cereus succulent. It has a deep blue glow, calmer than the others. What is different about this one?",
    "images/tmp.png", [touch_it, avoid_light]); 

leave_outpost= new Scene("Leave the outpost.", "You have nothing left to do here. You leave the outpost. You see a light in the distance. It could be a settlement.", 
    "images/tmp.png", [see_light, avoid_light]);

leave_gun = new Scene("Leave it.", "You won't be needing that. You continue on your way.", 
    "images/tmp.png", [leave_outpost]);

take_gun = new Scene("Take it.", "This could come in handy. Who knows what you'll find out here.", 
    "images/tmp.png", [leave_outpost]);

dunes_outpost = new Scene("Explore the Outpost.", "You walk in cautiously. It's empty. You find a Stun Six Shooter. Pick it up?", 
    "images/tmp.png", [take_gun, leave_gun]);

dunes = new Scene("Continue on the Blue Cereus Dunes", "It's best to follow the dunes. The mountains are too dangerous. <br> You see a small outpost in the distance. Maybe you can find something useful there.", 
    "images/dunes.gif", [dunes_outpost]); 

start_scene = new Scene("Begin your survival.", "You are an exploration android model sent by an employer to survey planets. After your ship's reactor core fails upon enterting this planets atmosphere, you just barely avoid a total crash landing. This planet is enshrouded under an endless  blue eclipse, with limited energy reserves. Both you and the ship are running out of time. Your energy core depletes under the influence of the cold night.", 
    "images/cerulean_moon.gif", [mountains, dunes]); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

load_new_scene(start_scene);

// initial_button.addEventListener('click', function() {
//     load_new_scene(Start);
//     document.main.removeChild(initial_button);
// });