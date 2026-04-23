const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">ShrimpFresh</h2>
                    <p>
                        ShrimpFresh is dedicated to providing the best tools for detecting the freshness of shrimp,
                        ensuring quality
                        at every stage of the supply chain.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="hover:underline">Home</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:underline">Features</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:underline">About Us</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <p className="mb-2">123 Seafood Lane</p>
                    <p className="mb-2">Shrimpville, SH 12345</p>
                    <p className="mb-2">Phone: (123) 456-7890</p>
                    <p className="mb-2">Email: info@shrimpfresh.com</p>
                </div>

                {/* Social Media Icons */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="text-2xl hover:text-blue-500">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" aria-label="Twitter" className="text-2xl hover:text-blue-300">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" aria-label="LinkedIn" className="text-2xl hover:text-blue-700">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#" aria-label="Instagram" className="text-2xl hover:text-pink-500">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center mt-10 border-t border-gray-700 pt-4">
                <p>&copy; 2024 ShrimpFresh. All rights reserved.</p>
            </div>
        </footer>
    )
}
export default Footer;