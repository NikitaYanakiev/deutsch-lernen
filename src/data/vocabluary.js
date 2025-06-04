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
      { de: "der Apfel", ru: "яблоко", ua: "яблуко", en: "apple", image: apple, learned: false },
      { de: "die Banane", ru: "банан", ua: "банан", en: "banana", image: banana, learned: false },
      { de: "das Brot", ru: "хлеб", ua: "хліб", en: "bread", image: bread, learned: false },
      { de: "der Käse", ru: "сыр", ua: "сир", en: "cheese", image: cheese, learned: false },
      { de: "die Milch", ru: "молоко", ua: "молоко", en: "milk", image: milk, learned: false },
      { de: "das Wasser", ru: "вода", ua: "вода", en: "water", image: water, learned: false },
      { de: "der Kaffee", ru: "кофе", ua: "кава", en: "coffee", image: coffee, learned: false },
      { de: "das Ei", ru: "яйцо", ua: "яйце", en: "egg", image: egg, learned: false },
      { de: "das Fleisch", ru: "мясо", ua: "м'ясо", en: "meat", image: meat, learned: false },
      { de: "die Suppe", ru: "суп", ua: "суп", en: "soup", image: soup, learned: false },
    ],
  },

  Clothes: {
    level: "A1",
    image: clothesIcon,
    words: [
      { de: "die Hose", ru: "штаны", ua: "штани", en: "pants", image: pants, learned: false },
      { de: "das Hemd", ru: "рубашка", ua: "сорочка", en: "shirt", image: shirt, learned: false },
      { de: "die Jacke", ru: "куртка", ua: "куртка", en: "jacket", image: jacket, learned: false },
      { de: "das Kleid", ru: "платье", ua: "сукня", en: "dress", image: dress, learned: false },
      { de: "die Schuhe", ru: "обувь", ua: "взуття", en: "shoes", image: shoes, learned: false },
      { de: "der Hut", ru: "шляпа", ua: "капелюх", en: "hat", image: hat, learned: false },
      { de: "die Socken", ru: "носки", ua: "шкарпетки", en: "socks", image: socks, learned: false },
      { de: "die Bluse", ru: "блузка", ua: "блузка", en: "blouse", image: blouse, learned: false },
      { de: "die Mütze", ru: "шапка", ua: "шапка", en: "beanie", image: beanie, learned: false },
      { de: "der Mantel", ru: "пальто", ua: "пальто", en: "coat", image: coat, learned: false },
    ],
  },

  Travel: {
    level: "A1",
    image: travelIcon,
    words: [
      { de: "das Hotel", ru: "отель", ua: "готель", en: "hotel", image: hotel, learned: false },
      { de: "der Flughafen", ru: "аэропорт", ua: "аеропорт", en: "airport", image: airport, learned: false },
      { de: "das Ticket", ru: "билет", ua: "квиток", en: "ticket", image: ticket, learned: false },
      { de: "der Koffer", ru: "чемодан", ua: "валіза", en: "suitcase", image: suitcase, learned: false },
      { de: "die Landkarte", ru: "карта", ua: "карта", en: "map", image: map, learned: false },
      { de: "der Pass", ru: "паспорт", ua: "паспорт", en: "passport", image: passport, learned: false },
      { de: "die Straße", ru: "улица", ua: "вулиця", en: "street", image: street, learned: false },
      { de: "das Taxi", ru: "такси", ua: "таксі", en: "taxi", image: taxi, learned: false },
      { de: "der Bus", ru: "автобус", ua: "автобус", en: "bus", image: bus, learned: false },
      { de: "die Brücke", ru: "мост", ua: "міст", en: "bridge", image: bridge, learned: false },
    ],
  },
};

export default vocabluaryData;
