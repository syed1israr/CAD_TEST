import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { ShoppingBag } from "lucide-react"
import SearchAutocomplete from "../Utils/SearchAutocomplete"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Header = () => {
  const { cart } = useCart()
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    )
  }, [])

  return (
    <header
      ref={headerRef}
      className="bg-white text-black shadow-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.svg"
              alt="Cad & Cart"
              className="h-8 w-auto object-contain"
            />
          </Link>
       
          <div className="w-[180px]">
            <SearchAutocomplete />
          </div>
        </div>

       
        <div className="relative">
          <Link
            to="/cart"
            className="group relative p-2 rounded transition-all duration-200"
          >
            <ShoppingBag className="h-6 w-6" />
          
            {cart.length > 0 && (
              <span className="absolute top-4 left-4 -right-1 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
