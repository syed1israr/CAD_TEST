# Cad & Cart Task

A next-gen product discovery UI for the Cad & Cart ecommerce platform, built with React, Vite, and Tailwind CSS.

## Features

- **Product Listing**: Browse products with filtering by category, price, and rating.
- **Search Autocomplete**: Instant product suggestions as you type.
- **Product Details**: View detailed info, ratings, and related products.
- **Cart Management**: Add, remove, and update product quantities in your cart.
- **Responsive Design**: Mobile-friendly layout.
- **Animated UI**: Smooth transitions using GSAP.
- **Persistent Cart**: Cart state synced with a mock API.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/)
- [Axios](https://axios-http.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [toast](https://react-hot-toast.com/)
- [Postman](https://www.postman.com/product/what-is-postman/)

## Project Structure

```
src/
  App.jsx
  main.jsx
  index.css
  assets/
  components/
    Cart.jsx
    Footer.jsx
    Header.jsx
    Hero.jsx
    ItemDetails.jsx
  contexts/
    CartContext.jsx
    FilterContext.jsx
  hooks/
    useIsMobile.js
    useProductAvailability.js
    useProducts.js
  Utils/
    Filter_Component.jsx
    ItemCard.jsx
    ItemRating.jsx
    SearchAutocomplete.jsx
public/
  logo.svg
  placeholder.svg
  vite.svg
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/cad_and_cart.git
   cd cad_and_cart
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Build for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Usage

- **Browse Products:** Use the filters and search bar to find products.
- **View Details:** Click on a product to see more information and related items.
- **Add to Cart:** Use the "Add to Cart" button on product cards or details page.
- **Manage Cart:** Access your cart from the header, update quantities, or remove items.

## API

This project uses [DummyJSON](https://dummyjson.com/) for product and cart data.

## Customization

- **Styling:** Modify `src/index.css` and Tailwind config as needed.
- **Components:** Add or update components in `src/components` and `src/Utils`.
- **Context:** Update cart and filter logic in `src/contexts`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first.
