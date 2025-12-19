import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-black text-white/60 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-display font-medium tracking-widest text-white uppercase block">
                            KM Fashion
                        </Link>
                        <p className="text-sm font-light leading-relaxed text-white/50">
                            Industrial luxury defined by precision and utility.
                            Engineered for the modern vanguard.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-white font-medium uppercase tracking-widest mb-6 text-sm">Shop</h3>
                        <ul className="space-y-3 text-sm font-light">
                            <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition-colors">Crown Series</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-medium uppercase tracking-widest mb-6 text-sm">Company</h3>
                        <ul className="space-y-3 text-sm font-light">
                            <li><Link to="/portfolio" className="hover:text-white transition-colors">Lookbook</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-medium uppercase tracking-widest mb-6 text-sm">Contact</h3>
                        <ul className="space-y-4 text-sm font-light text-white/60">
                            <li>123 Fashion Dist,<br />New York, NY 10001</li>
                            <li>hello@kmfashion.com</li>
                            <li>+1 (555) 000-0000</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-medium uppercase tracking-widest mb-6 text-sm">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs font-light tracking-widest opacity-40">
                    <p>&copy; {new Date().getFullYear()} KM Fashion. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
