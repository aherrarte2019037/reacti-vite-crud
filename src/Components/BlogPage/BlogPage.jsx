import { useParams } from 'react-router-dom';
import CustomNavbar from '../Navbar/Navbar';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../Utils/supabase';

export default function BlogPage() {
    const { id } = useParams();
    const [blogItem, setBlogItem] = useState([]);

    const getBlogItem = useCallback(async () => {
        const { data } = await supabase.from("Blogs").select().eq('id', id).single();
        setBlogItem(data);
    }, [id]);

    useEffect(() => {
        getBlogItem();
    }, [getBlogItem]);

    return (
        <div className="w-screen h-screen flex flex-col">
            <CustomNavbar selectedLink={'blog'}/>
            <section>
                <div className="max-w-screen-xl mx-auto px-4 py-28 pb-12 gap-12 text-gray-600 md:px-8">
                    <div className="space-y-5 max-w-2xl mx-auto text-center">
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <div className="flex items-center gap-x-2 text-gray-500 text-sm">
                                Published: {new Date(blogItem.created_at).toLocaleString()}
                            </div>
                        </div>
                        <h1 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                            { blogItem.title }
                        </h1>
                        <p className="max-w-xl mx-auto ">
                            { blogItem.subtitle }
                        </p>
                        <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                            <button className="flex items-center justify-center gap-x-2 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg md:inline-flex">
                                Get full access
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <a href='/dashboard' className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex">
                                Back to home
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 max-w-[40rem] mx-auto mt-14">
                        <div className="relative">
                            <img src={blogItem.imageUrl} className="rounded-xl" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <p className='max-w-[800px] mx-auto pb-20'>
                { blogItem.content }
            </p>
        </div>
    );
}