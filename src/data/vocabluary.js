// 📦 Импорт изображений
// --- Food & Drinks ---
import foodIcon from "../assets/img/food/food.png";
import apple from "../assets/img/food/apple.png";
import banana from "../assets/img/food/banana.png";
import bread from "../assets/img/food/bread.png";
import cheese from "../assets/img/food/cheese.png";
import milk from "../assets/img/food/milk.png";
import water from "../assets/img/food/water.png";
import coffee from "../assets/img/food/coffee.png";
import egg from "../assets/img/food/egg.png";
import meat from "../assets/img/food/meat.png";
import soup from "../assets/img/food/soup.png";

// --- Clothes ---
import clothesIcon from "../assets/img/clothes/clothes.png";
import pants from "../assets/img/clothes/pants.png";
import shirt from "../assets/img/clothes/shirt.png";
import jacket from "../assets/img/clothes/jacket.png";
import dress from "../assets/img/clothes/dress.png";
import shoes from "../assets/img/clothes/shoes.png";
import hat from "../assets/img/clothes/hat.png";
import socks from "../assets/img/clothes/socks.png";
import blouse from "../assets/img/clothes/blouse.png";
import beanie from "../assets/img/clothes/beanie.png";
import coat from "../assets/img/clothes/coat.png";

// --- Travel ---
import travelIcon from "../assets/img/travel/travel.png";
import hotel from "../assets/img/travel/hotel.png";
import airport from "../assets/img/travel/airport.png";
import ticket from "../assets/img/travel/ticket.png";
import suitcase from "../assets/img/travel/suitcase.png";
import map from "../assets/img/travel/map.png";
import passport from "../assets/img/travel/passport.png";
import street from "../assets/img/travel/street.png";
import taxi from "../assets/img/travel/taxi.png";
import bus from "../assets/img/travel/bus.png";
import bridge from "../assets/img/travel/bridge.png";

// 🧠 Данные
const vocabluaryData = {
  "Food & Drinks": {
    level: "A1",
    image: foodIcon,
    words: [
      { de: "der Apfel", ru: "яблоко", image: apple, learned: false },
      { de: "die Banane", ru: "банан", image: banana, learned: false },
      { de: "das Brot", ru: "хлеб", image: bread, learned: false },
      { de: "der Käse", ru: "сыр", image: cheese, learned: false },
      { de: "die Milch", ru: "молоко", image: milk, learned: false },
      { de: "das Wasser", ru: "вода", image: water, learned: false },
      { de: "der Kaffee", ru: "кофе", image: coffee, learned: false },
      { de: "das Ei", ru: "яйцо", image: egg, learned: false },
      { de: "das Fleisch", ru: "мясо", image: meat, learned: false },
      { de: "die Suppe", ru: "суп", image: soup, learned: false },
    ],
  },

  Clothes: {
    level: "A1",
    image: clothesIcon,
    words: [
      { de: "die Hose", ru: "штаны", image: pants, learned: false },
      { de: "das Hemd", ru: "рубашка", image: shirt, learned: false },
      { de: "die Jacke", ru: "куртка", image: jacket, learned: false },
      { de: "das Kleid", ru: "платье", image: dress, learned: false },
      { de: "die Schuhe", ru: "обувь", image: shoes, learned: false },
      { de: "der Hut", ru: "шляпа", image: hat, learned: false },
      { de: "die Socken", ru: "носки", image: socks, learned: false },
      { de: "die Bluse", ru: "блузка", image: blouse, learned: false },
      { de: "die Mütze", ru: "шапка", image: beanie, learned: false },
      { de: "der Mantel", ru: "пальто", image: coat, learned: false },
    ],
  },
  Travel: {
    level: "A1",
    image: travelIcon,
    words: [
      { de: "das Hotel", ru: "отель", image: hotel, learned: false },
      { de: "der Flughafen", ru: "аэропорт", image: airport, learned: false },
      { de: "das Ticket", ru: "билет", image: ticket, learned: false },
      { de: "der Koffer", ru: "чемодан", image: suitcase, learned: false },
      { de: "die Landkarte", ru: "карта", image: map, learned: false },
      { de: "der Pass", ru: "паспорт", image: passport, learned: false },
      { de: "die Straße", ru: "улица", image: street, learned: false },
      { de: "das Taxi", ru: "такси", image: taxi, learned: false },
      { de: "der Bus", ru: "автобус", image: bus, learned: false },
      { de: "die Brücke", ru: "мост", image: bridge, learned: false },
    ],
  },
};

export default vocabluaryData;
