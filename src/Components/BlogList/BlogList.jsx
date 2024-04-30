import React, { useEffect, useState } from "react";
import BlogItem from "../BlogItem/BlogItem";
import { supabase } from "../../Utils/supabase";

export default function BlogList() {
    const [blogItems, setBlogItems] = useState([]);

    useEffect(() => {
      getBlogItems();
    }, []);

    async function getBlogItems() {
      const { data } = await supabase.from("Blogs").select();
      setBlogItems(data);
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">AceServe Blog</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Check our latest blogs about anything related to tennis. Stay updated about the last matchs, tournaments, etc</p>
                </div>

                <div class="grid gap-8 lg:grid-cols-2">
                    {blogItems.map((blogData) => (
                        <BlogItem blog={blogData}/>
                    ))}
                </div>
            </div>
        </section>
    );
}