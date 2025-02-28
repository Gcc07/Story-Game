
var main_content = document.getElementById('main');
var story_paragraph = document.getElementById('story_paragraph');
var story_image = document.getElementById('story_image');
var initial_button = document.getElementById('initial_button');

var has_item = {Gun: false, ShipEnergyCore: false};

class Scene {
    constructor(name, paragraph, image, choice_buttons, gives_item) {
        this.name = name;
        this.paragraph = paragraph;
        this.image = image;
        this.choice_buttons = choice_buttons;
        this.gives_item = gives_item || null;
    }
}

function load_new_scene(loaded_scene) {
    story_paragraph.innerHTML = loaded_scene.paragraph; // Sets the paragraph to the new scene's paragraph.
    story_image.src = loaded_scene.image; // Sets the image to the new scene's image.

    if (loaded_scene.gives_item) { // Gives item into has_item if the scene has an item.
        has_item[loaded_scene.gives_item] = true;
    }

    for (let i = 0; i < loaded_scene.choice_buttons.length; i++) { // Adds buttons to the main content when a new scene is instanced.
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

function clear_buttons() { // Removes all buttons from old scene when new scene is instanced.
    while (main_content.lastElementChild.tagName.toLowerCase() === 'button') {
        //console.log("removing button");
        main_content.removeChild(main_content.lastElementChild);
    }
}

// Keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key === 'r' || event.key === 'R') {
        location.reload();
    }
});

// Initialize all scene variables

// Ending Scenes + placeholder
death = new Scene("Succumb to your fate. ", "You are unable to continue your exploration. Your employer will not be pleased.", 
    "images/death.gif", []); // Creates a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

ENDING_endless_light = new Scene("Where is everything.", "It is light. Impossibly bright. You reach where your visor is engulfed in the light of the second moon. You are lost. You are alone. You are out of energy. You cannot continue your travels. <br> Death. Your employer will not be pleased."
    + "<br> ENDING 1: ENDLESS LIGHT",
    "images/tmp.png", []);

ENDING_endless_night = new Scene("Where is everything.", "It is dark. Impossibly dark. You reach where even the light of the eclipse cannot reach. You are lost. You are alone. You are out of energy. You cannot continue your travels. <br> Death. Your employer will not be pleased."
    + "<br> ENDING 2: ENDLESS NIGHT",
    "images/endless_darkness.gif", []);

ENDING_escape_the_eclipse = new Scene("Leave this planet.", "Use the core you obtained to power your ship. You are able to leave this planet. <br> Your employer will be pleased with the data you have gathered. <br> <br> ENDING 3: ESCAPE THE ECLIPSE", 
    "images/leave.gif", []); 
        
ENDING_stolen_property = new Scene("Accept your fate.", "Your body is no longer your own. <BR> <BR> ENDING 4: STOLEN PROPERTY",
    "images/all_red.gif", []);

ENDING_defeated_in_combat = new Scene("Accept your fate.", "You've got got. <BR> <BR> ENDING 5: DEFEATED IN COMBAT",
    "images/death.gif", []);

placeholder = new Scene("Placeholder Name.", "Placeholder Paragraph.", 
    "images/crash.png", [death]); 
    

// Branch: Walk Endlessly, forget the Cerulean Eclipse: Darkness

walk_endlessly_d4 = new Scene("Continue to move.", "You tread on endlessly. The dunes are endless. The weight of the sun and moon suppress your energy core unbearably.",
    "images/mountains.png", [ENDING_endless_night]);

walk_endlessly_d3 = new Scene("Continue to move.", "You drag on more. There are less Ceruelan Cereus here. You feel the weight of the eclipse on your energy core. You need to find a way to recharge quickly.",
    "images/mountains.png", [walk_endlessly_d4]);

walk_endlessly_d2 = new Scene("Continue to move.", "You walk more.",
    "images/mountains.png", [walk_endlessly_d3]);

walk_endlessly_d1 = new Scene("Continue to move.", "You walk.",
    "images/mountains.png", [walk_endlessly_d2]);


// Branch: Walk Endlessly, embrace the Cerulean Eclipse: Second Moon

walk_endlessly_l4 = new Scene("Continue to move.", "You tread on endlessly. The mountains are endless. The weight of the sun and moon suppress your energy core unbearably.",
    "images/Dunes.gif", [ENDING_endless_light]);

walk_endlessly_l3 = new Scene("Continue to move.", "You drag on more. There are more Ceruelan Cereus here. You feel the weight of the eclipse on your energy core. You need to find a way to recharge quickly.",
    "images/Dunes.gif", [walk_endlessly_l4]);

walk_endlessly_l2 = new Scene("Continue to move.", "You walk more.",
    "images/Dunes.gif", [walk_endlessly_l3]);

walk_endlessly_l1 = new Scene("Continue to move.", "You walk.",
    "images/Dunes.gif", [walk_endlessly_l2]);


// Branch: Mountains

go_back_to_ship = new Scene("Go back to the ship.", "You return to the ship.",
    "images/crash.png", [ENDING_escape_the_eclipse]); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

leave_ship_energy_core = new Scene("Leave the energy core.", "You leave the energy core. It functional and you left it. Something in your programming is off. You leave for another place.",
    "images/energy_core.png", [walk_endlessly_d1]);

take_ship_energy_core = new Scene("Take the energy core.", "You take the energy core. You got lucky. ",
    "images/energy_core.png", [go_back_to_ship], "ShipEnergyCore"); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

derelect_ship = new Scene("Scavenge the Derelict Ship", "You need anything you can find. It's best to search it. <b> You find a rusted energy core nestled within the ship. It is still functional, and could at least send you back into orbit.", 
    "images/energy_core.png", [take_ship_energy_core, leave_ship_energy_core]); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

mountains_continue1 = new Scene("Move elsewhere to find civilization", "You continue your travels. It's too dangerous to scavenge. Perhaps you can find a settlement if you search elsewhere..", 
    "images/mountains.png", [walk_endlessly_d1]); 

mountains = new Scene("Go towards the Night Mountains", "You could lose your way in the dunes. The Ceruelan Cereus have an annoying blue glow to them. <br> You see a crashed ship in the distance. Maybe you could find something useful there.", 
    "images/mountains.png", [mountains_continue1, derelect_ship]); 


// Branch: Find the survivor

replace_your_own_core = new Scene("Replace your own core with his.", "You decide to install his reactor core, with precise enough movements as to maintain your own energy production. Suddenly, everything goes black. You return to conciousness, however, you are not in control. Everything is red. All red."
    +"He must've had a conciousness attachment core model. You're going to spend whatever time you have left backseat in your own metallic body. Your employer will not be pleased.",
    "images/all_red.gif", [ENDING_stolen_property]);

go_back_to_ship_from_wanderer = new Scene("Go back to the ship.", "You return to the ship",
    "images/crash.png", [ENDING_escape_the_eclipse]); 

attack_him = new Scene("Attack him.", "You raise your weapon and fire. He convulses on the ground. <br> You approach him without pause and rip out his core. He wrythes for a moment, and then goes still. <br> He wasn't goiong to make it his injury anyways."
    + "<br>You could take a chance and go back to your ship, his core might be able to power it on. <br> Or you could replace your own core with his. You are almost out of energy, after all.",
    "images/ShootWanderer.gif", [replace_your_own_core, ENDING_escape_the_eclipse], "WandererEnergyCore");

reason = new Scene("Reason.", "You try to reason, but he is too fast. He fires at you. You are unable to continue your exploration. Your employer will not be pleased.",
    "images/death.gif", [ENDING_defeated_in_combat]);

retaliate = new Scene("Retaliate.", "You try to retaliate, but he is too fast. He fires at you. You are unable to continue your exploration. Your employer will not be pleased.",
    "images/death.gif", [ENDING_defeated_in_combat]);

help_him = new Scene("Help him", "You walk towards him, he looks at you as his helmet visor adjusts. You reach out to lend a helping hand, but he suddenly raises a hidden blaster. <br>Do you retaliate? <br>Or do you try to reason with him?",
    "images/WandererShootYou.png", [retaliate, reason]);

follow_energy_spike = new Scene("Follow the energy spike.", "You meet another wanderer. <br> It seems he is stranded as well. <br> Your scanners indicate his reactor core model is far more efficient than yours. <br>He is injured.<br><br>Steal his reactor core? <br><br>Or help him?",
    "images/DSurvivor.gif", [help_him, attack_him]); 



// Branch: Dunes
wander_towards_moon = new Scene("Wander towards the moon.", "Whatever that signal was it wasn't worth it too you. You tread on.",
    "images/blue.gif", [walk_endlessly_l1]); 

touch_it = new Scene("Touch it.", "You reach out to touch it. It feels different from the other bioluminescent fauna. You feel a surge of energy. You feel stronger. <br> The weight of the eclipse is lifted from your energy core. You can continue your travels just a little longer."
    + "<br><br> After a moment passes your scanner indicates a faint energy spike away from the light. <br> You could follow it. <br> Or you could tread towards the light.",
    "images/blue.gif", [follow_energy_spike, wander_towards_moon]); 

dont_touch_it = new Scene("Don't touch it.", "It could be a trick of the eclipse. You don't want to risk it. <br> You continue your travels.",
    "images/blue.gif", [walk_endlessly_d1]); 

see_light = new Scene("Go to it.", "You walk closer and see it. It's a Cerulean Cereus... But it's different. It radiates a deep blue glow, calmer than the others?",
    "images/blue.gif", [touch_it, dont_touch_it]); 

avoid_light = new Scene("Avoid the light.", "You continue your travels. It's impossible to know what it could have been. It's best to avoid it. <br> You continue your travels.",
    "images/dunes.gif", [walk_endlessly_l1]);

leave_outpost= new Scene("Leave the outpost.", "You have nothing left to do here. You leave the outpost. <br>You see a light in the distance. It could be a settlement. Or distress signal. <br> Go and see it?", 
    "images/DunesLight.gif", [see_light, avoid_light]);

leave_gun = new Scene("Leave it.", "You won't be needing that. You aren't a model designed for violence. You were commissioned for the purpose of retrieving data. <br> There is nothing left to do here.", 
    "images/outpost.png", [leave_outpost]);

take_gun = new Scene("Take it.", "Its a company-issued 4025-D Stun-Model Six Shooter with one charge left. Hardly lethal to inorganic beings, but it will cause immobility for some time. This could come in handy. Who knows what you'll find out here.", 
    "images/gun_taken.png", [leave_outpost], "Gun");

dunes_outpost = new Scene("Explore the Outpost.", "After a frustratingly long trek you walk in cautiously. It's empty, aside from a dilapidated scanner machine, and broken repair tools. <br> Amongst the trash you find a Stun-Model Six Shooter. <br> It still has a charge - Pick it up?", 
    "images/outpost.png", [take_gun, leave_gun]);

avoid_outpost = new Scene("Avoid the outpost.", "No need to search. You shouldn't trust something so easy to find. <br>You see a light in the distance. It could be a settlement. Or distress signal. <br> Go and see it?",
    "images/DunesLight.gif", [see_light, avoid_light]);

dunes = new Scene("Continue on the Blue Cereus Dunes", "It's best to follow the dunes. The mountains are too dangerous. <br> This planet is enshrouded under an endless  blue eclipse, surrounded by glowing, blue succulents, what are known to the Contractor Company as 'cacti'. Your scanners call them 'Cerulean Cereus'. <br> You see a small outpost in the distance. Maybe you can find something useful there.", 
    "images/Dunes.gif", [dunes_outpost, avoid_outpost]); 

start_scene = new Scene("Begin your survival.", "You are an exploration android model sent by an employer to survey planets. After your ship's reactor core fails upon entering this planets atmosphere, you just barely avoid a total crash landing. With limited energy reserves, both you and the ship are running out of time. Your energy core depletes under the influence of the cold night.", 
    "images/cerulean_moon.gif", [mountains, dunes]); // Create a new scene with the constructor. Paragraph info, image, and the choices are passed in as arguments.

load_new_scene(start_scene);

// Controls music (Credits to C418)
// DIDN'T FINISH
