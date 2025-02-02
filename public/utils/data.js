import perfume from '/assets/perfumeCollect.png'
import blue from '/assets/blue.png'
import brown from '/assets/brown.png'
const Links = [
  { id: '1', link: perfume, scent: 'Sauvage', smell: 'Smells Like Dior Sauvage (1)', ingredients: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note1', gender: 'Men', price: '$45' },
  { id: '2', link: blue, scent: 'Black Opium', smell: 'Smells Like Dior Sauvage (2)', ingredients: 'Fragrance Oils, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note2', gender: 'Women', price: '$90' },
  { id: '3', link: blue, scent: 'Flowerbomb', smell: 'Smells Like Dior Sauvage (3)', ingredients: 'Solvents, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note3', gender: 'Women', price: '$180' },
  { id: '4', link: brown, scent: 'Tom Ford', smell: 'Smells Like Dior Sauvage (4)', ingredients: 'Fixatives, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note4', gender: 'Unisex', price: '$30' },
  { id: '5', link: blue, scent: 'Flowerbomb 2', smell: 'Smells Like Dior Sauvage (5)', ingredients: 'Modifiers, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note5', gender: 'Women', price: '$45' },
  { id: '6', link: perfume, scent: 'Bleu de Chanel', smell: 'Smells Like Dior Sauvage (6)', ingredients: 'Diluents, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note6', gender: 'Men', price: '$95' },
  { id: '7', link: brown, scent: 'Baccarat Rouge 540', smell: 'Smells Like Dior Sauvage (7)', ingredients: 'Colorants, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note7', gender: 'Unisex', price: '$65' },
  { id: '8', link: perfume, scent: 'Aventus by Creed', smell: 'Smells Like Dior Sauvage (7)', ingredients: 'Colorants, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note8', gender: 'Men', price: '$65' },
  { id: '9', link: perfume, scent: 'Aventus by Creed2', smell: 'Smells Like Dior Sauvage (7)', ingredients: 'Colorants, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note9', gender: 'Men', price: '$65' },
  { id: '10', link: perfume, scent: 'Aventus by Creed3', smell: 'Smells Like Dior Sauvage (7)', ingredients: 'Colorants, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note10', gender: 'Men', price: '$65' },
];
const suggestedProducts = [
  { id: '1', link: perfume, scent: 'Sauvage', smell: 'Smells Like Dior Sauvage (1)', ingredients: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note1', gender: 'Men', price: '$45' },
  { id: '2', link: blue, scent: 'Black Opium', smell: 'Smells Like Dior Sauvage (2)', ingredients: 'Fragrance Oils, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note2', gender: 'Women', price: '$90' },
  { id: '3', link: blue, scent: 'Flowerbomb', smell: 'Smells Like Dior Sauvage (3)', ingredients: 'Solvents, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note3', gender: 'Men', price: '$180' },
  { id: '4', link: brown, scent: 'Tom Ford', smell: 'Smells Like Dior Sauvage (4)', ingredients: 'Fixatives, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!', notes: 'Note4', gender: 'Unisex', price: '$30' },

];

const MenProducts = Links.filter(product => product.gender === 'Men');
const WomenProducts = Links.filter(product => product.gender === 'Women');
const UnisexProducts = Links.filter(product => product.gender === 'Unisex');
const AllProducts = Links;

const NavbarMenu = [
  {
    id: 1,
    titile: "Shop",
    link: "#"
  },
  {
    id: 2,
    titile: "Earn",
    link: "#"
  },
  {
    id: 3,
    titile: "Blog",
    link: "#"
  },
  {
    id: 4,
    titile: "About",
    link: "#"
  },
  {
    id: 5,
    titile: "Reviews",
    link: "#"
  },
]

export { Links, MenProducts, WomenProducts, UnisexProducts, AllProducts, suggestedProducts, NavbarMenu }