import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-background text-primary/60 border-t border-primary/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-display font-medium tracking-widest text-primary uppercase block">
                            KM Fashion
                        </Link>
                        <p className="text-sm font-light leading-relaxed text-primary/50">
                            Industrial luxury defined by precision and utility.
                            Engineered for the modern vanguard.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-primary font-medium uppercase tracking-widest mb-6 text-sm">Shop</h3>
                        <ul className="space-y-3 text-sm font-light">
                            <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link to="/shop" className="hover:text-primary transition-colors">Crown Series</Link></li>
                            <li><Link to="/shop" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop" className="hover:text-primary transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-primary font-medium uppercase tracking-widest mb-6 text-sm">Company</h3>
                        <ul className="space-y-3 text-sm font-light">
                            <li><Link to="/portfolio" className="hover:text-primary transition-colors">Lookbook</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-primary font-medium uppercase tracking-widest mb-6 text-sm">Contact</h3>
                        <ul className="space-y-4 text-sm font-light text-primary/60">
                            <li>123 Fashion Dist,<br />New York, NY 10001</li>
                            <li>hello@kmfashion.com</li>
                            <li>+1 (555) 000-0000</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-primary font-medium uppercase tracking-widest mb-6 text-sm">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 hover:bg-primary hover:text-background transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 hover:bg-primary hover:text-background transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 hover:bg-primary hover:text-background transition-all">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-primary/10 text-center text-xs font-light tracking-widest opacity-40">
                    <p>&copy; {new Date().getFullYear()} KM Fashion. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
