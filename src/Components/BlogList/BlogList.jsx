import React, { useEffect, useState } from "react";
import BlogItem from "../BlogItem/BlogItem";
import { supabase } from "../../Utils/supabase";
import "./BlogList.css";

export default function BlogList() {
    const [blogItems, setBlogItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getBlogItems();
    }, []);

    async function getBlogItems() {
        setIsLoading(true)
        const { data } = await supabase.from("Blogs").select();
        setBlogItems(data);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="text-center">
                        <span className="loader"></span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">AceServe Blog</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Check our latest blogs about anything related to tennis. Stay updated about the last matches, tournaments, etc.</p>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                    {blogItems.map((blogData) => (
                        <BlogItem key={blogData.id} blog={blogData} />
                    ))}
                </div>
            </div>
        </section>
    );
}
