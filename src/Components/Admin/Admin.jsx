import React, { useEffect, useState } from "react";
import { supabase } from "../../Utils/supabase";
import AdminTable from "../AdminTable/AdminTable";
import toast from "react-hot-toast";
import CustomNavbar from "../Navbar/Navbar";

export default function Admin() {
    const [blogItems, setBlogItems] = useState([]);
    const [createBlogData, setCreateBlogData] = useState({
        title: '',
        imageUrl: '',
        subtitle: '',
        content: '',
        id: ''
    });

    function handleChange(event) {
        setCreateBlogData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            };
        });
    }

    useEffect(() => {
        getBlogItems();
    }, []);

    async function getBlogItems() {
        const { data } = await supabase.from("Blogs").select();
        setBlogItems(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let blogData = {
            title: createBlogData.title,
            imageUrl: createBlogData.imageUrl,
            subtitle: createBlogData.subtitle,
            content: createBlogData.content
        };

        if (createBlogData.id) {
            const { data, error } = await supabase
                .from('Blogs')
                .update(blogData)
                .match({ id: createBlogData.id })
                .select()
                .single();

            if (data) {
                const updatedBlogs = blogItems.map(item => item.id === createBlogData.id ? { ...item, ...data } : item);
                setBlogItems(updatedBlogs);
                toast.success("Blog post updated successfully");
            }
            if (error) {
                toast.error(error.toString());
            }
        } else {
            const { data, error } = await supabase
                .from('Blogs')
                .insert(blogData);

            if (data) {
                setBlogItems([...blogItems, data[0]]);
                toast.success("Blog post created successfully");
            }
            if (error) {
                toast.error(error.toString());
            }
        }

        setCreateBlogData({ id: '', title: '', imageUrl: '', subtitle: '', content: '' });
    };

    const handleEdit = (blog) => {
        setCreateBlogData({
            id: blog.id,
            title: blog.title,
            imageUrl: blog.imageUrl,
            subtitle: blog.subtitle,
            content: blog.content
        });
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('Blogs').delete().eq('id', id);

        if (error) {
            toast.error(error.toString());
        } else {
            const updatedBlogItems = blogItems.filter((item) => item.id !== id);
            setBlogItems(updatedBlogItems);
            toast.success("Blog post deleted successfully");
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col">
            <CustomNavbar selectedLink={'admin'}/>
            
            <div className="mx-auto max-w-screen-sm text-center lg:mb-10 mb-8 pt-10">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">AceServe Admin Dashboard</h2>
                <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Manage all the content of AceServe Blog</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-10">
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Title
                        </label>
                        <input name="title" value={createBlogData.title} onChange={handleChange} className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Tips for beginners" required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Image Url
                        </label>
                        <input name="imageUrl" value={createBlogData.imageUrl} onChange={handleChange} className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="https://apps.com/images/image.jpg" required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Subtitle
                        </label>
                        <textarea onChange={handleChange} value={createBlogData.subtitle} name="subtitle" rows={4} className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Discover the most incredible tips for beginners" required></textarea>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Content
                        </label>
                        <textarea name="content" value={createBlogData.content} onChange={handleChange} rows={4} className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever." required></textarea>
                    </div>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
            </form>

            <div className="w-full max-w-3xl mx-auto mt-10">
                <AdminTable blogItems={blogItems} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
        </div>
    );
}