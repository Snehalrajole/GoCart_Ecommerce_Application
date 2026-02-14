import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Spinner from '../components/Spinner';
import Slider from '../components/Slider';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://fakestoreapi.com/products');
                setPosts(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 mt-16 sm:mt-0">
            {/* Slider Component */}
            <Slider />
            
            {/* Products Section */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center sm:text-left">
                    Latest Products
                </h2>
                
                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <Spinner />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-8">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700">
                            No products found!
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 mt-2">
                            Please check back later for new arrivals.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
                        {posts.map((post) => (
                            <Product key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
