import Second from "@/assets/images/home-categories-second-hand.png";
import cabrio from "@/assets/images/cabrio.png";
import coupe from "@/assets/images/coupe.png";
import van from "@/assets/images/home-categories-caravans.png";
import motos from "@/assets/images/home-categories-motos.png";
import newvheicle from "@/assets/images/home-categories-new-vehicles.png";
import pickup from "@/assets/images/pick-up.png";
import suv from "@/assets/images/suv.png";
export const types = [
  { title: "All" },
  {
    title: "New",
  },
  {
    title: "Second hand",
  },
] as const;
export const formTypes = [
  {
    title: "New",
  },
  {
    title: "Second hand",
  },
];
export const brands = [
  { title: "BMW" },
  {
    title: "Ferrari",
  },
  {
    title: "Porsche",
  },
  {
    title: "Audi",
  },
  {
    title: "Lamborghini",
  },
  {
    title: "Ford",
  },
  {
    title: "VW",
  },
] as const;
export const colors = [
  { title: "Black" },
  { title: "Blue" },
  {
    title: "Red",
  },
  {
    title: "White",
  },
  {
    title: "Silver",
  },
  {
    title: "Yellow",
  },
  {
    title: "Orange",
  },
] as const;
export const transmissions = [
  { title: "All" },
  { title: "Manual" },
  { title: "Auto" },
] as const;
export const formTransmissions = [
  { title: "Manual" },
  { title: "Auto" },
] as const;
export const mainSwiper = [
  {
    title: "New",
    query: "type=New",
    img: newvheicle,
  },
  {
    title: "Second hand",
    query: "type=Second+hand",
    img: Second,
  },

  {
    title: "SUV",
    query: "category=SUV",
    img: suv,
  },
  {
    title: "Convertible",
    query: "category=Convertible",
    img: cabrio,
  },
  {
    title: "Coupe",
    query: "category=Coupe",
    img: coupe,
  },
  {
    title: "Pick up",
    query: "category=Pick+up",
    img: pickup,
  },
  {
    title: "Bike",
    query: "category=Bike",
    img: motos,
  },
  {
    title: "Van",
    query: "category=Van",
    img: van,
  },
] as const;
export const categories = [
  {
    title: "SUV",
    query: "category=SUV",
    img: suv,
  },
  {
    title: "Convertible",
    query: "category=Convertible",
    img: cabrio,
  },
  {
    title: "Coupe",
    query: "category=Coupe",
    img: coupe,
  },
  {
    title: "Pick up",
    query: "category=Pick+up",
    img: pickup,
  },
  {
    title: "Van",
    query: "category=Van",
    img: van,
  },
  {
    title: "Bike",
    query: "category=Bike",
    img: motos,
  },
] as const;
