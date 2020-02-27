"use strict";
// Import the Dialogflow module from the Actions on Google client library.
const {
    dialogflow,
    Suggestions,
    List
} = require("actions-on-google");

const { phones, laptops, tablets } = require('./data');

// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });
let price = 0;
let lastSelected = null;
let cartItems = false;
const welcome = (conv) => {
        conv.ask(`<speak>Hey there! Looking for new Phones, Tablets or Laptops? Well, you have come to the right place!</speak>`);
        if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
            const chips = ['Phones', 'Laptops', 'Tablets'];
            if (cartItems === true) chips.push('Checkout');
            conv.ask(new Suggestions(chips));
        }
    }
    // Welcome Intent
app.intent("Default Welcome Intent", conv => welcome(conv));

app.intent('Phones', conv => {
    conv.ask(`<speak> Here are the best selling smartphones. </speak>`);

    conv.ask(new List({
        title: 'Best Selling Smartphones',
        items: {
            // Add the first item to the list
            'SELECTION_KEY_P1': {
                synonyms: [phones[0].name],
                title: `${phones[0].name} \n $${phones[0].price}`,
                description: phones[0].description
            },
            // Add the second item to the list
            'SELECTION_KEY_P2': {
                synonyms: [phones[7].name],
                title: `${phones[7].name} \n $${phones[7].price}`,
                description: phones[7].description
            },
            // Add the third item to the list
            'SELECTION_KEY_P3': {
                synonyms: [phones[5].name],
                title: `${phones[5].name} \n $${phones[5].price}`,
                description: phones[5].description
            },
        },
    }));
    if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
        conv.ask(new Suggestions(['Laptops', 'Tablets']));
    }
});

app.intent('Tablets', conv => {
    conv.ask(`<speak> Here are the best selling tablets. </speak>`);

    conv.ask(new List({
        title: 'Best Selling Tablets',
        items: {
            // Add the first item to the list
            'SELECTION_KEY_T1': {
                synonyms: [tablets[0].name],
                title: `${tablets[0].name} \n $${tablets[0].price}`,
                description: tablets[0].description
            },
            // Add the second item to the list
            'SELECTION_KEY_T2': {
                synonyms: [tablets[1].name],
                title: `${tablets[1].name} \n $${tablets[1].price}`,
                description: tablets[1].description
            },
            // Add the third item to the list
            'SELECTION_KEY_T3': {
                synonyms: [tablets[2].name],
                title: `${tablets[2].name} \n $${tablets[2].price}`,
                description: tablets[2].description
            },
        },
    }));
    if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
        conv.ask(new Suggestions(['Phones', 'Laptops']));
    }
});

app.intent('Laptops', conv => {
    conv.ask(`<speak> Here are the best selling laptops. </speak>`);

    conv.ask(new List({
        title: 'Best Selling Laptops',
        items: {
            // Add the first item to the list
            'SELECTION_KEY_L1': {
                synonyms: [laptops[0].name],
                title: `${laptops[0].name} \n $${laptops[0].price}`,
                description: laptops[0].description
            },
            // Add the second item to the list
            'SELECTION_KEY_2': {
                synonyms: [laptops[1].name],
                title: `${laptops[1].name} \n $${laptops[1].price}`,
                description: laptops[1].description
            },
            // Add the third item to the list
            'SELECTION_KEY_L3': {
                synonyms: [laptops[2].name],
                title: `${laptops[2].name} \n $${laptops[2].price}`,
                description: laptops[2].description
            },
        },
    }));
    if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
        conv.ask(new Suggestions(['Phones', 'Tablets']));
    }
});

app.intent('List - OPTION', (conv, params, option) => {
    const SELECTED_ITEM_RESPONSES = {
        'SELECTION_KEY_P1': phones[0],
        'SELECTION_KEY_P2': phones[7],
        'SELECTION_KEY_P3': phones[5],
        'SELECTION_KEY_L1': laptops[0],
        'SELECTION_KEY_L2': laptops[1],
        'SELECTION_KEY_L3': laptops[2],
        'SELECTION_KEY_T1': tablets[0],
        'SELECTION_KEY_T2': tablets[1],
        'SELECTION_KEY_T3': tablets[2],
    };
    conv.ask('Thank you for selecting the product. Do you wanna add it to cart?');
    lastSelected = SELECTED_ITEM_RESPONSES[option];
    if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
        conv.ask(new Suggestions(['Yes', 'No']));
    }
});

app.intent('List - OPTION - no', (conv, params, option) => {
    conv.ask('No problem. Let me take you to starting again');
    lastSelected = null;
    welcome(conv);
});

app.intent('List - OPTION - yes', (conv, params, option) => {
    conv.ask('Product added to the cart!');
    price += lastSelected.price;
    cartItems = true;
    if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
        conv.ask(new Suggestions(['Checkout', 'Add Phones', 'Add Tablets', 'Add Laptops']));
    }
});

app.intent('Checkout', conv => {
    conv.ask('Thank you for shopping with us. We will ship the products asap to your address. Your total is $' + price);
    if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
        conv.ask(new Suggestions(['Exit', 'Phones', 'Tablets', 'Laptops']));
    }
    price = 0;
    cartItems = false;
});

app.intent('Exit', conv => {
    conv.ask(`Thank you for stopping by. See you next time. Have a great day!`);

    // conv.close();

    sleep(1000).then(() => {
        conv.close();
    });
    
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
