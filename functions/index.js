"use strict";
// Import the Dialogflow module from the Actions on Google client library.
const {
  dialogflow,
  Suggestions,
  SignIn,
  BasicCard,
  Image,
  Carousel,
  BrowseCarousel,
} = require("actions-on-google");

// Import modules for sending emails.
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { v4 } = require("uuid");

// Import Data.
const { lights, chairs, fans } = require("./data");

// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");

// Instantiate the Dialogflow client.
const app = dialogflow({
  debug: true,
  clientId:
    "577168752299-dkpuh1pbh9p2925jjkbkicee66qb0ofh.apps.googleusercontent.com",
});

// Global variables to maintain state of the program.
let price = 0;
let lastSelected = null;
let cartItems = false;
let allCartItems = [];

const welcome = (conv) => {
  conv.ask(
    `<speak>Hey there! Looking for decorating your beautiful Home? Well, you have come to the right place! We have nice collection of Chairs, Lights, and Fans. What would you like to buy today?</speak>`
  );
  if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
    const chips = ["Lights", "Chairs", "Fans"];
    if (cartItems === true) chips.push("Cart");
    conv.ask(new Suggestions(chips));
  }
};

// Welcome Intent
app.intent("Default Welcome Intent", (conv) => welcome(conv));

// To show different types of lights.
// app.intent("Lights", (conv) => {

//   conv.ask(`<speak>Awesome! We have an antique collection of lights which are well suited for every house. Here's the list of our best selling lights. They are just waiting to be placed in your house.</speak>`);

//   // Display a horizontal slider.
//   conv.ask(
//     new Carousel({
//       title: "Best Selling Lights",
//       items: {
//         // Add the first item to the list
//         SELECTION_KEY_L1: {
//           synonyms: [lights[0].name],
//           title: `${lights[0].name} \n $${lights[0].price}`,
//           image: new Image({
//             url: lights[0].img1,
//             alt: lights[0].name,
//           }),
//         },
//         // Add the second item to the list
//         SELECTION_KEY_L2: {
//           synonyms: [lights[1].name],
//           title: `${lights[1].name} \n $${lights[1].price}`,
//           image: new Image({
//             url: lights[1].img1,
//             alt: lights[1].name,
//           }),
//         },
//         // Add the third item to the list
//         SELECTION_KEY_L3: {
//           synonyms: [lights[2].name],
//           title: `${lights[2].name} \n $${lights[2].price}`,
//           image: new Image({
//             url: lights[2].img1,
//             alt: lights[2].name,
//           }),
//         },
//       },
//     })
//   );

//   // if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
//     conv.ask(new Suggestions(["Fans", "Chairs"]));
//   // }
// });

// Carousel
app.intent('Lights', (conv) => {
  conv.ask('This is an example of a carousel.');
  conv.ask(new Suggestions(intentSuggestions));
  conv.ask(new Carousel({
    items: {
      // Add the first item to the carousel
      [SELECTION_KEY_GOOGLE_ASSISTANT]: {
        synonyms: [
          'Assistant',
          'Google Assistant',
        ],
        title: 'Item #1',
        description: 'Description of Item #1',
        image: new Image({
          url: IMG_URL_AOG,
          alt: 'Google Assistant logo',
        }),
      },
      // Add the second item to the carousel
      [SELECTION_KEY_GOOGLE_PAY]: {
        synonyms: [
          'Transactions',
          'Google Payments',
      ],
        title: 'Item #2',
        description: 'Description of Item #2',
        image: new Image({
          url: IMG_URL_GOOGLE_PAY,
          alt: 'Google Pay logo',
        }),
      },
      // Add third item to the carousel
      [SELECTION_KEY_GOOGLE_PIXEL]: {
        synonyms: [
          'Pixel',
          'Google Pixel phone',
        ],
        title: 'Item #3',
        description: 'Description of Item #3',
        image: new Image({
          url: IMG_URL_GOOGLE_PIXEL,
          alt: 'Google Pixel phone',
        }),
      },
      // Add last item of the carousel
      [SELECTION_KEY_GOOGLE_HOME]: {
        title: 'Item #4',
        synonyms: [
          'Google Home',
        ],
        description: 'Description of Item #4',
        image: new Image({
          url: IMG_URL_GOOGLE_HOME,
          alt: 'Google Home',
        }),
      },
    },
  }));
});

app.intent("Chairs", (conv) => {
  conv.ask(`<speak> We understand how important comfort is with beautiful build quality. Have a look at our best selling stylish Chairs.</speak>`);

  // Display a horizontal slider.
  conv.ask(
    new Carousel({
      title: "Best Selling Chairs",
      items: {
        // Add the first item to the list
        SELECTION_KEY_C1: {
          synonyms: [chairs[0].name],
          title: `${chairs[0].name} \n $${chairs[0].price}`,
          image: new Image({
            url: chairs[0].img1,
            alt: chairs[0].name,
          }),
        },
        // Add the second item to the list
        SELECTION_KEY_C2: {
          synonyms: [chairs[1].name],
          title: `${chairs[1].name} \n $${chairs[1].price}`,
          image: new Image({
            url: chairs[1].img1,
            alt: chairs[1].name,
          }),
        },
        // Add the third item to the list
        SELECTION_KEY_C3: {
          synonyms: [chairs[2].name],
          title: `${chairs[2].name} \n $${chairs[2].price}`,
          image: new Image({
            url: chairs[2].img1,
            alt: chairs[2].name,
          }),
        },
      },
    })
  );
  if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
    conv.ask(new Suggestions(["Lights", "Fans"]));
  }
});

app.intent("Fans", (conv) => {
  conv.ask(`<speak> Here are the best selling fans. </speak>`);

  // Display a horizontal slider.
  conv.ask(
    new Carousel({
      title: "Best Selling Fans",
      items: {
        // Add the first item to the list
        SELECTION_KEY_F1: {
          synonyms: [fans[0].name],
          title: `${fans[0].name} \n $${fans[0].price}`,
          image: new Image({
            url: fans[0].img1,
            alt: fans[0].name,
          }),
        },
        // Add the second item to the list
        SELECTION_KEY_F2: {
          synonyms: [fans[1].name],
          title: `${fans[1].name} \n $${fans[1].price}`,
          image: new Image({
            url: fans[1].img1,
            alt: fans[1].name,
          }),
        },
        // Add the third item to the list
        SELECTION_KEY_F3: {
          synonyms: [fans[2].name],
          title: `${fans[2].name} \n $${fans[2].price}`,
          image: new Image({
            url: fans[2].img1,
            alt: fans[2].name,
          }),
        },
      },
    })
  );
  if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
    conv.ask(new Suggestions(["Chairs", "Lights"]));
  }
});

// Handling responses of selected item from sliders.
app.intent("Carousel - OPTION", (conv, params, option) => {
  const SELECTED_ITEM_RESPONSES = {
    SELECTION_KEY_L1: lights[0],
    SELECTION_KEY_L2: lights[1],
    SELECTION_KEY_L3: lights[2],
    SELECTION_KEY_C1: chairs[0],
    SELECTION_KEY_C2: chairs[1],
    SELECTION_KEY_C3: chairs[2],
    SELECTION_KEY_F1: fans[0],
    SELECTION_KEY_F2: fans[1],
    SELECTION_KEY_F3: fans[2],
  };

  // Display specifications of the product.
  lastSelected = SELECTED_ITEM_RESPONSES[option];
  let response = '';
  if (lastSelected.category === 'Chairs') {
    response = 'Great choice. This chair is very beautiful yet so comfortable. Here are some more details for you to know.'
  } else {
    response = `Well your choice is as beautiful as this lamp. It's going to be a new killer combination in your home. Here are some more details.`
  }
  conv.ask(response);
  conv.ask(
    new BasicCard({
      title: lastSelected.name,
      text: lastSelected.description,
    })
  );
  if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
    conv.ask(new Suggestions(["Rating", "Add to cart"]));
  }
});

// Add the selected product to the cart.
app.intent("Add to cart", (conv) => {
  conv.ask("Product added to the cart! Would you like to check items in your cart or add more products from our collection?");
  price += lastSelected.price;
  allCartItems.push(lastSelected);
  cartItems = true;
  if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
    conv.ask(new Suggestions(["Cart", "Lights", "Chairs", "Fans"]));
  }
});

// Get the rating for the selected product. ( Here we hard coded the rating because we couldn't find the specified API with lots of details.)

app.intent("Rating", (conv) => {
  conv.ask("Customers seems really happy with this item. We hope you would love it as well.");
  if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
    conv.ask(
      new BasicCard({
        title: "Rating: " + lastSelected.rating,
        text: `
        5 Star: 2341,
        4 Star: 331,
        3 Star: 59,
        2 Star: 24,
        1 Star: 12
        `,
      })
    );
    conv.ask(new Suggestions(["Add to cart"]));
  }
});

// Show current items in the cart.
app.intent("Cart", (conv) => {
  conv.ask("Here is your new cart details");
  let cartText = "";
  let num = 1;
  allCartItems.forEach((cartItem) => {
    cartText += `${num++}. ${cartItem.name} $${cartItem.price}\n`;
  });
  if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
    conv.ask(
      new BasicCard({
        title: "Cart",
        subtitle: "Cart Total: $" + price,
        text: cartText,
      })
    );
  }
  conv.ask("Proceed to checkout?");
  conv.ask(new Suggestions(["Checkout", "Lights", "Chairs", "Fans"]));
});

// Work on checkout
app.intent("Checkout", (conv) => {
  conv.ask(new SignIn("For checkout"));
});

// If user allowed sign in then order the products in the cart otherwise ask user to sign in to complete the order successfully. For successful orders, email is also sent to user on their email address and order tracking details as well.
app.intent("Get checkout details", async (conv, params, signin) => {
  if (signin.status === "OK") {
    try {
      const userProfile = conv.user.profile.payload;
      conv.ask(
        "Thank you for shopping with us. We will ship the products ASAP to your address. Your total is $" +
        price +
        ". Order details and tracking ID has been sent to your email."
      );
      conv.ask(
        new BasicCard({
          title: "Your order is on its way",
          text: "Reach out to us at customer.support@lowes.com for any queries",
          image: new Image({
            url: 'https://firebasestorage.googleapis.com/v0/b/happy-birthday-74a91.appspot.com/o/truck.PNG?alt=media&token=8c986b99-9ca6-48e7-8368-100a495f5567',
            alt: 'Delivering your products!'
          })
        })
      );
      let cartText = "";
      let num = 1;
      allCartItems.forEach((cartItem) => {
        cartText += `${num++}. ${cartItem.name} $${cartItem.price}<br>`;
      });
      // Send email to user.
      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key:
              "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",
          },
        })
      );
      await transporter.sendMail({
        to: userProfile.email,
        from: "rishi06081998@gmail.com",
        subject: "Thank you for shopping with us",
        html: `
          <h2> Cart Total: $'${price} </h2>
          <hr>
          <p>
          ${cartText}
          </p>
          <hr>
          <b> Order ID: ${v4()} </b>
        `,
      });
      if (conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
        conv.ask(new Suggestions(["Exit", "Lights", "Chairs", "Fans"]));
      }
      price = 0;
      cartItems = false;
      allCartItems = [];
    } catch (e) {
      console.log(e);
    }
  } else {
    conv.ask(
      `You need to sign in to order items. If you want to sign in, say "Sign me in for checkout"`
    );
    conv.ask(new Suggestions(["Checkout", "Lights", "Chairs", "Fans"]));
  }
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);