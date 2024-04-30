export default function Footer() {
    return (
        <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <button href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
                            <path
                                clipRule="evenodd"
                                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AceServe</span>
                    </button>
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <button class="hover:underline me-4 md:me-6">About</button>
                        </li>
                        <li>
                            <button class="hover:underline me-4 md:me-6">Privacy Policy</button>
                        </li>
                        <li>
                            <button class="hover:underline me-4 md:me-6">Licensing</button>
                        </li>
                        <li>
                            <button class="hover:underline">Contact</button>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <button href="https://flowbite.com/" class="hover:underline">AceServe</button>. All Rights Reserved.</span>
            </div>
        </footer>


    );
}